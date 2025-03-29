import React from "react";

interface MenuIconProps {
  isOpen: boolean;
  toggleMenu: () => void;
  className?: string;
}

export default function MenuIcon({ isOpen, toggleMenu, className = "" }: MenuIconProps) {
  return (
    <button
      onClick={toggleMenu}
      className={`relative flex flex-col justify-center items-center w-8 h-8 z-50 ${className}`}
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
    >
      <span
        className={`block w-5 h-0.5 bg-current transform transition-transform duration-300 ${
          isOpen ? 'rotate-45 translate-y-0.5' : ''
        }`}
      />
      <span
        className={`block w-5 h-0.5 bg-current mt-1 transform transition-all duration-300 ${
          isOpen ? 'opacity-0 scale-x-0' : ''
        }`}
      />
      <span
        className={`block w-5 h-0.5 bg-current mt-1 transform transition-transform duration-300 ${
          isOpen ? '-rotate-45 -translate-y-1.5' : ''
        }`}
      />
    </button>
  );
} 