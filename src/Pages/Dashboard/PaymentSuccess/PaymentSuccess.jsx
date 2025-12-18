import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router';

import {
  FaCheckCircle,
  FaCrown,
  FaHome,
  FaTachometerAlt,
  FaBookOpen,
  FaStar,
  FaInfinity,
  FaShieldAlt,
  FaGem,
  FaSync,
  FaExclamationTriangle,
} from 'react-icons/fa';
import useAxios from '../../../hooks/useAxios';

const PaymentSuccess = () => {
  // const { user } = useAuth();
  const axios = useAxios();

  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get('session_id');

  console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axios.patch(`/payment_success?session_id=${sessionId}`).then((res) => {
        console.log(res.data);
      });
    }
  }, [sessionId, axios]);

 

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-green-400/30 rounded-full blur-3xl"
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
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-linear-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <FaCheckCircle className="w-16 h-16 text-white" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center"
            >
              <FaCrown className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-linear-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Payment Successful! 🎉
          </h1>
          <div className="bg-base-100/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-green-200/50 mb-8">
            <h2 className="text-3xl font-bold text-base-content mb-4">
              Welcome to Premium! ⭐
            </h2>
            <p className="text-lg text-base-content/70 mb-4">
              Congratulations! Your payment has been processed successfully.
            </p>
            <p className="text-base-content/60">
              You now have lifetime access to all premium features and content.
            </p>

            
          </div>
        </motion.div>


        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <Link
            to="/dashboard"
            className="btn btn-primary btn-lg gap-3 hover:scale-105 transition-transform duration-200"
          >
            <FaTachometerAlt className="w-5 h-5" />
            Go to Dashboard
          </Link>

          <Link
            to="/dashboard/add_lesson"
            className="btn btn-secondary btn-lg gap-3 hover:scale-105 transition-transform duration-200"
          >
            <FaBookOpen className="w-5 h-5" />
            Create Premium Lesson
          </Link>

          <Link
            to="/"
            className="btn btn-outline btn-lg gap-3 hover:scale-105 transition-transform duration-200"
          >
            <FaHome className="w-5 h-5" />
            Go Home
          </Link>
        </motion.div>

        {/* Payment Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="bg-base-100/50 backdrop-blur-sm p-6 rounded-2xl border border-base-content/10"
        >
          <h4 className="text-lg font-bold text-base-content mb-4">
            Payment Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-base-content/60">Amount Paid:</span>
              <p className="font-bold text-base-content">৳1500</p>
            </div>
            <div>
              <span className="text-base-content/60">Plan:</span>
              <p className="font-bold text-base-content">Premium Lifetime</p>
            </div>
            <div>
              <span className="text-base-content/60">Status:</span>
              <p className="font-bold text-success">Completed</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-base-content/10">
            <p className="text-xs text-base-content/60">
              Transaction completed on {new Date().toLocaleDateString()} at{' '}
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        </motion.div>

        
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
