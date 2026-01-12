import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { 
  FaUser, 
  FaShieldAlt, 
  FaRocket, 
  FaInfoCircle,
  FaArrowRight 
} from 'react-icons/fa';
import DemoCredentials from '../../../Components/DemoCredentials/DemoCredentials';

const DemoAccess = () => {
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaRocket className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-base-content mb-4">
            Try Digital Life Lessons
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Experience our platform instantly with pre-configured demo accounts. 
            No registration required - just click and explore!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* User Demo Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-base-100 rounded-2xl shadow-lg p-6 border border-info/20 hover:shadow-xl transition-all duration-300"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-info/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUser className="w-6 h-6 text-info" />
              </div>
              <h3 className="text-xl font-bold text-base-content mb-2">User Account</h3>
              <p className="text-base-content/70 mb-4 text-sm">
                Experience the platform as a regular user with access to:
              </p>
              <ul className="text-left text-sm text-base-content/70 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-info rounded-full"></div>
                  Create and manage personal lessons
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-info rounded-full"></div>
                  Browse and save favorite lessons
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-info rounded-full"></div>
                  Engage with community content
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-info rounded-full"></div>
                  Track personal progress
                </li>
              </ul>
              <Link to="/login" className="btn btn-info w-full gap-2">
                <FaUser className="w-4 h-4" />
                Try User Demo
              </Link>
            </div>
          </motion.div>

          {/* Admin Demo Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-base-100 rounded-2xl shadow-lg p-6 border border-error/20 hover:shadow-xl transition-all duration-300"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="w-6 h-6 text-error" />
              </div>
              <h3 className="text-xl font-bold text-base-content mb-2">Admin Account</h3>
              <p className="text-base-content/70 mb-4 text-sm">
                Explore administrative features and system management:
              </p>
              <ul className="text-left text-sm text-base-content/70 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-error rounded-full"></div>
                  User and content management
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-error rounded-full"></div>
                  Analytics and reporting dashboard
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-error rounded-full"></div>
                  Content moderation tools
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-error rounded-full"></div>
                  System configuration access
                </li>
              </ul>
              <Link to="/login" className="btn btn-error w-full gap-2">
                <FaShieldAlt className="w-4 h-4" />
                Try Admin Demo
              </Link>
            </div>
          </motion.div>

          {/* Demo Credentials Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-base-100 rounded-2xl shadow-lg p-6 border border-warning/20 hover:shadow-xl transition-all duration-300"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaInfoCircle className="w-6 h-6 text-warning" />
              </div>
              <h3 className="text-xl font-bold text-base-content mb-2">Need Credentials?</h3>
              <p className="text-base-content/70 mb-4 text-sm">
                Get detailed login information for both demo accounts:
              </p>
              <ul className="text-left text-sm text-base-content/70 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-warning rounded-full"></div>
                  Copy-paste ready credentials
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-warning rounded-full"></div>
                  Auto-fill login forms
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-warning rounded-full"></div>
                  Account feature descriptions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-warning rounded-full"></div>
                  Quick access instructions
                </li>
              </ul>
              <button 
                onClick={() => setShowDemoCredentials(true)}
                className="btn btn-warning w-full gap-2"
              >
                <FaInfoCircle className="w-4 h-4" />
                View Credentials
              </button>
            </div>
          </motion.div>
        </div>

        {/* Quick Access Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-primary via-secondary to-accent p-8 rounded-2xl text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Jump right into Digital Life Lessons with our demo accounts, or create your own account to start your personal growth journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="btn btn-white gap-2">
              <FaRocket className="w-4 h-4" />
              Try Demo Now
            </Link>
            <Link to="/register" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary gap-2">
              Create Account
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Demo Credentials Modal */}
        {showDemoCredentials && (
          <DemoCredentials
            onClose={() => setShowDemoCredentials(false)}
          />
        )}
      </div>
    </section>
  );
};

export default DemoAccess;