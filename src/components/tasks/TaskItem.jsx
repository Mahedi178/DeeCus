export default function TaskItem({
  task,
  isActive,
  onToggle,
  onDelete,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`group flex items-center gap-3 p-4 bg-surface border rounded-lg transition-all cursor-pointer
        ${task.done ? "opacity-45" : "opacity-100"} 
        ${isActive ? "border-accent" : "border-border hover:border-muted"}`}
    >
      <div
        className={`w-4.5 h-4.5 rounded-full border-[1.5px] border-border flex items-center justify-center transition-all text-[10px] hover:border-accent
          ${task.done ? "bg-accent border-accent text-white" : "bg-transparent"}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggle(task.id);
        }}
      >
        {task.done && "✓"}
      </div>

      <div
        className={`flex-1 text-[13px] ${task.done ? "line-through text-muted" : "text-text"}`}
      >
        {task.text}
      </div>

      <button
        className="text-lg text-muted opacity-0 group-hover:opacity-100 transition-opacity hover:text-text"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task.id);
        }}
      >
        ×
      </button>
    </div>
  );
}
