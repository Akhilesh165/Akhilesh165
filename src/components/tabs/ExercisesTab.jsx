import { useState, useEffect } from "react";
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

  const getExerciseImage = (selectedMode, category) => {
    const imageMap = {
      gym: {
        "Face & Neck": "/images/gym-chest.svg",
        Chest: "/images/gym-chest.svg",
        Back: "/images/gym-back.svg",
        Shoulders: "/images/gym-shoulders.svg",
        Arms: "/images/gym-arms.svg",
        Core: "/images/gym-core.svg",
        Legs: "/images/gym-legs.svg",
        Glutes: "/images/gym-legs.svg",
        Cardio: "/images/gym-cardio.svg",
      },
      calisthenics: {
        default: "/images/calisthenics.svg"
      },
      home: {
        default: "/images/home-workout.svg"
      }
    };

    const modeImages = imageMap[selectedMode] || {};
    return modeImages[category] || modeImages.default || "/images/home-workout.svg";
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

          <div style={{ flex: 1, minWidth: 260 }}>
            {filtered.length === 0
              ? <div style={{ color: "#94a3b8", padding: "24px 0", textAlign: "center" }}>No exercises match your filter.</div>
              : filtered.map((ex, i) => (
                <div key={i} className="exercise-card">
                  <div className="exercise-thumbnail">
                    <img src={getExerciseImage(mode, cat)} alt={ex.name} />
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
                      <button className="action-btn secondary" onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(ex.name + ' exercise tutorial')}`, '_blank')}>▶ Watch</button>
                      <button className="action-btn" onClick={() => addToPlan(ex)}>+ Plan</button>
                      <button className="action-btn primary" onClick={() => logEx(ex)}>Log</button>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}