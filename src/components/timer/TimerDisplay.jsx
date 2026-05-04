export default function TimerDisplay({ time, progress, color, fmt }) {
  return (
    <div className="flex flex-col items-center md:items-start">
      <div
        className="font-['Roboto_Mono',_serif] text-[clamp(72px,10vw,110px)] font-bold tracking-[-4px] leading-none mb-[12px] transition-colors duration-500"
        style={{ color }}
      >
        {fmt(time)}
      </div>

      <div className="w-full h-[2px] bg-(--border) rounded-[2px] mb-[50px] overflow-hidden">
        <div
          className="h-full rounded-[2px] transition-[width] duration-1000 linear"
          style={{ width: `${progress}%`, background: color }}
        />
      </div>
    </div>
  );
}
