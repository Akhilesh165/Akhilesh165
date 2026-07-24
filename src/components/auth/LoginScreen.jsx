import { useState } from "react";

import axios from "axios";

export function LoginScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", age: "", weight: "", goal: "Lose weight" });
  const [err, setErr] = useState("");

  const handle = async () => {
    if (!form.email || !form.password) { setErr("Fill in email and password."); return; }
    if (mode === "signup" && !form.name) { setErr("Enter your name."); return; }
    
    try {
      if (mode === "signup") {
        const res = await axios.post("/api/auth/register", {
          username: form.email,
          password: form.password
        });
        localStorage.setItem("token", res.data.token);
        onLogin({ ...res.data.user, email: form.email, age: form.age, weight: form.weight, goal: form.goal, name: form.name });
      } else {
        const res = await axios.post("/api/auth/login", {
          // The current form uses email field for username to keep it simple
          username: form.email,
          password: form.password
        });
        localStorage.setItem("token", res.data.token);
        onLogin({ ...res.data.user, email: form.email, age: form.age, weight: form.weight, goal: form.goal, name: form.name });
      }
    } catch (error) {
      setErr(error.response?.data?.message || "An error occurred during authentication.");
    }
  };

  const inp = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 8,
    border: "1.5px solid rgba(255,255,255,0.1)",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    marginBottom: 12,
    background: "rgba(255,255,255,0.05)",
    color: "#f8fafc",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      background: "#0d0d0d",
    }}>
      {/* Left — Hero panel */}
      <div style={{
        flex: 1,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "48px",
        minHeight: "100vh",
      }}>
        {/* Background image — barbell & gym training */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('https://www.shutterstock.com/image-photo/barbell-fitness-training-gym-sports-600nw-2139742761.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          filter: "brightness(0.7) saturate(1.1)",
        }} />

        {/* Dark + red gradient overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(160deg, rgba(150,10,10,0.2) 0%, rgba(0,0,0,0.0) 45%), linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 58%, rgba(0,0,0,0.05) 100%)",
        }} />

        {/* Red edge vignette */}
        <div style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 140px rgba(200,20,20,0.22)",
          pointerEvents: "none",
        }} />

        {/* Top-left logo */}
        <div style={{ position: "absolute", top: 32, left: 40, display: "flex", alignItems: "center", gap: 10, zIndex: 2 }}>
          <div style={{
            width: 36, height: 36,
            background: "#EF4444",
            borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: 18, color: "#fff",
          }}>🏋️</div>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 20, letterSpacing: 0.5 }}>IronPulse</span>
        </div>

        {/* Hero text */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <p style={{ color: "#EF4444", fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>
            — Elevate your performance
          </p>
          <h1 style={{
            color: "#fff",
            fontSize: 44,
            fontWeight: 900,
            lineHeight: 1.05,
            margin: "0 0 16px",
            textTransform: "uppercase",
            letterSpacing: 2,
            textShadow: "0 2px 30px rgba(0,0,0,0.9)",
          }}>
            LIFT HEAVY.<br />
            <span style={{
              background: "linear-gradient(90deg, #EF4444 0%, #ff6b35 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontStyle: "italic",
            }}>LIVE STRONG.</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.7, maxWidth: 380, margin: "0 0 28px" }}>
            Precision tracking for serious strength athletes. Master your lifts and shatter your personal records.
          </p>

          {/* Stats bar */}
          <div style={{ display: "flex", gap: 32 }}>
            {[["500+", "Heavy Lifts"], ["12K+", "Athletes"], ["100%", "Intensity"]].map(([val, label]) => (
              <div key={label}>
                <div style={{ color: "#EF4444", fontSize: 20, fontWeight: 800 }}>{val}</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Form panel */}
      <div style={{
        width: 440,
        background: "linear-gradient(135deg, #111 0%, #1a1a1a 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "48px 40px",
        borderLeft: "1px solid rgba(239, 68, 68, 0.1)",
        overflowY: "auto",
        position: "relative",
      }}>
        {/* Red top glow bar */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "3px",
          background: "linear-gradient(90deg, transparent 0%, #EF4444 40%, #ff6b35 60%, transparent 100%)",
        }} />
        {/* Subtle red corner glow */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "220px",
          background: "radial-gradient(ellipse at 20% 0%, rgba(239,68,68,0.09) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Tab switcher */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 800, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 0.5 }}>
            {mode === "login" ? "Welcome back" : "Create account"}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: 0 }}>
            {mode === "login" ? "Enter the arena to continue" : "Join the IronPulse community"}
          </p>
        </div>

        <div style={{ display: "flex", background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: 4, marginBottom: 28, border: "1px solid rgba(255,255,255,0.08)" }}>
          {["login", "signup"].map(m => (
            <button key={m} onClick={() => { setMode(m); setErr(""); }} style={{
              flex: 1, padding: "9px 0", borderRadius: 8, border: "none",
              background: mode === m ? "#EF4444" : "transparent",
              color: mode === m ? "#fff" : "rgba(255,255,255,0.5)",
              fontWeight: mode === m ? 800 : 500,
              cursor: "pointer", fontSize: 13,
              textTransform: "uppercase", letterSpacing: 0.5,
              transition: "all 0.2s",
            }}>
              {m === "login" ? "Log in" : "Sign up"}
            </button>
          ))}
        </div>

        {/* Form fields */}
        {mode === "signup" && (
          <input
            placeholder="Full name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            style={inp}
          />
        )}
        <input
          placeholder="Email address"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          style={inp}
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          style={inp}
        />

        {mode === "signup" && (
          <>
            <div style={{ display: "flex", gap: 10 }}>
              <input placeholder="Age" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} style={{ ...inp, width: "50%" }} />
              <input placeholder="Weight (kg)" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} style={{ ...inp, width: "50%" }} />
            </div>
            <select
              value={form.goal}
              onChange={e => setForm({ ...form, goal: e.target.value })}
              style={{ ...inp, background: "#1a1a1a", color: "#f8fafc" }}
            >
              {["Lose weight", "Build muscle", "Stay fit", "Improve flexibility", "Athletic performance"].map(g => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </>
        )}

        {err && (
          <p style={{ color: "#EF4444", fontSize: 12, marginBottom: 10, background: "rgba(239,68,68,0.08)", padding: "8px 12px", borderRadius: 6, border: "1px solid rgba(239,68,68,0.2)" }}>
            ⚠ {err}
          </p>
        )}

        {/* Primary CTA */}
        <button
          onClick={handle}
          style={{
            width: "100%",
            padding: "14px 0",
            background: "#EF4444",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontWeight: 800,
            fontSize: 14,
            cursor: "pointer",
            marginBottom: 12,
            textTransform: "uppercase",
            letterSpacing: 1,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => e.target.style.opacity = 0.88}
          onMouseLeave={e => e.target.style.opacity = 1}
        >
          {mode === "login" ? "Log in" : "Create account"}
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0 12px" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>or</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
        </div>

        {/* Guest button */}
        <button
          onClick={() => onLogin({ name: "Guest", email: "", goal: "Stay fit" })}
          style={{
            width: "100%",
            padding: "12px 0",
            background: "transparent",
            border: "1.5px solid rgba(255,255,255,0.12)",
            borderRadius: 10,
            color: "rgba(255,255,255,0.5)",
            fontSize: 13,
            cursor: "pointer",
            fontWeight: 500,
            letterSpacing: 0.3,
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={e => { e.target.style.borderColor = "#EF4444"; e.target.style.color = "#EF4444"; }}
          onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.color = "rgba(255,255,255,0.5)"; }}
        >
          Continue as guest
        </button>

        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, textAlign: "center", marginTop: 28, lineHeight: 1.6 }}>
          By continuing you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
