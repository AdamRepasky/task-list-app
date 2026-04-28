import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../store/apiSlice'
import filterReducer from '../store/filterSlice'
import toastReducer from '../store/toastSlice'
import type { Task } from '../types/task'

// Test store setup
export const createTestStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      filter: filterReducer,
      toast: toastReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  })
}

// Custom render function with Redux provider
export const renderWithProvider = (
  ui: React.ReactElement,
  { store = createTestStore() } = {}
) => {
  return {
    ...render(ui, {
      wrapper: ({ children }) => (
        <Provider store={store}>
          {children}
        </Provider>
      ),
    }),
    store,
  }
}

// Mock tasks for testing
export const mockTasks: Task[] = [
  {
    id: '1',
    text: 'Test task 1',
    completed: false,
    createdDate: Date.now() - 10000,
  },
  {
    id: '2',
    text: 'Test task 2',
    completed: true,
    createdDate: Date.now() - 5000,
  },
  {
    id: '3',
    text: 'Test task 3',
    completed: false,
    createdDate: Date.now() - 1000,
  },
]
