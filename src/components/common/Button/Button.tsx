// src/components/Button/Button.tsx

import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "success"; // Añadir más variantes si es necesario
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right"; // Añadir opción de posición del ícono
  disabled?: boolean;
  className?: string; // Añadir prop para clases personalizadas
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  icon,
  iconPosition = "left",
  disabled = false,
  className = "",
}) => {
  // Define los estilos base y variantes usando los colores de Tailwind CSS
  const baseStyle =
    "flex items-center justify-center rounded focus:outline-none transition-all duration-200";
  
  // Usa los colores definidos en la configuración de Tailwind
  const variantStyles = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
    danger: "bg-coral-500 hover:bg-coral-600 text-white",
    success: "bg-turquoise-500 hover:bg-turquoise-600 text-white", // Ejemplo adicional
  };

  const sizeStyles = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      disabled={disabled}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {text}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
