import { useState, useRef, useEffect } from "react";
import { YOGA_DATA } from "../../data/constants";
import { LevelBadge } from "../common/LevelBadge";

export function YogaTab({ onLog }) {
  const [style, setStyle] = useState("Hatha");
  const [active, setActive] = useState(null);
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);
  const [toast, setToast] = useState("");
  const ref = useRef(null);

  const styleData = YOGA_DATA[style];

  const getYogaImage = (styleName) => {
    return "/images/yoga.svg";
  };

  useEffect(() => {
    if (running && timer > 0) { ref.current = setInterval(() => setTimer(t => t - 1), 1000); }
    else { clearInterval(ref.current); if (timer === 0 && running) { setRunning(false); setToast("Pose complete! 🧘"); setTimeout(() => setToast(""), 2000); } }
    return () => clearInterval(ref.current);
  }, [running, timer]);

  const startPose = (pose) => {
    setActive(pose);
    setTimer(pose.duration);
    setRunning(true);
    onLog({ exercise: pose.name + " (Yoga)", sets: 1, reps: pose.duration, cal: Math.round(pose.duration / 10), date: new Date().toDateString() });
  };

  return (
    <div style={{ padding: "20px 24px 40px" }}>
      {toast && <div style={{ position: "fixed", top: 80, right: 24, background: "#1D9E75", color: "#fff", padding: "10px 20px", borderRadius: 10, zIndex: 999, fontWeight: 500, fontSize: 14 }}>{toast}</div>}

      {/* Active timer */}
      {active && (
        <div style={{ background: "rgba(15,23,42,0.8)", border: `2px solid ${styleData.color}`, borderRadius: 16, padding: "20px 24px", marginBottom: 24, display: "flex", alignItems: "center", gap: 20, boxShadow: "0 10px 24px rgba(2,6,23,0.18)" }}>
          <div style={{ textAlign: "center", minWidth: 80 }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: styleData.color }}>{timer}s</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>remaining</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#f8fafc" }}>{active.name}</div>
            <div style={{ fontSize: 13, color: "#cbd5e1" }}>{active.benefit}</div>
            <div style={{ marginTop: 8, height: 6, background: "rgba(148,163,184,0.2)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", background: styleData.color, width: `${(timer / active.duration) * 100}%`, transition: "width 1s linear", borderRadius: 3 }} />
            </div>
          </div>
          <button onClick={() => { setRunning(!running); }} style={{ padding: "8px 16px", borderRadius: 10, border: `2px solid ${styleData.color}`, background: running ? styleData.color : "#fff", color: running ? "#fff" : styleData.color, fontWeight: 600, cursor: "pointer", fontSize: 13 }}>
            {running ? "Pause" : "Resume"}
          </button>
        </div>
      )}

      {/* Style tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {Object.entries(YOGA_DATA).map(([s, d]) => (
          <button key={s} onClick={() => setStyle(s)} style={{ flex: 1, padding: "10px 8px", borderRadius: 10, border: `2px solid ${style === s ? d.color : "rgba(148,163,184,0.2)"}`, background: style === s ? d.color : "rgba(15,23,42,0.75)", color: style === s ? "#fff" : "#cbd5e1", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
            {s}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14 }}>
        {styleData.poses.map((pose, i) => (
          <div key={i} style={{ background: "rgba(15,23,42,0.75)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 14, padding: "16px", boxShadow: "0 10px 24px rgba(2,6,23,0.16)" }}>
            <img src={getYogaImage(style)} alt={pose.name} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 12, marginBottom: 12 }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{pose.name}</div>
              <LevelBadge level={pose.level} />
            </div>
            <div style={{ fontSize: 13, color: "#cbd5e1", marginBottom: 12 }}>{pose.benefit}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: styleData.color, fontWeight: 500 }}>⏱ {pose.duration}s</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(pose.name + ' yoga pose tutorial')}`, '_blank')} style={{ padding: "7px 12px", borderRadius: 8, border: "1px solid rgba(148,163,184,0.2)", background: "rgba(15,23,42,0.7)", color: "#cbd5e1", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>▶️ Watch</button>
                <button onClick={() => startPose(pose)} style={{ padding: "7px 16px", borderRadius: 8, border: "none", background: styleData.color, color: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Start</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
