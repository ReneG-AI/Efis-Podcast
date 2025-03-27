"use client";

import { useState, useEffect } from "react";
import { FaYoutube, FaPlay, FaRegClock, FaEye } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { 
  getChannelRegularVideos, 
  getChannelReels, 
  getChannelInfo, 
  type YouTubeVideo,
  type YouTubeChannel 
} from "@/lib/api/youtube";

interface YouTubeStats {
  subscribers: string;
  videos: string;
  views: string;
}

export default function YouTubeEpisodes() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [reels, setReels] = useState<YouTubeVideo[]>([]);
  const [channelInfo, setChannelInfo] = useState<YouTubeChannel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"podcasts" | "reels">("podcasts");

  // Cargar datos desde la API de YouTube
  useEffect(() => {
    const fetchYouTubeData = async () => {
      try {
        setLoading(true);
        
        // Obtener información del canal
        const channelData = await getChannelInfo();
        if (channelData) {
          setChannelInfo(channelData);
        }
        
        // Obtener videos regulares (podcasts)
        const videosData = await getChannelRegularVideos(12);
        setVideos(videosData);
        
        // Obtener reels
        const reelsData = await getChannelReels(12);
        setReels(reelsData);
        
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los videos de YouTube");
        setLoading(false);
        console.error("Error fetching YouTube data:", err);
      }
    };
    
    fetchYouTubeData();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  
  // Formatear números con separadores de miles
  const formatNumber = (num: string) => {
    const n = parseInt(num, 10);
    if (isNaN(n)) return "0";
    
    if (n >= 1000000) {
      return `${(n / 1000000).toFixed(1)}M`;
    }
    if (n >= 1000) {
      return `${(n / 1000).toFixed(1)}K`;
    }
    return n.toString();
  };

  if (loading) {
    return (
      <div className="w-full py-20 text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-lg text-muted-foreground">Cargando episodios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-10 text-center">
        <p className="text-lg text-red-500">{error}</p>
        <p className="mt-2 text-muted-foreground">Por favor, intenta más tarde o visita nuestro canal de <a href="https://www.youtube.com/@EFISPODCAST" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">YouTube</a> directamente.</p>
      </div>
    );
  }

  // Si no hay API key configurada, mostrar datos de ejemplo
  if ((!videos || videos.length === 0) && (!reels || reels.length === 0)) {
    // Datos de ejemplo para mostrar cuando no hay resultados
    const dummyChannel = {
      id: "UC12345",
      title: "EFISPODCAST",
      description: "Canal oficial de EFISPODCAST - Ejemplo de descripción para visualización",
      customUrl: "@EFISPODCAST",
      thumbnails: {
        default: { url: "https://via.placeholder.com/88?text=EFIS", width: 88, height: 88 },
        medium: { url: "https://via.placeholder.com/240?text=EFIS", width: 240, height: 240 },
        high: { url: "https://via.placeholder.com/800?text=EFIS", width: 800, height: 800 },
      },
      statistics: {
        viewCount: "50000",
        subscriberCount: "1500",
        videoCount: "25"
      }
    };

    const dummyVideos = Array(6).fill(null).map((_, i) => ({
      id: `video-${i}`,
      title: `Ejemplo de Podcast #${i+1} - Título del episodio`,
      description: "Esta es una descripción de ejemplo para mostrar cómo se vería un video real.",
      publishedAt: new Date(Date.now() - i * 86400000 * 7).toISOString(),
      thumbnails: {
        default: { url: `https://via.placeholder.com/120x90?text=Podcast+${i+1}`, width: 120, height: 90 },
        medium: { url: `https://via.placeholder.com/320x180?text=Podcast+${i+1}`, width: 320, height: 180 },
        high: { url: `https://via.placeholder.com/480x360?text=Podcast+${i+1}`, width: 480, height: 360 },
        standard: { url: `https://via.placeholder.com/640x480?text=Podcast+${i+1}`, width: 640, height: 480 },
        maxres: { url: `https://via.placeholder.com/1280x720?text=Podcast+${i+1}`, width: 1280, height: 720 },
      },
      channelTitle: "EFISPODCAST",
      tags: ["podcast", "ejemplo", "efis"],
      duration: `${Math.floor(30 + Math.random() * 30)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      viewCount: `${Math.floor(1000 + Math.random() * 9000)}`,
      likeCount: `${Math.floor(100 + Math.random() * 900)}`,
      commentCount: `${Math.floor(10 + Math.random() * 90)}`,
      isReel: false
    }));

    const dummyReels = Array(6).fill(null).map((_, i) => ({
      id: `reel-${i}`,
      title: `Ejemplo de Reel #${i+1} - Momento destacado`,
      description: "Descripción corta de ejemplo para un reel",
      publishedAt: new Date(Date.now() - i * 86400000 * 3).toISOString(),
      thumbnails: {
        default: { url: `https://via.placeholder.com/90x120?text=Reel+${i+1}`, width: 90, height: 120 },
        medium: { url: `https://via.placeholder.com/180x320?text=Reel+${i+1}`, width: 180, height: 320 },
        high: { url: `https://via.placeholder.com/360x480?text=Reel+${i+1}`, width: 360, height: 480 },
        standard: { url: `https://via.placeholder.com/480x640?text=Reel+${i+1}`, width: 480, height: 640 },
        maxres: { url: `https://via.placeholder.com/720x1280?text=Reel+${i+1}`, width: 720, height: 1280 },
      },
      channelTitle: "EFISPODCAST",
      tags: ["reel", "corto", "efis"],
      duration: `0:${Math.floor(15 + Math.random() * 45).toString().padStart(2, '0')}`,
      viewCount: `${Math.floor(5000 + Math.random() * 15000)}`,
      likeCount: `${Math.floor(500 + Math.random() * 1500)}`,
      commentCount: `${Math.floor(50 + Math.random() * 150)}`,
      isReel: true
    }));

    // Si hay un mensaje de error en la consola pero queremos mostrar datos de ejemplo
    console.log("Mostrando datos de ejemplo ya que no se pudo conectar con YouTube API");
    setChannelInfo(dummyChannel as YouTubeChannel);
    setVideos(dummyVideos as YouTubeVideo[]);
    setReels(dummyReels as YouTubeVideo[]);
    setLoading(false);
    setError("");
    
    // No retornamos nada aquí para continuar con el renderizado normal usando los datos de ejemplo
  }

  return (
    <div className="w-full">
      {/* Channel Info */}
      {channelInfo && (
        <div className="mb-8 rounded-lg border bg-card p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="relative h-24 w-24 overflow-hidden rounded-full">
            <Image 
              src={channelInfo.thumbnails.medium.url} 
              alt={channelInfo.title}
              fill
              sizes="96px"
              className="object-cover" 
            />
          </div>
          <div className="flex-grow text-center md:text-left">
            <h2 className="text-xl font-bold">{channelInfo.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{channelInfo.description}</p>
            <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-4">
              <div className="text-center">
                <span className="text-sm font-medium block">{formatNumber(channelInfo.statistics.subscriberCount)}</span>
                <span className="text-xs text-muted-foreground">Suscriptores</span>
              </div>
              <div className="text-center">
                <span className="text-sm font-medium block">{formatNumber(channelInfo.statistics.videoCount)}</span>
                <span className="text-xs text-muted-foreground">Videos</span>
              </div>
              <div className="text-center">
                <span className="text-sm font-medium block">{formatNumber(channelInfo.statistics.viewCount)}</span>
                <span className="text-xs text-muted-foreground">Vistas</span>
              </div>
            </div>
          </div>
          <div>
            <a 
              href={`https://www.youtube.com/channel/${channelInfo.id}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              <FaYoutube className="mr-2 h-4 w-4" />
              Ir al canal
            </a>
          </div>
        </div>
      )}

      <div className="mb-8 flex items-center gap-4 border-b">
        <button
          onClick={() => setActiveTab("podcasts")}
          className={`inline-flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "podcasts" 
              ? "border-primary text-primary" 
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <FaYoutube className="h-5 w-5" />
          Podcasts
        </button>
        <button
          onClick={() => setActiveTab("reels")}
          className={`inline-flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "reels" 
              ? "border-primary text-primary" 
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <FaYoutube className="h-5 w-5" />
          Reels
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {activeTab === "podcasts" ? (
          videos.length > 0 ? (
            videos.map(video => (
              <div key={video.id} className="group flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow transition-all hover:shadow-md">
                <div className="relative h-48 w-full overflow-hidden">
                  <a 
                    href={`https://www.youtube.com/watch?v=${video.id}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                  >
                    <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                      <div className="rounded-full bg-primary p-3 text-primary-foreground">
                        <FaPlay className="h-4 w-4" />
                      </div>
                    </div>
                  </a>
                  <div className="h-full w-full relative">
                    <Image 
                      src={video.thumbnails.high.url || video.thumbnails.medium.url} 
                      alt={video.title} 
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform group-hover:scale-105" 
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                      {video.duration}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col flex-grow p-4">
                  <h3 className="font-medium line-clamp-2">
                    <a 
                      href={`https://www.youtube.com/watch?v=${video.id}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {video.title}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {video.description}
                  </p>
                  <div className="mt-auto pt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatDate(video.publishedAt)}</span>
                    <span className="flex items-center">
                      <FaEye className="mr-1 h-3 w-3" />
                      {formatNumber(video.viewCount || "0")}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-8 text-center">
              <p className="text-muted-foreground">No se encontraron podcasts.</p>
            </div>
          )
        ) : (
          reels.length > 0 ? (
            reels.map(reel => (
              <div key={reel.id} className="group flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow transition-all hover:shadow-md">
                <div className="relative h-80 w-full overflow-hidden">
                  <a 
                    href={`https://www.youtube.com/watch?v=${reel.id}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                  >
                    <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                      <div className="rounded-full bg-primary p-3 text-primary-foreground">
                        <FaPlay className="h-4 w-4" />
                      </div>
                    </div>
                  </a>
                  <div className="h-full w-full relative">
                    <Image 
                      src={reel.thumbnails.high.url || reel.thumbnails.medium.url} 
                      alt={reel.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform group-hover:scale-105" 
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                      {reel.duration}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col p-4">
                  <h3 className="font-medium line-clamp-1">
                    <a 
                      href={`https://www.youtube.com/watch?v=${reel.id}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {reel.title}
                    </a>
                  </h3>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatDate(reel.publishedAt)}</span>
                    <span className="flex items-center">
                      <FaEye className="mr-1 h-3 w-3" />
                      {formatNumber(reel.viewCount || "0")}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-8 text-center">
              <p className="text-muted-foreground">No se encontraron reels.</p>
            </div>
          )
        )}
      </div>
      
      <div className="mt-8 text-center">
        <a 
          href={channelInfo ? `https://www.youtube.com/channel/${channelInfo.id}` : "https://www.youtube.com/@EFISPODCAST"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-md bg-red-600 px-6 py-3 text-sm font-medium text-white hover:bg-red-700"
        >
          <FaYoutube className="mr-2 h-5 w-5" />
          Ver más en YouTube
        </a>
      </div>
    </div>
  );
} 