//Input.js
import React from 'react';

const Input = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  className = '',
  error = false,
  id,
  name,
  ...props
}) => {
  const baseClasses = 'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm';
  const errorClasses = 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500';
  const disabledClasses = 'bg-gray-50 text-gray-500 cursor-not-allowed';

  const classes = `
    ${baseClasses}
    ${error ? errorClasses : ''}
    ${disabled ? disabledClasses : ''}
    ${className}
  `.trim();

  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      className={classes}
      {...props}
    />
  );
};

export default Input;
