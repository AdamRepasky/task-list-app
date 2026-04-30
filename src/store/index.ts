/**
 * Redux store configuration for the task management application.
 * Combines all reducers and middleware for state management.
 * Exports typed RootState and AppDispatch for type safety.
 */
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import filterReducer from './filterSlice';
import toastReducer from './toastSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    toast: toastReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, //RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
