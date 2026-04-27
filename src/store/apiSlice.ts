import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Task } from '../types/task';

// Define the API slice
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
    createTask: builder.mutation<Task, { title: string }>({
      query: (task) => ({
        url: '/tasks',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Task'], // Invalidate cache when creating
    }),

    // Update task text
    updateTask: builder.mutation<Task, { id: string; title: string }>({
      query: ({ id, title }) => ({
        url: `/tasks/${id}`,
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: ['Task'],
    }),

    // Complete a task
    completeTask: builder.mutation<Task, string>({
      query: (id) => ({
        url: `/tasks/${id}/complete`,
        method: 'POST',
      }),
      invalidatesTags: ['Task'],
    }),

    // Incomplete a task
    incompleteTask: builder.mutation<Task, string>({
      query: (id) => ({
        url: `/tasks/${id}/incomplete`,
        method: 'POST',
      }),
      invalidatesTags: ['Task'],
    }),

    // Delete a task
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
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
