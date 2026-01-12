import { NavLink, Outlet, Link } from 'react-router';
import Logo from '../Shared/Logo/Logo';
import ThemeToggle from '../Components/ThemeToggle';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
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
  FaBars,
  FaTachometerAlt,
  FaChevronDown,
  FaCrown,
} from 'react-icons/fa';


const NavItem = ({ to, icon, label, end, activeColor, onClick }) => (
  <li>
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
          isActive
            ? activeColor || 'bg-primary text-primary-content shadow-md'
            : 'hover:bg-base-300 text-base-content'
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  </li>
);

const DashboardLayouts = () => {
  const { LogoutUser, userDB, user } = useAuth();

  const role = userDB?.role;
  const isAdmin = role === 'admin';
  const isPremium = userDB?.isPremium;

  const handleLogout = async () => {
    try {
      await LogoutUser();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const SidebarContent = ({ onNavClick }) => (
    <>
      <div className="text-2xl font-bold mb-8 flex justify-center text-primary">
        <Logo />
      </div>

      <ul className="space-y-3 flex-1">
        {/* Admin Navigation */}
        {isAdmin ? (
          <>
            <NavItem
              to="/dashboard/admin"
              icon={<FaShieldAlt />}
              label="Admin Dashboard"
              onClick={onNavClick}
            />
            <NavItem
              to="/dashboard/admin/manage_users"
              icon={<FaUsers />}
              label="Manage Users"
              onClick={onNavClick}
            />
            <NavItem
              to="/dashboard/admin/manage_lessons"
              icon={<FaBookOpen />}
              label="Manage Lessons"
              onClick={onNavClick}
            />
            <NavItem
              to="/dashboard/admin/reported_lessons"
              icon={<FaFlag />}
              label="Reported Content"
              activeColor="bg-warning text-warning-content"
              onClick={onNavClick}
            />
            <NavItem
              to="/dashboard/admin/profile"
              icon={<FaUser />}
              label="Admin Profile"
              onClick={onNavClick}
            />
          </>
        ) : (
          <>
            <NavItem
              to="/dashboard"
              end
              icon={<LuLayoutDashboard />}
              label="Dashboard"
              onClick={onNavClick}
            />
            <NavItem
              to="/dashboard/my_lessons"
              icon={<LuBookMarked />}
              label="My Lessons"
              onClick={onNavClick}
            />
            <NavItem
              to="/dashboard/add_lesson"
              icon={<AiOutlinePlus />}
              label="Add Lesson"
              onClick={onNavClick}
            />
            <NavItem
              to="/dashboard/favorites"
              icon={<FaHeart />}
              label="Favorites"
              onClick={onNavClick}
            />
            <NavItem
              to="/dashboard/profile"
              icon={<FaUser />}
              label="Profile"
              onClick={onNavClick}
            />
          </>
        )}
      </ul>

      <div className="pt-6 border-t text-sm text-center text-base-content">
        DigitalLifeLessons © 2026
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300">
      <div className="drawer lg:drawer-open">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />

        <div className="drawer-content flex flex-col">
          <div className="navbar bg-base-100 lg:hidden shadow-md">
            <div className="flex-none">
              <label
                htmlFor="dashboard-drawer"
                className="btn btn-square btn-ghost"
              >
                <FaBars className="w-5 h-5" />
              </label>
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-primary">Dashboard</h1>
            </div>
            <div className="flex-none flex items-center gap-2">
              <ThemeToggle />
              
              {/* Profile Dropdown for Mobile */}
              <div className="dropdown dropdown-end">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-2 p-1 rounded-lg hover:bg-base-200 transition-colors cursor-pointer"
                >
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-full ring-2 ring-primary/20">
                      <img
                        src={
                          user?.photoURL ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user?.displayName || 'User'
                          )}&background=4F46E5&color=fff`
                        }
                        alt={user?.displayName || 'User'}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium text-base-content truncate max-w-24">
                      {user?.displayName || 'User'}
                    </div>
                    <div className="text-xs text-base-content/60">
                      {isPremium ? 'Premium' : isAdmin ? 'Admin' : 'Free'}
                    </div>
                  </div>
                  <FaChevronDown className="w-3 h-3 text-base-content/60 hidden sm:block" />
                </motion.div>

                {/* Advanced Dropdown Menu */}
                <ul className="dropdown-content menu bg-base-100 rounded-2xl shadow-2xl border border-base-300/50 w-90 p-4 mt-2 z-50">
                  {/* User Info Header */}
                  <li className="mb-3 p-3 bg-base-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-full">
                          <img
                            src={
                              user?.photoURL ||
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                user?.displayName || 'User'
                              )}&background=4F46E5&color=fff`
                            }
                            alt={user?.displayName || 'User'}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-base-content">
                          {user?.displayName || 'User'}
                        </div>
                        <div className="text-sm text-base-content/60 truncate">
                          {user?.email}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {isPremium && (
                            <span className="badge badge-warning badge-xs gap-1">
                              <FaCrown className="w-2 h-2" />
                              Premium
                            </span>
                          )}
                          {isAdmin && (
                            <span className="badge badge-error badge-xs gap-1">
                              <FaShieldAlt className="w-2 h-2" />
                              Admin
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>

                  
                  
                  

                  {isAdmin && (
                    <li>
                      <Link
                        to="/dashboard/admin"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-error/10 text-error"
                      >
                        <FaShieldAlt className="w-4 h-4" />
                        <span>Admin Panel</span>
                      </Link>
                    </li>
                  )}

                  {!isPremium && !isAdmin && (
                    <li>
                      <Link
                        to="/pricing"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-warning/10 text-warning"
                      >
                        <FaCrown className="w-4 h-4" />
                        <span>Upgrade to Premium</span>
                      </Link>
                    </li>
                  )}

                  <div className="divider my-2"></div>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-error/10 text-error w-full"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex w-11/12 mx-auto gap-6 py-6">
            {/* Desktop Sidebar */}
            <aside className="w-64 min-h-[95vh] bg-base-100 rounded-xl shadow-lg p-6 flex flex-col z-20">
              <SidebarContent />
            </aside>

            {/* Desktop Main Content */}
            <main className="flex-1 flex flex-col gap-6 z-10">
              <div className="flex justify-between items-center p-4 bg-base-100 rounded-xl shadow-md">
                <h1 className="text-2xl font-bold text-primary">Dashboard</h1>

                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  
                  {/* Profile Dropdown for Desktop */}
                  <div className="dropdown dropdown-end">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      tabIndex={0}
                      role="button"
                      className="flex items-center gap-2 p-1 rounded-lg hover:bg-base-200 transition-colors cursor-pointer "
                    >
                      <div className="avatar">
                        <div className="w-10 h-10 rounded-full ring-2 ring-primary/20">
                          <img
                            src={
                              user?.photoURL ||
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                user?.displayName || 'User'
                              )}&background=4F46E5&color=fff`
                            }
                            alt={user?.displayName || 'User'}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                      <div className="hidden sm:block text-left">
                        <div className="text-sm font-medium text-base-content truncate max-w-24">
                          {user?.displayName || 'User'}
                        </div>
                        <div className="text-xs text-base-content/60">
                          {isPremium ? 'Premium' : isAdmin ? 'Admin' : 'Free'}
                        </div>
                      </div>
                      <FaChevronDown className="w-3 h-3 text-base-content/60 hidden sm:block" />
                    </motion.div>

                    {/* Advanced Dropdown Menu */}
                    <ul className="dropdown-content menu bg-base-100 rounded-2xl shadow-2xl border border-base-300/50 w-90 p-4 mt-2 z-50">
                      {/* User Info Header */}
                      <li className="mb-3 p-3 bg-base-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-12 h-12 rounded-full">
                              <img
                                src={
                                  user?.photoURL ||
                                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    user?.displayName || 'User'
                                  )}&background=4F46E5&color=fff`
                                }
                                alt={user?.displayName || 'User'}
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-base-content">
                              {user?.displayName || 'User'}
                            </div>
                            <div className="text-sm text-base-content/60 truncate">
                              {user?.email}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              {isPremium && (
                                <span className="badge badge-warning badge-xs gap-1">
                                  <FaCrown className="w-2 h-2" />
                                  Premium
                                </span>
                              )}
                              {isAdmin && (
                                <span className="badge badge-error badge-xs gap-1">
                                  <FaShieldAlt className="w-2 h-2" />
                                  Admin
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>

                      {/* Menu Items */}
                      <li>
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200"
                        >
                          <FaTachometerAlt className="w-4 h-4 text-primary" />
                          <span>Dashboard</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard/profile"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200"
                        >
                          <FaUser className="w-4 h-4 text-secondary" />
                          <span>Profile Settings</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard/favorites"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200"
                        >
                          <FaHeart className="w-4 h-4 text-error" />
                          <span>Favorites</span>
                        </Link>
                      </li>

                      {isAdmin && (
                        <li>
                          <Link
                            to="/dashboard/admin"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-error/10 text-error"
                          >
                            <FaShieldAlt className="w-4 h-4" />
                            <span>Admin Panel</span>
                          </Link>
                        </li>
                      )}

                      {!isPremium && !isAdmin && (
                        <li>
                          <Link
                            to="/pricing"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-warning/10 text-warning"
                          >
                            <FaCrown className="w-4 h-4" />
                            <span>Upgrade to Premium</span>
                          </Link>
                        </li>
                      )}

                      <div className="divider my-2"></div>

                      <li>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-error/10 text-error w-full"
                        >
                          <FaSignOutAlt className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-base-100 rounded-xl shadow-inner p-6">
                <Outlet />
              </div>
            </main>
          </div>

          {/* Mobile Main Content */}
          <div className="lg:hidden flex-1 p-4">
            <div className="bg-base-100 rounded-xl shadow-inner p-6 min-h-[calc(100vh-120px)]">
              <Outlet />
            </div>
          </div>
        </div>

        {/* Mobile Drawer Sidebar */}
        <div className="drawer-side lg:hidden">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <aside className="w-64 min-h-full bg-base-100 p-6 flex flex-col">
            <SidebarContent
              onNavClick={() => {
                document.getElementById('dashboard-drawer').checked = false;
              }}
            />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayouts;
