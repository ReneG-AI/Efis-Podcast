'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface LogoProps {
  variant?: 'default' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showEfis?: boolean;
  className?: string;
  animated?: boolean;
  href?: string;
}

export default function Logo({
  variant = 'default',
  size = 'md',
  showEfis = true,
  className = '',
  animated = false,
  href = '/'
}: LogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simular tiempo de carga para la animación inicial
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Tamaños para diferentes variantes
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };
  
  // Colores para diferentes variantes
  const colors = {
    default: '',
    light: 'text-white',
    dark: 'text-foreground'
  };
  
  // Variantes de animación para las letras
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 10
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }),
    hover: {
      y: [0, -2, 0],
      transition: {
        duration: 0.3
      }
    }
  };
  
  // Componente Logo Animado
  const AnimatedLogo = () => (
    <div
      className={`flex items-center ${sizes[size]} ${colors[variant]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Contenedor del Logo */}
      <div className="relative flex items-center">
        {/* Letras EFIS */}
        {showEfis && (
          <div className="flex items-center mr-1">
            {['E', 'F', 'I', 'S'].map((letter, i) => (
              <motion.span
                key={letter}
                custom={i}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                whileHover="hover"
                variants={letterVariants}
                className="text-primary font-medium tracking-tight"
              >
                {letter}
              </motion.span>
            ))}
          </div>
        )}
        
        {/* Palabra PODCAST */}
        <div className="flex items-center">
          <div className="flex items-center">
            {['P', 'O', 'D', 'C', 'A', 'S', 'T'].map((letter, i) => (
              <motion.span
                key={letter}
                custom={i + (showEfis ? 4 : 0)}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                whileHover="hover"
                variants={letterVariants}
                className="text-muted-foreground font-light tracking-tight"
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>
        
        {/* Efecto de desenfoque al hacer hover */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            className="absolute -inset-4 bg-primary/10 rounded-full blur-xl"
          />
        )}
      </div>
    </div>
  );
  
  // Componente Logo Estático
  const StaticLogo = () => (
    <div className={`flex items-center ${sizes[size]} ${colors[variant]} ${className}`}>
      {/* Letras EFIS */}
      {showEfis && (
        <div className="flex items-center mr-1">
          <span className="text-primary font-medium tracking-tight">E</span>
          <span className="text-primary font-medium tracking-tight">F</span>
          <span className="text-primary font-medium tracking-tight">I</span>
          <span className="text-primary font-medium tracking-tight">S</span>
        </div>
      )}
      
      {/* Palabra PODCAST */}
      <div className="flex items-center">
        <div className="flex items-center">
          <span className="text-muted-foreground font-light tracking-tight">P</span>
          <span className="text-muted-foreground font-light tracking-tight">O</span>
          <span className="text-muted-foreground font-light tracking-tight">D</span>
          <span className="text-muted-foreground font-light tracking-tight">C</span>
          <span className="text-muted-foreground font-light tracking-tight">A</span>
          <span className="text-muted-foreground font-light tracking-tight">S</span>
          <span className="text-muted-foreground font-light tracking-tight">T</span>
        </div>
      </div>
    </div>
  );
  
  // Renderizar el logo con o sin enlace
  const LogoComponent = animated ? AnimatedLogo : StaticLogo;
  
  if (href) {
    return (
      <Link href={href} className="focus:outline-none">
        <LogoComponent />
      </Link>
    );
  }
  
  return <LogoComponent />;
} 