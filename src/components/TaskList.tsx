import type { Task, TaskFilter } from '../types/task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  filter: TaskFilter;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  isLoading: boolean;
  error?: any;
}

export default function TaskList({ tasks, filter, onToggle, onDelete, onEdit, isLoading, error }: TaskListProps) {
  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  return (
    <div style={{ minHeight: '240px' }}>
      {error ? (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '240px' }}>
          <div className="card border-warning" style={{ maxWidth: '400px' }}>
            <div className="card-body text-center py-4">
              <div className="mb-3">
                <i className="bi bi-wifi-off text-warning" style={{ fontSize: '2rem' }}></i>
              </div>
              <h5 className="card-title text-warning mb-2">Connection Error</h5>
              <p className="card-text text-muted mb-0">Unable to load tasks. Please reload the page later.</p>
            </div>
          </div>
        </div>
      ) : isLoading ? (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '240px' }}>
          <div className="d-flex align-items-center">
            <div className="spinner-grow spinner-grow-sm me-2" role="status"></div>
            <span className="text-muted">Loading tasks...</span>
          </div>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-4">
          {filter === 'active' ? (
            <p className="text-secondary small">No active tasks</p>
          ) : filter === 'completed' ? (
            <p className="text-secondary small">No completed tasks</p>
          ) : (
            <p className="text-secondary small">No tasks found.</p>
          )}
        </div>
      ) : (
        <div className="overflow-auto" style={{ maxHeight: '400px' }}>
          {filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
