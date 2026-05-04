export default function ModeTabs({ modes, currentMode, onModeChange }) {
    return (
        <div className="flex gap-1 mb-[50px]">
            {Object.entries(modes).map(([key, val]) => (
                <button
                    key={key}
                    className={`font-['DM_Mono',_monospace] text-[11px] tracking-[0.1em] p-[7px_14px] rounded-[6px] border transition-all duration-200 cursor-pointer 
            ${
                currentMode === key
                    ? 'bg-(--surface) border-(--border) text-(--text)'
                    : 'bg-transparent border-transparent text-(--muted) hover:text-(--text) hover:border-(--border)'
            }`}
                    onClick={() => onModeChange(key)}
                >
                    {val.label}
                </button>
            ))}
        </div>
    );
}
