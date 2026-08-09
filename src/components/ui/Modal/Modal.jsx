import { useEffect, useRef } from 'react';

const SIZES = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
};

/**
 * Reusable Atomic Modal Component
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Triggered on backdrop click, close button, or ESC key
 * @param {'sm'|'md'|'lg'|'xl'|'2xl'} size - Max width constraint of modal container
 * @param {boolean} closeOnOverlayClick - Allows closing when clicking the backdrop
 * @param {boolean} closeOnEsc - Allows closing via keyboard Escape key
 */
export default function Modal({
  isOpen,
  onClose,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  children,
  className = '',
}) {
  const modalRef = useRef(null);

  // 1. Lock background body scrolling when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // 2. Keyboard control - Close modal on ESC key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (closeOnEsc && event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  // 3. Shift focus into the modal frame on mount for screen readers
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeStyle = SIZES[size] || SIZES.md;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dark Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal Dialog Box */}
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        className={`relative w-full ${sizeStyle} bg-white rounded-xl shadow-2xl border border-gray-100 z-10 focus:outline-none ${className}`.trim()}
      >
        {children}
      </div>
    </div>
  );
}

/* Compound Sub-components for Structured Layouts */
Modal.Header = function ModalHeader({ children, onClose, className = '' }) {
  return (
    <div className={`flex items-center justify-between p-5 border-b border-gray-100 ${className}`}>
      <div className="flex-grow">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 ml-3"
          aria-label="Close modal"
        >
          ✕
        </button>
      )}
    </div>
  );
};

Modal.Title = function ModalTitle({ children, className = '' }) {
  return <h2 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h2>;
};

Modal.Body = function ModalBody({ children, className = '' }) {
  return <div className={`p-5 text-sm text-gray-600 ${className}`}>{children}</div>;
};

Modal.Footer = function ModalFooter({ children, className = '' }) {
  return (
    <div className={`flex items-center justify-end gap-3 p-5 bg-gray-50/50 border-t border-gray-100 rounded-b-xl ${className}`}>
      {children}
    </div>
  );
};