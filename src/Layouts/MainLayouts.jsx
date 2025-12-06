import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const MainLayouts = () => {
  return (
    /* 
      Outer div: 
      - Full width container with auto margins
      - Apply page background color depending on theme
      - min-h-screen ensures footer sticks to bottom on short pages
    */
    <div className="bg-base-200 transition-colors duration-300">
      <div className="min-h-screen w-11/12 mx-auto transition-colors duration-300 py-6">
        {/* Navbar stays on top */}
        <Navbar />

        {/* Main content rendered by react-router Outlet */}
        <main className="flex-1 py-8">
          <Outlet />
        </main>

        {/* Footer stays at the bottom */}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayouts;
