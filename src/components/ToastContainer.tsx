import { useAppSelector } from '../store/hooks';
import { removeToast } from '../store/toastSlice';
import { useAppDispatch } from '../store/hooks';
import Toast from './Toast';

export default function ToastContainer() {
  const toasts = useAppSelector((state) => state.toast.toasts);
  const dispatch = useAppDispatch();

  return (
    <div 
      className="position-fixed bottom-0 start-0 p-3 d-flex flex-column gap-2"
      style={{
        zIndex: 9999,
        maxWidth: '100vw',
        boxSizing: 'border-box'
      }}
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          onClose={() => dispatch(removeToast(toast.id))}
        />
      ))}
    </div>
  );
}
