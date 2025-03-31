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
      className="relative z-50 flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/5 transition-colors focus:outline-none"
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
    >
      <div className="w-5 h-5 flex flex-col justify-center items-center">
        <motion.span 
          className="block h-[1.5px] w-5 bg-white rounded-full"
          animate={{ 
            rotateZ: isOpen ? 45 : 0,
            y: isOpen ? 3 : 0
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.span 
          className="block h-[1.5px] w-5 mt-[5px] bg-white rounded-full"
          animate={{ 
            width: isOpen ? 0 : 20,
            opacity: isOpen ? 0 : 1
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.span 
          className="block h-[1.5px] w-5 mt-[5px] bg-white rounded-full"
          animate={{ 
            rotateZ: isOpen ? -45 : 0,
            y: isOpen ? -5 : 0
          }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </button>
  );
} 