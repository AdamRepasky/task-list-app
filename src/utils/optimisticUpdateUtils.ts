import type { Task } from '../types/task';

// Helper functions for optimistic updates
export const optimisticUpdateUtils = {
  // Add a temporary task to the cache
  addTempTask: (dispatch: any, apiSlice: any, task: { text: string }) => {
    const tempTask: Task = {
      id: `temp-${Date.now()}`,
      text: task.text,
      completed: false, // New tasks always start incomplete
      createdDate: Date.now(),
    };

    dispatch(
      apiSlice.util.updateQueryData('getTasks', undefined, (draft: Task[]) => {
        draft.unshift(tempTask);
      })
    );

    return tempTask;
  },

  // Replace a temporary task with the real one
  replaceTempTask: (dispatch: any, apiSlice: any, tempId: string, realTask: Task) => {
    dispatch(
      apiSlice.util.updateQueryData('getTasks', undefined, (draft: Task[]) => {
        const index = draft.findIndex(t => t.id === tempId);
        if (index !== -1) {
          draft[index] = realTask;
        }
      })
    );
  },

  // Remove a temporary task if creation fails
  removeTempTask: (dispatch: any, apiSlice: any, tempId: string) => {
    dispatch(
      apiSlice.util.updateQueryData('getTasks', undefined, (draft: Task[]) => {
        return draft.filter(t => t.id !== tempId);
      })
    );
  },

  // Update a task in cache with rollback support
  updateTaskWithRollback: (dispatch: any, apiSlice: any, taskId: string, updateFn: (task: Task) => void) => {
    let originalTask: Task | undefined;

    dispatch(
      apiSlice.util.updateQueryData('getTasks', undefined, (draft: Task[]) => {
        const task = draft.find(t => t.id === taskId);
        if (task) {
          originalTask = { ...task };
          updateFn(task);
        }
      })
    );

    return originalTask;
  },

  // Replace a task with server response
  replaceTask: (dispatch: any, apiSlice: any, taskId: string, updatedTask: Task) => {
    dispatch(
      apiSlice.util.updateQueryData('getTasks', undefined, (draft: Task[]) => {
        const index = draft.findIndex(t => t.id === taskId);
        if (index !== -1) {
          draft[index] = updatedTask;
        }
      })
    );
  },

  // Restore original task if update fails
  restoreTask: (dispatch: any, apiSlice: any, originalTask: Task) => {
    dispatch(
      apiSlice.util.updateQueryData('getTasks', undefined, (draft: Task[]) => {
        const index = draft.findIndex(t => t.id === originalTask.id);
        if (index !== -1) {
          draft[index] = originalTask;
        }
      })
    );
  },

  // Optimistically delete a task
  deleteTaskOptimistic: (dispatch: any, apiSlice: any, taskId: string) => {
    let deletedTask: Task | undefined;

    dispatch(
      apiSlice.util.updateQueryData('getTasks', undefined, (draft: Task[]) => {
        const index = draft.findIndex(t => t.id === taskId);
        if (index !== -1) {
          deletedTask = draft[index];
          draft.splice(index, 1);
        }
      })
    );

    return deletedTask;
  },

  // Restore a deleted task if deletion fails
  restoreDeletedTask: (dispatch: any, apiSlice: any, deletedTask: Task) => {
    dispatch(
      apiSlice.util.updateQueryData('getTasks', undefined, (draft: Task[]) => {
        draft.push(deletedTask);
      })
    );
  },
};
