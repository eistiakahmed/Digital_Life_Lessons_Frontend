import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FaHome, FaSearch, FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 flex items-center justify-center px-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 text-center max-w-2xl mx-auto"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-9xl md:text-[12rem] font-extrabold bg-linear-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent leading-none">
            404
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-base-content/70 mb-2">
            The page you're looking for seems to have wandered off into the digital wilderness.
          </p>
          <p className="text-base-content/60">
            Don't worry, even the best explorers sometimes take a wrong turn!
          </p>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <div className="relative mx-auto w-64 h-64 mb-8">
            {/* Animated Search Icon */}
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <FaSearch className="w-32 h-32 text-base-content/30" />
            </motion.div>
            
            {/* Floating Question Marks */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-4 right-4 text-4xl text-base-content/20"
            >
              ?
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute bottom-8 left-8 text-3xl text-base-content/20"
            >
              ?
            </motion.div>
            <motion.div
              animate={{ y: [-5, 15, -5] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute top-12 left-4 text-2xl text-base-content/20"
            >
              ?
            </motion.div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="/"
            className="btn btn-primary btn-lg gap-3 hover:scale-105 transition-transform duration-200"
          >
            <FaHome className="w-5 h-5" />
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline btn-lg gap-3 hover:scale-105 transition-transform duration-200"
          >
            <FaArrowLeft className="w-5 h-5" />
            Go Back
          </button>
          
          <Link
            to="/public_lessons"
            className="btn btn-secondary btn-lg gap-3 hover:scale-105 transition-transform duration-200"
          >
            <FaSearch className="w-5 h-5" />
            Browse Lessons
          </Link>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 pt-8 border-t border-base-content/20"
        >
          <p className="text-base-content/60 mb-4">
            Looking for something specific? Try these popular pages:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              to="/dashboard"
              className="link link-primary hover:link-secondary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/dashboard/add_lesson"
              className="link link-primary hover:link-secondary transition-colors"
            >
              Add Lesson
            </Link>
            <Link
              to="/dashboard/my_lessons"
              className="link link-primary hover:link-secondary transition-colors"
            >
              My Lessons
            </Link>
            <Link
              to="/pricing"
              className="link link-primary hover:link-secondary transition-colors"
            >
              Pricing
            </Link>
          </div>
        </motion.div>

        {/* Fun Fact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-8 p-4 bg-base-100/50 backdrop-blur-sm rounded-2xl border border-base-content/10"
        >
          <p className="text-sm text-base-content/60">
            💡 <strong>Fun Fact:</strong> The HTTP 404 error was named after room 404 at CERN, 
            where the World Wide Web was invented!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;