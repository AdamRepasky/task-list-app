import type { TaskFilter, Task } from '../types/task';

interface TaskFilterProps {
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  tasks: Task[];
  onDeleteCompleted: () => void;
}

export default function TaskFilterComponent({ filter, onFilterChange, tasks, onDeleteCompleted }: TaskFilterProps) {
  const activeTasksCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center align-items-md-center border-top p-3 gap-2">
      <div className="text-muted order-1 order-md-1">
        {activeTasksCount} unfinished item remaining
      </div>
      
      <div className="d-flex gap-2 order-3 order-md-2 justify-content-center">
        <button
          onClick={() => onFilterChange('all')}
          className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
        >
          All
        </button>
        <button
          onClick={() => onFilterChange('active')}
          className={`btn ${filter === 'active' ? 'btn-primary' : 'btn-outline-primary'}`}
        >
          Active
        </button>
        <button
          onClick={() => onFilterChange('completed')}
          className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
        >
          Completed
        </button>
      </div>
      
      <button 
        className="btn btn-outline-danger order-4 order-md-3 align-self-md-auto"
        onClick={onDeleteCompleted}
      >
        <i className="bi bi-trash"></i> Delete completed
      </button>
    </div>
  );
}
