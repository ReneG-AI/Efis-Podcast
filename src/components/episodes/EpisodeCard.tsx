"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaHeadphones } from 'react-icons/fa';

import AudioVisualizer from '@/components/ui/AudioVisualizer';

export interface EpisodeCardProps {
  title: string;
  description: string;
  image: string;
  duration: string;
  number?: string;
  date?: string;
  href: string;
  audioUrl?: string;
  variant?: 'default' | 'featured' | 'compact';
  onPlay?: () => void;
}

export default function EpisodeCard({
  title,
  description,
  image,
  duration,
  number,
  date,
  href,
  audioUrl,
  variant = 'default',
  onPlay
}: EpisodeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAudio, setShowAudio] = useState(false);

  // Simular reproducción de audio
  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPlaying(!isPlaying);
    setShowAudio(true);
    
    if (onPlay) {
      onPlay();
    }
  };

  // Determinar clases basadas en la variante
  const getCardClasses = () => {
    switch (variant) {
      case 'featured':
        return 'col-span-1 md:col-span-2 md:row-span-2';
      case 'compact':
        return 'flex flex-row h-24';
      default:
        return '';
    }
  };

  return (
    <motion.div 
      className={`group ${getCardClasses()}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Link href={href} className="block h-full">
        <div className="bg-background border border-border/60 rounded-xl overflow-hidden transition-all duration-300 h-full hover:shadow-lg relative">
          {/* Imagen del episodio */}
          <div className={`relative ${variant === 'compact' ? 'w-24 h-full' : 'h-48'} overflow-hidden`}>
            <Image 
              src={image} 
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70"></div>
            
            {/* Duración */}
            <div className="absolute bottom-3 left-3 bg-primary/90 text-primary-foreground px-2 py-1 text-xs font-medium rounded">
              {duration}
            </div>
            
            {/* Número del episodio */}
            {number && (
              <div className="absolute top-3 right-3 bg-card/90 text-foreground px-2 py-1 text-xs font-bold rounded">
                {number}
              </div>
            )}
            
            {/* Botón de reproducción que aparece al hacer hover */}
            {audioUrl && (
              <motion.button
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handlePlayClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="bg-primary text-white p-3 rounded-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </motion.div>
              </motion.button>
            )}
          </div>
          
          {/* Contenido del episodio */}
          <div className={`p-4 ${variant === 'compact' ? 'flex-1' : ''}`}>
            <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
            
            {variant !== 'compact' && (
              <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                {description}
              </p>
            )}
            
            {date && (
              <div className="text-xs text-muted-foreground">
                {date}
              </div>
            )}
            
            {/* Visualizador de audio */}
            {showAudio && isPlaying && audioUrl && (
              <div className="mt-2 h-8">
                <AudioVisualizer barCount={40} maxHeight={40} className="w-full h-8" />
              </div>
            )}
          </div>
          
          {/* Indicador de reproducción */}
          {isPlaying && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-brand" />
          )}
        </div>
      </Link>
    </motion.div>
  );
} 