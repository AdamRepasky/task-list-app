// Translations of the strings used in UI, can be used for other languages

export const EN = {
  TASK_ERRORS: {
    ADD_FAILED: 'Unable to add task. Please check your connection and try again.',
    UPDATE_FAILED: 'Unable to update task. Please try again later.',
    DELETE_FAILED: 'Unable to delete task. Please try again later.',
    TOGGLE_FAILED: 'Could not update task status. Please try again later.',
    DELETE_COMPLETED_FAILED: 'Some completed tasks could not be deleted. Please try again later.',
    COMPLETE_ALL_FAILED: 'Unable to complete all tasks. Please try again later.',
    UNCHECK_ALL_FAILED: 'Unable to uncheck all tasks. Please try again later.',
  },
  PLACEHOLDERS: {
    NEW_TASK: 'Add a new task...',
  },
  TITLES: {
    COMPLETE_ALL: 'Complete all tasks',
    UNCHECK_ALL: 'Uncheck all tasks',
  },
  UI_STATES: {
    LOADING_TASKS: 'Loading tasks...',
    CONNECTION_ERROR: 'Connection Error',
    CONNECTION_ERROR_MESSAGE: 'Unable to load tasks. Please reload the page later.',
    NO_ACTIVE_TASKS: 'No active tasks',
    NO_COMPLETED_TASKS: 'No completed tasks',
    NO_TASKS_FOUND: 'No tasks found.',
  },
  ACTIONS: {
    DELETE_COMPLETED: 'Delete completed',
    COMPLETED: 'completed',
  },
  ACCESSIBILITY: {
    CLOSE: 'Close',
    SAVE: 'Save',
  },
} as const
