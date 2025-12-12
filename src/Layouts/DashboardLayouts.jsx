import React from 'react';
import { NavLink, Outlet } from 'react-router';
import Logo from '../Shared/Logo/Logo';
import ThemeToggle from '../Components/ThemeToggle';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { AiOutlinePlus } from 'react-icons/ai';
import { LuBookMarked, LuLayoutDashboard } from 'react-icons/lu';
import {
  FaHeart,
  FaUser,
  FaSignOutAlt,
  FaUsers,
  FaBookOpen,
  FaFlag,
  FaShieldAlt,
  
} from 'react-icons/fa';

const DashboardLayouts = () => {
  const { LogoutUser, userDB } = useAuth();
  
  // Check if user is admin
  const isAdmin = userDB?.role === 'admin';

  const handleLogout = () => {
    LogoutUser()
      .then(() => {
        toast.success('Logged out successfully');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300">
      <div className="flex w-11/12 mx-auto gap-6 py-6">
        <aside className="w-64 h-[95vh] bg-base-100 rounded-xl shadow-lg p-6 hidden md:flex flex-col">
          <div className="text-2xl font-bold mb-8 flex items-center justify-center text-primary">
            <Logo />
          </div>

          <ul className="space-y-3 flex-1">
            {/* Admin Navigation */}
            {isAdmin ? (
              <>
                {/* Admin Dashboard */}
                <li>
                  <NavLink
                    to="/dashboard/admin"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-error text-error-content shadow-md'
                          : 'hover:bg-base-300 text-base-content'
                      }`
                    }
                  >
                    <FaShieldAlt size={20} />
                    Admin Dashboard
                  </NavLink>
                </li>

                {/* Manage Users */}
                <li>
                  <NavLink
                    to="/dashboard/admin/manage-users"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-primary text-primary-content shadow-md'
                          : 'hover:bg-base-300 text-base-content'
                      }`
                    }
                  >
                    <FaUsers size={20} />
                    Manage Users
                  </NavLink>
                </li>

                {/* Manage Lessons */}
                <li>
                  <NavLink
                    to="/dashboard/admin/manage-lessons"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-primary text-primary-content shadow-md'
                          : 'hover:bg-base-300 text-base-content'
                      }`
                    }
                  >
                    <FaBookOpen size={20} />
                    Manage Lessons
                  </NavLink>
                </li>

                {/* Reported Lessons */}
                <li>
                  <NavLink
                    to="/dashboard/admin/reported-lessons"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-warning text-warning-content shadow-md'
                          : 'hover:bg-base-300 text-base-content'
                      }`
                    }
                  >
                    <FaFlag size={20} />
                    Reported Content
                  </NavLink>
                </li>

                {/* Admin Profile */}
                <li>
                  <NavLink
                    to="/dashboard/admin/profile"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-primary text-primary-content shadow-md'
                          : 'hover:bg-base-300 text-base-content'
                      }`
                    }
                  >
                    <FaUser size={20} />
                    Admin Profile
                  </NavLink>
                </li>

                {/* Divider */}
                <li className="pt-4">
                  <div className="border-t border-base-300 mb-4"></div>
                  <p className="text-xs text-base-content/50 px-4 mb-2">
                    User Features
                  </p>
                </li>
              </>
            ) : null}

            {/* Regular User Navigation */}
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

            <li>
              <NavLink
                to="/dashboard/favorites"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-primary-content shadow-md'
                      : 'hover:bg-base-300 text-base-content'
                  }`
                }
              >
                <FaHeart size={20} />
                Favorites
              </NavLink>
            </li>

            <li>
              <NavLink
                to={isAdmin ? '/dashboard/admin/profile' : '/dashboard/profile'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-primary-content shadow-md'
                      : 'hover:bg-base-300 text-base-content'
                  }`
                }
              >
                <FaUser size={20} />
                Profile
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
              <button
                onClick={handleLogout}
                className="btn btn-primary btn-sm font-bold hover:scale-105 rounded-full transition-transform duration-200 gap-2"
              >
                <FaSignOutAlt size={16} />
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
