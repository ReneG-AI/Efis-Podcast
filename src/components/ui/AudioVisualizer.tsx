"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AudioVisualizerProps {
  className?: string;
  barCount?: number;
  barGap?: number;
  minHeight?: number;
  maxHeight?: number;
}

export default function AudioVisualizer({ 
  className = '',
  barCount = 100,
  barGap = 4,
  minHeight = 10,
  maxHeight = 100
}: AudioVisualizerProps) {
  const [heights, setHeights] = useState<number[]>([]);

  // Generar alturas iniciales aleatorias
  useEffect(() => {
    const initialHeights = Array.from({ length: barCount }, () => 
      getRandomHeight(minHeight, maxHeight)
    );
    setHeights(initialHeights);
  }, [barCount, minHeight, maxHeight]);

  // Función para obtener una altura aleatoria
  const getRandomHeight = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Generar propiedades de animación para cada barra
  const generateAnimationProps = (index: number) => {
    const delay = (index % 13) * 0.1;
    const duration = 0.8 + (Math.random() * 0.6);
    
    return {
      height: [`${getRandomHeight(minHeight, maxHeight)}%`, `${getRandomHeight(minHeight, maxHeight)}%`],
      transition: {
        duration,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
        delay
      }
    };
  };

  return (
    <div className={`w-full h-full flex items-end justify-center gap-[2px] ${className}`}>
      {heights.map((_, index) => (
        <motion.div
          key={index}
          className="w-[2px] bg-gradient-brand rounded-t-full opacity-70"
          animate={generateAnimationProps(index)}
          style={{ 
            marginLeft: `${barGap}px`,
            height: `${heights[index]}%`
          }}
        />
      ))}
    </div>
  );
} 