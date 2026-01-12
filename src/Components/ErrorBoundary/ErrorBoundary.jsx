import React from 'react';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';
import { IoRefreshCircleSharp } from 'react-icons/io5';
import { motion } from 'framer-motion';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo);
    }
  }

  handleRefresh = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-base-100 rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <FaExclamationTriangle className="w-12 h-12 text-error" />
            </motion.div>

            <h1 className="text-3xl font-bold text-base-content mb-4">
              Oops! Something went wrong
            </h1>

            <p className="text-base-content/70 mb-8 leading-relaxed">
              We encountered an unexpected error. Don't worry, our team has been
              notified and we're working to fix this issue.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={this.handleRefresh}
                className="btn btn-primary gap-2"
              >
                <IoRefreshCircleSharp className="w-4 h-4" />
                Try Again
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={this.handleGoHome}
                className="btn btn-outline gap-2"
              >
                <FaHome className="w-4 h-4" />
                Go Home
              </motion.button>
            </div>

            {/* Error details for development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <motion.details
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-left"
              >
                <summary className="cursor-pointer text-sm font-medium text-base-content/60 hover:text-base-content">
                  Show Error Details (Development Only)
                </summary>
                <div className="mt-4 p-4 bg-base-200 rounded-lg text-xs font-mono overflow-auto max-h-40">
                  <div className="text-error font-bold mb-2">Error:</div>
                  <div className="mb-4">{this.state.error.toString()}</div>

                  <div className="text-error font-bold mb-2">Stack Trace:</div>
                  <div className="whitespace-pre-wrap">
                    {this.state.errorInfo.componentStack}
                  </div>
                </div>
              </motion.details>
            )}
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;