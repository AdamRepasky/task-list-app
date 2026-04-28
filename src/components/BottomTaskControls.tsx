import type { TaskFilter, Task } from '../types/task';

interface BottomTaskControlsProps {
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  tasks: Task[];
  onDeleteCompleted: () => void;
}

export default function BottomTaskControls({ filter, onFilterChange, tasks, onDeleteCompleted }: BottomTaskControlsProps) {
  const activeTasksCount = tasks.filter(task => !task.completed).length;
  const completedTasksCount = tasks.filter(task => task.completed).length;

  return (
    <div className="border-top p-3">
      <div className="row align-items-center">
        <div className="col-12 col-md-4 text-muted text-center text-md-start order-1 order-md-1">
          {activeTasksCount > 0 ? (
            `${activeTasksCount} unfinished ${activeTasksCount === 1 ? 'item' : 'items'} remaining`
          ) : (
            <span style={{ visibility: 'hidden' }}>0 unfinished items remaining</span>
          )}
        </div>
        
        <div className="col-12 col-md-4 d-flex justify-content-center order-3 order-md-2 mt-2 mt-md-0">
          <div className="btn-group w-100" role="group">
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
        </div>
        
        <div className="col-12 col-md-4 text-center text-md-end order-4 order-md-3 mt-2 mt-md-0">
          <button 
            className="btn btn-outline-danger w-100"
            onClick={onDeleteCompleted}
            disabled={completedTasksCount === 0}
          >
            <i className="bi bi-trash"></i> Delete completed
          </button>
        </div>
      </div>
    </div>
  );
}
