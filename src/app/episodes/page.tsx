import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import EpisodeCard from "@/components/episodes/EpisodeCard";

// Datos de episodios de ejemplo (en un proyecto real, esto vendría de una API o CMS)
const episodes = [
  {
    id: "1",
    title: "Cómo desarrollar hábitos para el éxito personal",
    description: "En este episodio, hablamos con la psicóloga María González sobre cómo implementar hábitos efectivos para el crecimiento personal.",
    date: "22 Mar 2025",
    duration: "45 min",
    image: "/images/episode-1.jpg",
    slug: "habitos-exito-personal",
    category: "Desarrollo Personal"
  },
  {
    id: "2",
    title: "Liderazgo efectivo en entornos cambiantes",
    description: "El coach ejecutivo Carlos Martínez comparte estrategias para liderar equipos en contextos de incertidumbre y cambio constante.",
    date: "15 Mar 2025",
    duration: "38 min",
    image: "/images/episode-2.jpg",
    slug: "liderazgo-efectivo",
    category: "Liderazgo"
  },
  {
    id: "3",
    title: "Inteligencia emocional en el trabajo",
    description: "Aprende a gestionar tus emociones y mejorar tus relaciones laborales con los consejos de la experta en RRHH Ana López.",
    date: "8 Mar 2025",
    duration: "42 min",
    image: "/images/episode-3.jpg",
    slug: "inteligencia-emocional-trabajo",
    category: "Desarrollo Profesional"
  },
  {
    id: "4",
    title: "Mindfulness para la vida diaria",
    description: "El instructor de meditación Javier Ruiz nos enseña técnicas de mindfulness para reducir el estrés y mejorar nuestra calidad de vida.",
    date: "1 Mar 2025",
    duration: "50 min",
    image: "/images/episode-4.jpg",
    slug: "mindfulness-vida-diaria",
    category: "Bienestar"
  },
  {
    id: "5",
    title: "Finanzas personales para emprendedores",
    description: "La asesora financiera Elena Torres explica cómo gestionar tus finanzas de manera efectiva cuando estás emprendiendo.",
    date: "22 Feb 2025",
    duration: "55 min",
    image: "/images/episode-5.jpg",
    slug: "finanzas-personales-emprendedores",
    category: "Emprendimiento"
  },
  {
    id: "6",
    title: "Comunicación asertiva en equipos virtuales",
    description: "Descubre las claves para comunicarte efectivamente en entornos remotos con el especialista en comunicación organizacional Pedro Ramírez.",
    date: "15 Feb 2025",
    duration: "40 min",
    image: "/images/episode-6.jpg",
    slug: "comunicacion-asertiva-equipos-virtuales",
    category: "Desarrollo Profesional"
  }
];

// Extraer categorías únicas para los filtros
const categories = Array.from(new Set(episodes.map(ep => ep.category)));

export default function EpisodesPage() {
  return (
    <div className="container py-12">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight">Todos los episodios</h1>
        <p className="text-xl text-muted-foreground">
          Explora nuestra colección completa de conversaciones sobre crecimiento personal y profesional.
        </p>
      </div>
      
      {/* Filtros y Búsqueda */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-grow">
          <FaSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar episodios..."
            className="h-10 w-full rounded-md border bg-background pl-10 pr-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <select className="h-10 w-full rounded-md border bg-background px-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-[180px]">
          <option value="">Todas las categorías</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select className="h-10 w-full rounded-md border bg-background px-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-[150px]">
          <option value="recent">Más recientes</option>
          <option value="oldest">Más antiguos</option>
          <option value="duration">Duración</option>
        </select>
      </div>
      
      {/* Lista de Episodios */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {episodes.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>
      
      {/* Paginación (En una implementación real, esto se controlaría con datos reales) */}
      <div className="mt-12 flex items-center justify-center gap-2">
        <button className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background hover:bg-accent">
          &laquo;
        </button>
        <button className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-primary text-primary-foreground">
          1
        </button>
        <button className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background hover:bg-accent">
          2
        </button>
        <button className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background hover:bg-accent">
          3
        </button>
        <span className="mx-1">...</span>
        <button className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background hover:bg-accent">
          &raquo;
        </button>
      </div>
    </div>
  );
} 