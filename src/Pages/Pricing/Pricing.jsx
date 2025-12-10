import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
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

const Pricing = () => {
  const { user } = useAuth();

  // Mock user premium status - replace with actual logic
  const isPremium = false; // This should come from your MongoDB user data

  const handleUpgrade = () => {
    // This will call your backend route /create-checkout-session
    console.log('Redirecting to Stripe Checkout...');
    // fetch('/create-checkout-session', { method: 'POST' })
    //   .then(res => res.json())
    //   .then(data => window.location.href = data.url)
  };

  const features = [
    {
      feature: 'Personal Lessons',
      free: '5 lessons',
      premium: 'Unlimited',
      freeIcon: '5',
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

  if (isPremium) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-linear-to-r from-purple-500 to-pink-500 text-white p-8 rounded-3xl shadow-2xl"
          >
            <FaCrown className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">You're Premium! ⭐</h1>
            <p className="text-xl opacity-90">
              Enjoy unlimited access to all premium features
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-linear-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg mb-6">
            <FaRocket className="w-4 h-4" />
            UPGRADE YOUR EXPERIENCE
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold bg-linear-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Choose Your Plan
          </h1>

          <p className="text-xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
            Unlock the full potential of DigitalLifeLessons with our Premium
            plan. Get unlimited access, advanced features, and priority support.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-base-100/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-base-300/50"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-base-content mb-2">
                Free Plan
              </h3>
              <div className="text-4xl font-extrabold text-base-content mb-4">
                ৳0
                <span className="text-lg font-normal text-base-content/60">
                  /forever
                </span>
              </div>
              <p className="text-base-content/70">
                Perfect for getting started
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <FaCheck className="w-5 h-5 text-success" />
                <span>5 Personal Lessons</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheck className="w-5 h-5 text-success" />
                <span>Basic Templates</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheck className="w-5 h-5 text-success" />
                <span>Community Access</span>
              </li>
              <li className="flex items-center gap-3">
                <FaTimes className="w-5 h-5 text-error" />
                <span className="text-base-content/60">Ads Displayed</span>
              </li>
              <li className="flex items-center gap-3">
                <FaTimes className="w-5 h-5 text-error" />
                <span className="text-base-content/60">Limited Features</span>
              </li>
            </ul>

            <button className="btn btn-outline w-full" disabled>
              Current Plan
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative bg-linear-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border-2 border-purple-500/30"
          >
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                🔥 MOST POPULAR
              </span>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-base-content mb-2 flex items-center justify-center gap-2">
                Premium Plan
                <FaCrown className="w-6 h-6 text-yellow-500" />
              </h3>
              <div className="text-4xl font-extrabold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                ৳1,500
                <span className="text-lg font-normal text-base-content/60">
                  /lifetime
                </span>
              </div>
              <p className="text-base-content/70">
                One-time payment, lifetime access
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <FaInfinity className="w-5 h-5 text-success" />
                <span className="font-medium">Unlimited Lessons</span>
              </li>
              <li className="flex items-center gap-3">
                <FaRocket className="w-5 h-5 text-success" />
                <span className="font-medium">AI-Powered Templates</span>
              </li>
              <li className="flex items-center gap-3">
                <FaStar className="w-5 h-5 text-success" />
                <span className="font-medium">Priority Listing</span>
              </li>
              <li className="flex items-center gap-3">
                <FaShieldAlt className="w-5 h-5 text-success" />
                <span className="font-medium">Ad-Free Experience</span>
              </li>
              <li className="flex items-center gap-3">
                <FaGem className="w-5 h-5 text-success" />
                <span className="font-medium">Advanced Export Options</span>
              </li>
              <li className="flex items-center gap-3">
                <FaHeadset className="w-5 h-5 text-success" />
                <span className="font-medium">Priority Support</span>
              </li>
            </ul>

            <motion.button
              onClick={handleUpgrade}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn w-full bg-linear-to-r from-purple-500 via-blue-500 to-pink-500 text-white border-none hover:shadow-2xl transition-all duration-300 text-lg font-bold"
            >
              Upgrade to Premium
              <FaRocket className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-base-100/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-base-300/50 overflow-hidden"
        >
          <div className="bg-linear-to-r from-purple-500 to-blue-500 text-white p-6">
            <h2 className="text-3xl font-bold text-center">
              Feature Comparison
            </h2>
            <p className="text-center opacity-90 mt-2">
              See what you get with each plan
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="border-b border-base-300">
                  <th className="text-left font-bold text-lg py-6">Features</th>
                  <th className="text-center font-bold text-lg py-6">
                    <div className="flex items-center justify-center gap-2">
                      Free Plan
                    </div>
                  </th>
                  <th className="text-center font-bold text-lg py-6">
                    <div className="flex items-center justify-center gap-2">
                      Premium Plan
                      <FaCrown className="w-5 h-5 text-yellow-500" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((item, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="border-b border-base-200 hover:bg-base-200/50 transition-colors"
                  >
                    <td className="font-semibold py-6 text-base-content">
                      {item.feature}
                    </td>
                    <td className="text-center py-6">
                      <div className="flex items-center justify-center gap-2">
                        {typeof item.freeIcon === 'string' ? (
                          <span className="font-bold text-base-content">
                            {item.freeIcon}
                          </span>
                        ) : (
                          item.freeIcon
                        )}
                        <span className="text-sm text-base-content/70">
                          {item.free}
                        </span>
                      </div>
                    </td>
                    <td className="text-center py-6">
                      <div className="flex items-center justify-center gap-2">
                        {item.premiumIcon}
                        <span className="text-sm font-medium text-base-content">
                          {item.premium}
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-linear-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-lg p-8 rounded-3xl border border-purple-200/50">
            <h3 className="text-3xl font-bold text-base-content mb-4">
              Ready to unlock your potential?
            </h3>
            <p className="text-lg text-base-content/70 mb-6 max-w-2xl mx-auto">
              Join thousands of learners who have upgraded to Premium and
              transformed their learning experience.
            </p>
            <motion.button
              onClick={handleUpgrade}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-lg bg-linear-to-r from-purple-500 to-pink-500 text-white border-none shadow-2xl gap-3"
            >
              <FaCrown className="w-6 h-6" />
              Upgrade Now - ৳1,500 Lifetime
              <FaRocket className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
