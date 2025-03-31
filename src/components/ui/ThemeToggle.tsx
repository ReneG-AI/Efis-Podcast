"use client";

import { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaAdjust } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  // Local state for theme management instead of next-themes
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize theme based on localStorage or user preferences
  useEffect(() => {
    // Check if there's a saved theme in localStorage
    const savedTheme = localStorage.getItem('efis-theme');
    
    if (savedTheme) {
      const isDark = savedTheme === 'dark';
      setIsDarkMode(isDark);
      applyTheme(isDark);
    } else {
      // If no saved theme, use system preferences
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      applyTheme(prefersDark);
    }
    
    // Mark as loaded after a small delay for smooth mounting animation
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Apply theme function
  const applyTheme = (isDark: boolean) => {
    const documentElement = document.documentElement;
    
    if (isDark) {
      documentElement.classList.add('dark-mode-enabled');
      documentElement.classList.remove('light-mode');
    } else {
      documentElement.classList.remove('dark-mode-enabled');
      documentElement.classList.add('light-mode');
    }
  };

  // Toggle theme function
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    applyTheme(newMode);
    localStorage.setItem('efis-theme', newMode ? 'dark' : 'light');
  };

  return (
    <motion.button
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative p-2 rounded-full focus-ring group ${className}`}
      aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isLoaded ? 1 : 0,
        scale: isLoaded ? 1 : 0.9,
      }}
      transition={{ duration: 0.3 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background */}
      <motion.div 
        className="absolute inset-0 rounded-full"
        animate={{
          background: isDarkMode 
            ? "linear-gradient(135deg, #192C59, #273C6F)" 
            : "linear-gradient(135deg, #FFEFC1, #FFF8E7)"
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Glow effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 0.4, scale: 1.3 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: isDarkMode 
              ? "radial-gradient(circle, rgba(70, 111, 255, 0.3) 0%, rgba(70, 111, 255, 0) 70%)" 
              : "radial-gradient(circle, rgba(255, 192, 0, 0.3) 0%, rgba(255, 192, 0, 0) 70%)"
          }}
        />
      )}
      
      {/* Moon/Sun Icon with animation */}
      <div className="relative h-5 w-5 flex items-center justify-center z-10">
        <motion.div
          animate={{ 
            rotate: isDarkMode ? 180 : 0,
            opacity: isDarkMode ? 0 : 1,
            scale: isDarkMode ? 0.5 : 1,
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <FaSun className="text-amber-500" size={16} />
        </motion.div>
        
        <motion.div
          animate={{ 
            rotate: isDarkMode ? 0 : -180,
            opacity: isDarkMode ? 1 : 0,
            scale: isDarkMode ? 1 : 0.5,
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <FaMoon className="text-indigo-300" size={14} />
        </motion.div>
      </div>
      
      {/* Audio wave animation when toggling */}
      <div className="absolute -right-1 -top-1 opacity-60 pointer-events-none">
        <motion.div 
          className="flex gap-[2px] items-end"
          animate={{ opacity: isHovered ? 1 : 0.4 }}
        >
          <motion.div 
            className="w-[2px] h-2 rounded-full bg-current"
            animate={{ 
              scaleY: isHovered ? [0.3, 1, 0.3] : 0.3,
              backgroundColor: isDarkMode ? "#94A3FF" : "#FFB800"
            }}
            transition={
              isHovered 
                ? { repeat: Infinity, duration: 1, ease: "easeInOut" }
                : { duration: 0.5 }
            }
          />
          <motion.div 
            className="w-[2px] h-3 rounded-full bg-current"
            animate={{ 
              scaleY: isHovered ? [0.3, 1, 0.3] : 0.3,
              backgroundColor: isDarkMode ? "#94A3FF" : "#FFB800"
            }}
            transition={
              isHovered 
                ? { repeat: Infinity, duration: 1, ease: "easeInOut", delay: 0.2 }
                : { duration: 0.5 }
            }
          />
        </motion.div>
      </div>
    </motion.button>
  );
} 