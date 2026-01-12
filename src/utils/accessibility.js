// Accessibility utilities and helpers

// Screen reader announcements
export const announceToScreenReader = (message, priority = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.setAttribute('class', 'sr-only');
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Focus management
export const focusElement = (selector, delay = 0) => {
  setTimeout(() => {
    const element = document.querySelector(selector);
    if (element) {
      element.focus();
    }
  }, delay);
};

// Skip link functionality
export const createSkipLink = (targetId, text = 'Skip to main content') => {
  return {
    href: `#${targetId}`,
    className: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-content px-4 py-2 rounded z-50',
    children: text,
    onFocus: () => announceToScreenReader('Skip link focused'),
  };
};

// Keyboard navigation helpers
export const handleKeyboardNavigation = (e, actions) => {
  const { key } = e;
  const action = actions[key];
  
  if (action) {
    e.preventDefault();
    action();
  }
};

// ARIA helpers
export const getAriaProps = (type, props = {}) => {
  const ariaProps = {
    button: {
      role: 'button',
      tabIndex: 0,
      ...props,
    },
    dialog: {
      role: 'dialog',
      'aria-modal': true,
      'aria-labelledby': props.titleId,
      'aria-describedby': props.descriptionId,
      ...props,
    },
    alert: {
      role: 'alert',
      'aria-live': 'assertive',
      'aria-atomic': true,
      ...props,
    },
    status: {
      role: 'status',
      'aria-live': 'polite',
      'aria-atomic': true,
      ...props,
    },
    menu: {
      role: 'menu',
      'aria-orientation': 'vertical',
      ...props,
    },
    menuitem: {
      role: 'menuitem',
      tabIndex: -1,
      ...props,
    },
    tab: {
      role: 'tab',
      'aria-selected': props.selected || false,
      tabIndex: props.selected ? 0 : -1,
      ...props,
    },
    tabpanel: {
      role: 'tabpanel',
      'aria-labelledby': props.tabId,
      tabIndex: 0,
      ...props,
    },
  };
  
  return ariaProps[type] || props;
};

// Color contrast checker (basic implementation)
export const checkColorContrast = (foreground, background) => {
  // This is a simplified version - in production, use a proper contrast checking library
  const getLuminance = (color) => {
    // Convert hex to RGB and calculate luminance
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    const [rs, gs, bs] = [r, g, b].map(c => 
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  
  return {
    ratio,
    AA: ratio >= 4.5,
    AAA: ratio >= 7,
  };
};

// Touch target size checker
export const checkTouchTargetSize = (element) => {
  const rect = element.getBoundingClientRect();
  const minSize = 44; // 44px minimum touch target size
  
  return {
    width: rect.width,
    height: rect.height,
    isAccessible: rect.width >= minSize && rect.height >= minSize,
    recommendations: {
      width: Math.max(minSize, rect.width),
      height: Math.max(minSize, rect.height),
    },
  };
};

// Form accessibility helpers
export const getFormFieldProps = (fieldName, error, required = false) => {
  const baseProps = {
    id: fieldName,
    name: fieldName,
    'aria-required': required,
  };
  
  if (error) {
    baseProps['aria-invalid'] = true;
    baseProps['aria-describedby'] = `${fieldName}-error`;
  }
  
  return baseProps;
};

export const getErrorMessageProps = (fieldName) => ({
  id: `${fieldName}-error`,
  role: 'alert',
  'aria-live': 'polite',
});

// Loading state announcements
export const announceLoadingState = (isLoading, loadingText = 'Loading', completeText = 'Content loaded') => {
  if (isLoading) {
    announceToScreenReader(loadingText);
  } else {
    announceToScreenReader(completeText);
  }
};