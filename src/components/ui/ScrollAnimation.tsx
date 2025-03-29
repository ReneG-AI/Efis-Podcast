"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ScrollAnimationProps {
  children: React.ReactNode;
  variant?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom' | 'none';
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  className?: string;
}

const variants = {
  'fade': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  'slide-up': {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  'slide-down': {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
  },
  'slide-left': {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  'slide-right': {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  'zoom': {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  'none': {
    hidden: {},
    visible: {}
  }
};

export function ScrollAnimation({
  children,
  variant = 'fade',
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1,
  className = '',
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [once, threshold]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants[variant]}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default ScrollAnimation; 