import { useState } from 'react'
import type { Task, TaskFilter } from './types/task'
import TaskList from './components/TaskList'
import AddTask from './components/AddTask'
import TaskFilterComponent from './components/TaskFilter'
import './App.css'

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Learn React',
      completed: false,
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Learn TypeScript',
      completed: true,
      createdAt: new Date()
    }
  ])
  const [filter, setFilter] = useState<TaskFilter>('all')

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date()
    }
    setTasks([...tasks, newTask])
  }

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo List</h1>
      </header>
      
      <main className="app-main">
        <AddTask onAdd={handleAddTask} />
        <TaskFilterComponent filter={filter} onFilterChange={setFilter} />
        <TaskList 
          tasks={tasks} 
          filter={filter}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
        />
      </main>
    </div>
  )
}

export default App
