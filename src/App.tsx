import { useAppDispatch, useAppSelector } from './store/hooks'
import { useGetTasksQuery, useCreateTaskMutation, useCompleteTaskMutation, useIncompleteTaskMutation, useDeleteTaskMutation } from './store/apiSlice'
import { setFilter } from './store/filterSlice'
import { addToast } from './store/toastSlice'
import TopTaskControls from './components/TopTaskControls';
import TaskList from './components/TaskList';
import BottomTaskControls from './components/BottomTaskControls';
import ToastContainer from './components/ToastContainer';

function App() {
  const dispatch = useAppDispatch()
  const filter = useAppSelector((state) => state.filter.filter)
  
  // RTK Query hooks
  const { data: tasks = [], isLoading, error } = useGetTasksQuery()
  const [createTask] = useCreateTaskMutation()
  const [completeTask] = useCompleteTaskMutation()
  const [incompleteTask] = useIncompleteTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()

  const handleAddTask = async (text: string) => {
    const result = await createTask({ text })
    if (result.error) {
      dispatch(addToast('Unable to add task. Please check your connection and try again.'));
    }
  }

  const handleToggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id)
    if (!task) return

    let result;
    if (task.completed) {
      result = await incompleteTask(id)
    } else {
      result = await completeTask(id)
    }
    
    if (result.error) {
      dispatch(addToast('Could not update task status. Please try again later.'));
    }
  }

  const handleDeleteTask = async (id: string) => {
    const result = await deleteTask(id)
    if (result.error) {
      dispatch(addToast('Unable to delete task. Please try again later.'));
    }
  }

  const handleDeleteCompleted = async () => {
    const completedTasks = tasks.filter(task => task.completed)
    const results = await Promise.all(completedTasks.map(task => deleteTask(task.id)))
    if (results.some(result => result.error)) {
      dispatch(addToast('Some completed tasks could not be deleted. Please try again later.'));
    }
  }

  const handleCompleteAll = async () => {
    const incompleteTasks = tasks.filter(task => !task.completed)
    const completedTasks = tasks.filter(task => task.completed)
    
    if (incompleteTasks.length > 0) {
      // Complete all incomplete tasks
      const results = await Promise.all(incompleteTasks.map(task => completeTask(task.id)))
      if (results.some(result => result.error)) {
        dispatch(addToast('Unable to complete all tasks. Please try again later.'));
      }
    } else {
      // Uncheck all completed tasks
      const results = await Promise.all(completedTasks.map(task => incompleteTask(task.id)))
      if (results.some(result => result.error)) {
        dispatch(addToast('Unable to uncheck all tasks. Please try again later.'));
      }
    }
  }

  return (
    <div className="card border rounded p-0 my-md-4 mx-auto" style={{ maxWidth: 800 }}>
      <header className="mb-2">
        <h1 className="text-center fw-bold">Todo List</h1>
      </header>
      
      <main>
        <TopTaskControls onAdd={handleAddTask} tasks={tasks} onCompleteAll={handleCompleteAll} />
        <TaskList 
          tasks={tasks} 
          filter={filter}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          isLoading={isLoading}
        />
        {isLoading && (
        <div className="text-center py-3">
          <div className="spinner-grow spinner-grow-sm me-2" role="status"></div>
          <span className="text-muted">Loading tasks...</span>
          </div>
        )}
        {error && (
        <div className="text-center py-3">
          <p className="text-danger">Error loading tasks</p>
          </div>
        )}
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
