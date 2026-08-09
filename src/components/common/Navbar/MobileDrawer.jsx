import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from './navData';

export default function MobileDrawer({ isOpen, onClose }) {
  // Lock body scroll when mobile menu is active
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Dark Overlay Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-3/4 max-w-xs bg-white p-6 shadow-xl flex flex-col justify-between">
        <div>
          {/* Header & Close Button */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-100">
            <span className="font-bold text-lg text-gray-900">Menu</span>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-900 focus:outline-none"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Action Button */}
        <div className="pt-6 border-t border-gray-100 space-y-3">
          <Link
            to="/login"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Login
          </Link>
          <Link
            to="/register"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}