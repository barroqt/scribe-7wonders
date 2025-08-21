import React from "react";
import { clsx } from "clsx";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  placeholder?: string;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  placeholder,
  className,
  children,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-ancient-cream">
          {label}
        </label>
      )}
      <select
        className={clsx(
          "w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-ancient-cream",
          "focus:outline-none focus:ring-2 focus:ring-ancient-gold focus:border-ancient-gold",
          "transition-colors duration-200",
          error &&
            "border-ancient-red focus:ring-ancient-red focus:border-ancient-red",
          className
        )}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>
      {error && <p className="text-sm text-ancient-red">{error}</p>}
    </div>
  );
};

export default Select;
