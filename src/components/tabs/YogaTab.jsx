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
      "Mountain Pose":       "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Tadasana_Yoga-Atha-Yugni.jpg/400px-Tadasana_Yoga-Atha-Yugni.jpg",
      "Downward Dog":        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Asana_Yoga-Atha-Yugni.jpg/400px-Asana_Yoga-Atha-Yugni.jpg",
      "Warrior I":           "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Virabhadrasana_I.jpg/400px-Virabhadrasana_I.jpg",
      "Warrior II":          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Virabhadrasana_II.jpg/400px-Virabhadrasana_II.jpg",
      "Tree Pose":           "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Vriksasana_yoga_pose.jpg/400px-Vriksasana_yoga_pose.jpg",
      "Child's Pose":        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Balasana_yoga.jpg/400px-Balasana_yoga.jpg",
      "Triangle Pose":       "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Utthita_Trikonasana_Yoga-Atha-Yugni.jpg/400px-Utthita_Trikonasana_Yoga-Atha-Yugni.jpg",
      "Seated Forward Bend": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Paschimottanasana.jpg/400px-Paschimottanasana.jpg",
      // Vinyasa poses
      "Sun Salutation":      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Surya_Namaskar.jpg/400px-Surya_Namaskar.jpg",
      "Chaturanga":          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Chaturanga-Dandasana_low_pushup_yoga_pose.jpg/400px-Chaturanga-Dandasana_low_pushup_yoga_pose.jpg",
      "Upward Dog":          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Urdhvamukhasvanasana_yoga_pose.jpg/400px-Urdhvamukhasvanasana_yoga_pose.jpg",
      "Pigeon Pose":         "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Kapotasana_yoga_pose.jpg/400px-Kapotasana_yoga_pose.jpg",
      "Crow Pose":           "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Bakasana_yoga_pose.jpg/400px-Bakasana_yoga_pose.jpg",
      // Ashtanga poses
      "Half Moon":           "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Ardha_Chandrasana_yoga_pose.jpg/400px-Ardha_Chandrasana_yoga_pose.jpg",
      "Boat Pose":           "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Naukasana_yoga_boat_pose.jpg/400px-Naukasana_yoga_boat_pose.jpg",
      "Headstand":           "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Shirshasana_yoga_pose.jpg/400px-Shirshasana_yoga_pose.jpg",
      "Lotus Pose":          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Padmasana_Lotus_Yoga-Atha-Yugni.jpg/400px-Padmasana_Lotus_Yoga-Atha-Yugni.jpg",
      // Yin / Restorative
      "Butterfly Pose":      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Baddha_Konasana_yoga_pose.jpg/400px-Baddha_Konasana_yoga_pose.jpg",
      "Dragon Pose":         "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Kapotasana_yoga_pose.jpg/400px-Kapotasana_yoga_pose.jpg",
      "Sleeping Swan":       "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Kapotasana_yoga_pose.jpg/400px-Kapotasana_yoga_pose.jpg",
      "Supine Twist":        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Asana_Yoga-Atha-Yugni.jpg/400px-Asana_Yoga-Atha-Yugni.jpg",
      "Savasana":            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Shavasana_yoga_pose.jpg/400px-Shavasana_yoga_pose.jpg",
      "Legs Up The Wall":    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Paschimottanasana.jpg/400px-Paschimottanasana.jpg",
    };
    return poseImages[poseName] || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Virabhadrasana_I.jpg/400px-Virabhadrasana_I.jpg";
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

      <motion.div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14 }} variants={containerVariants} initial="hidden" animate="show">
        {styleData.poses.map((pose, i) => (
          <motion.div key={pose.name + i} variants={itemVariants} whileHover={{ y: -4 }} style={{ background: "rgba(15,23,42,0.75)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 14, padding: "16px", boxShadow: "0 10px 24px rgba(2,6,23,0.16)", display: "flex", flexDirection: "column" }}>
            <img src={getYogaImage(style, pose.name)} alt={pose.name} style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 12, marginBottom: 12 }} onError={e => { e.target.onerror = null; e.target.src = "/images/ex_squat.png"; }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{pose.name}</div>
              <LevelBadge level={pose.level} />
            </div>
            <div style={{ fontSize: 13, color: "#cbd5e1", marginBottom: 12, flex: 1 }}>{pose.benefit}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
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
                  }} style={{ padding: "7px 12px", borderRadius: 8, border: "1px solid rgba(148,163,184,0.2)", background: "rgba(15,23,42,0.7)", color: "#cbd5e1", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>🎧 Coach</motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(pose.name + ' yoga pose tutorial')}`, '_blank')} style={{ padding: "7px 12px", borderRadius: 8, border: "1px solid rgba(148,163,184,0.2)", background: "rgba(15,23,42,0.7)", color: "#cbd5e1", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>▶️ Watch</motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => startPose(pose)} style={{ padding: "7px 16px", borderRadius: 8, border: "none", background: styleData.color, color: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Start</motion.button>
                </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
