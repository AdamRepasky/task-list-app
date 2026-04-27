import type { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="d-flex align-items-center gap-3 p-3 bg-light border-top">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="form-check-input"
      />
      <span className={`flex-grow-1 ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}>
        {task.text}
      </span>
      <button 
        onClick={() => onDelete(task.id)}
        className="btn btn-outline-danger rounded-circle"
      >
        <i className="bi bi-trash"></i>
      </button>
    </div>
  );
}
