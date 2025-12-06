import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../Shared/Logo/Logo';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
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
    <div className="navbar bg-base-100 shadow-sm rounded-3xl px-5">
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
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-2 mt-3 w-52 space-y-2 shadow-md"
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
        <button className="btn btn-primary btn-sm font-bold hover:scale-105 rounded-4xl transition-transform duration-200">
          <Link to='/login'>Login</Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
