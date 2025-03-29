"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
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
  
  // Avanzar o retroceder con doble clic
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;
    const newTime = (clickPosition / progressBarWidth) * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
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
      <div className={`flex items-center gap-2 p-2 rounded-lg bg-background/40 backdrop-blur-sm ${className}`}>
        <button 
          onClick={togglePlay}
          className="text-primary hover:text-primary/80 transition-colors"
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
        </button>
        
        <div className="flex-1 flex flex-col min-w-0 gap-1">
          {title && (
            <div className="text-xs font-medium line-clamp-1 text-foreground/80">{title}</div>
          )}
          <div 
            className="w-full h-1 bg-primary/10 rounded-full overflow-hidden cursor-pointer"
            onClick={handleProgressBarClick}
          >
            <motion.div 
              className="h-full bg-primary/60"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
        
        <div className="text-xs text-foreground/60">
          {formatTime(currentTime)}
        </div>
      </div>
    );
  }
  
  // Variante Default
  if (variant === 'default') {
    return (
      <div className={`p-4 rounded-lg border border-border/20 bg-background/40 backdrop-blur-sm ${className}`}>
        <div className="flex flex-col gap-3">
          {title && (
            <div className="text-sm font-medium text-foreground/80">{title}</div>
          )}
          
          <div className="relative">
            <div 
              className="w-full h-2 bg-primary/10 rounded-full overflow-hidden cursor-pointer"
              onClick={handleProgressBarClick}
            >
              <motion.div 
                className="h-full bg-primary/60"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
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
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
              >
                {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
              </button>
              
              <div className="text-xs text-foreground/60">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-foreground/60 hover:text-foreground/80 transition-colors"
                aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
              >
                {isMuted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
              </button>
              
              <div className="relative w-16 h-2">
                <div className="w-full h-1 bg-primary/10 rounded-full overflow-hidden mt-0.5">
                  <motion.div 
                    className="h-full bg-primary/60"
                    animate={{ width: `${volume * 100}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
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
              </div>
            </div>
          </div>
          
          {isPlaying && (
            <div className="mt-2 h-6 opacity-60">
              <AudioVisualizer barCount={32} maxHeight={16} className="w-full" />
            </div>
          )}
        </div>
        
        <audio ref={audioRef} src={src} preload="metadata" />
      </div>
    );
  }
  
  // Variante Full (también simplificada)
  return (
    <div className={`p-4 rounded-xl border border-border/20 bg-background/40 backdrop-blur-sm ${className}`}>
      {title && (
        <h3 className="font-medium text-base mb-4 text-center text-foreground/80">{title}</h3>
      )}
      
      <div className="flex justify-center mb-5">
        <button
          onClick={togglePlay}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-primary/80 to-primary shadow-md text-white hover:opacity-90 transition-opacity"
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} className="ml-1" />}
        </button>
      </div>
      
      <AnimatePresence>
        {isPlaying && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4 overflow-hidden"
          >
            <AudioVisualizer barCount={40} maxHeight={30} className="w-full opacity-70" />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex flex-col gap-2 mb-4">
        <div 
          className="w-full h-2 bg-primary/10 rounded-full overflow-hidden cursor-pointer"
          onClick={handleProgressBarClick}
        >
          <motion.div 
            className="h-full bg-primary/60"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        
        <div className="flex items-center justify-between text-xs text-foreground/60">
          <div>{formatTime(currentTime)}</div>
          <div>{formatTime(duration)}</div>
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={toggleMute}
          className="text-foreground/60 hover:text-foreground/80 transition-colors"
          aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
        >
          {isMuted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
        </button>
        
        <div className="relative w-20 h-2">
          <div className="w-full h-1 bg-primary/10 rounded-full overflow-hidden mt-0.5">
            <motion.div 
              className="h-full bg-primary/60"
              animate={{ width: `${volume * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
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
        </div>
      </div>
      
      <audio ref={audioRef} src={src} preload="metadata" />
    </div>
  );
} 