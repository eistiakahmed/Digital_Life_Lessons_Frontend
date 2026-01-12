import React from 'react';
import { FaExclamationCircle, FaCheckCircle, FaChevronDown } from 'react-icons/fa';

const FormSelect = ({
  label,
  name,
  options = [],
  register,
  error,
  success,
  required = false,
  placeholder = 'Select an option',
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
        <select
          className={`select select-bordered w-full transition-all duration-200 appearance-none ${
            error
              ? 'border-error focus:border-error'
              : success
              ? 'border-success focus:border-success'
              : 'focus:border-primary'
          }`}
          {...register(name)}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </select>
        
        {/* Dropdown Arrow */}
        <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50 pointer-events-none" />
        
        {/* Status Icon */}
        {(error || success) && (
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
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

export default FormSelect;