import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { 
  FaRocket, 
  FaUsers, 
  FaStar, 
  FaArrowRight,
  FaBookOpen,
  FaHeart,
  FaCrown,
  FaGift,
  FaCheckCircle
} from 'react-icons/fa';

const CallToAction = () => {
  const features = [
    "Create unlimited personal lessons",
    "Access thousands of community insights",
    "Connect with like-minded learners",
    "Track your growth journey"
  ];

  const stats = [
    { number: "5,000+", label: "Active Members" },
    { number: "12,000+", label: "Life Lessons" },
    { number: "98%", label: "User Satisfaction" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 relative overflow-hidden" id="cta">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1], 
            x: [0, 50, 0],
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-48 h-48 bg-secondary/30 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1], 
            x: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2] 
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1], 
            rotate: [0, 180, 360],
            opacity: [0.1, 0.3, 0.1] 
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Main CTA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FaRocket className="w-4 h-4" />
              Start Your Journey Today
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-base-content mb-6 leading-tight">
              Ready to Transform
              <span className="text-primary"> Your Life?</span>
            </h2>
            
            <p className="text-xl text-base-content/80 mb-8 leading-relaxed">
              Join thousands of learners who are already growing through shared wisdom. 
              Your journey to personal growth and meaningful connections starts here.
            </p>

            {/* Features List */}
            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center">
                    <FaCheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <span className="text-base-content font-medium">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary btn-lg gap-2 shadow-2xl w-full sm:w-auto"
                >
                  <FaRocket className="w-5 h-5" />
                  Start Free Today
                  <FaArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              
              <Link to="/public_lessons">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline btn-lg gap-2 w-full sm:w-auto"
                >
                  <FaBookOpen className="w-5 h-5" />
                  Explore Lessons
                </motion.button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-base-content/60">
              <div className="flex items-center gap-2">
                <FaHeart className="w-4 h-4 text-red-500" />
                <span>100% Free to Start</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUsers className="w-4 h-4 text-blue-500" />
                <span>Join 5,000+ Members</span>
              </div>
              <div className="flex items-center gap-2">
                <FaStar className="w-4 h-4 text-yellow-500" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Stats & Social Proof */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bg-base-100/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-base-300/50 shadow-lg"
                >
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-base-content/70 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Premium Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-3xl p-8 border-2 border-yellow-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-2xl flex items-center justify-center">
                  <FaCrown className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-base-content">
                    Premium Lifetime Access
                  </h3>
                  <p className="text-base-content/70 text-sm">
                    One-time payment, lifetime value
                  </p>
                </div>
              </div>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <FaGift className="w-4 h-4 text-yellow-500" />
                  <span>Exclusive expert content</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaStar className="w-4 h-4 text-yellow-500" />
                  <span>Advanced analytics & insights</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaUsers className="w-4 h-4 text-yellow-500" />
                  <span>Priority community access</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-yellow-600">৳1,500</div>
                  <div className="text-xs text-base-content/60">Lifetime Access</div>
                </div>
                <Link to="/pricing">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-warning btn-sm gap-2"
                  >
                    <FaCrown className="w-4 h-4" />
                    Upgrade Now
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Community Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-base-100/80 backdrop-blur-sm rounded-2xl p-6 border border-base-300/50 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://ui-avatars.com/api/?name=Sarah+Johnson&background=4F46E5&color=fff&size=100"
                  alt="Sarah Johnson"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-semibold text-base-content">Sarah Johnson</div>
                  <div className="text-sm text-base-content/60">Life Coach</div>
                </div>
                <div className="ml-auto flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4 text-yellow-500" />
                  ))}
                </div>
              </div>
              <p className="text-base-content/80 text-sm italic">
                "This platform has completely transformed how I approach personal growth. 
                The community is incredible and the insights are life-changing!"
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;