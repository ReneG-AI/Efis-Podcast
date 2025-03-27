"use client";

import { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaYoutube } from "react-icons/fa";
import { YOUTUBE_CHANNEL } from "@/platforms";

export default function YouTubeDirectPage() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="container py-20 text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="mt-4">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-screen-xl py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Canal de YouTube</h1>
        <p className="mt-2 text-muted-foreground">
          Videos y Shorts del canal oficial de Efis Podcast en YouTube.
        </p>
      </div>
      
      <div className="mb-6 flex flex-wrap gap-4">
        <a 
          href={YOUTUBE_CHANNEL}
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md bg-red-600 px-6 py-3 text-sm font-medium text-white hover:bg-red-700 transition-colors"
        >
          <FaYoutube className="mr-2 h-5 w-5" />
          Ver Canal Completo
        </a>
        <a 
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-neutral-800 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-700 transition-colors"
        >
          <FaExternalLinkAlt className="mr-2 h-4 w-4" />
          Volver al Inicio
        </a>
      </div>
      
      <div className="space-y-6">
        <div className="relative w-full aspect-video">
          <iframe 
            className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
            src={`https://www.youtube.com/embed?listType=user_uploads&list=EFISPODCAST`}
            title="Canal de YouTube EFISPODCAST"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        
        <p className="text-sm text-muted-foreground text-center">
          * Si la lista no carga correctamente, haz clic en "Ver Canal Completo" para ir directamente a YouTube
        </p>
      </div>
    </div>
  );
} 