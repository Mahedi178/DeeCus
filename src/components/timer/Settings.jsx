export default function Settings({
  modes,
  onUpdateDuration,
  sessionGoal,
  setSessionGoal,
  autoConfig,
  setAutoConfig,
  longBreakInterval,
  setLongBreakInterval,
}) {
  const toggle = (key) =>
    setAutoConfig((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
      <section>
        <h3 className="text-[10px] uppercase text-(--muted) mb-3 tracking-widest">
          Durations (min)
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(modes).map(([key, val]) => (
            <div key={key} className="flex flex-col gap-1">
              <label className="text-[9px] text-(--muted)">{val.label}</label>
              <input
                type="number"
                min="1"
                step="1"
                className="bg-(--surface) border border-(--border) rounded p-2 text-xs outline-none focus:border-(--accent)"
                value={Math.floor(val.duration / 60)}
                onChange={(e) => onUpdateDuration(key, e.target.value)}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="pt-4 border-t border-(--border) space-y-3">
        <h3 className="text-[10px] uppercase text-(--muted) tracking-widest">
          Automation
        </h3>
        {[
          { label: "Auto Start Focus", key: "autoFocus" },
          { label: "Auto Start Short Break", key: "autoShort" },
          { label: "Auto Start Long Break", key: "autoLong" },
        ].map((item) => (
          <div
            key={item.key}
            className="flex justify-between items-center text-xs"
          >
            <span>{item.label}</span>
            <input
              type="checkbox"
              checked={autoConfig[item.key]}
              onChange={() => toggle(item.key)}
              className="w-8 h-4 appearance-none bg-(--border) rounded-full checked:bg-(--accent) cursor-pointer relative transition-all before:content-[''] before:absolute before:w-3 before:h-3 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 checked:before:left-4 before:transition-all"
            />
          </div>
        ))}
      </section>

      <section className="pt-4 border-t border-(--border)">
        <div className="flex justify-between text-[10px] uppercase text-(--muted) mb-2">
          <span>Long Break After</span>
          <span className="text-(--text) font-bold">
            {longBreakInterval} sessions
          </span>
        </div>
        <input
          type="range"
          min="2"
          max="10"
          value={longBreakInterval}
          onChange={(e) => setLongBreakInterval(parseInt(e.target.value))}
          className="w-full accent-(--accent) cursor-pointer"
        />
      </section>

      <section className="pt-4 border-t border-(--border)">
        <div className="flex justify-between text-[10px] uppercase text-(--muted) mb-2">
          <span>Daily Session Goal</span>
          <span className="text-(--text) font-bold">
            {sessionGoal} sessions
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="16"
          value={sessionGoal}
          onChange={(e) => setSessionGoal(parseInt(e.target.value))}
          className="w-full accent-(--accent) cursor-pointer"
        />
      </section>
    </div>
  );
}
