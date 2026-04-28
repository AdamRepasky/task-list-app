import type { Task, TaskFilter } from '../types/task';
import TaskItem from './TaskItem';
import { t } from '../i18n';

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
    <div className="task-container-min-height">
      {error ? (
        <div className="d-flex align-items-center justify-content-center task-container-min-height">
          <div className="card border-warning error-card-max-width">
            <div className="card-body text-center py-4">
              <div className="mb-3">
                <i className="bi bi-wifi-off text-warning connection-icon-large"></i>
              </div>
              <h5 className="card-title text-warning mb-2">{t.UI_STATES.CONNECTION_ERROR}</h5>
              <p className="card-text text-muted mb-0">{t.UI_STATES.CONNECTION_ERROR_MESSAGE}</p>
            </div>
          </div>
        </div>
      ) : isLoading ? (
        <div className="d-flex align-items-center justify-content-center task-container-min-height">
          <div className="d-flex align-items-center">
            <div className="spinner-grow spinner-grow-sm me-2" role="status"></div>
            <span className="text-muted">{t.UI_STATES.LOADING_TASKS}</span>
          </div>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-4">
          {filter === 'active' ? (
            <p className="text-secondary small">{t.UI_STATES.NO_ACTIVE_TASKS}</p>
          ) : filter === 'completed' ? (
            <p className="text-secondary small">{t.UI_STATES.NO_COMPLETED_TASKS}</p>
          ) : (
            <p className="text-secondary small">{t.UI_STATES.NO_TASKS_FOUND}</p>
          )}
        </div>
      ) : (
        <div className="overflow-auto task-list-max-height">
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
