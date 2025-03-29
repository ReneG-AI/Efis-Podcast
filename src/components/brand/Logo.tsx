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

export function Logo({ 
  variant = 'default', 
  size = 'md',
  showEfis = true,
  className = '',
  animated = true,
  href = '/'
}: LogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Configuraciones según tamaño
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl'
  };

  // Configuraciones según variante
  const variantClasses = {
    default: 'text-gradient-brand',
    light: 'text-white',
    dark: 'text-foreground'
  };

  // Animaciones para las letras
  const letterContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.075
      }
    }
  };

  const letterVariants = {
    hidden: { 
      y: 20, 
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 16
      }
    }
  };

  // Determinar las clases para las ondas sonoras
  const getWaveClasses = () => {
    const waveHeights = {
      sm: 'h-2.5',
      md: 'h-3.5',
      lg: 'h-5',
      xl: 'h-8'
    };
    
    return `flex items-end gap-[2px] ${waveHeights[size]} ml-2`;
  };

  // Efecto para animar en la carga inicial
  useEffect(() => {
    setHasLoaded(true);
  }, []);

  // Componente con efecto de letra a letra
  const AnimatedLogo = () => (
    <div className="flex flex-col">
      {showEfis && (
        <motion.div 
          className="overflow-hidden"
          initial="hidden"
          animate={hasLoaded ? "visible" : "hidden"}
          variants={letterContainerVariants}
        >
          <div className="flex">
            {['E', 'F', 'I', 'S'].map((letter, i) => (
              <motion.span 
                key={i} 
                className={`font-black tracking-wider leading-none ${sizeClasses[size]} ${variantClasses[variant]}`}
                variants={letterVariants}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
      
      <motion.div 
        className="overflow-hidden"
        initial="hidden"
        animate={hasLoaded ? "visible" : "hidden"}
        variants={letterContainerVariants}
      >
        <div className="flex">
          {['P', 'O', 'D', 'C', 'A', 'S', 'T'].map((letter, i) => (
            <motion.span 
              key={i} 
              className={`font-bold tracking-wider leading-none ${showEfis ? 'mt-1' : ''} ${sizeClasses[size]} ${variantClasses[variant]}`}
              variants={letterVariants}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );

  // Logo sin animación
  const StaticLogo = () => (
    <div className="flex flex-col">
      {showEfis && (
        <span className={`font-black tracking-wider leading-none ${sizeClasses[size]} ${variantClasses[variant]}`}>
          EFIS
        </span>
      )}
      <span className={`font-bold tracking-wider leading-none ${showEfis ? 'mt-1' : ''} ${sizeClasses[size]} ${variantClasses[variant]}`}>
        PODCAST
      </span>
    </div>
  );

  return (
    <Link 
      href={href} 
      className={`group flex items-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo según si está animado o no */}
      {animated ? <AnimatedLogo /> : <StaticLogo />}
      
      {/* Animación de ondas sonoras */}
      <div className={getWaveClasses()}>
        <motion.div 
          className={`sound-wave h-[40%] ${isHovered ? 'animate-[sound-wave_1s_infinite_ease-in-out]' : ''}`}
          animate={isHovered ? { scaleY: [0.4, 1, 0.4] } : { scaleY: 0.4 }}
          transition={{ 
            duration: 1, 
            repeat: isHovered ? Infinity : 0,
            repeatType: "loop"
          }}
        />
        <motion.div 
          className={`sound-wave h-[85%] ${isHovered ? 'animate-[sound-wave_1s_infinite_ease-in-out_0.2s]' : ''}`}
          animate={isHovered ? { scaleY: [0.6, 1, 0.6] } : { scaleY: 0.6 }}
          transition={{ 
            duration: 1, 
            repeat: isHovered ? Infinity : 0,
            repeatType: "loop",
            delay: 0.2
          }}
        />
        <motion.div 
          className={`sound-wave h-[95%] ${isHovered ? 'animate-[sound-wave_1s_infinite_ease-in-out_0.4s]' : ''}`}
          animate={isHovered ? { scaleY: [0.8, 1, 0.8] } : { scaleY: 0.8 }}
          transition={{ 
            duration: 1, 
            repeat: isHovered ? Infinity : 0,
            repeatType: "loop",
            delay: 0.4
          }}
        />
        <motion.div 
          className={`sound-wave h-[75%] ${isHovered ? 'animate-[sound-wave_1s_infinite_ease-in-out_0.6s]' : ''}`}
          animate={isHovered ? { scaleY: [0.5, 1, 0.5] } : { scaleY: 0.5 }}
          transition={{ 
            duration: 1, 
            repeat: isHovered ? Infinity : 0,
            repeatType: "loop",
            delay: 0.6
          }}
        />
        <motion.div 
          className={`sound-wave h-[60%] ${isHovered ? 'animate-[sound-wave_1s_infinite_ease-in-out_0.8s]' : ''}`}
          animate={isHovered ? { scaleY: [0.3, 1, 0.3] } : { scaleY: 0.3 }}
          transition={{ 
            duration: 1, 
            repeat: isHovered ? Infinity : 0,
            repeatType: "loop",
            delay: 0.8
          }}
        />
      </div>
      
      {/* Efecto de iluminación al hacer hover */}
      {isHovered && (
        <motion.div 
          className="absolute inset-0 bg-primary/10 blur-lg rounded-full opacity-60 z-[-1]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1.2 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </Link>
  );
}

export default Logo; 