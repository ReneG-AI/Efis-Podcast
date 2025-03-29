"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaBackward, FaForward } from 'react-icons/fa';
import AudioVisualizer from './AudioVisualizer';

interface AudioPlayerProps {
  src: string;
  title?: string;
  autoPlay?: boolean;
  variant?: 'mini' | 'default' | 'full';
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

export default function AudioPlayer({
  src,
  title,
  autoPlay = false,
  variant = 'default',
  className = '',
  onPlay,
  onPause,
  onEnded
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Formatear tiempo en minutos:segundos
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Manejar reproducción/pausa
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      onPause?.();
    } else {
      audioRef.current.play();
      onPlay?.();
    }
    setIsPlaying(!isPlaying);
  };
  
  // Manejar silencio
  const toggleMute = () => {
    if (!audioRef.current) return;
    
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };
  
  // Avanzar o retroceder
  const seek = (amount: number) => {
    if (!audioRef.current) return;
    
    audioRef.current.currentTime += amount;
  };
  
  // Cambiar posición de reproducción
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  // Cambiar volumen
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    
    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  // Actualizar estado durante la reproducción
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const handleTimeUpdate = () => {
      if (!isDragging) {
        setCurrentTime(audio.currentTime);
      }
    };
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      onEnded?.();
    };
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    
    if (autoPlay) {
      audio.play().catch(error => {
        console.error('Error al reproducir automáticamente:', error);
      });
    }
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [autoPlay, isDragging, onEnded]);
  
  // Calcular porcentaje de progreso
  const progress = duration ? (currentTime / duration) * 100 : 0;
  
  // Variante Mini
  if (variant === 'mini') {
    return (
      <div className={`flex items-center gap-2 p-2 rounded-lg bg-card/60 backdrop-blur-sm ${className}`}>
        <button 
          onClick={togglePlay}
          className="bg-primary rounded-full p-2 text-white focus:outline-none"
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying ? <FaPause size={10} /> : <FaPlay size={10} />}
        </button>
        
        <div className="flex-1 flex flex-col min-w-0">
          {title && (
            <div className="text-xs font-medium line-clamp-1">{title}</div>
          )}
          <div className="w-full h-1 bg-background/50 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
        
        <div className="text-xs text-foreground/70">
          {formatTime(currentTime)}
        </div>
      </div>
    );
  }
  
  // Variante Default
  if (variant === 'default') {
    return (
      <div className={`p-3 rounded-lg border border-border/50 bg-card/80 backdrop-blur-sm ${className}`}>
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={togglePlay}
            className="bg-primary rounded-full p-3 text-white focus:outline-none hover:bg-primary/90 transition-colors"
            aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
          >
            {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
          </button>
          
          {title && (
            <div className="font-medium line-clamp-1">{title}</div>
          )}
          
          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={toggleMute}
              className="p-2 rounded-full hover:bg-background/50 transition-colors"
              aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
            >
              {isMuted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-xs text-foreground/70">
            {formatTime(currentTime)}
          </div>
          
          <div className="flex-1 relative h-2">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              aria-label="Progreso de reproducción"
            />
            <div className="w-full h-1 bg-background/50 rounded-full overflow-hidden mt-0.5">
              <motion.div 
                className="h-full bg-primary"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
          
          <div className="text-xs text-foreground/70">
            {formatTime(duration)}
          </div>
        </div>
        
        {isPlaying && (
          <div className="mt-3">
            <AudioVisualizer barCount={24} maxHeight={20} className="w-full" />
          </div>
        )}
      </div>
    );
  }
  
  // Variante Full
  return (
    <div className={`p-4 rounded-xl border border-border/50 bg-card ${className}`}>
      <div className="relative mb-6">
        <AnimatePresence>
          {isPlaying && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <AudioVisualizer barCount={50} maxHeight={60} className="w-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {title && (
        <h3 className="font-semibold text-lg mb-4">{title}</h3>
      )}
      
      <div className="flex justify-center gap-6 mb-6">
        <button
          onClick={() => seek(-10)}
          className="p-3 rounded-full hover:bg-background/50 transition-colors"
          aria-label="Retroceder 10 segundos"
        >
          <FaBackward size={16} />
        </button>
        
        <button
          onClick={togglePlay}
          className="bg-gradient-brand rounded-full p-4 text-white focus:outline-none hover:opacity-90 transition-opacity shadow-md"
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
        </button>
        
        <button
          onClick={() => seek(10)}
          className="p-3 rounded-full hover:bg-background/50 transition-colors"
          aria-label="Avanzar 10 segundos"
        >
          <FaForward size={16} />
        </button>
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        <div className="text-sm text-foreground/70">
          {formatTime(currentTime)}
        </div>
        
        <div className="flex-1 relative h-2">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            aria-label="Progreso de reproducción"
          />
          <div className="w-full h-2 bg-background/50 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-brand"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
        
        <div className="text-sm text-foreground/70">
          {formatTime(duration)}
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMute}
          className="p-2 rounded-full hover:bg-background/50 transition-colors"
          aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
        >
          {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
        </button>
        
        <div className="flex-1 relative h-2 max-w-[100px]">
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            aria-label="Volumen"
          />
          <div className="w-full h-1 bg-background/50 rounded-full overflow-hidden mt-0.5">
            <motion.div 
              className="h-full bg-primary"
              animate={{ width: `${volume * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
      </div>
      
      <audio ref={audioRef} src={src} preload="metadata" />
    </div>
  );
} 