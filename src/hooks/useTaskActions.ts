import { useAppDispatch } from '../store/hooks'
import { useCreateTaskMutation, useCompleteTaskMutation, useIncompleteTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } from '../store/apiSlice'
import { addToast } from '../store/toastSlice'
import { t } from '../i18n'
import type { Task } from '../types/task'

export const useTaskActions = (tasks: Task[]) => {
  const dispatch = useAppDispatch()
  const [createTask] = useCreateTaskMutation()
  const [updateTask] = useUpdateTaskMutation()
  const [completeTask] = useCompleteTaskMutation()
  const [incompleteTask] = useIncompleteTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()

  const handleAddTask = async (text: string) => {
    const result = await createTask({ text })
    if (result.error) {
      dispatch(addToast(t.TASK_ERRORS.ADD_FAILED))
    }
  }

  // TODO: Consider adding debounce
  const handleToggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id)
    if (!task) return

    const result = task.completed 
      ? await incompleteTask(id)
      : await completeTask(id)
    
    if (result.error) {
      dispatch(addToast(t.TASK_ERRORS.TOGGLE_FAILED))
    }
  }

  const handleDeleteTask = async (id: string) => {
    const result = await deleteTask(id)
    if (result.error) {
      dispatch(addToast(t.TASK_ERRORS.DELETE_FAILED))
    }
  }

  const handleEditTask = async (id: string, newText: string) => {
    const result = await updateTask({ id, text: newText })
    if (result.error) {
      dispatch(addToast(t.TASK_ERRORS.UPDATE_FAILED))
    }
  }

  const handleDeleteCompleted = async () => {
    const completedTasks = tasks.filter(task => task.completed)
    const results = await Promise.all(completedTasks.map(task => deleteTask(task.id)))
    if (results.some(result => result.error)) {
      dispatch(addToast(t.TASK_ERRORS.DELETE_COMPLETED_FAILED))
    }
  }

  const handleCompleteAll = async () => {
    const incompleteTasks = tasks.filter(task => !task.completed)
    const completedTasks = tasks.filter(task => task.completed)
    
    if (incompleteTasks.length > 0) {
      const results = await Promise.all(incompleteTasks.map(task => completeTask(task.id)))
      if (results.some(result => result.error)) {
        dispatch(addToast(t.TASK_ERRORS.COMPLETE_ALL_FAILED))
      }
    } else {
      const results = await Promise.all(completedTasks.map(task => incompleteTask(task.id)))
      if (results.some(result => result.error)) {
        dispatch(addToast(t.TASK_ERRORS.UNCHECK_ALL_FAILED))
      }
    }
  }

  return {
    handleAddTask,
    handleToggleTask,
    handleDeleteTask,
    handleEditTask,
    handleDeleteCompleted,
    handleCompleteAll,
  }
}
