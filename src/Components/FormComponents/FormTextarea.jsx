import React from 'react';
import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

const FormTextarea = ({
  label,
  name,
  placeholder,
  register,
  error,
  success,
  required = false,
  rows = 4,
  maxLength,
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
          {maxLength && (
            <span className="label-text-alt text-base-content/60">
              {props.value?.length || 0}/{maxLength}
            </span>
          )}
        </label>
      )}
      
      <div className="relative">
        <textarea
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          className={`textarea textarea-bordered w-full transition-all duration-200 resize-none ${
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
          <div className="absolute right-3 top-3">
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

export default FormTextarea;