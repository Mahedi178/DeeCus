import TaskInput from "../tasks/TaskInput";
import TaskItem from "../tasks/TaskItem";
import EmptyTasks from "../tasks/EmptyTasks";

export default function TaskSection({
  tasks,
  setTasks,
  input,
  setInput,
  onAdd,
  activeId,
  setActiveId,
}) {
  const remaining = tasks.filter((t) => !t.done).length;

  const toggleTask = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  return (
    <div className="flex flex-col p-[40px_28px] md:p-[60px_50px]">
      <div className="flex items-baseline justify-between mb-7.5">
        <div className="font-['Fraunces'] text-[24px] font-extralight text-(--muted) italic">
          tasks
        </div>
        <div className="text-[11px] text-(--muted) tracking-widest">
          {remaining} remaining
        </div>
      </div>

      <TaskInput
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onAdd={onAdd}
      />

      <div className="flex-1 overflow-y-auto flex flex-col gap-2">
        {tasks.length === 0 ? (
          <EmptyTasks />
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isActive={activeId === task.id}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onClick={() => setActiveId(activeId === task.id ? null : task.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
