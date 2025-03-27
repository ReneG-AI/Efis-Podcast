"use client";

import { useState } from "react";
import { FaPlay } from "react-icons/fa";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  aspectRatio?: "16:9" | "4:3" | "1:1" | "9:16";
}

export default function YouTubeEmbed({ 
  videoId, 
  title, 
  aspectRatio = "16:9" 
}: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const aspectRatioClass = {
    "16:9": "aspect-video",
    "4:3": "aspect-[4/3]",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]"
  }[aspectRatio];
  
  const handleThumbnailClick = () => {
    setIsPlaying(true);
  };
  
  return (
    <div className={`relative w-full ${aspectRatioClass} overflow-hidden bg-muted rounded-lg`}>
      {!isPlaying ? (
        <div 
          className="absolute inset-0 cursor-pointer group"
          onClick={handleThumbnailClick}
        >
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="rounded-full bg-primary p-4 text-primary-foreground transform scale-90 group-hover:scale-100 transition-transform">
              <FaPlay className="h-6 w-6 pl-0.5" />
            </div>
          </div>
          
          {/* YouTube thumbnail */ }
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={`Thumbnail for ${title}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Si la imagen maxresdefault no existe, intenta con la imagen hqdefault
              (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />
          
          <div className="absolute bottom-4 left-4 right-4 bg-black/70 p-2 rounded">
            <h3 className="text-white text-sm font-medium line-clamp-2">{title}</h3>
          </div>
        </div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
          onLoad={() => setIsLoaded(true)}
        />
      )}
      
      {isPlaying && !isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        </div>
      )}
    </div>
  );
} 