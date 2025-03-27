"use client";

import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

// Datos de episodios de ejemplo (en un proyecto real, esto vendría de una API o CMS)
const episodes = [
  {
    id: "1",
    title: "Cómo desarrollar hábitos para el éxito personal",
    description: "En este episodio, hablamos con la psicóloga María González sobre cómo implementar hábitos efectivos para el crecimiento personal.",
    date: "22 Mar 2025",
    duration: "45 min",
    image: "/images/episode-1.jpg",
    slug: "habitos-exito-personal"
  },
  {
    id: "2",
    title: "Liderazgo efectivo en entornos cambiantes",
    description: "El coach ejecutivo Carlos Martínez comparte estrategias para liderar equipos en contextos de incertidumbre y cambio constante.",
    date: "15 Mar 2025",
    duration: "38 min",
    image: "/images/episode-2.jpg",
    slug: "liderazgo-efectivo"
  },
  {
    id: "3",
    title: "Inteligencia emocional en el trabajo",
    description: "Aprende a gestionar tus emociones y mejorar tus relaciones laborales con los consejos de la experta en RRHH Ana López.",
    date: "8 Mar 2025",
    duration: "42 min",
    image: "/images/episode-3.jpg",
    slug: "inteligencia-emocional-trabajo"
  }
];

export default function RecentEpisodes() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {episodes.map((episode) => (
        <div 
          key={episode.id} 
          className="group flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow transition-all hover:shadow-md"
        >
          <div className="relative h-48 w-full overflow-hidden">
            <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center z-10">
              <div className="rounded-full bg-primary p-3 text-primary-foreground">
                <FaPlay className="h-4 w-4" />
              </div>
            </div>
            <div className="h-full w-full relative">
              <div className="absolute inset-0 bg-neutral-300 animate-pulse"></div>
              {/* En un proyecto real, aquí iría una imagen real del episodio */}
              {/* <Image
                src={episode.image}
                alt={episode.title}
                fill
                className="object-cover"
              /> */}
            </div>
          </div>
          <div className="flex flex-col p-4 flex-grow">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{episode.date}</span>
              <span>•</span>
              <span>{episode.duration}</span>
            </div>
            <Link href={`/episodes/${episode.slug}`}>
              <h3 className="mt-2 text-xl font-semibold line-clamp-2 group-hover:text-primary">
                {episode.title}
              </h3>
            </Link>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground flex-grow">
              {episode.description}
            </p>
            <Link 
              href={`/episodes/${episode.slug}`}
              className="mt-4 text-sm font-medium text-primary hover:underline"
            >
              Escuchar episodio
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
} 