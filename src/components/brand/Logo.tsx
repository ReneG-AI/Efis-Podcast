import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'default' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showEfis?: boolean;
}

export function Logo({ 
  variant = 'default', 
  size = 'md',
  showEfis = true 
}: LogoProps) {
  // Configuraciones según tamaño
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  // Configuraciones según variante
  const variantClasses = {
    default: 'text-gradient-brand',
    light: 'text-white',
    dark: 'text-foreground'
  };

  const getWaveHeight = () => {
    switch (size) {
      case 'sm': return 'h-3';
      case 'lg': return 'h-5';
      default: return 'h-4';
    }
  };

  return (
    <Link href="/" className="flex items-center group">
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
      
      {/* Animación de ondas sonoras */}
      <div className={`flex items-end ml-2 ${getWaveHeight()}`}>
        <div className="sound-wave h-full"></div>
        <div className="sound-wave h-full"></div>
        <div className="sound-wave h-full"></div>
        <div className="sound-wave h-full"></div>
        <div className="sound-wave h-full"></div>
      </div>
    </Link>
  );
}

export default Logo; 