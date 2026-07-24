import { useState } from "react";
import { motion } from "framer-motion";
import { EXERCISES } from "../../data/constants";
import { LevelBadge } from "../common/LevelBadge";

export function ExercisesTab({ onLog, setPlan }) {
  const [mode, setMode] = useState("gym");
  const [cat, setCat] = useState(Object.keys(EXERCISES.gym.categories)[0]);
  const [search, setSearch] = useState("");
  const [diff, setDiff] = useState("All");
  const [toast, setToast] = useState("");

  const modeData = EXERCISES[mode];
  const cats = Object.keys(modeData.categories);

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
  const getExerciseImage = (exerciseName) => {
    const WGER = "https://wger.de/media/exercise-images";
    const WIKI = "https://upload.wikimedia.org/wikipedia/commons/thumb";
    
    // The animated GIF dataset mapping
    const gifMap = {
      "Chest Dip": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/pectorals/assisted-chest-dip-kneeling.gif",
      "Decline Bench Press": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/pectorals/barbell-decline-bench-press.gif",
      "Lat Pulldown": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/lats/cable-lat-pulldown-full-range-of-motion.gif",
      "Barbell Deadlift": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/glutes/barbell-deadlift.gif",
      "T-Bar Row": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/upper-back/lever-reverse-t-bar-row.gif",
      "Overhead Press": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/delts/band-twisting-overhead-press.gif",
      "Lateral Raise": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/delts/band-front-lateral-raise.gif",
      "Arnold Press": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/delts/dumbbell-arnold-press-v-2.gif",
      "Barbell Curl": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/biceps/barbell-curl.gif",
      "Skull Crusher": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/triceps/barbell-lying-triceps-extension-skull-crusher.gif",
      "Preacher Curl": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/biceps/barbell-lying-preacher-curl.gif",
      "Tricep Pushdown": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/triceps/cable-one-arm-tricep-pushdown.gif",
      "Cable Crunch": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/cardio/run.gif",
      "Hanging Leg Raise": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/hanging-leg-raise.gif",
      "Oblique Crunch Machine": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/cardio/run.gif",
      "Barbell Squat": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/quads/barbell-squat-jump-step-rear-lunge.gif",
      "Leg Press": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/calves/lever-seated-squat-calf-raise-on-leg-press-machine.gif",
      "Leg Curl": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/hamstrings/cable-assisted-inverse-leg-curl.gif",
      "Hack Squat": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/glutes/barbell-hack-squat.gif",
      "Hip Thrust": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/glutes/resistance-band-hip-thrusts-on-knees-female.gif",
      "Romanian Deadlift": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/glutes/barbell-romanian-deadlift.gif",
      "Cable Pull Through": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/glutes/cable-pull-through-with-rope.gif",
      "Treadmill Run": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/cardio/run.gif",
      "Elliptical": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/cardio/walk-elliptical-cross-trainer.gif",
      "Push-Up": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/push-up-to-side-plank.gif",
      "Pull-Up": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/biceps/biceps-narrow-pull-ups.gif",
      "Diamond Push-Up": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/pectorals/push-up.gif",
      "Pike Push-Up": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/pectorals/exercise-ball-pike-push-up.gif",
      "Dip": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/lats/weighted-close-grip-chin-up-on-dip-cage.gif",
      "Plank": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/bodyweight-incline-side-plank.gif",
      "L-Sit": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/arms-overhead-full-sit-up-male.gif",
      "Dragon Flag": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/flag.gif",
      "Pistol Squat": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/glutes/kettlebell-pistol-squat.gif",
      "Jump Squat": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/glutes/barbell-jump-squat.gif",
      "Walking Lunge": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/glutes/walking-lunge.gif",
      "Muscle-Up": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/lats/kipping-muscle-up.gif",
      "Handstand Hold": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/triceps/handstand.gif",
      "Front Lever": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/front-lever.gif",
      "Human Flag Progression": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/flag.gif",
      "Burpee": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/cardio/burpee.gif",
      "Box Jump": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/calves/box-jump-down-with-one-leg-stabilization.gif",
      "Bear Crawl": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/cardio/bear-crawl.gif",
      "Hip Flexor Stretch": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/glutes/exercise-ball-hip-flexor-stretch.gif",
      "EMOM Push-Up": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/pectorals/push-up.gif",
      "AMRAP Burpee": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/cardio/burpee.gif",
      "Wall Push-Up": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/pectorals/push-up.gif",
      "Shoulder Tap": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/shoulder-tap.gif",
      "Crunch": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/band-bicycle-crunch.gif",
      "Bicycle Crunch": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/band-bicycle-crunch.gif",
      "Russian Twist": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/assisted-motion-russian-twist.gif",
      "Leg Raise": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/assisted-lying-leg-raise-with-lateral-throw-down.gif",
      "Bodyweight Squat": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/upper-back/bodyweight-squatting-row-with-towel.gif",
      "Glute Bridge": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/glutes/barbell-glute-bridge-two-legs-on-bench-male.gif",
      "Calf Raise": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/calves/band-single-leg-calf-raise.gif",
      "Mountain Climber": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/bridge-mountain-climber-cross-body.gif",
      "Inchworm": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/inchworm-v-2.gif",
      "Kettlebell Swing": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/glutes/kettlebell-swing.gif",
      "Jump Rope": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/cardio/jump-rope.gif",
      // Add a few explicit fallbacks for known missing
      "Flat Bench Press": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/pectorals/barbell-bench-press.gif",
      "Incline Dumbbell Press": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/pectorals/dumbbell-incline-bench-press.gif",
      "Seated Cable Row": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/upper-back/cable-seated-row.gif",
      "Dumbbell Curl": "https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/biceps/dumbbell-curl.gif",
    };

    if (gifMap[exerciseName]) return gifMap[exerciseName];

    // Original Fallbacks for the ones missing from the dataset (like neck, face)
    const exerciseImages = {
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
          <button key={key} onClick={() => { setMode(key); setCat(Object.keys(EXERCISES[key].categories)[0]); }} className={`mode-chip ${mode === key ? "active" : ""}`} style={{ borderColor: mode === key ? val.color : "rgba(148,163,184,0.2)", background: mode === key ? val.color : "rgba(15,23,42,0.75)" }}>
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