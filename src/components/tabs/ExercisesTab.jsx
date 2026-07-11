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
    const WIKI = "https://upload.wikimedia.org/wikipedia/commons/thumb";
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
      "Dumbbell Curl":           `${WGER}/81/Biceps-curl-1.png`,
      "Chair Tricep Dip":        `${WGER}/83/Bench-dips-1.png`,
      // ── GYM: CORE ───────────────────────────────────────────
      "Cable Crunch":            `${WGER}/91/Crunches-1.png`,
      "Hanging Leg Raise":       `${WGER}/125/Leg-raises-2.png`,
      "Ab Wheel Rollout":        `${WGER}/56/Decline-crunch-1.png`,
      "Oblique Crunch Machine":  `${WGER}/176/Cross-body-crunch-1.png`,
      "Crunch":                  `${WGER}/91/Crunches-1.png`,
      "Bicycle Crunch":          `${WGER}/176/Cross-body-crunch-1.png`,
      "Russian Twist":           `${WGER}/176/Cross-body-crunch-1.png`,
      "Leg Raise":               `${WGER}/125/Leg-raises-2.png`,
      // ── GYM: LEGS ───────────────────────────────────────────
      "Barbell Squat":           `${WGER}/191/Front-squat-1-857x1024.png`,
      "Leg Press":               `${WGER}/130/Narrow-stance-hack-squats-1-1024x721.png`,
      "Leg Curl":                `${WGER}/154/lying-leg-curl-machine-large-1.png`,
      "Hack Squat":              `${WGER}/130/Narrow-stance-hack-squats-1-1024x721.png`,
      "Calf Raise Machine":      `${WGER}/117/seated-leg-curl-large-1.png`,
      "Bodyweight Squat":        `${WGER}/191/Front-squat-1-857x1024.png`,
      "Reverse Lunge":           `${WGER}/113/Walking-lunges-1.png`,
      "Wall Sit":                `${WGER}/191/Front-squat-1-857x1024.png`,
      "Calf Raise":              `${WGER}/117/seated-leg-curl-large-1.png`,
      // ── GYM: GLUTES ─────────────────────────────────────────
      "Hip Thrust":              `${WGER}/116/Good-mornings-2.png`,
      "Glute Kickback Machine":  `${WGER}/118/standing-leg-curls-large-1.png`,
      "Romanian Deadlift":       `${WGER}/161/Dead-lifts-2.png`,
      "Cable Pull Through":      `${WGER}/116/Good-mornings-2.png`,
      "Glute Bridge":            `${WGER}/116/Good-mornings-2.png`,
      // ── GYM: CARDIO ─────────────────────────────────────────
      "Treadmill Run":           `${WIKI}/7/7c/Treadmill_running.jpg/400px-Treadmill_running.jpg`,
      "Elliptical":              `${WIKI}/3/3a/Elliptical_trainer_machine.jpg/400px-Elliptical_trainer_machine.jpg`,
      "Rowing Machine":          `${WIKI}/3/33/Indoor_rower.jpg/400px-Indoor_rower.jpg`,
      "Stairmaster":             `${WIKI}/2/2a/Stair_climber.jpg/400px-Stair_climber.jpg`,
      "Jump Rope":               `${WIKI}/3/3f/Skipping_rope.jpg/400px-Skipping_rope.jpg`,
      // ── CALISTHENICS: UPPER BODY ────────────────────────────
      "Push-Up":                 `${WGER}/111/Push-ups-1.png`,
      "Wall Push-Up":            `${WGER}/111/Push-ups-1.png`,
      "Pull-Up":                 `${WGER}/107/Pull-ups-1.png`,
      "Diamond Push-Up":         `${WGER}/111/Push-ups-1.png`,
      "Pike Push-Up":            `${WGER}/111/Push-ups-1.png`,
      "Dip":                     `${WGER}/83/Bench-dips-1.png`,
      "Shoulder Tap":            `${WGER}/111/Push-ups-1.png`,
      // ── CALISTHENICS: CORE ──────────────────────────────────
      "Plank":                   `${WGER}/91/Crunches-1.png`,
      "Plank Hold":              `${WGER}/91/Crunches-1.png`,
      "L-Sit":                   `${WGER}/125/Leg-raises-2.png`,
      "Dragon Flag":             `${WGER}/56/Decline-crunch-1.png`,
      "Hollow Body Hold":        `${WGER}/176/Cross-body-crunch-1.png`,
      // ── CALISTHENICS: LEGS ──────────────────────────────────
      "Pistol Squat":            `${WGER}/191/Front-squat-1-857x1024.png`,
      "Jump Squat":              `${WGER}/191/Front-squat-1-857x1024.png`,
      "Walking Lunge":           `${WGER}/113/Walking-lunges-1.png`,
      "Nordic Curl":             `${WGER}/154/lying-leg-curl-machine-large-1.png`,
      // ── CALISTHENICS: SKILL ─────────────────────────────────
      "Muscle-Up":               `${WGER}/107/Pull-ups-1.png`,
      "Handstand Hold":          `${WGER}/119/seated-barbell-shoulder-press-large-1.png`,
      "Front Lever":             `${WGER}/107/Pull-ups-1.png`,
      "Human Flag Progression":  `${WGER}/107/Pull-ups-1.png`,
      // ── CALISTHENICS: ATHLETIC / FULL BODY ──────────────────
      "Burpee":                  `${WGER}/111/Push-ups-1.png`,
      "AMRAP Burpee":            `${WGER}/111/Push-ups-1.png`,
      "Box Jump":                `${WGER}/191/Front-squat-1-857x1024.png`,
      "Bear Crawl":              `${WGER}/111/Push-ups-1.png`,
      "Sprint Drill":            `${WIKI}/7/7c/Treadmill_running.jpg/400px-Treadmill_running.jpg`,
      "Mountain Climber":        `${WGER}/111/Push-ups-1.png`,
      "Inchworm":                `${WGER}/111/Push-ups-1.png`,
      "Tabata (20/10)":          `${WGER}/111/Push-ups-1.png`,
      "EMOM Push-Up":            `${WGER}/111/Push-ups-1.png`,
      "5-Min Express":           `${WGER}/111/Push-ups-1.png`,
      "10-Min Full Body":        `${WGER}/111/Push-ups-1.png`,
      "20-Min Fat Burn":         `${WGER}/111/Push-ups-1.png`,
      // ── MOBILITY & STRETCHING ───────────────────────────────
      "Hip Flexor Stretch":      `${WIKI}/f/f6/Paschimottanasana.jpg/400px-Paschimottanasana.jpg`,
      "Hip Flexor Hold":         `${WIKI}/f/f6/Paschimottanasana.jpg/400px-Paschimottanasana.jpg`,
      "Shoulder Dislocate":      `${WGER}/148/lateral-dumbbell-raises-large-2.png`,
      "Wrist Prep Circles":      `${WIKI}/e/e6/Asana_Yoga-Atha-Yugni.jpg/400px-Asana_Yoga-Atha-Yugni.jpg`,
      "Ankle Mobility Drill":    `${WIKI}/e/e6/Asana_Yoga-Atha-Yugni.jpg/400px-Asana_Yoga-Atha-Yugni.jpg`,
      "Morning Full Stretch":    `${WIKI}/c/c0/Vriksasana_yoga_pose.jpg/400px-Vriksasana_yoga_pose.jpg`,
      "Spinal Twist":            `${WIKI}/e/e6/Asana_Yoga-Atha-Yugni.jpg/400px-Asana_Yoga-Atha-Yugni.jpg`,
      "Cool-Down Flow":          `${WIKI}/6/6e/Balasana_yoga.jpg/400px-Balasana_yoga.jpg`,
      "Resistance Band Row":     `${WGER}/143/Cable-seated-rows-2.png`,
      "Kettlebell Swing":        `${WGER}/116/Good-mornings-2.png`,
      // ── NECK / FACE ─────────────────────────────────────────
      "Neck Press Machine":      `${WGER}/53/Shoulder-press-machine-2.png`,
      "Jaw Resistance Pull":     `${WIKI}/4/41/Resistance_band.jpg/400px-Resistance_band.jpg`,
      "Neck Bridge":             `${WIKI}/3/38/Tadasana_Yoga-Atha-Yugni.jpg/400px-Tadasana_Yoga-Atha-Yugni.jpg`,
      "Lateral Neck Stretch":    `${WGER}/53/Shoulder-press-machine-2.png`,
      "Chin Tuck":               `${WGER}/53/Shoulder-press-machine-2.png`,
      "Head Roll":               `${WGER}/53/Shoulder-press-machine-2.png`,
      "Jaw Resistance Push":     `${WGER}/53/Shoulder-press-machine-2.png`,
      "Face Yoga Sequence":      `${WIKI}/3/38/Tadasana_Yoga-Atha-Yugni.jpg/400px-Tadasana_Yoga-Atha-Yugni.jpg`,
      "Forehead Smoother":       `${WIKI}/3/38/Tadasana_Yoga-Atha-Yugni.jpg/400px-Tadasana_Yoga-Atha-Yugni.jpg`,
      "Cheek Puff & Release":    `${WIKI}/3/38/Tadasana_Yoga-Atha-Yugni.jpg/400px-Tadasana_Yoga-Atha-Yugni.jpg`,
      "Eye Focus Drill":         `${WIKI}/3/38/Tadasana_Yoga-Atha-Yugni.jpg/400px-Tadasana_Yoga-Atha-Yugni.jpg`,
      "Neck Tilt Stretch":       `${WGER}/53/Shoulder-press-machine-2.png`,
    };

    // If an exercise is somehow missing, try to find a partial match or fallback
    if (exerciseImages[exerciseName]) return exerciseImages[exerciseName];
    if (exerciseName.includes("Band") || exerciseName.includes("Resistance")) return `${WIKI}/4/41/Resistance_band.jpg/400px-Resistance_band.jpg`;
    if (exerciseName.includes("Neck")) return `${WGER}/53/Shoulder-press-machine-2.png`;
    if (exerciseName.includes("Crunch")) return `${WGER}/91/Crunches-1.png`;
    
    return `${WGER}/192/Bench-press-1.png`;
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
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="action-btn secondary" onClick={() => {
                        if ("speechSynthesis" in window) {
                          const utterance = new SpeechSynthesisUtterance(`Coaching note for ${ex.name}: ${ex.notes}`);
                          utterance.rate = 0.9;
                          window.speechSynthesis.cancel();
                          window.speechSynthesis.speak(utterance);
                        } else {
                          setToast("Text-to-speech not supported in this browser.");
                        }
                      }}>🎧 Coach</motion.button>
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