import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import filterReducer from './filterSlice';
import toastReducer from './toastSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    toast: toastReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
