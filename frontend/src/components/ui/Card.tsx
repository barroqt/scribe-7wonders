import React from "react";
import { clsx } from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className, hover = false }) => {
  return (
    <div
      className={clsx(
        "bg-gray-700 border border-ancient-gold/20 rounded-lg p-6",
        "shadow-lg",
        hover &&
          "hover:border-ancient-gold/40 hover:shadow-xl transition-all duration-200",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
