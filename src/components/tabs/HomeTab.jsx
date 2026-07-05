import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StatCard } from "../common/StatCard";

export function HomeTab({ user, logs, foodLog, streak }) {
  const totalCal   = foodLog.reduce((s, f) => s + f.cal, 0);
  const todayLogs  = logs.filter(l => l.date === new Date().toDateString());
  const activeMins = todayLogs.length * 8;
  const tips = [
    "Stay hydrated — drink water before each set 💧",
    "Warm up for 5 minutes before starting 🔥",
    "Track every meal for best results 🥗",
    "Rest days are part of the plan 😴",
    "Consistency beats intensity every time ✅",
  ];
  const tip = tips[new Date().getDay() % tips.length];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Lost 15 lbs in 2 months",
      text: "Viteflow completely changed how I track my workouts. The coaching cues are super helpful, and the calorie tracker keeps me accountable!",
      rating: "⭐⭐⭐⭐⭐"
    },
    {
      id: 2,
      name: "David Chen",
      role: "Gained 10 lbs muscle",
      text: "The exercise library is fantastic. I finally know how to do a proper Bulgarian Split Squat. The UI is sleek and fast. Highly recommended.",
      rating: "⭐⭐⭐⭐⭐"
    },
    {
      id: 3,
      name: "Emma Watson",
      role: "Yoga Enthusiast",
      text: "I love the new Yoga section! The actual photos of the poses make it so easy to follow along. Best fitness companion app I've used.",
      rating: "⭐⭐⭐⭐⭐"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="page-shell">
      {/* Hero banner */}
      <div className="theme-hero">
        <div style={{ fontSize: 13, opacity: 0.90, marginBottom: 4, position: "relative", zIndex: 1 }}>
          Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening"} 👋
        </div>
        <h2>{user.name}</h2>
        <p>Goal: {user.goal} · {streak > 0 ? `🔥 ${streak}-day streak` : "Start your streak today!"}</p>
        <div className="hero-badges">
          <span className="badge-chip">⚡ Inferno Dashboard</span>
          <span className="badge-chip">🧠 Daily coaching cues</span>
          <span className="badge-chip">📈 Progress tracking</span>
        </div>
        {/* Daily tip */}
        <div style={{
          marginTop: 16,
          background: "rgba(0,0,0,0.30)",
          borderRadius: 12,
          padding: "10px 14px",
          fontSize: 13,
          border: "1px solid rgba(255,255,255,0.16)",
          position: "relative", zIndex: 1,
        }}>
          💡 {tip}
        </div>
      </div>

      {/* Stat grid */}
      <div className="stat-grid">
        <StatCard label="Calories today" value={totalCal}       unit="kcal" color="#ff6a00" bg="rgba(255,106,0,0.10)" />
        <StatCard label="Active mins"    value={activeMins}     unit="min"  color="#ffc04d" bg="rgba(255,192,77,0.10)" />
        <StatCard label="Workouts"       value={todayLogs.length} unit="done" color="#ff8c42" bg="rgba(255,140,60,0.10)" />
        <StatCard label="Streak"         value={streak}         unit="days" color="#fff5ee" bg="rgba(16,6,0,0.80)"     />
      </div>

      {/* Testimonial Slider Section */}
      <div className="theme-card" style={{ overflow: "hidden", position: "relative" }}>
        <div className="section-header">
          <div>
            <div className="section-title">Success Stories</div>
            <div className="section-meta">See what our community is saying</div>
          </div>
        </div>

        <div style={{ height: "180px", position: "relative" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              style={{
                position: "absolute",
                width: "100%",
                background: "rgba(20,8,0,0.60)",
                borderRadius: 12,
                padding: "20px",
                border: "1px solid rgba(255,106,0,0.14)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 14, color: "#fff5ee", fontStyle: "italic", lineHeight: 1.5 }}>
                "{testimonials[currentIndex].text}"
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <div style={{ fontWeight: 700, color: "#ff6a00", fontSize: 15 }}>{testimonials[currentIndex].name}</div>
                  <div style={{ fontSize: 12, color: "#c9a98a" }}>{testimonials[currentIndex].role}</div>
                </div>
                <div style={{ fontSize: 12 }}>{testimonials[currentIndex].rating}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                border: "none",
                background: currentIndex === idx ? "#ff6a00" : "rgba(255,255,255,0.2)",
                cursor: "pointer",
                padding: 0,
                transition: "background 0.2s ease"
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Today's logged workouts */}
      <div className="theme-card">
        <div className="section-header">
          <div>
            <div className="section-title">Today's logged workouts</div>
            <div className="section-meta">Stay on pace with your planned training.</div>
          </div>
        </div>

        {todayLogs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "28px 0", color: "#c9a98a" }}>
            No workouts logged today. Head to the Exercise or Yoga tab to start! 🏃
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {todayLogs.slice(0, 5).map((l, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(20,8,0,0.80)",
                borderRadius: 12,
                padding: "10px 16px",
                border: "1px solid rgba(255,106,0,0.14)",
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#fff5ee" }}>{l.exercise}</div>
                  <div style={{ fontSize: 12, color: "#c9a98a" }}>{l.sets} sets · {l.reps} reps</div>
                </div>
                <span style={{ fontSize: 12, color: "#ff8c42", fontWeight: 700 }}>✅ Done</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
