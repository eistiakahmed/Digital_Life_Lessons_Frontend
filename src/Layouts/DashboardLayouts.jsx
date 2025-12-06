import React from 'react';
import { NavLink, Outlet } from 'react-router';
import Logo from '../Shared/Logo/Logo';
import ThemeToggle from '../Components/ThemeToggle';

const DashboardLayouts = () => {
  const sidebarLinks = [
    { name: 'Dashboard Home', path: '/dashboard' },
    { name: 'Add Lesson', path: 'add_lesson' },
    { name: 'My Lessons', path: 'my_lessons' },
  ];

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300">
      <div className="flex w-11/12 mx-auto gap-6 py-6">
        {/* Sidebar */}
        <aside className="w-64 h-[95vh] bg-base-100 rounded-xl shadow-lg p-6 hidden md:flex flex-col">
          {/* Logo */}
          <div className="text-2xl font-bold mb-8 flex items-center justify-center text-primary">
            <Logo />
          </div>

          {/* Navigation */}
          <ul className="space-y-3 flex-1">
            {sidebarLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-primary text-primary-content shadow-md'
                        : 'hover:bg-base-300 text-base-content'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Sidebar Footer */}
          <div className="pt-6 border-t border-base-300 text-sm text-center text-base-content">
            DigitalLifeLessons &copy; 2025
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-6">
          {/* Top Navbar */}
          <div className="flex justify-between items-center p-4 bg-base-100 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold text-primary">
              Dashboard
            </h1>
            <div className="flex items-center gap-3">
              {/* Dark/Light mode toggle */}
              <ThemeToggle />

              {/* Logout Button */}
              <button className="btn btn-primary btn-sm font-bold hover:scale-105 rounded-full transition-transform duration-200">
                Logout
              </button>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="flex-1 bg-base-100 rounded-xl shadow-inner p-6 transition-colors duration-300">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayouts;
