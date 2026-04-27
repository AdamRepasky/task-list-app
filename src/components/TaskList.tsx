import type { Task, TaskFilter } from '../types/task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  filter: TaskFilter;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, filter, onToggle, onDelete }: TaskListProps) {
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
    <div>
      {filteredTasks.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-muted">No tasks found</p>
          <p className="text-secondary small">
            {filter === 'active' ? 'No active tasks' : 
             filter === 'completed' ? 'No completed tasks' : 
             'Add your first task to get started!'}
          </p>
        </div>
      ) : (
        <div>
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
