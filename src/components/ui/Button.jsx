export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const baseStyles =
    "font-mono text-[13px] tracking-wider rounded-lg transition-all active:scale-95 cursor-pointer";

  const variants = {
    primary: "px-10 py-3.5 border-none font-medium",
    ghost:
      "px-5 py-3.5 border border-border text-muted hover:text-text hover:border-muted",
    add: "w-11 h-11 border border-border bg-surface text-text flex items-center justify-center hover:bg-border hover:text-bg text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
