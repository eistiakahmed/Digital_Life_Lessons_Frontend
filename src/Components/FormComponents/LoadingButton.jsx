import React from 'react';
import { motion } from 'framer-motion';

const LoadingButton = ({
  children,
  loading = false,
  disabled = false,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loadingText = 'Loading...',
  className = '',
  ...props
}) => {
  const baseClasses = 'btn transition-all duration-200';
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
  };
  
  const sizeClasses = {
    xs: 'btn-xs',
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  };
  
  const isDisabled = loading || disabled;
  
  return (
    <motion.button
      type={type}
      disabled={isDisabled}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${isDisabled ? 'opacity-70 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <span className="loading loading-spinner loading-sm"></span>
          {loadingText}
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4" />}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default LoadingButton;