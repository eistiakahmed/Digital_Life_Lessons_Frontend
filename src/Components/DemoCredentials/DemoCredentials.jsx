import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaShieldAlt, 
  FaEye, 
  FaEyeSlash, 
  FaCopy, 
  FaInfoCircle,
  FaTimes 
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const DemoCredentials = ({ onClose, onAutoFill }) => {
  const [showPasswords, setShowPasswords] = useState(false);

  const demoAccounts = [
    {
      type: 'User',
      email: 'user@digitallifelessons.com',
      password: 'User123!@#',
      description: 'Regular user account with standard features',
      icon: <FaUser className="w-5 h-5" />,
      color: 'info',
      bgColor: 'bg-info/10',
      borderColor: 'border-info/20',
      textColor: 'text-info'
    },
    {
      type: 'Admin',
      email: 'admin@digitallifelessons.com',
      password: 'Admin123!@#',
      description: 'Administrator account with full system access',
      icon: <FaShieldAlt className="w-5 h-5" />,
      color: 'error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/20',
      textColor: 'text-error'
    }
  ];

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${type} copied to clipboard!`);
    }).catch(() => {
      toast.error('Failed to copy to clipboard');
    });
  };

  const handleAutoFill = (email, password) => {
    if (onAutoFill) {
      onAutoFill(email, password);
    } else {
      // Fallback to direct DOM manipulation
      const emailInput = document.querySelector('input[type="email"]');
      const passwordInput = document.querySelector('input[type="password"]');
      
      if (emailInput && passwordInput) {
        emailInput.value = email;
        passwordInput.value = password;
        
        // Trigger change events
        emailInput.dispatchEvent(new Event('input', { bubbles: true }));
        passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
        
        toast.success('Demo credentials filled!');
      }
    }
    
    if (onClose) onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-base-100 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-base-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <FaInfoCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-base-content">Demo Accounts</h2>
              <p className="text-sm text-base-content/60">Try our platform with pre-configured accounts</p>
            </div>
          </div>
          
          {onClose && (
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm btn-circle"
              aria-label="Close"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Password Visibility Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-base-content">Show Passwords</span>
            <button
              onClick={() => setShowPasswords(!showPasswords)}
              className="btn btn-ghost btn-sm gap-2"
            >
              {showPasswords ? (
                <>
                  <FaEyeSlash className="w-4 h-4" />
                  Hide
                </>
              ) : (
                <>
                  <FaEye className="w-4 h-4" />
                  Show
                </>
              )}
            </button>
          </div>

          {/* Demo Accounts */}
          <div className="space-y-4">
            {demoAccounts.map((account, index) => (
              <motion.div
                key={account.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${account.bgColor} ${account.borderColor} border rounded-xl p-4 space-y-3`}
              >
                {/* Account Type Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`${account.textColor}`}>
                      {account.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-base-content">{account.type} Account</h3>
                      <p className="text-xs text-base-content/60">{account.description}</p>
                    </div>
                  </div>
                </div>

                {/* Credentials */}
                <div className="space-y-3">
                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-base-content/70">Email</label>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 bg-base-200 px-3 py-2 rounded-lg text-sm font-mono">
                        {account.email}
                      </code>
                      <button
                        onClick={() => copyToClipboard(account.email, 'Email')}
                        className="btn btn-ghost btn-sm btn-square"
                        title="Copy email"
                      >
                        <FaCopy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-base-content/70">Password</label>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 bg-base-200 px-3 py-2 rounded-lg text-sm font-mono">
                        {showPasswords ? account.password : '••••••••••'}
                      </code>
                      <button
                        onClick={() => copyToClipboard(account.password, 'Password')}
                        className="btn btn-ghost btn-sm btn-square"
                        title="Copy password"
                      >
                        <FaCopy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Auto-fill Button */}
                <button
                  onClick={() => handleAutoFill(account.email, account.password)}
                  className={`btn btn-${account.color} btn-sm w-full gap-2`}
                >
                  {account.icon}
                  Use {account.type} Account
                </button>
              </motion.div>
            ))}
          </div>

          {/* Info Note */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FaInfoCircle className="w-5 h-5 text-warning mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-base-content mb-1">Demo Account Information</p>
                <ul className="text-base-content/70 space-y-1 text-xs">
                  <li>• These are pre-configured accounts for testing purposes</li>
                  <li>• User account has standard features and permissions</li>
                  <li>• Admin account has full system access and management tools</li>
                  <li>• All demo data is reset periodically</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DemoCredentials;