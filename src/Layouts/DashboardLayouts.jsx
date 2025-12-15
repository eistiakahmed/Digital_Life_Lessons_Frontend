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
  FaBars,
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
  const { LogoutUser, userDB } = useAuth();

  const role = userDB?.role;
  const isAdmin = role === 'admin';

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
        DigitalLifeLessons © 2025
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
              <button
                onClick={handleLogout}
                className="btn btn-primary btn-sm rounded-full gap-2"
              >
                <FaSignOutAlt />
                <span className="hidden sm:inline">Logout</span>
              </button>
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
                  <button
                    onClick={handleLogout}
                    className="btn btn-primary btn-sm rounded-full gap-2"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
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
