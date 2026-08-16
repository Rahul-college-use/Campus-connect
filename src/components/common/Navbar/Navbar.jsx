import { use, useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { NAV_LINKS } from './navData';
import MobileDrawer from './MobileDrawer';
import Logout from '../../../pages/Logout/Logout';
// Replace with your actual AuthContext path:
import { AuthContext, useAuth } from '../../../context/auth.context'; 

export default function Navbar() {

  const {isAuthenticated}=useAuth();
  // console.log(isAuthenticated)
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Example user shape: { name: 'Alex', role: 'students' } or null
  const { user } = useContext(AuthContext) || { user: null };
  // console.log("user : ",user)

  // Determine links to display based on the user's role
  const currentRole = user?.role || 'general';
  // console.log(currentRole)
  const navLinks = NAV_LINKS[currentRole] || NAV_LINKS.general;
  // console.log(navLinks)

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
          <span className="text-blue-600">Campus</span>Connect
        </Link>

        {/* Dynamic Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
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

        {/* Desktop Auth State / Actions */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">
                Hi, {user?.name || 'User'}
              </span>
              <Logout />
            </div>
          ) : (
            <div className="flex items-center gap-3">
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
          )}
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Drawer (receives links and user state) */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        navLinks={navLinks}
        user={user}
      />
    </header>
  );
}