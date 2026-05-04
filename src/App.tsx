import { useAppDispatch, useAppSelector } from './store/hooks'
import { useGetTasksQuery } from './store/apiSlice'
import { setFilter } from './store/filterSlice'
import TopTaskControls from './components/TopTaskControls';
import TaskList from './components/TaskList';
import BottomTaskControls from './components/BottomTaskControls';
import ToastContainer from './components/ToastContainer';
import { useTaskActions } from './hooks/useTaskActions';

function App() {
  const dispatch = useAppDispatch()
  const filter = useAppSelector((state) => state.filter.filter)
  
  // RTK Query hooks
  const { data: tasks = [], isLoading, error } = useGetTasksQuery()
  
  // Custom hook for all task actions
  const {
    handleAddTask,
    handleToggleTask,
    handleDeleteTask,
    handleEditTask,
    handleDeleteCompleted,
    handleCompleteAll,
  } = useTaskActions(tasks)

  return (
    <div className="card border rounded p-0 my-md-4 mx-auto app-max-width">
      <header className="my-2">
        <h1 className="text-center fw-bold mb-0">Todo List</h1>
      </header>
      
      <main>
        <TopTaskControls onAdd={handleAddTask} tasks={tasks} onCompleteAll={handleCompleteAll} />
        <TaskList 
          tasks={tasks} 
          filter={filter}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
          isLoading={isLoading}
          error={error}
        />
        <BottomTaskControls 
          filter={filter} 
          onFilterChange={(newFilter) => dispatch(setFilter(newFilter))}
          tasks={tasks}
          onDeleteCompleted={handleDeleteCompleted}
        />
      </main>
      <ToastContainer />
    </div>
  )
}

export default App
