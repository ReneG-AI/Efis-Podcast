"use client";

import { useState, useEffect, useCallback } from "react";
import { FaYoutube, FaPlay, FaRegClock, FaEye, FaSync } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { 
  getChannelRegularVideos, 
  getChannelReels, 
  getChannelInfo, 
  type YouTubeVideo,
  type YouTubeChannel 
} from "@/lib/api/youtube";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Loader2, Clock, Eye } from 'lucide-react';

// Datos de ejemplo para usar si la API falla
const EXAMPLE_CHANNEL = {
  id: "UCj_orkn7ilVdxmpElajgEfQ",
  title: "EFIS PODCAST",
  description: "Canal de EFIS PODCAST",
  customUrl: "@EFISPODCAST",
  thumbnails: {
    default: { url: "https://yt3.googleusercontent.com/ytc/AIf8zZRbNQH9d5ldjOKm1uqiZiCf6t2UpqYfQ9RFkx4d=s88-c-k-c0x00ffffff-no-rj", width: 88, height: 88 },
    medium: { url: "https://yt3.googleusercontent.com/ytc/AIf8zZRbNQH9d5ldjOKm1uqiZiCf6t2UpqYfQ9RFkx4d=s240-c-k-c0x00ffffff-no-rj", width: 240, height: 240 },
    high: { url: "https://yt3.googleusercontent.com/ytc/AIf8zZRbNQH9d5ldjOKm1uqiZiCf6t2UpqYfQ9RFkx4d=s800-c-k-c0x00ffffff-no-rj", width: 800, height: 800 }
  },
  statistics: {
    viewCount: "12345",
    subscriberCount: "1234",
    videoCount: "45"
  }
};

// Ejemplo de videos para cuando la API no esté disponible
const FALLBACK_VIDEOS: YouTubeVideo[] = [
  {
    id: "fallback1",
    title: "Ejemplo de episodio de podcast",
    description: "Este es un video de ejemplo que se muestra cuando la API no está disponible",
    publishedAt: new Date().toISOString(),
    thumbnails: {
      default: { url: "https://via.placeholder.com/120x90.png?text=Ejemplo", width: 120, height: 90 },
      medium: { url: "https://via.placeholder.com/320x180.png?text=Ejemplo", width: 320, height: 180 },
      high: { url: "https://via.placeholder.com/480x360.png?text=Ejemplo", width: 480, height: 360 }
    },
    channelTitle: "EFIS PODCAST",
    duration: "45:00",
    viewCount: "1250",
    isReel: false
  },
  {
    id: "fallback2",
    title: "Otro episodio de ejemplo",
    description: "Este es otro video de ejemplo para mostrar cuando no hay datos de la API",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    thumbnails: {
      default: { url: "https://via.placeholder.com/120x90.png?text=Ejemplo", width: 120, height: 90 },
      medium: { url: "https://via.placeholder.com/320x180.png?text=Ejemplo", width: 320, height: 180 },
      high: { url: "https://via.placeholder.com/480x360.png?text=Ejemplo", width: 480, height: 360 }
    },
    channelTitle: "EFIS PODCAST",
    duration: "32:15",
    viewCount: "980",
    isReel: false
  }
];

