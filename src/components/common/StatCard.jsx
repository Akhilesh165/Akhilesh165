export function StatCard({ label, value, unit, color, bg }) {
  return (
    <div style={{
      background: bg || "rgba(16,6,0,0.80)",
      borderRadius: 16,
      padding: "16px 18px",
      flex: 1,
      minWidth: 100,
      border: "1px solid rgba(255,106,0,0.16)",
      boxShadow: "0 10px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,140,0,0.06)",
      transition: "box-shadow 0.2s",
    }}>
      <div style={{
        color: "#c9a98a",
        fontSize: 11,
        fontWeight: 600,
        marginBottom: 4,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
      }}>
        {label}
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color: color || "#fff5ee" }}>
        {value}
        <span style={{ fontSize: 13, fontWeight: 500, color: "#9a7560", marginLeft: 3 }}>
          {unit}
        </span>
      </div>
    </div>
  );
}
