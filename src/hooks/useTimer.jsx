import { useEffect, useRef, useState } from "react";

export function useTimer(modes, autoConfig, longBreakInterval, sessionGoal) {
  const [mode, setMode] = useState("work");
  const [timeLeft, setTimeLeft] = useState(modes.work.duration);
  const [running, setRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // Tracks manual vs auto start
  const [sessions, setSessions] = useState(0);
  const [isGoalReached, setIsGoalReached] = useState(false);

  const intervalRef = useRef(null);
  const hasFinishedRef = useRef(false);

  // Sync timer when idle (e.g., switching modes manually)
  useEffect(() => {
    if (!hasStarted) {
      setTimeLeft(modes[mode].duration);
    }
  }, [modes, mode, hasStarted]);

  // The Tick Engine
  useEffect(() => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) return prev - 1;

        clearInterval(intervalRef.current);
        if (hasFinishedRef.current) return 0;
        hasFinishedRef.current = true;

        handleTransition();
        return 0;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [running, mode]);

  const handleTransition = () => {
    let nextMode = "work";
    let updatedSessions = sessions;

    if (mode === "work") {
      updatedSessions = sessions + 1;
      setSessions(updatedSessions);

      if (updatedSessions >= sessionGoal) {
        setIsGoalReached(true);
        setRunning(false);
        setHasStarted(false);
        return;
      }
      nextMode = updatedSessions % longBreakInterval === 0 ? "long" : "short";
    }

    setMode(nextMode);
    setTimeLeft(modes[nextMode].duration);

    // Auto-Start Check[cite: 1]
    const shouldAutoStart =
      (nextMode === "work" && autoConfig.autoFocus) ||
      (nextMode === "short" && autoConfig.autoShort) ||
      (nextMode === "long" && autoConfig.autoLong);

    setRunning(shouldAutoStart);
    setHasStarted(shouldAutoStart);
    hasFinishedRef.current = false;
  };

  const fullReset = () => {
    setRunning(false);
    setHasStarted(false);
    setSessions(0);
    setMode("work");
    setTimeLeft(modes.work.duration);
    setIsGoalReached(false);
    clearInterval(intervalRef.current);
    hasFinishedRef.current = false;
  };

  return {
    mode,
    setMode: (m) => {
      setMode(m);
      setHasStarted(false);
      setRunning(false);
    },
    timeLeft,
    setTimeLeft, // Added for manual Reset
    running,
    setRunning,
    hasStarted,
    setHasStarted, // Added for manual Start
    sessions,
    isGoalReached,
    setIsGoalReached,
    reset: fullReset,
    progress: ((modes[mode].duration - timeLeft) / modes[mode].duration) * 100,
  };
}
