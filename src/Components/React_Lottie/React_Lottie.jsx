import React from 'react';
import Lottie from 'react-lottie';
import Animation from '../../assets/reading_Book.json';
import { Link } from 'react-router'; // Fixed: react-router instead of react-router

const React_Lottie = ({ width = 400, height = 400 }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-4xl w-full">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/50">
          {/* Header Section with Animation */}
          <div className="bg-linear-to-r from-indigo-500 via-purple-600 to-pink-500 ">
            <div className="flex flex-col items-center">
              <Lottie
                options={defaultOptions}
                height={height}
                width={width}
                isClickToPauseDisabled
              />
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-8 text-center leading-tight">
                Welcome Back!
              </h1>
              <p className="text-white/90 text-lg mt-4 text-center max-w-2xl mb-3">
                Continue your learning journey with personalized lessons and
                insights.
              </p>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="p-10 bg-white">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/dashboard">
                <button className="group relative px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10">Go to Dashboard</span>
                  <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-500 rounded-full"></div>
                </button>
              </Link>

              <Link to="/dashboard/my_lessons">
                <button className="group relative px-8 py-4 bg-white text-purple-700 font-semibold text-lg rounded-xl shadow-lg border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  <span className="relative z-10">My Lessons</span>
                  <div className="absolute inset-0 bg-purple-100/30 scale-0 group-hover:scale-150 transition-transform duration-500 rounded-full"></div>
                </button>
              </Link>

              <Link to="/">
                <button className="px-8 py-4 text-gray-600 font-medium text-lg hover:text-gray-900 transition-colors duration-200 flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Optional subtle footer */}
        <p className="text-center text-gray-500 mt-8 text-sm">
          Powered by your passion for learning 🚀
        </p>
      </div>
    </div>
  );
};

export default React_Lottie;
