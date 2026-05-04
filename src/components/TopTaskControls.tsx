import { useState } from 'react';
import type { Task } from '../types/task';
import { t } from '../i18n';

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
      <form onSubmit={handleSubmit} className="d-flex gap-2">
        <button 
          type="button"
          className={`btn ${activeTasksCount === 0 ? 'btn-outline-warning' : 'btn-outline-success'}`}
          onClick={onCompleteAll}
          title={activeTasksCount === 0 ? t.TITLES.UNCHECK_ALL : t.TITLES.COMPLETE_ALL}
        >
          <i className='bi-check-all'></i>
        </button>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t.PLACEHOLDERS.NEW_TASK}
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
