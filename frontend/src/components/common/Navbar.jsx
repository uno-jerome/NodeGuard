import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShieldAlert, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClasses = ({ isActive }) =>
    `text-sm font-medium transition-colors px-3 py-2 rounded-md ${
      isActive
        ? 'bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-white'
        : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white">
              <ShieldAlert className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span className="text-lg tracking-tight">NodeGuard</span>
            </Link>
            <nav className="hidden md:flex items-center gap-2">
              <NavLink to="/report" className={navLinkClasses}>Report Incident</NavLink>
              <NavLink to="/track" className={navLinkClasses}>Track Case</NavLink>
              {isAuthenticated && (
                <NavLink to="/dashboard" className={navLinkClasses}>Case Queue</NavLink>
              )}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium">
                  {user?.name || user?.email} ({user?.role})
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-rose-600 dark:text-slate-300 dark:hover:text-rose-400"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Staff Portal
              </Link>
            )}
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 px-4 pt-2 pb-4 space-y-1 bg-white dark:bg-slate-900">
          <NavLink to="/report" onClick={() => setMobileMenuOpen(false)} className={navLinkClasses}>Report Incident</NavLink>
          <NavLink to="/track" onClick={() => setMobileMenuOpen(false)} className={navLinkClasses}>Track Case</NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)} className={navLinkClasses}>Case Queue</NavLink>
              <button
                type="button"
                onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-rose-600 dark:text-rose-400 font-medium"
              >
                <LogOut className="h-4 w-4" />
                Logout ({user?.name || user?.email})
              </button>
            </>
          ) : (
            <NavLink to="/login" onClick={() => setMobileMenuOpen(false)} className={navLinkClasses}>Staff Portal</NavLink>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
