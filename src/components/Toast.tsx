import { useEffect, useState } from 'react';
import { t } from '../i18n';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleClose = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onClose();
    }, 300); // Give extra time for fadeOut animation to complete
  };

  useEffect(() => {
    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`toast show animate-slide-in-left p-0 border-0 toast-fade-transition ${isFadingOut ? 'toast-fade-out' : 'toast-fade-in'} toast-responsive`}
      role="alert" 
      aria-live="assertive" 
      aria-atomic="true"
    >
      <div className="toast-header bg-danger text-white border-0">
        <strong className="me-auto">Error</strong>
        <button 
          type="button" 
          className="btn-close btn-close-white" 
          onClick={handleClose}
          aria-label={t.ACCESSIBILITY.CLOSE}
        ></button>
      </div>
      <div className="toast-body">
        {message}
      </div>
    </div>
  );
}
