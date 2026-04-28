import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Toast {
  id: string;
  message: string;
}

interface ToastState {
  toasts: Toast[];
}

const initialState: ToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<string>) => {
      const toast: Toast = {
        id: Date.now().toString(),
        message: action.payload,
      };
      console.log('addToast action called with:', toast);
      state.toasts.push(toast);
      console.log('Current toasts after add:', state.toasts);
    },
    removeToast: (state, action: PayloadAction<string>) => {
      console.log('removeToast action called for id:', action.payload);
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
    },
    clearToasts: (state) => {
      console.log('clearToasts action called');
      state.toasts = [];
    },
  },
});

export const { addToast, removeToast, clearToasts } = toastSlice.actions;
export default toastSlice.reducer;
