import type { Task, TaskFilter } from '../types/task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  filter: TaskFilter;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

export default function TaskList({ tasks, filter, onToggle, onDelete, isLoading }: TaskListProps) {
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
      {!isLoading && filteredTasks.length === 0 ? (
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
            />
          ))}
        </div>
      )}
    </div>
  );
}
