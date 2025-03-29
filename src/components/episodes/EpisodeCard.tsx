"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaClock, FaHeadphones } from 'react-icons/fa';
import AudioVisualizer from '../ui/AudioVisualizer';

interface EpisodeCardProps {
  id: string;
  title: string;
  description?: string;
  image: string;
  duration: string;
  date: string;
  listens?: string;
  audioUrl?: string;
  href: string;
  variant?: 'default' | 'featured' | 'compact';
}

export default function EpisodeCard({
  id,
  title,
  description,
  image,
  duration,
  date,
  listens,
  audioUrl,
  href,
  variant = 'default'
}: EpisodeCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [audio] = useState(typeof Audio !== 'undefined' ? new Audio(audioUrl) : null);

  // Configurar dimensiones y estilos basados en la variante
  const cardStyles = {
    'default': 'bg-card border border-border/50 rounded-xl overflow-hidden',
    'featured': 'bg-gradient-to-br from-background to-card border border-primary/20 rounded-xl overflow-hidden shadow-lg',
    'compact': 'bg-card/60 backdrop-blur-sm border border-border/30 rounded-lg overflow-hidden'
  };

  const imageStyles = {
    'default': 'aspect-video',
    'featured': 'aspect-[4/3]',
    'compact': 'aspect-square w-20 h-20 rounded-lg'
  };

  // Función para reproducir/pausar audio
  const toggleAudio = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Detener audio cuando el componente se desmonta
  const handleCardClick = () => {
    if (isPlaying && audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <Link 
      href={href} 
      className="block group" 
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className={`${cardStyles[variant]} hover:shadow-lg transition-all duration-300 relative`}
        whileHover={{ 
          y: -5,
          transition: { duration: 0.2 }
        }}
      >
        {variant === 'compact' ? (
          <div className="flex items-center p-3 gap-4">
            <div className={`relative shrink-0 ${imageStyles[variant]}`}>
              <Image
                src={image}
                alt={title}
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <div 
                  className="bg-primary/80 rounded-full p-2 cursor-pointer"
                  onClick={toggleAudio}
                >
                  {isPlaying ? (
                    <FaPause className="w-3 h-3 text-white" />
                  ) : (
                    <FaPlay className="w-3 h-3 text-white" />
                  )}
                </div>
              </motion.div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                {title}
              </h3>
              
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-foreground/70">{date}</span>
                <span className="text-xs flex items-center text-foreground/70">
                  <FaClock className="w-3 h-3 mr-1" />
                  {duration}
                </span>
              </div>
              
              {isPlaying && (
                <div className="mt-1">
                  <AudioVisualizer 
                    isPlaying={isPlaying} 
                    color="var(--primary)" 
                    barCount={10}
                    height={15}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="relative">
              <Image
                src={image}
                alt={title}
                width={500}
                height={variant === 'featured' ? 375 : 280}
                className={`w-full object-cover ${imageStyles[variant]} group-hover:scale-105 transition-transform duration-500`}
              />
              
              {/* Gradiente sobre la imagen */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Botón de reproducir */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: isHovered ? 1 : 0.8, 
                  opacity: isHovered ? 1 : 0 
                }}
                transition={{ duration: 0.3 }}
              >
                <div 
                  className="bg-primary/90 rounded-full p-3 transform transition-transform duration-300 cursor-pointer shadow-lg"
                  onClick={toggleAudio}
                >
                  {isPlaying ? (
                    <FaPause className="w-6 h-6 text-white" />
                  ) : (
                    <FaPlay className="w-6 h-6 text-white" />
                  )}
                </div>
              </motion.div>
              
              <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm text-xs px-2 py-1 rounded-md">
                {duration}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className={`font-semibold line-clamp-2 group-hover:text-primary transition-colors ${variant === 'featured' ? 'text-lg' : 'text-base'}`}>
                {title}
              </h3>
              
              {description && (
                <p className="text-sm text-foreground/70 line-clamp-2 mt-2 mb-3">
                  {description}
                </p>
              )}
              
              <div className="flex items-center justify-between text-sm text-foreground/70">
                <span>{date}</span>
                
                {listens && (
                  <div className="flex items-center">
                    <FaHeadphones className="w-4 h-4 mr-1 text-primary/70" />
                    {listens}
                  </div>
                )}
              </div>
              
              {isPlaying && (
                <div className="mt-3 pt-3 border-t border-border/30">
                  <AudioVisualizer 
                    isPlaying={isPlaying} 
                    color="var(--primary)" 
                    barCount={30}
                    height={20}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </motion.div>
    </Link>
  );
} 