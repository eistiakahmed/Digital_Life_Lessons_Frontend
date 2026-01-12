/**
 * Payment debugging utilities
 */

import { getPaymentUrls, getCurrentDomain } from './urlUtils';
import { config } from '../config/environment';

/**
 * Debug payment configuration
 */
export const debugPaymentConfig = () => {
  const paymentUrls = getPaymentUrls();
  const currentDomain = getCurrentDomain();
  
  console.group('🔧 Payment Configuration Debug');
  console.log('Environment:', config.isProduction ? 'Production' : 'Development');
  console.log('Current Domain:', currentDomain);
  console.log('Success URL:', paymentUrls.successUrl);
  console.log('Cancel URL:', paymentUrls.cancelUrl);
  console.log('Window Origin:', typeof window !== 'undefined' ? window.location.origin : 'N/A');
  console.log('VITE_APP_URL:', import.meta.env.VITE_APP_URL);
  console.groupEnd();
  
  return {
    environment: config.isProduction ? 'Production' : 'Development',
    currentDomain,
    paymentUrls,
    windowOrigin: typeof window !== 'undefined' ? window.location.origin : 'N/A',
    envAppUrl: import.meta.env.VITE_APP_URL,
  };
};

/**
 * Validate payment URLs
 */
export const validatePaymentUrls = () => {
  const paymentUrls = getPaymentUrls();
  const issues = [];
  
  // Check if URLs contain localhost in production
  if (config.isProduction) {
    if (paymentUrls.successUrl.includes('localhost')) {
      issues.push('Success URL contains localhost in production environment');
    }
    if (paymentUrls.cancelUrl.includes('localhost')) {
      issues.push('Cancel URL contains localhost in production environment');
    }
  }
  
  // Check if URLs are properly formatted
  try {
    new URL(paymentUrls.successUrl);
    new URL(paymentUrls.cancelUrl);
  } catch (error) {
    issues.push('Invalid URL format detected');
  }
  
  return {
    isValid: issues.length === 0,
    issues,
    urls: paymentUrls,
  };
};

/**
 * Log payment request data
 */
export const logPaymentRequest = (requestData) => {
  console.group('💳 Payment Request Debug');
  console.log('Request Data:', requestData);
  console.log('Validation:', validatePaymentUrls());
  console.groupEnd();
};