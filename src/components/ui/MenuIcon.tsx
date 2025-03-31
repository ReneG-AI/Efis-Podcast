"use client";

import { motion } from 'framer-motion';

interface MenuIconProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function MenuIcon({ isOpen, toggleMenu }: MenuIconProps) {
  return (
    <button 
      onClick={toggleMenu}
      className="relative z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors focus:outline-none"
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
    >
      <div className="w-5 h-5 flex flex-col justify-center items-center">
        <motion.span 
          className="block h-0.5 w-5 bg-gradient-brand rounded-full"
          animate={{ 
            rotateZ: isOpen ? 45 : 0,
            y: isOpen ? 3 : 0
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span 
          className="block h-0.5 w-5 mt-1 bg-gradient-brand rounded-full"
          animate={{ 
            width: isOpen ? 0 : 20,
            opacity: isOpen ? 0 : 1
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span 
          className="block h-0.5 w-5 mt-1 bg-gradient-brand rounded-full"
          animate={{ 
            rotateZ: isOpen ? -45 : 0,
            y: isOpen ? -4 : 0
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </button>
  );
} 