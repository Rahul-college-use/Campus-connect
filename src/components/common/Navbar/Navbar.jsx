import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { NAV_LINKS } from './navData';
import MobileDrawer from './MobileDrawer';

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
          <span className="text-blue-600">Campus</span>Connect
        </Link>

        {/* Desktop Links with Active Styling */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Register
          </Link>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>

      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </header>
  );
}