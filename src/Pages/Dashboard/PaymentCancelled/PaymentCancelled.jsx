import { motion } from 'framer-motion';
import { Link } from 'react-router';
import {
  FaTimes,
  FaHome,
  FaArrowLeft,
  FaCreditCard,
  FaQuestionCircle,
  FaHeadset,
  FaCrown,
} from 'react-icons/fa';

const PaymentCancelled = () => {
  const reasons = [
    {
      icon: <FaCreditCard className="w-5 h-5" />,
      title: 'Payment Method Issues',
      description: 'Check if your card details are correct and has sufficient funds',
    },
    {
      icon: <FaQuestionCircle className="w-5 h-5" />,
      title: 'Changed Your Mind?',
      description: 'No worries! You can upgrade to Premium anytime',
    },
    {
      icon: <FaHeadset className="w-5 h-5" />,
      title: 'Need Help?',
      description: 'Our support team is here to assist you with any questions',
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-red-900/20 dark:to-orange-900/20 flex items-center justify-center px-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-red-400/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/30 rounded-full blur-3xl"
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
        {/* Cancelled Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="mb-8"
        >
          <div className="w-32 h-32 bg-linear-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <FaTimes className="w-16 h-16 text-white" />
          </div>
        </motion.div>

        {/* Cancelled Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-linear-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent mb-6">
            Payment Cancelled
          </h1>
          <div className="bg-base-100/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-red-200/50 mb-8">
            <h2 className="text-3xl font-bold text-base-content mb-4">
              No Worries! 😊
            </h2>
            <p className="text-lg text-base-content/70 mb-4">
              Your payment was cancelled and no charges were made to your account.
            </p>
            <p className="text-base-content/60">
              You can try again anytime or continue using our free features.
            </p>
          </div>
        </motion.div>

        {/* Possible Reasons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-base-content mb-8">
            Common Reasons for Cancellation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="bg-base-100/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-base-300/50"
              >
                <div className="text-orange-500 mb-4 flex justify-center">
                  {reason.icon}
                </div>
                <h4 className="text-lg font-bold text-base-content mb-2">
                  {reason.title}
                </h4>
                <p className="text-base-content/60 text-sm">
                  {reason.description}
                </p>
              </motion.div>
            ))}
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
            to="/pricing"
            className="btn btn-primary btn-lg gap-3 hover:scale-105 transition-transform duration-200"
          >
            <FaCrown className="w-5 h-5" />
            Try Again
          </Link>
          
          <Link
            to="/dashboard"
            className="btn btn-secondary btn-lg gap-3 hover:scale-105 transition-transform duration-200"
          >
            <FaArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
          
          <Link
            to="/"
            className="btn btn-outline btn-lg gap-3 hover:scale-105 transition-transform duration-200"
          >
            <FaHome className="w-5 h-5" />
            Go Home
          </Link>
        </motion.div>

        {/* Free Features Reminder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-8 rounded-3xl border border-blue-500/20 mb-8"
        >
          <h3 className="text-2xl font-bold text-base-content mb-4">
            Continue with Free Features
          </h3>
          <p className="text-base-content/70 mb-6">
            You can still enjoy many great features with your free account:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-base-content/80">Create up to 5 lessons</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-base-content/80">Browse all public lessons</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              <span className="text-base-content/80">Save lessons to favorites</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-base-content/80">Join community discussions</span>
            </div>
          </div>
        </motion.div>

        {/* Support Information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="bg-base-100/50 backdrop-blur-sm p-6 rounded-2xl border border-base-content/10"
        >
          <h4 className="text-lg font-bold text-base-content mb-4">
            Need Help? We're Here for You!
          </h4>
          <p className="text-base-content/70 mb-4">
            If you encountered any issues during the payment process or have questions about our premium features, 
            don't hesitate to reach out to our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@digitallifelessons.com"
              className="btn btn-outline btn-sm"
            >
              <FaHeadset className="w-4 h-4 mr-2" />
              Contact Support
            </a>
            <Link
              to="/pricing"
              className="btn btn-outline btn-sm"
            >
              <FaQuestionCircle className="w-4 h-4 mr-2" />
              View Pricing Details
            </Link>
          </div>
        </motion.div>

        {/* Encouraging Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-8 p-6 bg-linear-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl border border-yellow-500/20"
        >
          <h4 className="text-xl font-bold text-base-content mb-2">
            Your Journey Continues! 🌟
          </h4>
          <p className="text-base-content/70">
            Whether you choose to upgrade later or continue with free features, 
            we're excited to be part of your learning and sharing journey. 
            Keep creating and sharing your valuable life lessons!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentCancelled;