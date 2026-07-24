import { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { StatCard } from "../common/StatCard";

export function ProgressTab({ user, logs }) {
  const [weightLogs, setWeightLogs] = useLocalStorage("vf_weight", [{ date: new Date().toDateString(), weight: user.weight || 70 }]);
  const [newWeight, setNewWeight] = useState("");

  const addWeight = () => {
    if (!newWeight) return;
    setWeightLogs(w => [...w, { date: new Date().toDateString(), weight: +newWeight }]);
    setNewWeight("");
  };

  const totalWorkouts = logs.length;
  const activeDays = new Set(logs.map(l => l.date)).size;

  return (
    <div style={{ padding: "20px 24px 40px" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: "#f8fafc" }}>Your Progress</h2>

      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <StatCard label="Total Workouts" value={totalWorkouts} unit="sessions" color="#185FA5" bg="#EEF4FF" />
        <StatCard label="Active Days" value={activeDays} unit="days" color="#1D9E75" bg="#E1F5EE" />
      </div>

      <div style={{ background: "rgba(15,23,42,0.75)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 16, padding: 20, marginBottom: 24, boxShadow: "0 10px 24px rgba(2,6,23,0.16)" }}>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 14, color: "#f8fafc" }}>Weight Tracker</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <input placeholder="Enter weight (kg)" type="number" value={newWeight} onChange={e => setNewWeight(e.target.value)} style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "1.5px solid rgba(148,163,184,0.2)", fontSize: 14, outline: "none", background: "rgba(15,23,42,0.7)", color: "#f8fafc" }} />
          <button onClick={addWeight} style={{ padding: "0 20px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #f97316, #38bdf8)", color: "#fff", fontWeight: 600, cursor: "pointer" }}>Log</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[...weightLogs].reverse().map((w, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i === weightLogs.length - 1 ? "none" : "1px solid #f1f5f9" }}>
              <span style={{ color: "#64748b", fontSize: 13 }}>{w.date}</span>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{w.weight} kg</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
