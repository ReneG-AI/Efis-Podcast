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
      y: 20
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
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
  
  // Variantes de animación para las ondas de sonido
  const soundWaveVariants = {
    hidden: {
      opacity: 0,
      scaleY: 0
    },
    visible: (i: number) => ({
      opacity: 0.7,
      scaleY: 1,
      transition: {
        delay: 0.5 + (i * 0.05),
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    hover: {
      scaleY: [1, 1.5, 1],
      opacity: 1,
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };
  
  // Componente Logo Animado
  const AnimatedLogo = () => (
    <div
      className={`flex items-center gap-1 ${sizes[size]} font-bold ${colors[variant]} ${className} hover-glow`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Contenedor del Logo */}
      <div className="relative flex items-center">
        {/* Letras EFIS */}
        {showEfis && (
          <div className="flex items-center gap-[1px] mr-1">
            {['E', 'F', 'I', 'S'].map((letter, i) => (
              <motion.span
                key={letter}
                custom={i}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                whileHover="hover"
                variants={letterVariants}
                className="text-gradient-efis font-extrabold"
              >
                {letter}
              </motion.span>
            ))}
          </div>
        )}
        
        {/* Palabra PODCAST */}
        <div className="flex items-center mt-1">
          <div className="flex items-center gap-[1px]">
            {['P', 'O', 'D', 'C', 'A', 'S', 'T'].map((letter, i) => (
              <motion.span
                key={letter}
                custom={i + (showEfis ? 4 : 0)}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                whileHover="hover"
                variants={letterVariants}
                className="text-gradient-podcast font-extrabold"
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>
        
        {/* Ondas de sonido animadas */}
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 flex items-center gap-[2px] h-[60%]">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={soundWaveVariants}
              whileHover="hover"
              className={`w-[2px] h-full rounded-full ${
                i === 1 ? 'bg-gradient-brand' : 'bg-secondary/30'
              }`}
              style={{
                originY: 0.5,
                height: `${60 + i * 15}%`
              }}
            />
          ))}
        </div>
        
        {/* Efecto de desenfoque al hacer hover */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            className="absolute -inset-4 bg-primary/10 rounded-full blur-xl"
          />
        )}
      </div>
    </div>
  );
  
  // Componente Logo Estático
  const StaticLogo = () => (
    <div className={`flex items-center gap-1 ${sizes[size]} font-bold ${colors[variant]} ${className} hover-glow`}>
      {/* Letras EFIS */}
      {showEfis && (
        <div className="flex items-center gap-[1px] mr-1">
          <span className="text-gradient-efis font-extrabold">E</span>
          <span className="text-gradient-efis font-extrabold">F</span>
          <span className="text-gradient-efis font-extrabold">I</span>
          <span className="text-gradient-efis font-extrabold">S</span>
        </div>
      )}
      
      {/* Palabra PODCAST */}
      <div className="flex items-center mt-1">
        <div className="flex items-center gap-[1px]">
          <span className="text-gradient-podcast font-extrabold">P</span>
          <span className="text-gradient-podcast font-extrabold">O</span>
          <span className="text-gradient-podcast font-extrabold">D</span>
          <span className="text-gradient-podcast font-extrabold">C</span>
          <span className="text-gradient-podcast font-extrabold">A</span>
          <span className="text-gradient-podcast font-extrabold">S</span>
          <span className="text-gradient-podcast font-extrabold">T</span>
        </div>
      </div>
      
      {/* Ondas de sonido estáticas */}
      <div className="flex items-center gap-[2px] h-[60%] ml-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-[2px] rounded-full ${
              i === 1 ? 'bg-gradient-brand' : 'bg-secondary/30'
            }`}
            style={{
              height: `${60 + i * 15}%`
            }}
          />
        ))}
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