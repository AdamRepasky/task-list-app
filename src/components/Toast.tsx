import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
  index: number;
}

export default function Toast({ message, onClose, index }: ToastProps) {
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
      className="toast show animate-slide-in-left p-0 border-0"
      role="alert" 
      aria-live="assertive" 
      aria-atomic="true"
      style={{
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 0.2s ease-out',
        maxWidth: 'calc(100vw - 2rem)',
        minWidth: '250px',
        wordWrap: 'break-word'
      }}
    >
      <div className="toast-header bg-danger text-white border-0">
        <strong className="me-auto">Error</strong>
        <button 
          type="button" 
          className="btn-close btn-close-white" 
          onClick={handleClose}
          aria-label="Close"
        ></button>
      </div>
      <div className="toast-body">
        {message}
      </div>
    </div>
  );
}
