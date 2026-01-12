import React from 'react';
import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

const FormInput = ({
  label,
  name,
  type = 'text',
  placeholder,
  register,
  error,
  success,
  icon: Icon,
  required = false,
  ...props
}) => {
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text font-semibold text-base-content">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </span>
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50" />
        )}
        
        <input
          type={type}
          placeholder={placeholder}
          className={`input input-bordered w-full transition-all duration-200 ${
            Icon ? 'pl-12' : 'pl-4'
          } ${
            error
              ? 'border-error focus:border-error'
              : success
              ? 'border-success focus:border-success'
              : 'focus:border-primary'
          }`}
          {...register(name)}
          {...props}
        />
        
        {/* Status Icon */}
        {(error || success) && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {error ? (
              <FaExclamationCircle className="w-5 h-5 text-error" />
            ) : (
              <FaCheckCircle className="w-5 h-5 text-success" />
            )}
          </div>
        )}
      </div>
      
      {/* Error Message */}
      {error && (
        <label className="label">
          <span className="label-text-alt text-error flex items-center gap-1">
            <FaExclamationCircle className="w-3 h-3" />
            {error.message}
          </span>
        </label>
      )}
      
      {/* Success Message */}
      {success && (
        <label className="label">
          <span className="label-text-alt text-success flex items-center gap-1">
            <FaCheckCircle className="w-3 h-3" />
            {success}
          </span>
        </label>
      )}
    </div>
  );
};

export default FormInput;