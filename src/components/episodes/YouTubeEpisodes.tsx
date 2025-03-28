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

export default function YouTubeEpisodes() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [reels, setReels] = useState<YouTubeVideo[]>([]);
  const [channelInfo, setChannelInfo] = useState<YouTubeChannel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"podcasts" | "reels">("podcasts");
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [nextUpdate, setNextUpdate] = useState<Date | null>(null);

  // Verifica que las claves API estén disponibles
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;
    
    console.log("YouTube API Key disponible:", !!apiKey);
    console.log("YouTube Channel ID disponible:", !!channelId);
    
    if (!apiKey || !channelId) {
      setError("Faltan las claves de la API de YouTube. Por favor, verifica la configuración.");
      setLoading(false);
    }
  }, []);

  // Cargar datos desde la API de YouTube
  useEffect(() => {
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
          console.warn("No se encontraron videos regulares");
        }
        
        // Obtener reels
        const reelsData = await getChannelReels(12);
        if (reelsData && reelsData.length > 0) {
          console.log(`Se encontraron ${reelsData.length} reels`);
          setReels(reelsData);
        } else {
          console.warn("No se encontraron reels");
        }
        
        const now = new Date();
        setLastUpdate(now);
        // Calcular la próxima actualización (7 días desde ahora)
        setNextUpdate(new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000));
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar datos de YouTube:", err);
        setError("Error al cargar los videos de YouTube. Por favor, verifica la consola para más detalles.");
        setLoading(false);
        // Si hay error, usar el canal de ejemplo al menos
        setChannelInfo(EXAMPLE_CHANNEL);
      }
    };
    
    fetchYouTubeData();
  }, []);

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

  if (error) {
    return (
      <div className="w-full py-10 text-center">
        <p className="text-lg text-red-500">{error}</p>
        <div className="mt-4 space-y-2 text-left bg-muted p-4 rounded-md max-w-xl mx-auto">
          <p className="font-medium">Posibles soluciones:</p>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Verifica que la API key de YouTube sea válida y tenga los permisos correctos</li>
            <li>Asegúrate de que el ID del canal sea correcto</li>
            <li>Verifica que no hayas excedido la cuota diaria de YouTube API</li>
            <li>Comprueba la consola del navegador para más detalles técnicos</li>
          </ul>
          <p className="mt-4 text-sm">
            Mientras tanto, puedes visitar nuestro canal de <a href="https://www.youtube.com/@EFISPODCAST" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">YouTube</a> directamente.
          </p>
        </div>
      </div>
    );
  }

  if ((!videos || videos.length === 0) && (!reels || reels.length === 0)) {
    return (
      <div className="w-full py-10 text-center">
        <p className="text-lg text-amber-500">No se encontraron videos en el canal</p>
        <p className="mt-2 text-muted-foreground">
          No pudimos encontrar videos para mostrar. Puede que no hayamos podido conectar con la API de YouTube.
        </p>
        <p className="mt-4">
          <a 
            href="https://www.youtube.com/@EFISPODCAST" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            <FaYoutube className="mr-2 h-4 w-4" />
            Ir al canal de YouTube
          </a>
        </p>
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
                <Image
                  src={video.thumbnails.high.url}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
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