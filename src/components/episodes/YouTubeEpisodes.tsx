"use client";

import { useState, useEffect } from "react";
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
      default: { url: "/thumbnail-placeholder.jpg", width: 120, height: 90 },
      medium: { url: "/thumbnail-placeholder.jpg", width: 320, height: 180 },
      high: { url: "/thumbnail-placeholder.jpg", width: 480, height: 360 }
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
      default: { url: "/thumbnail-placeholder.jpg", width: 120, height: 90 },
      medium: { url: "/thumbnail-placeholder.jpg", width: 320, height: 180 },
      high: { url: "/thumbnail-placeholder.jpg", width: 480, height: 360 }
    },
    channelTitle: "EFIS PODCAST",
    duration: "32:15",
    viewCount: "980",
    isReel: false
  }
];

export default function YouTubeEpisodes() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [reels, setReels] = useState<YouTubeVideo[]>([]);
  const [channelInfo, setChannelInfo] = useState<YouTubeChannel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"podcasts" | "reels">("podcasts");
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [nextUpdate, setNextUpdate] = useState<Date | null>(null);
  const [useLocalImages, setUseLocalImages] = useState(false);

  // Verificar si estamos en producción (GitHub Pages)
  useEffect(() => {
    if (window.location.hostname === 'reneg-ai.github.io') {
      console.log("Entorno de producción detectado: GitHub Pages");
      setUseLocalImages(true);
    }
  }, []);

  // Verifica que las claves API estén disponibles
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;
    
    console.log("Variables de entorno disponibles:", {
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      youtubeApiKey: !!apiKey,
      youtubeChannelId: !!channelId
    });
    
    if (!apiKey || !channelId) {
      console.warn("⚠️ Faltan claves API de YouTube. Usando datos de ejemplo.");
      setError("Faltan las claves de la API de YouTube. Mostrando datos de ejemplo.");
      setLoading(false);
      setChannelInfo(EXAMPLE_CHANNEL);
      setVideos(FALLBACK_VIDEOS);
    }
  }, []);

  // Cargar datos desde la API de YouTube
  useEffect(() => {
    // Si ya hemos determinado que faltan las claves, no hacemos la petición
    if (error && error.includes("Faltan las claves")) {
      return;
    }

    const fetchYouTubeData = async () => {
      try {
        setLoading(true);
        console.log("Iniciando carga de datos de YouTube...");
        
        // Obtener información del canal
        const channelData = await getChannelInfo();
        if (channelData) {
          console.log("Información del canal cargada correctamente");
          setChannelInfo(channelData);
        } else {
          console.error("No se pudo obtener información del canal");
          // Usar datos de ejemplo si no se puede obtener la información real
          setChannelInfo(EXAMPLE_CHANNEL);
        }
        
        // Obtener videos regulares (podcasts)
        const videosData = await getChannelRegularVideos(12);
        if (videosData && videosData.length > 0) {
          console.log(`Se encontraron ${videosData.length} videos regulares`);
          setVideos(videosData);
        } else {
          console.warn("No se encontraron videos regulares, usando datos de ejemplo");
          setVideos(FALLBACK_VIDEOS);
        }
        
        // Obtener reels
        const reelsData = await getChannelReels(12);
        if (reelsData && reelsData.length > 0) {
          console.log(`Se encontraron ${reelsData.length} reels`);
          setReels(reelsData);
        } else {
          console.warn("No se encontraron reels");
          // Podríamos establecer reels de ejemplo aquí si lo deseamos
        }
        
        const now = new Date();
        setLastUpdate(now);
        // Calcular la próxima actualización (7 días desde ahora)
        setNextUpdate(new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000));
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar datos de YouTube:", err);
        setError("Error al cargar los videos de YouTube. Usando datos de ejemplo.");
        setLoading(false);
        // Si hay error, usar datos de ejemplo
        setChannelInfo(EXAMPLE_CHANNEL);
        setVideos(FALLBACK_VIDEOS);
      }
    };
    
    fetchYouTubeData();
  }, [error]);

  const formatDate = (date: Date) => {
    try {
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return date.toLocaleDateString('es-ES', options);
    } catch (error) {
      console.error("Error al formatear fecha:", error);
      return "Fecha no disponible";
    }
  };
  
  // Formatear números con separadores de miles
  const formatNumber = (num: string) => {
    if (!num) return "0";
    
    try {
      const n = parseInt(num, 10);
      if (isNaN(n)) return "0";
      
      if (n >= 1000000) {
        return `${(n / 1000000).toFixed(1)}M`;
      }
      if (n >= 1000) {
        return `${(n / 1000).toFixed(1)}K`;
      }
      return n.toString();
    } catch (error) {
      console.error("Error al formatear número:", error);
      return "0";
    }
  };

  if (loading) {
    return (
      <div className="w-full py-20 text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-lg text-muted-foreground">Cargando videos de YouTube...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Información del canal */}
      {channelInfo && (
        <div className="mb-8 p-6 bg-card rounded-lg shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-full overflow-hidden">
              <Image
                src={channelInfo.thumbnails.high.url}
                alt={channelInfo.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{channelInfo.title}</h2>
              <p className="text-muted-foreground mt-1">{channelInfo.customUrl}</p>
              <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                <span>{formatNumber(channelInfo.statistics.subscriberCount)} suscriptores</span>
                <span>{formatNumber(channelInfo.statistics.videoCount)} videos</span>
                <span>{formatNumber(channelInfo.statistics.viewCount)} visualizaciones</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mensaje de error si existe */}
      {error && (
        <div className="w-full mb-6 p-4 border border-amber-200 bg-amber-50 rounded-md text-amber-700">
          <p>{error}</p>
          <p className="text-xs mt-2">Estamos mostrando contenido de ejemplo. Visita nuestro canal de <a href="https://www.youtube.com/@EFISPODCAST" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">YouTube</a> para ver el contenido real.</p>
        </div>
      )}

      {/* Tabs de navegación */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("podcasts")}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === "podcasts"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          Podcasts ({videos.length})
        </button>
        <button
          onClick={() => setActiveTab("reels")}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === "reels"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          Reels ({reels.length})
        </button>
      </div>

      {/* Grid de videos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(activeTab === "podcasts" ? videos : reels).map((video) => (
          <div
            key={video.id}
            className="group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Link
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="relative aspect-video">
                {!video.id.startsWith("fallback") ? (
                  <Image
                    src={video.thumbnails.high.url}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  // Imagen de fallback para datos de ejemplo
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <FaYoutube className="w-16 h-16 text-gray-500" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <FaPlay className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FaRegClock className="w-3 h-3" />
                    {video.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaEye className="w-3 h-3" />
                    {formatNumber(video.viewCount || "0")}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {formatDate(new Date(video.publishedAt))}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Información de actualización */}
      <div className="mt-6 text-center space-y-2">
        {lastUpdate && (
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <FaSync className="w-4 h-4" />
            Última actualización: {formatDate(lastUpdate)}
          </p>
        )}
        {nextUpdate && (
          <p className="text-xs text-muted-foreground">
            Próxima actualización: {formatDate(nextUpdate)}
          </p>
        )}
      </div>
    </div>
  );
} 