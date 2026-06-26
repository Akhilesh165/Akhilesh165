import { useState, useRef, useEffect } from "react";
import { DAYS } from "../../data/constants";

export function TrackerTab({ logs, setLogs, plan, setPlan }) {
  const [form, setForm] = useState({ exercise: "", sets: 3, reps: 12, weight: 0, rest: 60 });
  const [restTimer, setRestTimer] = useState(0);
  const [restRunning, setRestRunning] = useState(false);
  const restRef = useRef(null);
  const today = new Date().toDateString();

  useEffect(() => {
    if (restRunning && restTimer > 0) { restRef.current = setInterval(() => setRestTimer(t => t - 1), 1000); }
    else { clearInterval(restRef.current); if (restTimer === 0) setRestRunning(false); }
    return () => clearInterval(restRef.current);
  }, [restRunning, restTimer]);

  const addLog = () => {
    if (!form.exercise) return;
    setLogs(l => [{ ...form, id: Date.now(), date: today }, ...l]);
    setRestTimer(form.rest);
    setRestRunning(true);
    setForm({ ...form, exercise: "" });
  };

  const completePlan = (p) => {
    setLogs(l => [{ exercise: p.name, sets: p.sets, reps: p.reps, weight: 0, id: Date.now(), date: today }, ...l]);
    setPlan(ls => ls.filter(x => x.id !== p.id));
  };

  const inp = { padding: "10px 14px", borderRadius: 10, border: "1.5px solid rgba(148,163,184,0.2)", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit", width: "100%", background: "rgba(15,23,42,0.7)", color: "#f8fafc" };
  const todayLogs = logs.filter(l => l.date === today);

  const getWorkoutImage = (exerciseName = "", mode = "", category = "") => {
    const name = exerciseName.toLowerCase();

    if (name.includes("run") || name.includes("row") || name.includes("stair") || name.includes("elliptical") || name.includes("treadmill")) return "/images/gym-cardio.svg";
    if (name.includes("squat") || name.includes("lunge") || name.includes("leg") || name.includes("glute") || name.includes("calf")) return "/images/gym-legs.svg";
    if (name.includes("press") || name.includes("push") || name.includes("dip") || name.includes("bench") || name.includes("chest")) return "/images/gym-chest.svg";
    if (name.includes("pull") || name.includes("row") || name.includes("deadlift") || name.includes("curl") || name.includes("lat")) return "/images/gym-back.svg";
    if (name.includes("shoulder") || name.includes("raise") || name.includes("delt")) return "/images/gym-shoulders.svg";
    if (name.includes("core") || name.includes("crunch") || name.includes("plank") || name.includes("wheel") || name.includes("bridge")) return "/images/gym-core.svg";
    if (name.includes("yoga") || name.includes("stretch") || name.includes("twist") || name.includes("flow")) return "/images/yoga.svg";

    if (mode === "home") return "/images/home-workout.svg";
    if (mode === "calisthenics") return "/images/calisthenics.svg";
    if (category === "Arms") return "/images/gym-arms.svg";
    if (category === "Shoulders") return "/images/gym-shoulders.svg";
    if (category === "Core") return "/images/gym-core.svg";
    if (category === "Legs" || category === "Glutes") return "/images/gym-legs.svg";
    if (category === "Cardio") return "/images/gym-cardio.svg";
    if (category === "Chest") return "/images/gym-chest.svg";
    if (category === "Back") return "/images/gym-back.svg";

    return "/images/gym-chest.svg";
  };

  const weekActivity = DAYS.map((d, i) => {
    const date = new Date(); date.setDate(date.getDate() - (6 - i));
    return { day: d, count: logs.filter(l => l.date === date.toDateString()).length };
  });
  const maxAct = Math.max(1, ...weekActivity.map(d => d.count));

  return (
    <div style={{ padding: "20px 24px 40px" }}>
      {/* Rest timer */}
      {restTimer > 0 && (
        <div style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.25), rgba(56,189,248,0.22))", color: "#fff", padding: "16px 20px", borderRadius: 16, marginBottom: 24, display: "flex", alignItems: "center", gap: 16, boxShadow: "0 10px 30px rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.12)" }}>
          <div style={{ fontSize: 32 }}>⏱</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 2 }}>Rest timer</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{restTimer}s</div>
          </div>
          <button onClick={() => setRestTimer(0)} style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: "rgba(255,255,255,0.1)", color: "#fff", cursor: "pointer", fontSize: 13 }}>Skip</button>
        </div>
      )}

      {/* Manual Entry */}
      <div style={{ background: "rgba(15,23,42,0.75)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 16, padding: 20, marginBottom: 24, boxShadow: "0 10px 24px rgba(2,6,23,0.16)" }}>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 14, color: "#f8fafc" }}>Log a workout</div>
        <input placeholder="Exercise name..." value={form.exercise} onChange={e => setForm({ ...form, exercise: e.target.value })} style={{ ...inp, marginBottom: 10 }} />
        <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>Sets</div>
            <input type="number" value={form.sets} onChange={e => setForm({ ...form, sets: e.target.value })} style={inp} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>Reps/Sec</div>
            <input type="number" value={form.reps} onChange={e => setForm({ ...form, reps: e.target.value })} style={inp} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>Weight (kg)</div>
            <input type="number" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} style={inp} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>Rest (sec)</div>
            <input type="number" value={form.rest} onChange={e => setForm({ ...form, rest: e.target.value })} style={inp} />
          </div>
        </div>
        <button onClick={addLog} style={{ width: "100%", padding: "12px 0", borderRadius: 10, border: "none", background: "#185FA5", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Save Log</button>
      </div>

      {/* Planned */}
      {plan.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>Planned for today</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {plan.map((p, i) => (
              <div key={i} style={{ background: "rgba(15,23,42,0.7)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 12, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                  <img src={getWorkoutImage(p.name, p.mode, p.cat)} alt={p.name} style={{ width: 46, height: 46, objectFit: "cover", borderRadius: 10, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>{p.sets} sets · {p.reps} reps</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => completePlan(p)} style={{ padding: "6px 12px", borderRadius: 8, border: "none", background: "#1D9E75", color: "#fff", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Done</button>
                  <button onClick={() => setPlan(ls => ls.filter(x => x.id !== p.id))} style={{ padding: "6px 10px", borderRadius: 8, border: "none", background: "#f1f5f9", color: "#64748b", fontSize: 12, cursor: "pointer" }}>✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weekly Activity Heatmap */}
      <div style={{ background: "rgba(15,23,42,0.75)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 16, padding: 20, marginBottom: 24, boxShadow: "0 10px 24px rgba(2,6,23,0.16)" }}>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 16, color: "#f8fafc" }}>Weekly activity</div>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 80 }}>
          {weekActivity.map((d, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%", justifyContent: "flex-end" }}>
              <div style={{ width: "100%", background: d.count > 0 ? "linear-gradient(180deg, #38bdf8, #f97316)" : "rgba(148,163,184,0.2)", borderRadius: 6, height: `${Math.max(15, (d.count / maxAct) * 100)}%`, opacity: d.count > 0 ? 0.85 : 1, transition: "all .3s" }} />
              <div style={{ fontSize: 11, color: "#94a3b8" }}>{d.day}</div>
            </div>
          ))}
        </div>
      </div>

      {/* History */}
      <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12, color: "#f8fafc" }}>Today's History</div>
      {todayLogs.length === 0 ? <div style={{ color: "#94a3b8", fontSize: 13, padding: "10px 0" }}>No workouts logged yet.</div> :
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {todayLogs.map((l, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(15,23,42,0.7)", borderRadius: 10, padding: "12px 16px", border: "1px solid rgba(148,163,184,0.16)", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                <img src={getWorkoutImage(l.exercise)} alt={l.exercise} style={{ width: 46, height: 46, objectFit: "cover", borderRadius: 10, flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 500, fontSize: 14 }}>{l.exercise}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>{l.sets} sets · {l.reps} reps {l.weight > 0 && `· ${l.weight}kg`}</div>
                </div>
              </div>
              <button onClick={() => setLogs(ls => ls.filter(x => x.id !== l.id))} style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #fee2e2", background: "#fff", color: "#e53e3e", fontSize: 11, cursor: "pointer" }}>✕</button>
            </div>
          ))}
        </div>
      }
    </div>
  );
}
