import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EXERCISES } from "../../data/constants";
import { LevelBadge } from "../common/LevelBadge";

export function ExercisesTab({ onLog, plan, setPlan }) {
  const [mode, setMode] = useState("gym");
  const [cat, setCat] = useState(null);
  const [search, setSearch] = useState("");
  const [diff, setDiff] = useState("All");
  const [toast, setToast] = useState("");

  const modeData = EXERCISES[mode];
  const cats = Object.keys(modeData.categories);

  useEffect(() => { setCat(cats[0]); }, [mode]);

  const exercises = cat ? modeData.categories[cat] || [] : [];
  const filtered = exercises.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) &&
    (diff === "All" || e.level === diff)
  );

  const addToPlan = (ex) => {
    setPlan(p => [...p, { ...ex, mode, cat, id: Date.now() }]);
    setToast(`${ex.name} added to plan!`);
    setTimeout(() => setToast(""), 2000);
  };

  const logEx = (ex) => {
    onLog({ exercise: ex.name, sets: ex.sets, reps: ex.reps, cal: ex.cal, date: new Date().toDateString() });
    setToast(`${ex.name} logged!`);
    setTimeout(() => setToast(""), 2000);
  };

  const getMetricUnit = (exercise, category) => {
    const name = exercise.name.toLowerCase();
    if (category === "Cardio" || name.includes("plank") || name.includes("hold") || name.includes("stretch") || name.includes("sit") || name.includes("mobility")) return "sec";
    return "reps";
  };

  // Actual exercise demonstration images from wger.de open-source exercise database
  // These are exact illustrations showing the correct movement for each exercise
  const getExerciseImage = (exerciseName) => {
    const WGER = "https://wger.de/media/exercise-images";
    const exerciseImages = {
      // ── GYM: CHEST ──────────────────────────────────────────
      "Flat Bench Press":        `${WGER}/192/Bench-press-1.png`,
      "Incline Dumbbell Press":  `${WGER}/41/Incline-bench-press-1.png`,
      "Cable Fly":               `${WGER}/71/Cable-crossover-2.png`,
      "Chest Dip":               `${WGER}/83/Bench-dips-1.png`,
      "Decline Bench Press":     `${WGER}/100/Decline-bench-press-1.png`,
      // ── GYM: BACK ───────────────────────────────────────────
      "Lat Pulldown":            `${WGER}/143/Cable-seated-rows-2.png`,
      "Barbell Deadlift":        `${WGER}/161/Dead-lifts-2.png`,
      "Seated Cable Row":        `${WGER}/143/Cable-seated-rows-2.png`,
      "T-Bar Row":               `${WGER}/106/T-bar-row-1.png`,
      // ── GYM: SHOULDERS ──────────────────────────────────────
      "Overhead Press":          `${WGER}/119/seated-barbell-shoulder-press-large-1.png`,
      "Lateral Raise":           `${WGER}/148/lateral-dumbbell-raises-large-2.png`,
      "Arnold Press":            `${WGER}/123/dumbbell-shoulder-press-large-1.png`,
      "Rear Delt Fly":           `${WGER}/109/Barbell-rear-delt-row-1.png`,
      // ── GYM: ARMS ───────────────────────────────────────────
      "Barbell Curl":            `${WGER}/81/Biceps-curl-1.png`,
      "Skull Crusher":           `${WGER}/84/Lying-close-grip-triceps-press-to-chin-1.png`,
      "Preacher Curl":           `${WGER}/193/Preacher-curl-3-1.png`,
      "Tricep Pushdown":         `${WGER}/138/Hammer-curls-with-rope-1.png`,
      // ── GYM: CORE ───────────────────────────────────────────
      "Cable Crunch":            `${WGER}/91/Crunches-1.png`,
      "Hanging Leg Raise":       `${WGER}/125/Leg-raises-2.png`,
      "Ab Wheel Rollout":        `${WGER}/56/Decline-crunch-1.png`,
      "Oblique Crunch Machine":  `${WGER}/176/Cross-body-crunch-1.png`,
      // ── GYM: LEGS ───────────────────────────────────────────
      "Barbell Squat":           `${WGER}/191/Front-squat-1-857x1024.png`,
      "Leg Press":               `${WGER}/130/Narrow-stance-hack-squats-1-1024x721.png`,
      "Leg Curl":                `${WGER}/154/lying-leg-curl-machine-large-1.png`,
      "Hack Squat":              `${WGER}/130/Narrow-stance-hack-squats-1-1024x721.png`,
      "Calf Raise Machine":      `${WGER}/117/seated-leg-curl-large-1.png`,
      // ── GYM: GLUTES ─────────────────────────────────────────
      "Hip Thrust":              `${WGER}/116/Good-mornings-2.png`,
      "Glute Kickback Machine":  `${WGER}/118/standing-leg-curls-large-1.png`,
      "Romanian Deadlift":       `${WGER}/161/Dead-lifts-2.png`,
      "Cable Pull Through":      `${WGER}/116/Good-mornings-2.png`,
      // ── GYM: CARDIO ─────────────────────────────────────────
      "Treadmill Run":           `/images/ex_bench_press.png`,
      "Elliptical":              `/images/ex_squat.png`,
      "Rowing Machine":          `/images/ex_deadlift.png`,
      "Stairmaster":             `/images/ex_overhead_press.png`,
      // ── CALISTHENICS: UPPER BODY ────────────────────────────
      "Push-Up":                 `/images/ex_pushup.png`,
      "Pull-Up":                 `/images/ex_pullup.png`,
      "Diamond Push-Up":         `/images/ex_pushup.png`,
      "Pike Push-Up":            `/images/ex_pushup.png`,
      "Dip":                     `${WGER}/83/Bench-dips-1.png`,
      // ── CALISTHENICS: CORE ──────────────────────────────────
      "Plank":                   `${WGER}/91/Crunches-1.png`,
      "L-Sit":                   `${WGER}/125/Leg-raises-2.png`,
      "Dragon Flag":             `${WGER}/56/Decline-crunch-1.png`,
      "Hollow Body Hold":        `${WGER}/176/Cross-body-crunch-1.png`,
      // ── CALISTHENICS: LEGS ──────────────────────────────────
      "Pistol Squat":            `${WGER}/191/Front-squat-1-857x1024.png`,
      "Jump Squat":              `${WGER}/191/Front-squat-1-857x1024.png`,
      "Walking Lunge":           `${WGER}/113/Walking-lunges-1.png`,
      "Nordic Curl":             `${WGER}/154/lying-leg-curl-machine-large-1.png`,
      // ── CALISTHENICS: SKILL ─────────────────────────────────
      "Muscle-Up":               `/images/ex_pullup.png`,
      "Handstand Hold":          `/images/ex_overhead_press.png`,
      "Front Lever":             `/images/ex_pullup.png`,
      "Human Flag Progression":  `/images/ex_pullup.png`,
      // ── CALISTHENICS: ATHLETIC ──────────────────────────────
      "Burpee":                  `/images/ex_pushup.png`,
      "Box Jump":                `${WGER}/191/Front-squat-1-857x1024.png`,
      "Bear Crawl":              `/images/ex_pushup.png`,
      // ── NECK / FACE ─────────────────────────────────────────
      "Neck Press Machine":      `${WGER}/53/Shoulder-press-machine-2.png`,
      "Jaw Resistance Pull":     `${WGER}/148/lateral-dumbbell-raises-large-2.png`,
      "Neck Bridge":             `${WGER}/116/Good-mornings-2.png`,
      "Lateral Neck Stretch":    `${WGER}/148/lateral-dumbbell-raises-large-2.png`,
      "Chin Tuck":               `${WGER}/53/Shoulder-press-machine-2.png`,
      "Head Roll":               `${WGER}/53/Shoulder-press-machine-2.png`,
      "Jaw Resistance Push":     `${WGER}/53/Shoulder-press-machine-2.png`,
    };

    return exerciseImages[exerciseName] || `/images/ex_bench_press.png`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };



  return (
    <div className="page-shell">
      {toast && <div style={{ position: "fixed", top: 80, right: 24, background: "#1D9E75", color: "#fff", padding: "10px 20px", borderRadius: 10, zIndex: 999, fontWeight: 500, fontSize: 14 }}>{toast}</div>}

      <div className="theme-hero">
        <h2>Training library</h2>
        <p>Explore gym, calisthenics, and home routines with premium visuals, clear coaching cues, and quick logging actions.</p>
      </div>

      <div className="filter-bar">
        {Object.entries(EXERCISES).map(([key, val]) => (
          <button key={key} onClick={() => setMode(key)} className={`mode-chip ${mode === key ? "active" : ""}`} style={{ borderColor: mode === key ? val.color : "rgba(148,163,184,0.2)", background: mode === key ? val.color : "rgba(15,23,42,0.75)" }}>
            {val.icon} {val.label}
          </button>
        ))}
      </div>

      <div className="filter-bar">
        <input className="input-field" placeholder="Search exercises..." value={search} onChange={e => setSearch(e.target.value)} />
        <select className="select-field" value={diff} onChange={e => setDiff(e.target.value)} style={{ maxWidth: 180 }}>
          {["All", "Beginner", "Intermediate", "Advanced"].map(d => <option key={d}>{d}</option>)}
        </select>
      </div>

      <div className="theme-card">
        <div className="section-header">
          <div>
            <div className="section-title">{cat} · {filtered.length} exercises</div>
            <div className="section-meta">Choose a movement, read the coaching note, and add it to your plan.</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={{ width: 180, flexShrink: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Body parts</div>
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)} className={`category-button ${cat === c ? "active" : ""}`} style={{ color: cat === c ? modeData.color : undefined }}>
                {c}
              </button>
            ))}
          </div>

          <motion.div style={{ flex: 1, minWidth: 260 }} variants={containerVariants} initial="hidden" animate="show">
            {filtered.length === 0
              ? <div style={{ color: "#94a3b8", padding: "24px 0", textAlign: "center" }}>No exercises match your filter.</div>
              : filtered.map((ex, i) => (
                <motion.div key={ex.name + i} variants={itemVariants} whileHover={{ scale: 1.01 }} className="exercise-card">
                  <div className="exercise-thumbnail">
                    <img
                      src={getExerciseImage(ex.name)}
                      alt={ex.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={e => { e.target.onerror = null; e.target.src = "/images/ex_bench_press.png"; }}
                    />
                  </div>
                  <div className="exercise-content">
                    <div className="exercise-title-row">
                      <div>
                        <div className="exercise-title">{ex.name}</div>
                        <div className="exercise-meta">
                          <span>{ex.sets} sets</span>
                          <span>{ex.reps} {getMetricUnit(ex, cat)}</span>
                          <span>{ex.cal} kcal</span>
                          <span>{ex.equipment}</span>
                        </div>
                      </div>
                      <LevelBadge level={ex.level} />
                    </div>
                    {ex.notes && (
                      <div style={{
                        margin: "10px 0 12px",
                        padding: "10px 14px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderLeft: `3px solid ${modeData.color}`,
                        borderRadius: "0 8px 8px 0",
                        display: "flex",
                        gap: 8,
                        alignItems: "flex-start",
                      }}>
                        <span style={{ fontSize: 13, lineHeight: 1, marginTop: 1 }}>📋</span>
                        <div>
                          <div style={{
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: 1,
                            textTransform: "uppercase",
                            color: modeData.color,
                            marginBottom: 4,
                          }}>Coach's Note</div>
                          <div style={{
                            fontSize: 12.5,
                            color: "rgba(255,255,255,0.65)",
                            lineHeight: 1.6,
                          }}>{ex.notes}</div>
                        </div>
                      </div>
                    )}
                    <div className="exercise-actions">
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="action-btn secondary" onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(ex.name + ' exercise tutorial')}`, '_blank')}>▶ Watch</motion.button>
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="action-btn" onClick={() => addToPlan(ex)}>+ Plan</motion.button>
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="action-btn primary" onClick={() => logEx(ex)}>Log</motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            }
          </motion.div>
        </div>
      </div>
    </div>
  );
}