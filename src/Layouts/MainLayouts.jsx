import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const MainLayouts = () => {
  return (
    <div className="bg-base-200 transition-colors duration-300">
      <div className="min-h-screen w-11/12 mx-auto transition-colors duration-300 py-6">
        <Navbar />

        <main className="flex-1 py-8">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default MainLayouts;
