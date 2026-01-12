import React from 'react';
import Logo from '../Shared/Logo/Logo';
import useAuth from '../hooks/useAuth';

const SidebarContent = ({ onNavClick }) => {
  const { LogoutUser, userDB, user } = useAuth();

  const role = userDB?.role;
  const isAdmin = role === 'admin';
  return (
    <>
      <div className="text-2xl font-bold mb-8 flex justify-center text-primary">
        <Logo />
      </div>

      <ul className="space-y-3 flex-1">
        {/* Admin Navigation */}
        {isAdmin ? (
          <>
            <NavItem              to="/dashboard/admin"
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
};

export default SidebarContent;