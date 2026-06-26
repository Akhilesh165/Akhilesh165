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