export default function YouTubeEpisodes() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [reels, setReels] = useState<YouTubeVideo[]>([]);
  const [channel, setChannel] = useState<YouTubeChannel | null>(null);
  const [activeTab, setActiveTab] = useState("podcasts");
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // Función para cargar datos del canal de YouTube
  const loadYouTubeData = useCallback(async () => {
    setLoading(true);
    setError(null);
    console.log("Cargando datos de YouTube...");

    try {
      // Obtener información del canal
      const channelInfo = await getChannelInfo();
      if (channelInfo) {
        setChannel(channelInfo);
      } else {
        console.warn("No se pudo obtener información del canal");
      }

      // Obtener videos regulares (podcasts)
      const regularVideos = await getChannelRegularVideos();
      setVideos(regularVideos || []);

      // Obtener reels/shorts
      const videoReels = await getChannelReels();
      setReels(videoReels || []);

      // Actualizar la hora de la última actualización
      setLastUpdate(new Date());
    } catch (err) {
      console.error("Error al cargar datos de YouTube:", err);
      setError("No se pudieron cargar los videos. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadYouTubeData();
  }, [loadYouTubeData]);

  // Formatear fecha
  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    } catch (e) {
      return dateString;
    }
  };

  // Formatear número con separador de miles
  const formatNumber = (num: string) => {
    return parseInt(num).toLocaleString('es-ES');
  };

  // Si hay un error, mostrar mensaje
  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Canal de YouTube</h1>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-medium text-red-800 dark:text-red-200">Error al cargar contenido</h3>
          <p className="text-red-700 dark:text-red-300 mt-2">{error}</p>
          <div className="mt-4">
            <h4 className="font-medium text-red-800 dark:text-red-200">Posibles soluciones:</h4>
            <ul className="list-disc list-inside text-red-700 dark:text-red-300 mt-1">
              <li>Verifica tu conexión a internet</li>
              <li>Asegúrate de tener configurada la API de YouTube</li>
              <li>Comprueba si hay un problema con tu clave de API</li>
            </ul>
          </div>
          <Button 
            onClick={loadYouTubeData} 
            className="mt-4 bg-red-600 hover:bg-red-700 text-white"
          >
            Reintentar
          </Button>
        </div>
        <div className="text-center py-8">
          <p className="mb-4">Mientras tanto, puedes visitar nuestro canal oficial:</p>
          <a 
            href="https://www.youtube.com/@EFISPODCAST" 
            target="_blank"
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Ver en YouTube
          </a>
        </div>
      </div>
    );
  }

  // Si está cargando, mostrar spinner
  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Canal de YouTube</h1>
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-lg text-muted-foreground">Cargando videos de YouTube...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Canal de YouTube</h1>
      <p className="mb-6 text-muted-foreground">Videos y Shorts del canal oficial de Efis Podcast en YouTube.</p>
      
      {lastUpdate && (
        <p className="text-xs text-muted-foreground mb-4">
          Última actualización: {lastUpdate.toLocaleString('es-ES')}
        </p>
      )}

      {/* Información del canal */}
      {channel && (
        <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-secondary/20 rounded-lg mb-6">
          <div className="shrink-0">
            <Image 
              src={channel.thumbnails.medium.url} 
              alt={channel.title}
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
          <div className="flex-grow text-center md:text-left">
            <h2 className="text-xl font-bold">{channel.title}</h2>
            <p className="text-sm text-muted-foreground">@{channel.customUrl}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-sm text-muted-foreground">
              <span>{formatNumber(channel.statistics.subscriberCount)} suscriptores</span>
              <span>{formatNumber(channel.statistics.videoCount)} videos</span>
              <span>{formatNumber(channel.statistics.viewCount)} visualizaciones</span>
            </div>
          </div>
          <div className="shrink-0">
            <a 
              href={`https://www.youtube.com/channel/${channel.id}`} 
              target="_blank"
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Ver en YouTube
            </a>
          </div>
        </div>
      )}

      {/* Si no hay videos, mostrar mensaje */}
      {videos.length === 0 && reels.length === 0 ? (
        <div className="text-center py-8 border rounded-lg">
          <p className="mb-4">No se encontraron videos en el canal.</p>
          <a 
            href="https://www.youtube.com/@EFISPODCAST" 
            target="_blank"
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Ver en YouTube
          </a>
        </div>
      ) : (
        <Tabs defaultValue="podcasts" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="podcasts">
              Podcasts ({videos.length})
            </TabsTrigger>
            <TabsTrigger value="reels">
              Reels ({reels.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="podcasts" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map(video => (
                <a 
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  className="group"
                >
                  <div className="overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <Image 
                        src={video.thumbnails.high.url} 
                        alt={video.title}
                        width={video.thumbnails.high.width}
                        height={video.thumbnails.high.height}
                        className="w-full object-cover aspect-video group-hover:scale-105 transition-transform duration-300"
                      />
                      {video.duration && (
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium line-clamp-2 mb-2 group-hover:text-primary">
                        {video.title}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <div className="flex items-center mr-4">
                          <Eye className="w-4 h-4 mr-1" />
                          {formatNumber(video.viewCount || '0')}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatDate(video.publishedAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reels" className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {reels.map(reel => (
                <a 
                  key={reel.id}
                  href={`https://www.youtube.com/shorts/${reel.id}`}
                  target="_blank"
                  className="group"
                >
                  <div className="overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <Image 
                        src={reel.thumbnails.high.url} 
                        alt={reel.title}
                        width={reel.thumbnails.high.width}
                        height={reel.thumbnails.high.height}
                        className="w-full object-cover aspect-[9/16] group-hover:scale-105 transition-transform duration-300"
                      />
                      {reel.duration && (
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {reel.duration}
                        </div>
                      )}
                    </div>
                    <div className="p-2">
                      <h3 className="text-sm font-medium line-clamp-1 group-hover:text-primary">
                        {reel.title}
                      </h3>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Eye className="w-3 h-3 mr-1" />
                        {formatNumber(reel.viewCount || '0')}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
} 