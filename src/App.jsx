import { useState, useEffect } from "react";
import TaskSection from "./components/layout/TaskSection";
import TimerSection from "./components/layout/TimerSection";
import { useTimer } from "./hooks/useTimer";

// Helper to safely fetch from localStorage[cite: 7]
const getPersistent = (key, fallback) => {
  const data = localStorage.getItem(key);
  try {
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
};

export default function App() {
  // --- PERSISTENT STATE INITIALIZATION[cite: 7, 9] ---
  const [modes, setModes] = useState(() =>
    getPersistent("pomo_modes", {
      work: { label: "Focus", duration: 25 * 60, color: "var(--accent)" },
      short: {
        label: "Short Break",
        duration: 5 * 60,
        color: "var(--success)",
      },
      long: { label: "Long Break", duration: 15 * 60, color: "var(--warning)" },
    }),
  );

  const [autoConfig, setAutoConfig] = useState(() =>
    getPersistent("pomo_auto", {
      autoFocus: false,
      autoShort: false,
      autoLong: false,
    }),
  );

  const [longBreakInterval, setLongBreakInterval] = useState(() =>
    getPersistent("pomo_interval", 4),
  );

  const [sessionGoal, setSessionGoal] = useState(() =>
    getPersistent("pomo_goal", 4),
  );

  const [tasks, setTasks] = useState(() => getPersistent("pomo_tasks", []));
  const [input, setInput] = useState("");
  const [activeTaskId, setActiveTaskId] = useState(null);

  // --- SAVE TO LOCALSTORAGE ON CHANGE[cite: 7] ---
  useEffect(() => {
    localStorage.setItem("pomo_modes", JSON.stringify(modes));
  }, [modes]);

  useEffect(() => {
    localStorage.setItem("pomo_auto", JSON.stringify(autoConfig));
  }, [autoConfig]);

  useEffect(() => {
    localStorage.setItem("pomo_interval", JSON.stringify(longBreakInterval));
  }, [longBreakInterval]);

  useEffect(() => {
    localStorage.setItem("pomo_goal", JSON.stringify(sessionGoal));
  }, [sessionGoal]);

  useEffect(() => {
    localStorage.setItem("pomo_tasks", JSON.stringify(tasks));
  }, [tasks]);

  // --- TIMER HOOK ---
  const timer = useTimer(modes, autoConfig, longBreakInterval, sessionGoal);

  const updateDuration = (modeKey, newMinutes) => {
    const mins = parseInt(newMinutes, 10);
    if (!isNaN(mins) && mins > 0) {
      setModes((prev) => ({
        ...prev,
        [modeKey]: {
          ...prev[modeKey],
          duration: mins * 60,
        },
      }));
    }
  };

  return (
    <div className="bg-bg text-(--text) min-h-screen font-mono transition-colors duration-300">
      <div className="mx-auto max-w-275 grid grid-cols-1 md:grid-cols-2 min-h-screen p-4 gap-8">
        <TimerSection
          timer={timer}
          currentColor={modes[timer.mode].color}
          modes={modes}
          sessionGoal={sessionGoal}
          setSessionGoal={setSessionGoal}
          autoConfig={autoConfig}
          setAutoConfig={setAutoConfig}
          longBreakInterval={longBreakInterval}
          setLongBreakInterval={setLongBreakInterval}
          onUpdateDuration={updateDuration}
        />
        <TaskSection
          tasks={tasks}
          setTasks={setTasks}
          input={input}
          setInput={setInput}
          onAdd={() => {
            if (!input.trim()) return;
            setTasks([
              ...tasks,
              { id: Date.now(), text: input.trim(), done: false },
            ]);
            setInput("");
          }}
          activeId={activeTaskId}
          setActiveId={setActiveTaskId}
        />
      </div>
    </div>
  );
}
