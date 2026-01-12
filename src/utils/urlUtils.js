import { getBaseUrl, getPaymentUrls as getEnvPaymentUrls } from '../config/environment';

/**
 * Get the current domain/origin for the application
 * This handles both development and production environments
 */
export const getCurrentDomain = () => {
  return getBaseUrl();
};

/**
 * Generate payment success URL
 */
export const getPaymentSuccessUrl = () => {
  return `${getCurrentDomain()}/dashboard/payment_success`;
};

/**
 * Generate payment cancel URL
 */
export const getPaymentCancelUrl = () => {
  return `${getCurrentDomain()}/dashboard/payment_cancelled`;
};

/**
 * Generate payment URLs object for Stripe
 */
export const getPaymentUrls = () => {
  return getEnvPaymentUrls();
};