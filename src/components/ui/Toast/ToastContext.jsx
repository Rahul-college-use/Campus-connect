/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

const VARIANTS = {
  success: 'bg-green-50 border-green-500 text-green-900',
  error: 'bg-red-50 border-red-500 text-red-900',
  warning: 'bg-yellow-50 border-yellow-500 text-yellow-900',
  info: 'bg-blue-50 border-blue-500 text-blue-900',
};

const ICONS = {
  success: '✓',
  error: '✕',
  warning: '⚠️',
  info: 'ℹ️',
};

// Available positions styling
const POSITIONS = {
  'top-right': 'top-5 right-5 items-end',
  'top-left': 'top-5 left-5 items-start',
  'top-center': 'top-5 left-1/2 -translate-x-1/2 items-center',
  'bottom-right': 'bottom-5 right-5 items-end',
  'bottom-left': 'bottom-5 left-5 items-start',
  'bottom-center': 'bottom-5 left-1/2 -translate-x-1/2 items-center',
};

/**
 * Toast Provider Wrapper
 */
export function ToastProvider({ children, position: defaultPosition = 'top-right' }) {
  const [toasts, setToasts] = useState([]);

  // Remove a toast by ID
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // Add a new toast (Accepts individual position)
  const addToast = useCallback(
    ({
      title,
      message,
      variant = 'info',
      duration = 4000,
      position = defaultPosition, // ✅ individual position ya default fallback
    }) => {
      const id = Date.now() + Math.random().toString();

      setToasts((prev) => [...prev, { id, title, message, variant, duration, position }]);

      // Auto-dismiss timer
      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [defaultPosition, removeToast]
  );

  // Group toasts by their respective positions
  const groupedToasts = toasts.reduce((acc, toast) => {
    const pos = POSITIONS[toast.position] ? toast.position : defaultPosition;
    if (!acc[pos]) acc[pos] = [];
    acc[pos].push(toast);
    return acc;
  }, {});

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      {/* Render container for each active position */}
      {Object.entries(groupedToasts).map(([posKey, toastList]) => (
        <div
          key={posKey}
          className={`fixed z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0 ${
            POSITIONS[posKey] || POSITIONS['top-right']
          }`}
        >
          {toastList.map((toast) => (
            <div
              key={toast.id}
              className={`pointer-events-auto w-full flex items-start gap-3 p-4 rounded-xl border-l-4 shadow-lg bg-white transition-all duration-300 ${
                VARIANTS[toast.variant] || VARIANTS.info
              }`}
              role="alert"
            >
              {/* Variant Icon */}
              <span className="text-base font-bold shrink-0 mt-0.5">
                {ICONS[toast.variant] || ICONS.info}
              </span>

              {/* Content Area */}
              <div className="flex-grow text-sm">
                {toast.title && <h4 className="font-semibold text-gray-900">{toast.title}</h4>}
                {toast.message && <p className="text-gray-600 mt-0.5">{toast.message}</p>}
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-gray-400 hover:text-gray-700 p-1 rounded-md transition-colors focus:outline-none cursor-pointer"
                aria-label="Close notification"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      ))}
    </ToastContext.Provider>
  );
}

/**
 * Custom Hook to trigger toasts anywhere in the app
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}