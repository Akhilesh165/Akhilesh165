export function LevelBadge({ level }) {
  const map = { Beginner: "#3B6D11", Intermediate: "#BA7517", Advanced: "#993556" };
  const bg = { Beginner: "#EAF3DE", Intermediate: "#FAEEDA", Advanced: "#FBEAF0" };
  return (
    <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: bg[level], color: map[level], fontWeight: 500, whiteSpace: "nowrap" }}>
      {level}
    </span>
  );
}
