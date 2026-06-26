import { useState } from "react";

export function Navbar({ tab, setTab, user, onLogout }) {
  const tabs = [
    { id: "home",      label: "Home",     icon: "🏠" },
    { id: "exercises", label: "Exercise", icon: "💪" },
    { id: "yoga",      label: "Yoga",     icon: "🧘" },
    { id: "tracker",   label: "Track",    icon: "📋" },
    { id: "calories",  label: "Calories", icon: "🔥" },
    { id: "progress",  label: "Progress", icon: "📈" },
  ];
  const [open, setOpen] = useState(false);

  return (
    <nav className="top-nav">
      <div className="nav-brand">
        <img src="/logo.png" alt="VitalFlow logo" style={{ height: 64, width: "auto", objectFit: "contain" }} />
      </div>

      {/* Tab links */}
      <div style={{ display: "flex", gap: 4, flex: 1, overflowX: "auto" }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: "7px 13px",
              borderRadius: 999,
              border: tab === t.id
                ? "1px solid rgba(255,106,0,0.45)"
                : "1px solid transparent",
              background: tab === t.id
                ? "linear-gradient(135deg, rgba(255,106,0,0.28), rgba(255,69,0,0.20))"
                : "transparent",
              color: tab === t.id ? "#fff5ee" : "#c9a98a",
              fontWeight: tab === t.id ? 700 : 500,
              fontSize: 13,
              cursor: "pointer",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: 5,
              transition: "all 0.18s",
              boxShadow: tab === t.id ? "0 0 16px rgba(255,80,0,0.20)" : "none",
            }}
          >
            <span>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {/* User avatar + dropdown */}
      <div style={{ position: "relative", marginLeft: 12 }}>
        <div
          onClick={() => setOpen(!open)}
          style={{
            width: 38, height: 38,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #ff6a00, #ff4500)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff",
            fontWeight: 800,
            fontSize: 15,
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(255,80,0,0.40)",
            border: "2px solid rgba(255,160,60,0.30)",
          }}
        >
          {user.name.charAt(0).toUpperCase()}
        </div>

        {open && (
          <div style={{
            position: "absolute",
            right: 0, top: 46,
            background: "#0d0500",
            border: "1px solid rgba(255,106,0,0.22)",
            borderRadius: 12,
            padding: "8px 0",
            width: 184,
            zIndex: 200,
            boxShadow: "0 16px 40px rgba(0,0,0,0.50), 0 0 20px rgba(255,80,0,0.12)",
          }}>
            <div style={{
              padding: "10px 16px",
              borderBottom: "1px solid rgba(255,106,0,0.16)",
            }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#fff5ee" }}>{user.name}</div>
              <div style={{ color: "#c9a98a", fontSize: 12, marginTop: 2 }}>{user.goal}</div>
            </div>
            <button
              onClick={onLogout}
              style={{
                width: "100%",
                padding: "10px 16px",
                border: "none",
                background: "transparent",
                textAlign: "left",
                color: "#ff6a00",
                fontSize: 13,
                cursor: "pointer",
                fontWeight: 600,
                transition: "color 0.15s",
              }}
              onMouseEnter={e => e.target.style.color = "#ff4500"}
              onMouseLeave={e => e.target.style.color = "#ff6a00"}
            >
              🚪 Log out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
