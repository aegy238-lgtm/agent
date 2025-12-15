import React from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  type?: string;
  icon?: React.ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  icon
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-blue-50 mb-1.5 text-start">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full py-3 rounded-lg border text-start text-gray-900
            focus:ring-2 focus:outline-none transition-colors duration-200
            rtl:pr-10 rtl:pl-4 ltr:pl-10 ltr:pr-4
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50' 
              : 'border-white/20 focus:border-primary-400 focus:ring-primary-500/30 bg-white/90 focus:bg-white'
            }
          `}
        />
        {icon && (
          <div className="absolute top-1/2 transform -translate-y-1/2 text-gray-500 rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto">
            {icon}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-300 text-start font-medium">{error}</p>}
    </div>
  );
};