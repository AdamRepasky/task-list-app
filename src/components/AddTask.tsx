import { useState } from 'react';

interface AddTaskProps {
  onAdd: (title: string) => void;
}

export default function AddTask({ onAdd }: AddTaskProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2 border-top p-2">
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
  );
}
