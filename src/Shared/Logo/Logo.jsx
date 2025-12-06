import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
  return (
    <Link
      to="/"
      className="font-extrabold text-2xl bg-clip-text text-transparent 
             bg-linear-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-500"
    >
      DigitalLifeLessons
    </Link>
  );
};

export default Logo;