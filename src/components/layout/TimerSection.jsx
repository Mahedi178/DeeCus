import { useState } from "react";
import ModeTabs from "../timer/ModeTabs";
import SessionDots from "../timer/SessionDots";
import Settings from "../timer/Settings";
import TimerDisplay from "../timer/TimerDisplay";
import Button from "../ui/Button";

const fmt = (s) =>
  `${Math.floor(s / 60)
    .toString()
    .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

export default function TimerSection({ timer, currentColor, ...props }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleStart = () => {
    timer.setHasStarted(true);
    timer.setRunning(true);
  };

  const handleResetCurrent = () => {
    timer.setRunning(false);
    timer.setHasStarted(false);
    timer.setTimeLeft(props.modes[timer.mode].duration);
  };

  const btnMinWidth = "120px";

  return (
    <div className="relative flex flex-col p-[40px_28px] md:p-[60px_50px] border-r border-[var(--border)] min-h-screen overflow-hidden bg-[var(--bg)]">
      {timer.isGoalReached && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[var(--bg)]/95 backdrop-blur-md animate-in fade-in zoom-in duration-300">
          <div className="p-10 border border-[var(--border)] bg-[var(--surface)] rounded-3xl text-center shadow-2xl max-w-[300px]">
            <div className="text-5xl mb-6">🎯</div>
            <h2 className="text-xl font-bold mb-3 uppercase tracking-widest text-[var(--text)]">
              Daily Goal Met!
            </h2>
            <p className="text-[11px] text-[var(--muted)] mb-8 leading-relaxed uppercase tracking-wider">
              You have successfully completed {props.sessionGoal} focus
              sessions.
            </p>
            <div className="flex flex-col">
              <Button
                onClick={timer.reset}
                className="w-full"
                style={{ background: currentColor, color: "#fff" }}
              >
                Reset Daily Progress
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-10">
        <div className="font-bold text-[20px] uppercase text-[var(--muted)] tracking-widest">
          DeeCus
        </div>
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className={`text-[10px] uppercase tracking-widest transition-colors ${
            isSettingsOpen
              ? "text-[var(--accent)]"
              : "text-[var(--muted)] hover:text-[var(--text)]"
          }`}
        >
          {isSettingsOpen ? "[ close ]" : "[ settings ]"}
        </button>
      </div>

      <div className="flex-1">
        {isSettingsOpen ? (
          <Settings {...props} />
        ) : (
          <div className="animate-in fade-in duration-500">
            <ModeTabs
              modes={props.modes}
              currentMode={timer.mode}
              onModeChange={timer.setMode}
            />
            <TimerDisplay
              time={timer.timeLeft}
              progress={timer.progress}
              color={currentColor}
              fmt={fmt}
            />

            <div className="flex flex-wrap gap-3 mt-8">
              <Button
                disabled={timer.hasStarted}
                onClick={handleStart}
                style={{
                  background: timer.hasStarted
                    ? "var(--surface)"
                    : currentColor,
                  color: "#fff",
                  opacity: timer.hasStarted ? 0.3 : 1,
                  cursor: timer.hasStarted ? "not-allowed" : "pointer",
                  minWidth: btnMinWidth,
                }}
              >
                Start
              </Button>

              <Button
                disabled={!timer.hasStarted}
                onClick={() => timer.setRunning(!timer.running)}
                style={{
                  background: !timer.hasStarted
                    ? "var(--surface)"
                    : timer.running
                      ? `${currentColor}33`
                      : currentColor,
                  color: !timer.hasStarted ? "var(--muted)" : "#fff",
                  border: `1px solid ${
                    !timer.hasStarted ? "var(--border)" : currentColor
                  }`,
                  cursor: !timer.hasStarted ? "not-allowed" : "pointer",
                  opacity: !timer.hasStarted ? 0.5 : 1,
                  minWidth: btnMinWidth,
                  transition: "all 0.2s ease",
                }}
              >
                {timer.running ? "Pause" : "Resume"}
              </Button>

              <Button
                onClick={handleResetCurrent}
                style={{
                  background: "var(--surface)",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                  minWidth: btnMinWidth,
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        )}
      </div>

      <SessionDots
        current={timer.sessions}
        goal={props.sessionGoal}
        color={currentColor}
        timer={timer}
      />
    </div>
  );
}
