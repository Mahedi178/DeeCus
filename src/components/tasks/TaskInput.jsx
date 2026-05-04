import Input from "../ui/Input";
import Button from "../ui/Button";

export default function TaskInput({ value, onChange, onAdd }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onAdd();
  };

  return (
    <div className="flex gap-2 mb-7.5">
      <Input
        placeholder="add a task..."
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      <Button variant="add" onClick={onAdd}>
        +
      </Button>
    </div>
  );
}
