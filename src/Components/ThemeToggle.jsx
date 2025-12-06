import React from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import useTheme from '../hooks/useTheme';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle swap swap-rotate"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <MdLightMode className="w-6 h-6 text-warning" />
      ) : (
        <MdDarkMode className="w-6 h-6 text-primary" />
      )}
    </button>
  );
};

export default ThemeToggle;
