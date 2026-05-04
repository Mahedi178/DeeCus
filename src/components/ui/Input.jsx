export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`flex-1 font-['DM_Mono',monospace] text-[13px] p-[12px_16px] bg-(--surface) border border-(--border) rounded-lg text-(--text) outline-none transition-colors duration-200 focus:border-(--muted) placeholder:text-(--muted) ${className}`}
      {...props}
    />
  );
}
