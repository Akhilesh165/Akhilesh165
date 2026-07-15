import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
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

  const getYogaImage = (styleName, poseName) => {
    // Yoga pose images — using open CDN sources per pose name
    const poseImages = {
      // Hatha poses
      "Mountain Pose":       "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80",
      "Downward Dog":        "https://images.unsplash.com/photo-1599901541100-246e7f2fdf9f?auto=format&fit=crop&w=400&q=80",
      "Warrior I":           "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=400&q=80",
      "Warrior II":          "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=400&q=80",
      "Tree Pose":           "https://images.unsplash.com/photo-1552286450-32b03fb52eb7?auto=format&fit=crop&w=400&q=80",
      "Child's Pose":        "https://images.unsplash.com/photo-1506126613657-264f57b28f8d?auto=format&fit=crop&w=400&q=80",
      "Triangle Pose":       "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80",
      "Seated Forward Bend": "https://images.unsplash.com/photo-1599901541100-246e7f2fdf9f?auto=format&fit=crop&w=400&q=80",
      // Vinyasa poses
      "Sun Salutation":      "https://images.unsplash.com/photo-1531259539304-8b010cc950a7?auto=format&fit=crop&w=400&q=80",
      "Chaturanga":          "https://images.unsplash.com/photo-1599901541100-246e7f2fdf9f?auto=format&fit=crop&w=400&q=80",
      "Upward Dog":          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80",
      "Pigeon Pose":         "https://images.unsplash.com/photo-1552286450-32b03fb52eb7?auto=format&fit=crop&w=400&q=80",
      "Crow Pose":           "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=400&q=80",
      // Ashtanga poses
      "Half Moon":           "https://images.unsplash.com/photo-1552286450-32b03fb52eb7?auto=format&fit=crop&w=400&q=80",
      "Boat Pose":           "https://images.unsplash.com/photo-1506126613657-264f57b28f8d?auto=format&fit=crop&w=400&q=80",
      "Headstand":           "https://images.unsplash.com/photo-1531259539304-8b010cc950a7?auto=format&fit=crop&w=400&q=80",
      "Lotus Pose":          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80",
      // Yin / Restorative
      "Butterfly Pose":      "https://images.unsplash.com/photo-1552286450-32b03fb52eb7?auto=format&fit=crop&w=400&q=80",
      "Dragon Pose":         "https://images.unsplash.com/photo-1506126613657-264f57b28f8d?auto=format&fit=crop&w=400&q=80",
      "Sleeping Swan":       "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=400&q=80",
      "Supine Twist":        "https://images.unsplash.com/photo-1599901541100-246e7f2fdf9f?auto=format&fit=crop&w=400&q=80",
      "Savasana":            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80",
      "Legs Up The Wall":    "https://images.unsplash.com/photo-1506126613657-264f57b28f8d?auto=format&fit=crop&w=400&q=80",
    };
    return poseImages[poseName] || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
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

      <motion.div style={{ display: "flex", flexDirection: "column", gap: 0 }} variants={containerVariants} initial="hidden" animate="show">
        {styleData.poses.map((pose, i) => (
          <motion.div key={pose.name + i} variants={itemVariants} whileHover={{ background: "rgba(255,255,255,0.02)" }} style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 16, padding: "16px 8px", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "transparent", transition: "all 0.2s ease" }}>
            <div style={{ width: 80, height: 80, background: "rgba(255,255,255,0.03)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
              <img src={getYogaImage(style, pose.name)} alt={pose.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={e => { e.target.onerror = null; e.target.src = "/images/ex_squat.png"; }} />
            </div>
            
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#f8fafc", letterSpacing: "-0.02em" }}>{pose.name}</div>
                <LevelBadge level={pose.level} />
              </div>
              <div style={{ fontSize: 13, color: "#cbd5e1", marginBottom: 8 }}>{pose.benefit}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: styleData.color, fontWeight: 500 }}>⏱ {pose.duration}s</span>
                <div style={{ display: "flex", gap: 6 }}>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => {
                    if ("speechSynthesis" in window) {
                      const utterance = new SpeechSynthesisUtterance(`${pose.name}. ${pose.benefit}. Hold for ${pose.duration} seconds.`);
                      utterance.rate = 0.9;
                      window.speechSynthesis.cancel();
                      window.speechSynthesis.speak(utterance);
                    } else {
                      setToast("Text-to-speech not supported in this browser.");
                    }
                  }} style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid rgba(148,163,184,0.2)", background: "rgba(15,23,42,0.7)", color: "#cbd5e1", fontSize: 12, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>🎧 Coach</motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(pose.name + ' yoga pose tutorial')}`, '_blank')} style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid rgba(148,163,184,0.2)", background: "rgba(15,23,42,0.7)", color: "#cbd5e1", fontSize: 12, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>▶️ Watch</motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => startPose(pose)} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: styleData.color, color: "#fff", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Start</motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
