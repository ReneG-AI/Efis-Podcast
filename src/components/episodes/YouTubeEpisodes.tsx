"use client";

import { useState, useEffect, useCallback } from "react";
import { FaSpinner, FaClock, FaEye, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { 
  getChannelRegularVideos, 
  getChannelReels, 
  getChannelInfo, 
  type YouTubeVideo,
  type YouTubeChannel 
} from "@/lib/api/youtube";

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
      <div className="container mx-auto py-12 px-4">
        <div className="relative mb-10">
          <h1 className="text-3xl font-extrabold tracking-wider text-gradient-brand mb-4">CANAL DE YOUTUBE</h1>
          <div className="w-20 h-1 bg-gradient-brand rounded-full"></div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-6 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 sound-waves-pattern opacity-10"></div>
          <div className="relative z-10">
            <div className="flex items-center text-red-500 mb-4">
              <FaYoutube className="w-6 h-6 mr-2" />
              <h3 className="text-lg font-bold">Error al cargar contenido</h3>
            </div>
            <p className="text-foreground/80 mb-4">{error}</p>
            <div className="mt-6 bg-background/50 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-medium mb-2">Posibles soluciones:</h4>
              <ul className="list-disc list-inside text-foreground/70 space-y-1">
                <li>Verifica tu conexión a internet</li>
                <li>Asegúrate de tener configurada la API de YouTube</li>
                <li>Comprueba si hay un problema con tu clave de API</li>
              </ul>
            </div>
            <button 
              onClick={loadYouTubeData} 
              className="mt-6 bg-gradient-brand hover:opacity-90 transition-opacity px-5 py-2 rounded-lg font-medium flex items-center text-sm"
            >
              <FaSpinner className="w-4 h-4 mr-2" />
              Reintentar
            </button>
          </div>
        </div>
        
        <div className="text-center py-8">
          <p className="mb-4 text-foreground/70">Mientras tanto, puedes visitar nuestro canal oficial:</p>
          <a 
            href="https://www.youtube.com/@EFISPODCAST" 
            target="_blank"
            className="inline-flex items-center px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <FaYoutube className="mr-2" />
            Ver en YouTube
          </a>
        </div>
      </div>
    );
  }

  // Si está cargando, mostrar spinner
  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="relative mb-10">
          <h1 className="text-3xl font-extrabold tracking-wider text-gradient-brand mb-4">CANAL DE YOUTUBE</h1>
          <div className="w-20 h-1 bg-gradient-brand rounded-full"></div>
        </div>
        
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
            <div className="relative animate-spin text-primary">
              <FaSpinner size={40} />
            </div>
          </div>
          <p className="mt-6 text-lg text-foreground/70">Cargando videos de YouTube...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="relative mb-10">
        <h1 className="text-3xl font-extrabold tracking-wider text-gradient-brand mb-4">CANAL DE YOUTUBE</h1>
        <div className="w-20 h-1 bg-gradient-brand rounded-full"></div>
      </div>
      
      <p className="mb-8 text-foreground/80 max-w-3xl">
        Videos y shorts del canal oficial de Efis Podcast en YouTube. Contenido exclusivo, entrevistas y momentos destacados.
      </p>
      
      {lastUpdate && (
        <p className="text-xs text-foreground/60 mb-6">
          Última actualización: {lastUpdate.toLocaleString('es-ES')}
        </p>
      )}

      {/* Información del canal */}
      {channel && (
        <div className="bg-card border border-border/50 rounded-xl overflow-hidden mb-10 relative">
          <div className="absolute inset-0 sound-waves-pattern opacity-10"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 p-6">
            <div className="shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-md rounded-full"></div>
                <div className="relative">
                  <Image 
                    src={channel.thumbnails.medium.url} 
                    alt={channel.title}
                    width={120}
                    height={120}
                    className="rounded-full border-2 border-secondary/30"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-2xl font-bold mb-1">{channel.title}</h2>
              <p className="text-foreground/70 mb-3">@{channel.customUrl}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-2">
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-xl font-bold text-gradient-brand">{formatNumber(channel.statistics.subscriberCount)}</span>
                  <span className="text-xs text-foreground/60 uppercase tracking-wide">suscriptores</span>
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-xl font-bold text-gradient-brand">{formatNumber(channel.statistics.videoCount)}</span>
                  <span className="text-xs text-foreground/60 uppercase tracking-wide">videos</span>
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-xl font-bold text-gradient-brand">{formatNumber(channel.statistics.viewCount)}</span>
                  <span className="text-xs text-foreground/60 uppercase tracking-wide">visualizaciones</span>
                </div>
              </div>
            </div>
            
            <div className="shrink-0">
              <a 
                href={`https://www.youtube.com/channel/${channel.id}`} 
                target="_blank"
                className="inline-flex items-center px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <FaYoutube className="mr-2" />
                Ver canal
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Si no hay videos, mostrar mensaje */}
      {videos.length === 0 && reels.length === 0 ? (
        <div className="bg-card border border-border/50 rounded-xl p-10 text-center">
          <p className="text-xl text-foreground/70 mb-6">No se encontraron videos en el canal.</p>
          <a 
            href="https://www.youtube.com/@EFISPODCAST" 
            target="_blank"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <FaYoutube className="mr-2" />
            Ver en YouTube
          </a>
        </div>
      ) : (
        <div>
          {/* Tabs de navegación */}
          <div className="inline-flex p-1 rounded-lg bg-card border border-border/50 mb-8">
            <button
              onClick={() => setActiveTab("podcasts")}
              className={`inline-flex items-center justify-center px-5 py-2.5 rounded-md font-medium transition-all ${
                activeTab === "podcasts"
                  ? "bg-gradient-brand shadow-md text-white"
                  : "hover:bg-background/50 hover:text-foreground"
              }`}
            >
              Podcasts ({videos.length})
            </button>
            <button
              onClick={() => setActiveTab("reels")}
              className={`inline-flex items-center justify-center px-5 py-2.5 rounded-md font-medium transition-all ${
                activeTab === "reels"
                  ? "bg-gradient-brand shadow-md text-white"
                  : "hover:bg-background/50 hover:text-foreground"
              }`}
            >
              Reels ({reels.length})
            </button>
          </div>
          
          {/* Contenido de las tabs */}
          <div className="mt-6 space-y-6">
            {activeTab === "podcasts" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map(video => (
                  <a 
                    key={video.id}
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    className="group"
                  >
                    <div className="bg-card border border-border/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20">
                      <div className="relative">
                        <Image 
                          src={video.thumbnails.high.url} 
                          alt={video.title}
                          width={video.thumbnails.high.width}
                          height={video.thumbnails.high.height}
                          className="w-full object-cover aspect-video group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Gradiente sobre la imagen */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Icono de play en hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-primary/90 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                            <FaYoutube className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        
                        {video.duration && (
                          <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm text-xs px-2 py-1 rounded-md">
                            {video.duration}
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                          {video.title}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-foreground/70">
                          <div className="flex items-center">
                            <FaEye className="w-4 h-4 mr-1 text-primary/70" />
                            {formatNumber(video.viewCount || '0')}
                          </div>
                          <div className="flex items-center">
                            <FaClock className="w-4 h-4 mr-1 text-primary/70" />
                            {formatDate(video.publishedAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
            
            {activeTab === "reels" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {reels.map(reel => (
                  <a 
                    key={reel.id}
                    href={`https://www.youtube.com/shorts/${reel.id}`}
                    target="_blank"
                    className="group"
                  >
                    <div className="bg-card border border-border/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20">
                      <div className="relative">
                        <Image 
                          src={reel.thumbnails.high.url} 
                          alt={reel.title}
                          width={reel.thumbnails.high.width}
                          height={reel.thumbnails.high.height}
                          className="w-full object-cover aspect-[9/16] group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Overlay en hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                          <div className="bg-primary/90 rounded-full p-2 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                            <FaYoutube className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        
                        {reel.duration && (
                          <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm text-xs px-2 py-0.5 rounded-md">
                            {reel.duration}
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm font-medium line-clamp-1 group-hover:text-primary transition-colors">
                          {reel.title}
                        </h3>
                        <div className="flex items-center text-xs text-foreground/70 mt-1">
                          <FaEye className="w-3 h-3 mr-1 text-primary/70" />
                          {formatNumber(reel.viewCount || '0')}
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 