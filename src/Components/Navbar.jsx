import { Link, NavLink } from 'react-router';
import Logo from '../Shared/Logo/Logo';
import ThemeToggle from './ThemeToggle';
import useAuth from '../hooks/useAuth';
import { FaSignOutAlt, FaTachometerAlt, FaUser } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, LogoutUser } = useAuth();

  const handleLogout = () => {
    LogoutUser()
      .then(() => {
        toast('Logged out successfully');
      })
      .catch((error) => {
        toast.error(error.message)
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'text-primary font-semibold border-2 border-primary rounded-4xl'
              : 'font-semibold'
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/add_lesson"
          className={({ isActive }) =>
            isActive
              ? 'text-primary font-semibold border-2 border-primary rounded-4xl'
              : 'font-semibold'
          }
        >
          Add Lesson
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/my_lessons"
          className={({ isActive }) =>
            isActive
              ? 'text-primary font-semibold border-2 border-primary rounded-4xl'
              : 'font-semibold'
          }
        >
          My Lessons
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/public_lessons"
          className={({ isActive }) =>
            isActive
              ? 'text-primary font-semibold border-2 border-primary rounded-4xl'
              : 'font-semibold'
          }
        >
          Public Lessons
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/pricing"
          className={({ isActive }) =>
            isActive
              ? 'text-primary font-semibold border-2 border-primary rounded-4xl'
              : 'font-semibold'
          }
        >
          Upgrade
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm rounded-3xl px-5 z-30 relative">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {' '}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{' '}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Logo />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal my-2 px-1 space-x-2">{links}</ul>
      </div>
      <div className="navbar-end gap-2">
        <ThemeToggle />
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="">
              <div className="w-12 h-12 rounded-full">
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="rounded-full w-[50px] h-[50px]"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-2 mt-3 w-60 p-2 shadow"
            >
              <li className="text-lg font-bold">{user.displayName}</li>
              <li className="text-xs border-b border-gray-200 pb-2">
                {user.email}
              </li>
              <li>
                <Link to="/dashboard/profile">
                  <FaUser />
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/dashboard">
                  <FaTachometerAlt />
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn text-white bg-primary mt-2"
                >
                  Logout
                  <FaSignOutAlt />
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className='flex gap-2'>
            <button type="button">
              <Link to="/login" className="btn btn-primary btn-sm">
                Login
              </Link>
            </button>
            <button type="button">
              <Link to="/register" className="btn btn-secondary btn-sm">
                Signup
              </Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
