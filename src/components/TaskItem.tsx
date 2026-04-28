import { useState, useEffect, useRef } from 'react';
import type { Task } from '../types/task';
import { t } from '../i18n';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const taskItemRef = useRef<HTMLDivElement>(null);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditText(task.text);
  };

  const handleSave = () => {
    if (editText.trim() && editText !== task.text) {
      onEdit(task.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (taskItemRef.current && !taskItemRef.current.contains(event.target as Node)) {
        handleCancel();
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing]);

  return (
    <div 
      ref={taskItemRef}
      className={`d-flex align-items-center gap-3 p-3 bg-light border-top ${isEditing ? 'cursor-default' : 'cursor-pointer'}`}
      onDoubleClick={handleDoubleClick}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="form-check-input"
      />
      {isEditing ? (
        <div className="flex-grow-1 d-flex gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="form-control flex-grow-1 border-0"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="btn btn-primary btn-sm"
            aria-label={t.ACCESSIBILITY.SAVE}
          >
            <i className="bi bi-check"></i>
          </button>
        </div>
      ) : (
        <div 
          className={`flex-grow-1 ${task.completed ? 'text-decoration-line-through text-muted' : ''} task-text-padding`}
        >
          {task.text}
        </div>
      )}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task.id);
        }}
        className="btn btn-outline-danger rounded-circle"
      >
        <i className="bi bi-trash"></i>
      </button>
    </div>
  );
}
