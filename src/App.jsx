import { useState, useEffect } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { LoginScreen } from "./components/auth/LoginScreen";
import { Navbar } from "./components/common/Navbar";
import { HomeTab } from "./components/tabs/HomeTab";
import { ExercisesTab } from "./components/tabs/ExercisesTab";
import { YogaTab } from "./components/tabs/YogaTab";
import { TrackerTab } from "./components/tabs/TrackerTab";
import { CaloriesTab } from "./components/tabs/CaloriesTab";
import { ProgressTab } from "./components/tabs/ProgressTab";
import "./App.css";

export default function App() {
  const [user, setUser] = useLocalStorage("vf_user", null);
  const [logs, setLogs] = useLocalStorage("vf_logs", []);
  const [foodLog, setFoodLog] = useLocalStorage("vf_food", []);
  const [plan, setPlan] = useLocalStorage("vf_plan", []);
  const [tab, setTab] = useState("home");
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const dates = [...new Set(logs.map(l => l.date))].sort((a, b) => new Date(b) - new Date(a));
    let s = 0;
    let d = new Date();
    for (let i = 0; i < dates.length; i++) {
      if (dates[i] === d.toDateString()) { s++; d.setDate(d.getDate() - 1); }
      else if (i === 0 && dates[0] === new Date(Date.now() - 86400000).toDateString()) { s++; d.setDate(d.getDate() - 2); }
      else break;
    }
    setStreak(s);
  }, [logs]);

  if (!user) return <LoginScreen onLogin={setUser} />;

  return (
    <div className="app-shell">
      <Navbar tab={tab} setTab={setTab} user={user} onLogout={() => setUser(null)} />
      
      {tab === "home" && <HomeTab user={user} logs={logs} foodLog={foodLog} streak={streak} />}
      {tab === "exercises" && <ExercisesTab onLog={l => setLogs(ls => [l, ...ls])} plan={plan} setPlan={setPlan} />}
      {tab === "yoga" && <YogaTab onLog={l => setLogs(ls => [l, ...ls])} />}
      {tab === "tracker" && <TrackerTab logs={logs} setLogs={setLogs} plan={plan} setPlan={setPlan} />}
      {tab === "calories" && <CaloriesTab foodLog={foodLog} setFoodLog={setFoodLog} />}
      {tab === "progress" && <ProgressTab user={user} logs={logs} foodLog={foodLog} />}
    </div>
  );
}
