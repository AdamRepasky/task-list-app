import { useState } from 'react';
import type { Task } from '../types/task';

interface TopTaskControlsProps {
  onAdd: (title: string) => void;
  tasks: Task[];
  onCompleteAll: () => void;
}

export default function TopTaskControls({ onAdd, tasks, onCompleteAll }: TopTaskControlsProps) {
  const [title, setTitle] = useState('');
  const activeTasksCount = tasks.filter(task => !task.completed).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <div className="border-top p-2">
      <form onSubmit={handleSubmit} className="d-flex gap-2 mb-2">
        <button 
          type="button"
          className={`btn ${activeTasksCount === 0 ? 'btn-outline-warning' : 'btn-outline-success'}`}
          onClick={onCompleteAll}
          title={activeTasksCount === 0 ? 'Uncheck all tasks' : 'Complete all tasks'}
        >
          <i className='bi-check-all'></i>
        </button>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="form-control flex-grow-1"
        />
        <button 
          type="submit"
          className="btn btn-success"
        >
        <i className="bi bi-plus-circle"></i>
        </button>
      </form>
    </div>
  );
}
