import { useAppSelector } from '../store/hooks';
import { removeToast } from '../store/toastSlice';
import { useAppDispatch } from '../store/hooks';
import Toast from './Toast';
import type { Toast as ToastType } from '../store/toastSlice';

export default function ToastContainer() {
  const toasts = useAppSelector((state) => state.toast.toasts);
  const dispatch = useAppDispatch();

  return (
    <div 
      className="position-fixed bottom-0 start-0 p-3 d-flex flex-column gap-2 toast-container-fixed"
    >
      {toasts.map((toast: ToastType) => (
        <Toast
          key={toast.id}
          message={toast.message}
          onClose={() => dispatch(removeToast(toast.id))}
        />
      ))}
    </div>
  );
}
