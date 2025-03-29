"use client";

import { motion } from 'framer-motion';

interface MenuIconProps {
  isOpen: boolean;
  toggleMenu: () => void;
  className?: string;
}

export default function MenuIcon({ isOpen, toggleMenu, className = '' }: MenuIconProps) {
  const transition = { duration: 0.3 };
  
  // Variantes para las líneas del icono
  const variants = {
    top: {
      closed: { rotate: 0, y: 0 },
      open: { rotate: 45, y: 8 }
    },
    middle: {
      closed: { opacity: 1 },
      open: { opacity: 0 }
    },
    bottom: {
      closed: { rotate: 0, y: 0 },
      open: { rotate: -45, y: -8 }
    }
  };

  return (
    <button 
      onClick={toggleMenu}
      className={`relative flex items-center justify-center w-10 h-10 rounded-md hover:bg-accent/10 transition-colors ${className}`}
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
    >
      <div className="relative w-6 h-6">
        <motion.span
          className="absolute left-0 top-0 w-full h-[2px] rounded-full bg-foreground"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={variants.top}
          transition={transition}
        />
        <motion.span
          className="absolute left-0 top-[7px] w-full h-[2px] rounded-full bg-foreground"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={variants.middle}
          transition={transition}
        />
        <motion.span
          className="absolute left-0 top-[14px] w-full h-[2px] rounded-full bg-foreground"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={variants.bottom}
          transition={transition}
        />
      </div>
    </button>
  );
} 