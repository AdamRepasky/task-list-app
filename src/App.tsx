import { useAppDispatch, useAppSelector } from './store/hooks'
import { useGetTasksQuery, useCreateTaskMutation, useCompleteTaskMutation, useIncompleteTaskMutation, useDeleteTaskMutation } from './store/apiSlice'
import { setFilter } from './store/filterSlice'
import type { TaskFilter } from './types/task'
import TaskList from './components/TaskList'
import AddTask from './components/AddTask'
import TaskFilterComponent from './components/TaskFilter'
import './App.css'

function App() {
  const dispatch = useAppDispatch()
  const filter = useAppSelector((state) => state.filter.filter)
  
  // RTK Query hooks
  const { data: tasks = [], isLoading, error } = useGetTasksQuery()
  const [createTask] = useCreateTaskMutation()
  const [completeTask] = useCompleteTaskMutation()
  const [incompleteTask] = useIncompleteTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()

  const handleAddTask = async (title: string) => {
    try {
      await createTask({ title })
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
    <div className="app">
      <header className="app-header">
        <h1>Todo List</h1>
      </header>
      
      <main className="app-main">
        <AddTask onAdd={handleAddTask} />
        <TaskFilterComponent 
          filter={filter} 
          onFilterChange={(newFilter) => dispatch(setFilter(newFilter))} 
        />
        <TaskList 
          tasks={tasks} 
          filter={filter}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
        />
        {isLoading && <p>Loading tasks...</p>}
        {error && <p>Error loading tasks: {JSON.stringify(error)}</p>}
      </main>
    </div>
  )
}

export default App
