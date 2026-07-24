import { useState } from "react";
import { FOOD_DB } from "../../data/constants";

export function CaloriesTab({ foodLog, setFoodLog }) {
  const [search, setSearch] = useState("");
  const [meal, setMeal] = useState("Breakfast");
  const [custom, setCustom] = useState({ name: "", cal: "", protein: "", carbs: "", fat: "" });
  const [tab, setTab] = useState("search");
  const GOAL = 2200;

  const results = search.length > 1 ? FOOD_DB.filter(f => f.name.toLowerCase().includes(search.toLowerCase())) : [];

  const addFood = (food) => {
    setFoodLog(l => [...l, { ...food, meal, id: Date.now(), date: new Date().toDateString() }]);
    setSearch("");
  };

  const addCustom = () => {
    if (!custom.name || !custom.cal) return;
    addFood({ name: custom.name, cal: +custom.cal, protein: +custom.protein || 0, carbs: +custom.carbs || 0, fat: +custom.fat || 0 });
    setCustom({ name: "", cal: "", protein: "", carbs: "", fat: "" });
  };

  const todayLog = foodLog.filter(f => f.date === new Date().toDateString());
  const totalCal = todayLog.reduce((s, f) => s + f.cal, 0);
  const totalP = todayLog.reduce((s, f) => s + f.protein, 0);
  const totalC = todayLog.reduce((s, f) => s + f.carbs, 0);
  const totalF = todayLog.reduce((s, f) => s + f.fat, 0);
  const pct = Math.min(100, Math.round((totalCal / GOAL) * 100));
  const meals = ["Breakfast", "Lunch", "Dinner", "Snack"];
  const inp = { padding: "9px 12px", borderRadius: 9, border: "1.5px solid rgba(148,163,184,0.2)", fontSize: 13, outline: "none", fontFamily: "inherit", background: "rgba(15,23,42,0.7)", color: "#f8fafc" };

  const weekData = Array(7).fill(0).map((_, i) => {
    const date = new Date(); date.setDate(date.getDate() - (6 - i));
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayCals = foodLog.filter(f => f.date === date.toDateString()).reduce((s, f) => s + f.cal, 0);
    return { day: dayName, cal: dayCals };
  });
  const maxCal = Math.max(GOAL, ...weekData.map(d => d.cal));

  return (
    <div style={{ padding: "20px 24px 40px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        {/* Ring */}
        <div style={{ background: "rgba(15,23,42,0.75)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", alignItems: "center", boxShadow: "0 10px 24px rgba(2,6,23,0.16)" }}>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 16, alignSelf: "flex-start", color: "#f8fafc" }}>Daily Goal</div>
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx={70} cy={70} r={58} fill="none" stroke="#f1f5f9" strokeWidth={12} />
            <circle cx={70} cy={70} r={58} fill="none" stroke="#EF9F27" strokeWidth={12}
              strokeDasharray={`${(pct / 100) * 364} 364`} strokeLinecap="round" transform="rotate(-90 70 70)" />
            <text x={70} y={65} textAnchor="middle" fontSize={20} fontWeight={700} fill="#1a1a2e">{totalCal}</text>
            <text x={70} y={82} textAnchor="middle" fontSize={11} fill="#94a3b8">/ {GOAL} kcal</text>
            <text x={70} y={98} textAnchor="middle" fontSize={10} fill={totalCal > GOAL ? "#e53e3e" : "#1D9E75"}>{totalCal > GOAL ? "Over goal" : `${GOAL - totalCal} left`}</text>
          </svg>
          <div style={{ marginTop: 16 }}>
            {[["Carbs", totalC, "g", "#378ADD"], ["Protein", totalP, "g", "#D85A30"], ["Fat", totalF, "g", "#BA7517"]].map(([label, val, u, col]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: col, flexShrink: 0 }} />
                <div style={{ fontSize: 12, color: "#64748b", flex: 1 }}>{label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: col }}>{val}{u}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Add food */}
        <div style={{ background: "rgba(15,23,42,0.75)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 16, padding: 20, boxShadow: "0 10px 24px rgba(2,6,23,0.16)" }}>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>Add food</div>
          <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
            {["search", "custom"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "7px 0", borderRadius: 8, border: "none", background: tab === t ? "#185FA5" : "#f1f5f9", color: tab === t ? "#fff" : "#64748b", fontWeight: 500, fontSize: 13, cursor: "pointer" }}>
                {t === "search" ? "Search food" : "Custom entry"}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
            {meals.map(m => <button key={m} onClick={() => setMeal(m)} style={{ flex: 1, padding: "6px 4px", borderRadius: 7, border: `1.5px solid ${meal === m ? "#185FA5" : "#e2e8f0"}`, background: meal === m ? "#EEF4FF" : "#fff", color: meal === m ? "#185FA5" : "#64748b", fontSize: 11, cursor: "pointer" }}>{m}</button>)}
          </div>
          {tab === "search" ? <>
            <input placeholder="Search food..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...inp, width: "100%", boxSizing: "border-box", marginBottom: 8 }} />
            {results.map((f, i) => (
              <div key={i} onClick={() => addFood(f)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", borderRadius: 8, background: "rgba(15,23,42,0.7)", marginBottom: 5, cursor: "pointer", border: "1px solid rgba(148,163,184,0.16)" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{f.name}</div>
                  <div style={{ fontSize: 11, color: "#94a3b8" }}>{f.protein}g P · {f.carbs}g C · {f.fat}g F</div>
                </div>
                <div style={{ fontSize: 13, color: "#D85A30", fontWeight: 600 }}>{f.cal} kcal</div>
              </div>
            ))}
          </> : <>
            <input placeholder="Food name" value={custom.name} onChange={e => setCustom({ ...custom, name: e.target.value })} style={{ ...inp, width: "100%", marginBottom: 8, boxSizing: "border-box" }} />
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input placeholder="Calories" type="number" value={custom.cal} onChange={e => setCustom({ ...custom, cal: e.target.value })} style={{ ...inp, flex: 1, width: "50%" }} />
              <input placeholder="Protein (g)" type="number" value={custom.protein} onChange={e => setCustom({ ...custom, protein: e.target.value })} style={{ ...inp, flex: 1, width: "50%" }} />
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <input placeholder="Carbs (g)" type="number" value={custom.carbs} onChange={e => setCustom({ ...custom, carbs: e.target.value })} style={{ ...inp, flex: 1, width: "50%" }} />
              <input placeholder="Fat (g)" type="number" value={custom.fat} onChange={e => setCustom({ ...custom, fat: e.target.value })} style={{ ...inp, flex: 1, width: "50%" }} />
            </div>
            <button onClick={addCustom} style={{ width: "100%", padding: "10px 0", borderRadius: 8, border: "none", background: "#185FA5", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Add custom food</button>
          </>}
        </div>
      </div>

      <div style={{ background: "rgba(15,23,42,0.75)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 16, padding: 20, boxShadow: "0 10px 24px rgba(2,6,23,0.16)" }}>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 14, color: "#f8fafc" }}>Today's meals</div>
        {todayLog.length === 0 ? <div style={{ textAlign: "center", color: "#94a3b8", padding: "20px 0", fontSize: 13 }}>No meals logged today.</div> :
          meals.map(m => {
            const mLogs = todayLog.filter(l => l.meal === m);
            if (mLogs.length === 0) return null;
            return (
              <div key={m} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase", marginBottom: 6 }}>{m}</div>
                {mLogs.map((l, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{l.name}</div>
                      <div style={{ fontSize: 11, color: "#94a3b8" }}>{l.protein}g P · {l.carbs}g C · {l.fat}g F</div>
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ fontSize: 13, color: "#D85A30", fontWeight: 600 }}>{l.cal} kcal</span>
                      <button onClick={() => setFoodLog(ls => ls.filter(x => x.id !== l.id))} style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #fee2e2", background: "#fff", color: "#e53e3e", fontSize: 11, cursor: "pointer" }}>✕</button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })
        }
      </div>

      {/* Weekly Graph */}
      <div style={{ background: "rgba(15,23,42,0.75)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 16, padding: 20, marginTop: 24, boxShadow: "0 10px 24px rgba(2,6,23,0.16)" }}>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 16, color: "#f8fafc" }}>Weekly Calorie Trend</div>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-end", height: 140, paddingBottom: 10, borderBottom: "1px dashed #e2e8f0" }}>
          {weekData.map((d, i) => {
            const h = Math.max(5, (d.cal / maxCal) * 100);
            const isOver = d.cal > GOAL;
            return (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", gap: 8, height: "100%" }}>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>{d.cal > 0 ? d.cal : ""}</div>
                <div style={{ width: "100%", background: isOver ? "linear-gradient(180deg, #fb923c, #ef4444)" : "linear-gradient(180deg, #38bdf8, #0f172a)", borderRadius: "6px 6px 0 0", height: `${h}%`, transition: "height 0.3s" }} />
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          {weekData.map((d, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 12, color: "#64748b", fontWeight: 500 }}>{d.day}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
