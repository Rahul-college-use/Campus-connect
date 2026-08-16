import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link } from 'react-router-dom';
import Logout from '../../../pages/Logout/Logout';

export default function MobileDrawer({ isOpen, onClose, navLinks = [], user = null }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] md:hidden transition-all duration-300 ${
        isOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      {/* 1. Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* 2. Slide-out Drawer Panel */}
      <div
        className={`fixed right-0 top-0 bottom-0 h-full w-[280px] max-w-[80vw] bg-white p-6 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out z-10 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Header & Close Button */}
          <div className="flex items-center justify-between pb-5 border-b border-gray-100">
            <span className="font-bold text-lg text-gray-900 tracking-tight">
              <span className="text-blue-600">Campus</span>Connect
            </span>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
              aria-label="Close menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* User Profile Badge (if logged in) */}
          {user && (
            <div className="mt-4 px-3.5 py-3 rounded-lg bg-gray-50 border border-gray-100">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                Logged in as
              </p>
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user.name || 'User'}
              </p>
              {user.role && (
                <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700 capitalize">
                  {user.role}
                </span>
              )}
            </div>
          )}

          {/* Dynamic Navigation Links */}
          <nav className="mt-5 flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Dynamic Action Buttons */}
        <div className="pt-5 mt-4 border-t border-gray-100 flex flex-col gap-2.5">
          {user ? (
            <div onClick={onClose} className="w-full">
              <Logout />
            </div>
          ) : (
            <>
              <Link
                to="/login"
                onClick={onClose}
                className="w-full inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={onClose}
                className="w-full inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 shadow-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}