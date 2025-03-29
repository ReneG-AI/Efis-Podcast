"use client";

import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  // Usamos un estado local en lugar de next-themes
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Efecto para inicializar el tema basado en localStorage o preferencias del usuario
  useEffect(() => {
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('efis-theme');
    
    if (savedTheme) {
      const isDark = savedTheme === 'dark';
      setIsDarkMode(isDark);
      applyTheme(isDark);
    } else {
      // Si no hay tema guardado, usar preferencias del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      applyTheme(prefersDark);
    }
  }, []);

  // Función para aplicar el tema
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

  // Función para cambiar el tema
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    applyTheme(newMode);
    localStorage.setItem('efis-theme', newMode ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center justify-center p-2 rounded-full hover:bg-muted transition-colors ${className}`}
      aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      <div className={`theme-toggle ${isDarkMode ? 'dark-active' : ''}`}>
        <span className="sr-only">{isDarkMode ? "Modo oscuro activado" : "Modo claro activado"}</span>
        <div className="absolute top-0.5 left-0.5 w-5 h-5 flex items-center justify-center z-10 pointer-events-none">
          <FaSun className={`w-3 h-3 text-amber-500 transition-opacity ${isDarkMode ? 'opacity-0' : 'opacity-100'}`} />
        </div>
        <div className="absolute top-0.5 right-0.5 w-5 h-5 flex items-center justify-center z-10 pointer-events-none">
          <FaMoon className={`w-3 h-3 text-indigo-300 transition-opacity ${isDarkMode ? 'opacity-100' : 'opacity-0'}`} />
        </div>
      </div>
    </button>
  );
} 