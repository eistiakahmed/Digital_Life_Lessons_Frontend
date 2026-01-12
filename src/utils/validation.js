// Validation rules for forms
export const validationRules = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Please enter a valid email address'
    }
  },
  
  password: {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters long'
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      message: 'Password must contain uppercase, lowercase, number and special character'
    }
  },
  
  name: {
    required: 'Name is required',
    minLength: {
      value: 2,
      message: 'Name must be at least 2 characters long'
    },
    maxLength: {
      value: 50,
      message: 'Name cannot exceed 50 characters'
    },
    pattern: {
      value: /^[a-zA-Z\s]+$/,
      message: 'Name can only contain letters and spaces'
    }
  },
  
  title: {
    required: 'Title is required',
    minLength: {
      value: 5,
      message: 'Title must be at least 5 characters long'
    },
    maxLength: {
      value: 100,
      message: 'Title cannot exceed 100 characters'
    }
  },
  
  description: {
    required: 'Description is required',
    minLength: {
      value: 20,
      message: 'Description must be at least 20 characters long'
    },
    maxLength: {
      value: 1000,
      message: 'Description cannot exceed 1000 characters'
    }
  },
  
  url: {
    pattern: {
      value: /^https?:\/\/.+\..+/,
      message: 'Please enter a valid URL starting with http:// or https://'
    }
  },
  
  required: (fieldName) => ({
    required: `${fieldName} is required`
  })
};

// Helper function to get validation rules
export const getValidationRules = (type, customRules = {}) => {
  return {
    ...validationRules[type],
    ...customRules
  };
};

// Form state helpers
export const getFieldState = (fieldName, errors, touchedFields) => {
  const error = errors[fieldName];
  const touched = touchedFields[fieldName];
  
  return {
    error,
    success: touched && !error,
    hasError: !!error,
    hasSuccess: touched && !error
  };
};