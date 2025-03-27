import Link from "next/link";
import { FaArrowLeft, FaCalendar, FaClock, FaPlay } from "react-icons/fa";
import YouTubeEmbed from "@/components/episodes/YouTubeEmbed";

export default function EpisodeDetailPage({ params }: { params: { slug: string } }) {
  // En un proyecto real, aquí se obtendría la información del episodio desde una API o CMS
  // usando el slug como identificador
  const episode = {
    title: "Cómo desarrollar hábitos para el éxito personal",
    description: "En este episodio, hablamos con la psicóloga María González sobre cómo implementar hábitos efectivos para el crecimiento personal. Descubre las estrategias probadas científicamente para crear rutinas que te ayuden a alcanzar tus metas y mejorar tu bienestar general.",
    longDescription: "Los hábitos son los pilares fundamentales de nuestro éxito personal y profesional. En esta conversación, la psicóloga María González, especialista en psicología positiva y desarrollo personal, nos comparte investigaciones recientes y estrategias prácticas para implementar hábitos positivos en nuestra vida diaria.\n\nExploraremos cómo funciona realmente la formación de hábitos en nuestro cerebro, por qué fallamos al intentar crear nuevas rutinas, y qué técnicas específicas podemos aplicar para superar la resistencia al cambio. María también nos explica el método de los 'micro-hábitos' y cómo podemos utilizarlos para generar transformaciones significativas a largo plazo.",
    date: "22 Mar 2025",
    duration: "45 min",
    image: "/images/episode-1.jpg",
    slug: "habitos-exito-personal",
    categories: ["Desarrollo Personal", "Psicología", "Productividad"],
    tags: ["hábitos", "desarrollo personal", "psicología positiva", "rutinas"],
    // Agregamos el ID de YouTube para el video
    youtubeId: "dQw4w9WgXcQ" // Este es un ID de ejemplo, debe reemplazarse con el ID real
  };

  return (
    <div className="container py-12">
      <Link 
        href="/episodes" 
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
      >
        <FaArrowLeft className="mr-2 h-4 w-4" />
        Volver a todos los episodios
      </Link>
      
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {episode.title}
          </h1>
          
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <FaCalendar className="h-4 w-4" />
              <span>{episode.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaClock className="h-4 w-4" />
              <span>{episode.duration}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {episode.categories.map(category => (
                <span 
                  key={category} 
                  className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-8">
            {/* Reemplazamos el placeholder por el componente YouTubeEmbed */}
            <YouTubeEmbed 
              videoId={episode.youtubeId} 
              title={episode.title} 
            />
          </div>
          
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold">Descripción del episodio</h2>
            <p className="text-muted-foreground">
              {episode.description}
            </p>
            <p className="text-muted-foreground whitespace-pre-line">
              {episode.longDescription}
            </p>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Etiquetas</h2>
            <div className="flex flex-wrap gap-2">
              {episode.tags.map(tag => (
                <span 
                  key={tag} 
                  className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Escuchar este episodio</h2>
            <div className="space-y-4">
              <a 
                href={`https://www.youtube.com/watch?v=${episode.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <FaPlay className="mr-2 h-4 w-4" /> Ver en YouTube
              </a>
              <p className="text-sm text-muted-foreground">
                También disponible en:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <a 
                  href="#"
                  className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm bg-background hover:bg-muted"
                >
                  Spotify
                </a>
                <a 
                  href="#"
                  className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm bg-background hover:bg-muted"
                >
                  Apple Podcasts
                </a>
                <a 
                  href="#"
                  className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm bg-background hover:bg-muted"
                >
                  Google Podcasts
                </a>
                <a 
                  href="#"
                  className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm bg-background hover:bg-muted"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Comparte este episodio</h2>
            <div className="grid grid-cols-2 gap-2">
              <button className="inline-flex items-center justify-center rounded-md bg-[#1877F2] px-4 py-2 text-sm font-medium text-white">
                Facebook
              </button>
              <button className="inline-flex items-center justify-center rounded-md bg-[#1DA1F2] px-4 py-2 text-sm font-medium text-white">
                Twitter
              </button>
              <button className="inline-flex items-center justify-center rounded-md bg-[#25D366] px-4 py-2 text-sm font-medium text-white">
                WhatsApp
              </button>
              <button className="inline-flex items-center justify-center rounded-md bg-[#0077B5] px-4 py-2 text-sm font-medium text-white">
                LinkedIn
              </button>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Suscríbete</h2>
            <p className="text-sm text-muted-foreground mb-4">
              No te pierdas ningún episodio. Recibe notificaciones cuando publiquemos nuevo contenido.
            </p>
            <form className="space-y-2">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                required
              />
              <button 
                type="submit" 
                className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 