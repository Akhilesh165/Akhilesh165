import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export function AICoachTab({ user, plan, setPlan }) {
  const [apiKey, setApiKey] = useState(localStorage.getItem("gemini_api_key") || "");
  const [keyConfirmed, setKeyConfirmed] = useState(!!localStorage.getItem("gemini_api_key"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    goal: user?.goal || "Build muscle",
    daysPerWeek: "4",
    duration: "45",
    equipment: "Full gym",
    level: user?.weight ? "Intermediate" : "Beginner",
    focus: "Full body",
    injuries: "",
  });

  const goals = ["Build muscle", "Lose weight", "Stay fit", "Improve flexibility", "Athletic performance", "Strength training", "Endurance"];
  const equipmentOptions = ["Full gym", "Dumbbells only", "Bodyweight only", "Resistance bands", "Home gym (basic)", "Barbell & bench"];
  const focusAreas = ["Full body", "Upper body", "Lower body", "Push/Pull/Legs", "Core & abs", "Back & shoulders", "Chest & arms"];
  const levels = ["Beginner", "Intermediate", "Advanced"];

  const saveApiKey = () => {
    if (apiKey.trim().length < 10) {
      setError("Please enter a valid API key.");
      return;
    }
    localStorage.setItem("gemini_api_key", apiKey.trim());
    setKeyConfirmed(true);
    setError("");
  };

  const generatePlan = async () => {
    setLoading(true);
    setError("");
    setGeneratedPlan(null);

    const prompt = `You are an expert certified personal trainer and fitness coach. Generate a detailed, personalized weekly workout plan based on these inputs:

Goal: ${formData.goal}
Days Per Week: ${formData.daysPerWeek}
Session Duration: ${formData.duration} minutes
Available Equipment: ${formData.equipment}
Fitness Level: ${formData.level}
Focus Area: ${formData.focus}
${formData.injuries ? `Injuries/Limitations: ${formData.injuries}` : "No injuries or limitations."}
${user?.age ? `Age: ${user.age}` : ""}
${user?.weight ? `Weight: ${user.weight} kg` : ""}

Please respond ONLY with valid JSON in this exact format (no markdown, no code fences, just raw JSON):
{
  "planName": "Name of the plan",
  "summary": "A brief 2-sentence summary of the plan approach",
  "weeklySchedule": [
    {
      "day": "Day 1 - Monday",
      "focus": "Chest & Triceps",
      "exercises": [
        {
          "name": "Exercise Name",
          "sets": 3,
          "reps": "10-12",
          "rest": "60s",
          "notes": "Brief coaching tip"
        }
      ],
      "warmup": "5 min light cardio + dynamic stretches",
      "cooldown": "5 min stretching"
    }
  ],
  "tips": ["Tip 1", "Tip 2", "Tip 3"]
}`;

    try {
      const res = await fetch(`${API_URL}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error?.message || "API request failed");
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) throw new Error("No response from AI");

      // Clean up the response - strip markdown fences if present
      const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      const parsed = JSON.parse(cleaned);
      setGeneratedPlan(parsed);
      setChatMessages([{ role: "ai", text: `I've created your "${parsed.planName}" plan! Ask me anything about it — I can modify exercises, adjust intensity, explain movements, or answer any fitness question.` }]);
    } catch (err) {
      setError(err.message || "Failed to generate plan. Check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;

    const userMsg = chatInput.trim();
    setChatInput("");
    setChatMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setChatLoading(true);

    const context = generatedPlan
      ? `You are an expert personal trainer and fitness coach. The user has this workout plan: "${generatedPlan.planName}". Plan summary: ${generatedPlan.summary}. Answer their question helpfully and concisely (2-4 sentences max). Be encouraging and professional.`
      : `You are an expert personal trainer and fitness coach. Answer the user's fitness question helpfully and concisely (2-4 sentences max). Be encouraging and professional.`;

    try {
      const res = await fetch(`${API_URL}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: context }] },
            { role: "model", parts: [{ text: "I'm your AI fitness coach! I'll help you with your training." }] },
            ...chatMessages.map(m => ({
              role: m.role === "user" ? "user" : "model",
              parts: [{ text: m.text }]
            })),
            { role: "user", parts: [{ text: userMsg }] }
          ],
          generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
        }),
      });

      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that. Try again!";
      setChatMessages(prev => [...prev, { role: "ai", text: reply }]);
    } catch {
      setChatMessages(prev => [...prev, { role: "ai", text: "Connection error. Please try again." }]);
    } finally {
      setChatLoading(false);
    }
  };

  const addPlanToTracker = () => {
    if (!generatedPlan) return;
    const exercises = generatedPlan.weeklySchedule.flatMap(day =>
      day.exercises.map(ex => ({
        name: ex.name,
        sets: ex.sets,
        reps: typeof ex.reps === "string" ? parseInt(ex.reps) || 10 : ex.reps,
        cal: Math.round(ex.sets * (typeof ex.reps === "string" ? parseInt(ex.reps) || 10 : ex.reps) * 0.8),
        day: day.day,
        rest: ex.rest,
        notes: ex.notes,
      }))
    );
    setPlan(exercises);
  };

  // ─── STYLES ─────────────────────────────────────────────
  const card = {
    background: "rgba(255,106,0,0.04)",
    border: "1px solid rgba(255,106,0,0.12)",
    borderRadius: 16,
    padding: "20px 24px",
    marginBottom: 16,
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid rgba(255,106,0,0.18)",
    background: "rgba(0,0,0,0.3)",
    color: "#f8fafc",
    fontSize: 13,
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
  };

  const selectStyle = {
    ...inputStyle,
    appearance: "none",
    cursor: "pointer",
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23ff6a00' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    paddingRight: 36,
  };

  const btnPrimary = {
    padding: "12px 28px",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg, #ff6a00, #ff4500)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 4px 20px rgba(255,80,0,0.35)",
    transition: "all 0.2s",
  };

  const label = {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#ff6a00",
    marginBottom: 6,
    display: "block",
  };

  // ─── API KEY SETUP SCREEN ──────────────────────────────
  if (!keyConfirmed) {
    return (
      <div style={{ padding: "40px 24px", maxWidth: 560, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🤖</div>
            <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 800, margin: "0 0 8px" }}>
              AI Workout Coach
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              Powered by Google Gemini AI — generates personalized workout plans based on your goals, equipment, and fitness level.
            </p>
          </div>

          <div style={card}>
            <div style={label}>Setup — Gemini API Key</div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, lineHeight: 1.6, margin: "0 0 14px" }}>
              To use the AI coach, you need a free Gemini API key. Get one instantly from{" "}
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer"
                style={{ color: "#ff6a00", textDecoration: "underline" }}>
                Google AI Studio
              </a>{" "}
              — it's completely free and takes 30 seconds.
            </p>
            <input
              type="password"
              placeholder="Paste your Gemini API key here..."
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              onKeyDown={e => e.key === "Enter" && saveApiKey()}
              style={{ ...inputStyle, marginBottom: 12 }}
            />
            {error && <p style={{ color: "#EF4444", fontSize: 12, margin: "0 0 10px" }}>⚠ {error}</p>}
            <button onClick={saveApiKey} style={btnPrimary}>
              🔑 Save & Continue
            </button>
          </div>

          {/* Steps guide */}
          <div style={{ ...card, padding: "16px 20px" }}>
            <div style={label}>Quick Setup (30 seconds)</div>
            {[
              "Go to aistudio.google.com/app/apikey",
              "Click \"Create API key\"",
              "Copy the key and paste it above",
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "8px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: "rgba(255,106,0,0.15)", color: "#ff6a00",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 800, flexShrink: 0,
                }}>{i + 1}</div>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>{step}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── MAIN UI ────────────────────────────────────────────
  return (
    <div style={{ padding: "24px", maxWidth: 900, margin: "0 auto" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: "0 0 4px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 28 }}>🤖</span> AI Workout Coach
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, margin: 0 }}>
              Generate personalized plans powered by Google Gemini
            </p>
          </div>
          <button
            onClick={() => { localStorage.removeItem("gemini_api_key"); setKeyConfirmed(false); setApiKey(""); }}
            style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(255,106,0,0.2)", background: "transparent", color: "#ff6a00", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}
          >
            🔑 Change Key
          </button>
        </div>

        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {/* ── LEFT: Form / Plan ─────────────── */}
          <div style={{ flex: "1 1 400px", minWidth: 320 }}>
            <AnimatePresence mode="wait">
              {!generatedPlan ? (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div style={card}>
                    <div style={label}>Your Preferences</div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
                      <div>
                        <div style={{ ...label, fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Goal</div>
                        <select value={formData.goal} onChange={e => setFormData({ ...formData, goal: e.target.value })} style={selectStyle}>
                          {goals.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                      </div>
                      <div>
                        <div style={{ ...label, fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Days/Week</div>
                        <select value={formData.daysPerWeek} onChange={e => setFormData({ ...formData, daysPerWeek: e.target.value })} style={selectStyle}>
                          {["2", "3", "4", "5", "6"].map(d => <option key={d} value={d}>{d} days</option>)}
                        </select>
                      </div>
                      <div>
                        <div style={{ ...label, fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Session Duration</div>
                        <select value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} style={selectStyle}>
                          {["30", "45", "60", "75", "90"].map(d => <option key={d} value={d}>{d} min</option>)}
                        </select>
                      </div>
                      <div>
                        <div style={{ ...label, fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Equipment</div>
                        <select value={formData.equipment} onChange={e => setFormData({ ...formData, equipment: e.target.value })} style={selectStyle}>
                          {equipmentOptions.map(e => <option key={e} value={e}>{e}</option>)}
                        </select>
                      </div>
                      <div>
                        <div style={{ ...label, fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Fitness Level</div>
                        <select value={formData.level} onChange={e => setFormData({ ...formData, level: e.target.value })} style={selectStyle}>
                          {levels.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                      </div>
                      <div>
                        <div style={{ ...label, fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Focus Area</div>
                        <select value={formData.focus} onChange={e => setFormData({ ...formData, focus: e.target.value })} style={selectStyle}>
                          {focusAreas.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                      </div>
                    </div>

                    <div style={{ marginTop: 12 }}>
                      <div style={{ ...label, fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Injuries / Limitations (optional)</div>
                      <input
                        placeholder="e.g., Lower back pain, bad knees..."
                        value={formData.injuries}
                        onChange={e => setFormData({ ...formData, injuries: e.target.value })}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  {error && (
                    <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, padding: "10px 16px", marginBottom: 16 }}>
                      <p style={{ color: "#EF4444", fontSize: 13, margin: 0 }}>⚠ {error}</p>
                    </div>
                  )}

                  <button onClick={generatePlan} disabled={loading} style={{ ...btnPrimary, width: "100%", opacity: loading ? 0.7 : 1 }}>
                    {loading ? (
                      <span style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                        <span className="ai-spinner" /> Generating your plan...
                      </span>
                    ) : "⚡ Generate AI Workout Plan"}
                  </button>
                </motion.div>
              ) : (
                <motion.div key="plan" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  {/* Plan Header */}
                  <div style={{ ...card, background: "linear-gradient(135deg, rgba(255,106,0,0.08), rgba(255,69,0,0.04))" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={label}>Your AI-Generated Plan</div>
                        <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: "4px 0 8px" }}>
                          {generatedPlan.planName}
                        </h3>
                        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                          {generatedPlan.summary}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                      <button onClick={addPlanToTracker} style={{ ...btnPrimary, fontSize: 12, padding: "8px 16px" }}>
                        📋 Add to Tracker
                      </button>
                      <button onClick={() => { setGeneratedPlan(null); setChatMessages([]); }} style={{ padding: "8px 16px", borderRadius: 10, border: "1px solid rgba(255,106,0,0.2)", background: "transparent", color: "#ff6a00", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
                        🔄 New Plan
                      </button>
                    </div>
                  </div>

                  {/* Weekly Schedule */}
                  {generatedPlan.weeklySchedule.map((day, di) => (
                    <motion.div
                      key={di}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: di * 0.08 }}
                      style={card}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <div>
                          <div style={{ color: "#ff6a00", fontSize: 13, fontWeight: 800 }}>{day.day}</div>
                          <div style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginTop: 2 }}>{day.focus}</div>
                        </div>
                        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>
                          {day.exercises.length} exercises
                        </div>
                      </div>

                      {day.warmup && (
                        <div style={{ padding: "6px 10px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: 8, marginBottom: 10 }}>
                          <span style={{ color: "#22c55e", fontSize: 11, fontWeight: 700 }}>🔥 WARMUP: </span>
                          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{day.warmup}</span>
                        </div>
                      )}

                      {day.exercises.map((ex, ei) => (
                        <div key={ei} style={{
                          display: "flex", justifyContent: "space-between", alignItems: "center",
                          padding: "10px 0",
                          borderBottom: ei < day.exercises.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                        }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ color: "#f8fafc", fontSize: 13, fontWeight: 600 }}>{ex.name}</div>
                            {ex.notes && <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginTop: 2 }}>{ex.notes}</div>}
                          </div>
                          <div style={{ display: "flex", gap: 14, alignItems: "center", flexShrink: 0 }}>
                            <div style={{ textAlign: "center" }}>
                              <div style={{ color: "#ff6a00", fontSize: 14, fontWeight: 800 }}>{ex.sets}</div>
                              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 9, textTransform: "uppercase" }}>sets</div>
                            </div>
                            <div style={{ textAlign: "center" }}>
                              <div style={{ color: "#f8fafc", fontSize: 14, fontWeight: 800 }}>{ex.reps}</div>
                              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 9, textTransform: "uppercase" }}>reps</div>
                            </div>
                            <div style={{ textAlign: "center" }}>
                              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600 }}>{ex.rest}</div>
                              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 9, textTransform: "uppercase" }}>rest</div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {day.cooldown && (
                        <div style={{ padding: "6px 10px", background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: 8, marginTop: 10 }}>
                          <span style={{ color: "#3b82f6", fontSize: 11, fontWeight: 700 }}>❄️ COOLDOWN: </span>
                          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{day.cooldown}</span>
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {/* Tips */}
                  {generatedPlan.tips?.length > 0 && (
                    <div style={{ ...card, background: "rgba(168,85,247,0.05)", borderColor: "rgba(168,85,247,0.15)" }}>
                      <div style={{ ...label, color: "#a855f7" }}>💡 Pro Tips</div>
                      {generatedPlan.tips.map((tip, i) => (
                        <div key={i} style={{ display: "flex", gap: 8, padding: "6px 0", color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.5 }}>
                          <span style={{ color: "#a855f7", flexShrink: 0 }}>•</span> {tip}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── RIGHT: Chat ───────────────── */}
          <div style={{ flex: "0 0 320px", minWidth: 280 }}>
            <div style={{
              ...card,
              display: "flex",
              flexDirection: "column",
              height: generatedPlan ? 520 : 360,
              padding: 0,
              overflow: "hidden",
            }}>
              {/* Chat header */}
              <div style={{
                padding: "14px 18px",
                borderBottom: "1px solid rgba(255,106,0,0.1)",
                background: "rgba(255,106,0,0.03)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: "linear-gradient(135deg, #ff6a00, #ff4500)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16,
                  }}>🤖</div>
                  <div>
                    <div style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>AI Fitness Coach</div>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10 }}>
                      {chatLoading ? "Typing..." : "Online • Ask me anything"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat messages */}
              <div style={{
                flex: 1,
                overflowY: "auto",
                padding: "14px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}>
                {chatMessages.length === 0 && (
                  <div style={{ textAlign: "center", padding: "30px 10px" }}>
                    <div style={{ fontSize: 36, marginBottom: 8 }}>💬</div>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, lineHeight: 1.6 }}>
                      {generatedPlan
                        ? "Ask me to modify your plan, explain exercises, or get fitness advice!"
                        : "Generate a plan first, or ask me any fitness question!"}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
                      {["How many calories will this burn?", "Can you make it harder?", "I have knee pain, alternatives?"].map((q, i) => (
                        <button
                          key={i}
                          onClick={() => { setChatInput(q); }}
                          style={{
                            padding: "8px 12px", borderRadius: 8,
                            border: "1px solid rgba(255,106,0,0.12)",
                            background: "rgba(255,106,0,0.04)",
                            color: "rgba(255,255,255,0.55)",
                            fontSize: 11, cursor: "pointer",
                            fontFamily: "inherit",
                            textAlign: "left",
                            transition: "all 0.15s",
                          }}
                          onMouseEnter={e => { e.target.style.borderColor = "rgba(255,106,0,0.3)"; e.target.style.color = "#ff6a00"; }}
                          onMouseLeave={e => { e.target.style.borderColor = "rgba(255,106,0,0.12)"; e.target.style.color = "rgba(255,255,255,0.55)"; }}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                      maxWidth: "85%",
                      padding: "10px 14px",
                      borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                      background: msg.role === "user"
                        ? "linear-gradient(135deg, #ff6a00, #ff4500)"
                        : "rgba(255,255,255,0.06)",
                      color: msg.role === "user" ? "#fff" : "rgba(255,255,255,0.8)",
                      fontSize: 13,
                      lineHeight: 1.5,
                    }}
                  >
                    {msg.text}
                  </motion.div>
                ))}

                {chatLoading && (
                  <div style={{ alignSelf: "flex-start", padding: "10px 14px", borderRadius: "14px 14px 14px 4px", background: "rgba(255,255,255,0.06)" }}>
                    <div className="ai-typing">
                      <span /><span /><span />
                    </div>
                  </div>
                )}
              </div>

              {/* Chat input */}
              <div style={{
                padding: "10px 14px",
                borderTop: "1px solid rgba(255,106,0,0.1)",
                display: "flex",
                gap: 8,
              }}>
                <input
                  placeholder="Ask your AI coach..."
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendChat()}
                  style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
                />
                <button
                  onClick={sendChat}
                  disabled={chatLoading || !chatInput.trim()}
                  style={{
                    width: 38, height: 38, borderRadius: 10,
                    border: "none",
                    background: chatInput.trim() ? "linear-gradient(135deg, #ff6a00, #ff4500)" : "rgba(255,255,255,0.06)",
                    color: "#fff",
                    fontSize: 16,
                    cursor: chatInput.trim() ? "pointer" : "default",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.2s",
                  }}
                >
                  ➤
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
