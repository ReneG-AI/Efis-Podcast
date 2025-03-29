"use client";

import React from 'react';
import { motion } from 'framer-motion';
import ScrollAnimation from './ScrollAnimation';

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  containerClassName?: string;
  background?: 'default' | 'gradient' | 'waves' | 'none';
  titleAlignment?: 'left' | 'center' | 'right';
  withAnimation?: boolean;
  id?: string;
}

export default function Section({
  children,
  title,
  subtitle,
  className = '',
  containerClassName = '',
  background = 'default',
  titleAlignment = 'left',
  withAnimation = true,
  id,
}: SectionProps) {
  const backgroundClasses = {
    default: 'bg-background',
    gradient: 'bg-gradient-to-br from-background to-card',
    waves: 'bg-background relative overflow-hidden',
    none: ''
  };

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto'
  };

  // Variantes de animación para el título
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 } 
    }
  };

  // Variantes de animación para el subtítulo
  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: 0.2 } 
    }
  };

  // Componente para el título
  const TitleComponent = () => (
    <div className={`mb-8 ${alignmentClasses[titleAlignment]}`}>
      {title && (
        <motion.h2 
          className="text-3xl font-extrabold tracking-wider text-gradient-brand mb-4 max-w-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={titleVariants}
        >
          {title}
        </motion.h2>
      )}
      
      {subtitle && (
        <motion.p 
          className="text-foreground/80 max-w-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={subtitleVariants}
        >
          {subtitle}
        </motion.p>
      )}
      
      {(title || subtitle) && (
        <div className="w-20 h-1 bg-gradient-brand rounded-full mt-4"></div>
      )}
    </div>
  );

  return (
    <section 
      id={id}
      className={`py-16 ${backgroundClasses[background]} ${className}`}
    >
      {background === 'waves' && (
        <>
          <div className="absolute inset-0 sound-waves-pattern opacity-10"></div>
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-primary/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-secondary/20 blur-[100px] rounded-full"></div>
        </>
      )}
      
      <div className={`container mx-auto px-4 relative z-10 ${containerClassName}`}>
        {(title || subtitle) && <TitleComponent />}
        
        {withAnimation ? (
          <ScrollAnimation variant="slide-up" duration={0.5}>
            {children}
          </ScrollAnimation>
        ) : (
          children
        )}
      </div>
    </section>
  );
} 