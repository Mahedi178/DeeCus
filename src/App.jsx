import { useState } from "react";
import TaskSection from "./components/layout/TaskSection";
import TimerSection from "./components/layout/TimerSection";
import { useTimer } from "./hooks/useTimer";

export default function App() {
  const [modes, setModes] = useState({
    work: { label: "Focus", duration: 25 * 60, color: "var(--accent)" },
    short: { label: "Short Break", duration: 5 * 60, color: "var(--success)" },
    long: { label: "Long Break", duration: 15 * 60, color: "var(--warning)" },
  });

  const [autoConfig, setAutoConfig] = useState({
    autoFocus: false,
    autoShort: false,
    autoLong: false,
  });

  const [longBreakInterval, setLongBreakInterval] = useState(4);
  const [sessionGoal, setSessionGoal] = useState(4);
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [activeTaskId, setActiveTaskId] = useState(null);

  const timer = useTimer(modes, autoConfig, longBreakInterval, sessionGoal);

  const updateDuration = (modeKey, newMinutes) => {
    // 1. Parse the string to an integer
    const mins = parseInt(newMinutes, 10);

    // 2. Only update if it's a valid number greater than 0
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
