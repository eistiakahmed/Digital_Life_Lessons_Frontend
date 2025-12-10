import React from 'react';
import { NavLink, Outlet } from 'react-router';
import Logo from '../Shared/Logo/Logo';
import ThemeToggle from '../Components/ThemeToggle';
import { AiOutlinePlus } from 'react-icons/ai';
import { LuBookMarked, LuLayoutDashboard } from 'react-icons/lu';

const DashboardLayouts = () => {
  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300">
      <div className="flex w-11/12 mx-auto gap-6 py-6">
        
        <aside className="w-64 h-[95vh] bg-base-100 rounded-xl shadow-lg p-6 hidden md:flex flex-col">
          
          <div className="text-2xl font-bold mb-8 flex items-center justify-center text-primary">
            <Logo />
          </div>

          
          <ul className="space-y-3 flex-1">
            
            <li>
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-primary-content shadow-md'
                      : 'hover:bg-base-300 text-base-content'
                  }`
                }
              >
                <LuLayoutDashboard size={20} />
                Dashboard
              </NavLink>
            </li>

            
            <li>
              <NavLink
                to="/dashboard/my_lessons"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-primary-content shadow-md'
                      : 'hover:bg-base-300 text-base-content'
                  }`
                }
              >
                <LuBookMarked size={20} />
                My Lessons
              </NavLink>
            </li>

            
            <li>
              <NavLink
                to="/dashboard/add_lesson"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-primary-content shadow-md'
                      : 'hover:bg-base-300 text-base-content'
                  }`
                }
              >
                <AiOutlinePlus size={20} />
                Add Lesson
              </NavLink>
            </li>
          </ul>

          
          <div className="pt-6 border-t border-base-300 text-sm text-center text-base-content">
            DigitalLifeLessons &copy; 2025
          </div>
        </aside>

        
        <main className="flex-1 flex flex-col gap-6">
          {/* Top Navbar */}
          <div className="flex justify-between items-center p-4 bg-base-100 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button className="btn btn-primary btn-sm font-bold hover:scale-105 rounded-full transition-transform duration-200">
                Logout
              </button>
            </div>
          </div>

          
          <div className="flex-1 bg-base-100 rounded-xl shadow-inner p-6 transition-colors duration-300">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayouts;
