import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import {
  FaCheck,
  FaTimes,
  FaCrown,
  FaStar,
  FaRocket,
  FaInfinity,
  FaShieldAlt,
  FaHeadset,
  FaGem,
  FaFire,
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useState } from 'react';

const features = [
  {
    feature: 'Personal Lessons',
    free: '5 lessons',
    premium: 'Unlimited',
    freeIcon: <FaCheck className="w-5 h-5 text-success" />,
    premiumIcon: <FaInfinity className="w-5 h-5 text-success" />,
  },
  {
    feature: 'Lesson Creation',
    free: 'Basic templates',
    premium: 'Premium templates + AI assistance',
    freeIcon: <FaCheck className="w-5 h-5 text-success" />,
    premiumIcon: <FaRocket className="w-5 h-5 text-success" />,
  },
  {
    feature: 'Public Lesson Sharing',
    free: 'Limited visibility',
    premium: 'Priority listing + Featured badge',
    freeIcon: <FaCheck className="w-5 h-5 text-success" />,
    premiumIcon: <FaStar className="w-5 h-5 text-success" />,
  },
  {
    feature: 'Ad Experience',
    free: 'Ads displayed',
    premium: 'Completely ad-free',
    freeIcon: <FaTimes className="w-5 h-5 text-error" />,
    premiumIcon: <FaShieldAlt className="w-5 h-5 text-success" />,
  },
  {
    feature: 'Export Options',
    free: 'Basic PDF export',
    premium: 'PDF, Word, PowerPoint + Custom branding',
    freeIcon: <FaCheck className="w-5 h-5 text-success" />,
    premiumIcon: <FaGem className="w-5 h-5 text-success" />,
  },
  {
    feature: 'Analytics & Insights',
    free: 'Basic stats',
    premium: 'Advanced analytics + Progress tracking',
    freeIcon: <FaCheck className="w-5 h-5 text-success" />,
    premiumIcon: <FaFire className="w-5 h-5 text-success" />,
  },
  {
    feature: 'Community Access',
    free: 'Public forums',
    premium: 'Exclusive Premium community + Events',
    freeIcon: <FaCheck className="w-5 h-5 text-success" />,
    premiumIcon: <FaCrown className="w-5 h-5 text-success" />,
  },
  {
    feature: 'Customer Support',
    free: 'Email support',
    premium: 'Priority support + Live chat',
    freeIcon: <FaCheck className="w-5 h-5 text-success" />,
    premiumIcon: <FaHeadset className="w-5 h-5 text-success" />,
  },
];

const PremiumView = () => (
  <div className="min-h-[70vh] flex items-center justify-center ">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-linear-to-r from-purple-500 to-pink-500 text-white p-12 rounded-3xl shadow-2xl text-center"
    >
      <FaCrown className="w-20 h-20 mx-auto mb-6" />
      <h1 className="text-5xl font-bold mb-4">You're Premium! ⭐</h1>
      <p className="text-xl">Enjoy unlimited access to all premium features</p>
    </motion.div>
  </div>
);

const FreeView = ({ handleUpgrade, isProcessing }) => (
  <div className="min-h-screen py-12 px-4">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-extrabold mb-4">Upgrade to Premium</h1>
        <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
          Unlock unlimited features and enhance your Digital Life Lessons
          experience.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Free Plan */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-base-100/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-base-300/50 text-center"
        >
          <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
          <p className="text-xl mb-4">৳0 / forever</p>
          <button className="btn btn-outline w-full" disabled>
            Current Plan
          </button>
        </motion.div>

        {/* Premium Plan */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-linear-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border-2 border-purple-500/30 text-center"
        >
          <div className="mb-4">
            <h3 className="text-2xl font-bold flex items-center justify-center gap-2">
              Premium Plan <FaCrown className="w-6 h-6 text-yellow-500" />
            </h3>
            <p className="text-xl mb-4">৳1,500 / lifetime</p>
          </div>

          <ul className="space-y-4 mb-8 text-left">
            {features.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                {item.premiumIcon}
                <span className="font-medium">{item.feature}</span>
              </li>
            ))}
          </ul>

          <motion.button
            onClick={handleUpgrade}
            disabled={isProcessing}
            whileHover={{ scale: isProcessing ? 1 : 1.05 }}
            whileTap={{ scale: isProcessing ? 1 : 0.95 }}
            className={`btn w-full bg-linear-to-r from-purple-500 via-blue-500 to-pink-500 text-white border-none text-lg font-bold ${
              isProcessing ? 'loading' : ''
            }`}
          >
            {isProcessing ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Processing...
              </>
            ) : (
              <>
                Upgrade to Premium
                <FaRocket className="w-5 h-5 ml-2" />
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
    </div>
  </div>
);

const Pricing = () => {
  const { user, userDB, loading } = useAuth();
  const axios = useAxios();
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect admin users to dashboard - they don't need pricing
  if (!loading && userDB?.role === 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  const { data: currentUser } = useQuery({
    queryKey: ['currentUser', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axios.get(`/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });


  const handleUpgrade = async () => {
    if (!user?.email) {
      toast.error('Please log in to upgrade to premium.');
      return;
    }

    setIsProcessing(true);

    try {
      toast.loading('Redirecting to payment...', { id: 'payment' });

      const res = await axios.post('/create-checkout-session', {
        authorEmail: user.email,
      });

      toast.dismiss('payment');

      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        throw new Error('No payment URL received');
      }
    } catch (err) {
      toast.dismiss('payment');
      setIsProcessing(false);
      console.error('Payment error:', err);

      if (err.response?.status === 404) {
        toast.error('Payment service not available. Please try again later.');
      } else if (err.response?.status === 500) {
        toast.error('Server error. Please contact support.');
      } else if (err.code === 'NETWORK_ERROR' || !err.response) {
        toast.error(
          'Cannot connect to payment service. Please check if the backend server is running.'
        );
      } else {
        toast.error(
          err.response?.data?.message ||
            'Failed to initiate payment. Please try again.'
        );
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return currentUser?.isPremium ? (
    <PremiumView />
  ) : (
    <FreeView handleUpgrade={handleUpgrade} isProcessing={isProcessing} />
  );
};

export default Pricing;
