import React from "react";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  children,
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ancient-gold focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-ancient-gold text-gray-900 hover:bg-ancient-cream hover:scale-105 shadow-lg hover:shadow-xl",
    secondary:
      "bg-gray-700 text-ancient-cream border border-ancient-gold/30 hover:bg-gray-600 hover:border-ancient-gold/60",
    danger:
      "bg-ancient-red text-white hover:bg-ancient-darkred hover:scale-105 shadow-lg",
    ghost: "text-ancient-cream hover:bg-gray-700 hover:text-ancient-gold",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
