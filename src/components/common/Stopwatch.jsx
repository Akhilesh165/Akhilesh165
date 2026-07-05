import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="theme-card" style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Workout / Rest Timer</div>
        <div style={{ fontSize: 32, fontWeight: 800, color: "#ff6a00", fontVariantNumeric: "tabular-nums" }}>
          {formatTime(time)}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setRunning(!running)}
          style={{
            padding: "8px 16px",
            borderRadius: 12,
            border: "none",
            background: running ? "rgba(255,106,0,0.15)" : "#ff6a00",
            color: running ? "#ff6a00" : "#fff",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          {running ? "Pause" : "Start"}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setRunning(false); setTime(0); }}
          style={{
            padding: "8px 16px",
            borderRadius: 12,
            border: "1px solid rgba(255,106,0,0.2)",
            background: "transparent",
            color: "#c9a98a",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          Reset
        </motion.button>
      </div>
    </div>
  );
}
