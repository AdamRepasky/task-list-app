import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Task } from '../types/task';
import { optimisticUpdateUtils } from '../utils/optimisticUpdateUtils';

/**
 * Redux Toolkit Query API slice for task management.
 * Handles all server communication including CRUD operations with optimistic updates.
 * Provides cached data management and automatic re-fetching.
 */
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8080',
  }),
  tagTypes: ['Task'], // For cache invalidation
  endpoints: (builder) => ({
    // Get all tasks
    getTasks: builder.query<Task[], void>({
      query: () => '/tasks',
      providesTags: ['Task'], // Cache tag for this data
    }),

    // Create a new task
    createTask: builder.mutation<Task, { text: string }>({
      query: (task) => ({
        url: '/tasks',
        method: 'POST',
        body: task,
      }),
      // Optimistic update
      onQueryStarted: async (task, { dispatch, queryFulfilled }) => {
        const tempTask = optimisticUpdateUtils.addTempTask(dispatch, apiSlice, task);

        try {
          const { data: createdTask } = await queryFulfilled;
          optimisticUpdateUtils.replaceTempTask(dispatch, apiSlice, tempTask.id, createdTask);
        } catch {
          optimisticUpdateUtils.removeTempTask(dispatch, apiSlice, tempTask.id);
        }
      },
    }),

    // Update task text
    updateTask: builder.mutation<Task, { id: string; text: string }>({
      query: ({ id, text }) => ({
        url: `/tasks/${id}`,
        method: 'POST',
        body: { text },
      }),
      // Optimistic update
      onQueryStarted: async ({ id, text }, { dispatch, queryFulfilled }) => {
        const originalTask = optimisticUpdateUtils.updateTaskWithRollback(dispatch, apiSlice, id, (task) => {
          task.text = text;
        });

        try {
          const { data: updatedTask } = await queryFulfilled;
          optimisticUpdateUtils.replaceTask(dispatch, apiSlice, id, updatedTask);
        } catch {
          if (originalTask) {
            optimisticUpdateUtils.restoreTask(dispatch, apiSlice, originalTask);
          }
        }
      },
    }),

    // Complete a task
    completeTask: builder.mutation<Task, string>({
      query: (id) => ({
        url: `/tasks/${id}/complete`,
        method: 'POST',
      }),
      // Optimistic update
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const originalTask = optimisticUpdateUtils.updateTaskWithRollback(dispatch, apiSlice, id, (task) => {
          task.completed = true;
          task.completedDate = Date.now();
        });

        try {
          const { data: updatedTask } = await queryFulfilled;
          optimisticUpdateUtils.replaceTask(dispatch, apiSlice, id, updatedTask);
        } catch {
          if (originalTask) {
            optimisticUpdateUtils.restoreTask(dispatch, apiSlice, originalTask);
          }
        }
      },
    }),

    // Incomplete a task
    incompleteTask: builder.mutation<Task, string>({
      query: (id) => ({
        url: `/tasks/${id}/incomplete`,
        method: 'POST',
      }),
      // Optimistic update
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const originalTask = optimisticUpdateUtils.updateTaskWithRollback(dispatch, apiSlice, id, (task) => {
          task.completed = false;
          delete task.completedDate;
        });

        try {
          const { data: updatedTask } = await queryFulfilled;
          optimisticUpdateUtils.replaceTask(dispatch, apiSlice, id, updatedTask);
        } catch {
          if (originalTask) {
            optimisticUpdateUtils.restoreTask(dispatch, apiSlice, originalTask);
          }
        }
      },
    }),

    // Delete a task
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      // Optimistic update
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const deletedTask = optimisticUpdateUtils.deleteTaskOptimistic(dispatch, apiSlice, id);

        try {
          await queryFulfilled;
        } catch {
          if (deletedTask) {
            optimisticUpdateUtils.restoreDeletedTask(dispatch, apiSlice, deletedTask);
          }
        }
      },
    }),
  }),
});

// Export hooks for each endpoint
export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useCompleteTaskMutation,
  useIncompleteTaskMutation,
  useDeleteTaskMutation,
} = apiSlice;
