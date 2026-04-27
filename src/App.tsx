import { useAppDispatch, useAppSelector } from './store/hooks'
import { useGetTasksQuery, useCreateTaskMutation, useCompleteTaskMutation, useIncompleteTaskMutation, useDeleteTaskMutation } from './store/apiSlice'
import { setFilter } from './store/filterSlice'
import TaskList from './components/TaskList'
import AddTask from './components/AddTask'
import TaskFilterComponent from './components/TaskFilter'

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
    try {
      await createTask({ text })
    } catch (err) {
      console.error('Failed to create task:', err)
    }
  }

  const handleToggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id)
    if (!task) return

    try {
      if (task.completed) {
        await incompleteTask(id)
      } else {
        await completeTask(id)
      }
    } catch (err) {
      console.error('Failed to toggle task:', err)
    }
  }

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id)
    } catch (err) {
      console.error('Failed to delete task:', err)
    }
  }

  return (
    <div className="container my-4 border rounded p-0" style={{ maxWidth: 800 }}>
      <header className="mb-2">
        <h1 className="text-center fw-bold">Todo List</h1>
      </header>
      
      <main>
        <AddTask onAdd={handleAddTask} />
        <TaskList 
          tasks={tasks} 
          filter={filter}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
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
        <TaskFilterComponent 
          filter={filter} 
          onFilterChange={(newFilter) => dispatch(setFilter(newFilter))}
          tasks={tasks}
        />
      </main>
    </div>
  )
}

export default App
