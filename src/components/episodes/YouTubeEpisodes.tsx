"use client";

import { useState, useEffect } from "react";
import { FaYoutube, FaPlay } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

// Tipo para los datos de YouTube
interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
  isReel: boolean;
}

export default function YouTubeEpisodes() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [reels, setReels] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"podcasts" | "reels">("podcasts");

  // En una implementación real, estos datos serían obtenidos desde la API de YouTube
  useEffect(() => {
    // Simulación de carga de datos
    const fetchYouTubeData = async () => {
      try {
        setLoading(true);
        
        // Episodios de ejemplo basados en EFISPODCAST (en producción, esto se reemplazaría con datos reales)
        const exampleVideos: YouTubeVideo[] = [
          {
            id: "video1",
            title: "E1: Mindfulness y meditación para el día a día - EFIS PODCAST",
            description: "Conversamos con expertos en mindfulness sobre cómo incorporar la meditación en nuestra rutina diaria para mejorar nuestra salud mental y bienestar.",
            thumbnail: "/images/episode-1.jpg",
            publishedAt: "2023-10-15",
            duration: "45:22",
            viewCount: "1.2K",
            isReel: false
          },
          {
            id: "video2",
            title: "E2: Finanzas personales para independientes - EFIS PODCAST",
            description: "Analizamos estrategias de finanzas personales con asesores financieros especializados en freelancers y trabajadores autónomos.",
            thumbnail: "/images/episode-2.jpg",
            publishedAt: "2023-10-29",
            duration: "52:14",
            viewCount: "987",
            isReel: false
          },
          {
            id: "video3",
            title: "E3: El poder de los hábitos matutinos - EFIS PODCAST",
            description: "Descubre cómo una rutina matutina efectiva puede transformar tu productividad y bienestar general.",
            thumbnail: "/images/episode-3.jpg",
            publishedAt: "2023-11-12",
            duration: "38:45",
            viewCount: "1.5K",
            isReel: false
          },
          {
            id: "video4",
            title: "E4: Inteligencia emocional en el trabajo - EFIS PODCAST",
            description: "Exploramos cómo desarrollar y aplicar la inteligencia emocional para mejorar nuestras relaciones laborales y avanzar profesionalmente.",
            thumbnail: "/images/episode-4.jpg",
            publishedAt: "2023-11-26",
            duration: "41:18",
            viewCount: "1.1K",
            isReel: false
          },
        ];
        
        const exampleReels: YouTubeVideo[] = [
          {
            id: "reel1",
            title: "3 técnicas de mindfulness que puedes aplicar ahora mismo",
            description: "Ejercicios rápidos de mindfulness para momentos de estrés.",
            thumbnail: "/images/reel-1.jpg",
            publishedAt: "2023-10-20",
            duration: "1:00",
            viewCount: "5.4K",
            isReel: true
          },
          {
            id: "reel2",
            title: "El método 50-30-20 para organizar tus finanzas",
            description: "Una regla simple para distribuir tus ingresos de manera efectiva.",
            thumbnail: "/images/reel-2.jpg",
            publishedAt: "2023-11-05",
            duration: "0:58",
            viewCount: "4.2K",
            isReel: true
          },
          {
            id: "reel3",
            title: "5 hábitos para aumentar tu productividad",
            description: "Pequeños cambios para grandes resultados en tu día a día.",
            thumbnail: "/images/reel-3.jpg",
            publishedAt: "2023-11-18",
            duration: "0:55",
            viewCount: "6.8K",
            isReel: true
          },
          {
            id: "reel4",
            title: "Cómo manejar conversaciones difíciles en el trabajo",
            description: "Estrategias de comunicación para situaciones tensas.",
            thumbnail: "/images/reel-4.jpg",
            publishedAt: "2023-12-02",
            duration: "1:00",
            viewCount: "3.9K",
            isReel: true
          },
        ];
        
        setVideos(exampleVideos);
        setReels(exampleReels);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los videos de YouTube");
        setLoading(false);
        console.error(err);
      }
    };
    
    fetchYouTubeData();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
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

  return (
    <div className="w-full">
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
                  <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center z-10">
                    <div className="rounded-full bg-primary p-3 text-primary-foreground">
                      <FaPlay className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="h-full w-full relative">
                    <div className="absolute inset-0 bg-neutral-300 animate-pulse"></div>
                    {/* En una implementación real, aquí irían las imágenes reales de YouTube */}
                    {/* <Image 
                      src={video.thumbnail} 
                      alt={video.title} 
                      fill 
                      className="object-cover"
                    /> */}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 text-xs text-white rounded">
                    {video.duration}
                  </div>
                </div>
                
                <div className="flex flex-col p-4 flex-grow">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatDate(video.publishedAt)}</span>
                    <span>{video.viewCount} visualizaciones</span>
                  </div>
                  
                  <h3 className="mt-2 line-clamp-2 text-lg font-semibold group-hover:text-primary">
                    {video.title}
                  </h3>
                  
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground flex-grow">
                    {video.description}
                  </p>
                  
                  <a 
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    <FaYoutube className="mr-2 h-4 w-4" />
                    Ver en YouTube
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center py-10 text-muted-foreground">No se encontraron podcasts.</p>
          )
        ) : reels.length > 0 ? (
          reels.map(reel => (
            <div key={reel.id} className="group flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow transition-all hover:shadow-md">
              <div className="relative aspect-[9/16] w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center z-10">
                  <div className="rounded-full bg-primary p-3 text-primary-foreground">
                    <FaPlay className="h-4 w-4" />
                  </div>
                </div>
                <div className="h-full w-full relative">
                  <div className="absolute inset-0 bg-neutral-300 animate-pulse"></div>
                  {/* En una implementación real, aquí irían las imágenes reales de YouTube */}
                  {/* <Image 
                    src={reel.thumbnail} 
                    alt={reel.title} 
                    fill 
                    className="object-cover"
                  /> */}
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 text-xs text-white rounded">
                  {reel.duration}
                </div>
              </div>
              
              <div className="flex flex-col p-4 flex-grow">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatDate(reel.publishedAt)}</span>
                  <span>{reel.viewCount} visualizaciones</span>
                </div>
                
                <h3 className="mt-2 line-clamp-2 text-lg font-semibold group-hover:text-primary">
                  {reel.title}
                </h3>
                
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground flex-grow">
                  {reel.description}
                </p>
                
                <a 
                  href={`https://www.youtube.com/shorts/${reel.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  <FaYoutube className="mr-2 h-4 w-4" />
                  Ver en YouTube
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center py-10 text-muted-foreground">No se encontraron reels.</p>
        )}
      </div>
      
      <div className="mt-8 text-center">
        <a 
          href="https://www.youtube.com/@EFISPODCAST"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <FaYoutube className="mr-2 h-5 w-5" />
          Visitar nuestro canal de YouTube
        </a>
      </div>
    </div>
  );
} 