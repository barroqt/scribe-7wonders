import React from "react";
import { clsx } from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-ancient-cream">
          {label}
        </label>
      )}
      <input
        className={clsx(
          "w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-ancient-cream placeholder-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-ancient-gold focus:border-ancient-gold",
          "transition-colors duration-200",
          error &&
            "border-ancient-red focus:ring-ancient-red focus:border-ancient-red",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-ancient-red">{error}</p>}
    </div>
  );
};

export default Input;
