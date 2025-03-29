"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioVisualizerProps {
  isPlaying?: boolean;
  color?: string;
  barCount?: number;
  height?: number;
  className?: string;
}

export default function AudioVisualizer({
  isPlaying = false,
  color = 'currentColor',
  barCount = 20,
  height = 30,
  className = '',
}: AudioVisualizerProps) {
  const [bars, setBars] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Generar valores aleatorios para las barras
  const generateBars = () => {
    const newBars = [];
    for (let i = 0; i < barCount; i++) {
      // valores entre 0.2 y 1
      newBars.push(isPlaying ? Math.random() * 0.8 + 0.2 : 0.1);
    }
    setBars(newBars);
  };
  
  useEffect(() => {
    // Si está reproduciendo, actualiza las barras cada 100ms
    if (isPlaying) {
      generateBars();
      intervalRef.current = setInterval(generateBars, 100);
    } else {
      // Si no está reproduciendo, genera barras planas
      const flatBars = Array(barCount).fill(0.1);
      setBars(flatBars);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, barCount]);
  
  return (
    <div className={`flex items-end justify-center gap-[2px] h-[${height}px] ${className}`}>
      <AnimatePresence>
        {bars.map((value, index) => (
          <motion.div
            key={index}
            initial={{ height: '10%' }}
            animate={{ height: `${value * 100}%` }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
            style={{ backgroundColor: color }}
            className="w-1 rounded-full"
          />
        ))}
      </AnimatePresence>
    </div>
  );
} 