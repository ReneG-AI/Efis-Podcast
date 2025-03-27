"use client";

import Image from "next/image";
import Link from "next/link";
import { FaPlay, FaCalendar, FaClock } from "react-icons/fa";

interface Episode {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  image: string;
  slug: string;
  category?: string;
}

interface EpisodeCardProps {
  episode: Episode;
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow transition-all hover:shadow-md">
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
        {episode.category && (
          <span className="inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold w-fit">
            {episode.category}
          </span>
        )}
        
        <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <FaCalendar className="h-3 w-3" />
            <span>{episode.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaClock className="h-3 w-3" />
            <span>{episode.duration}</span>
          </div>
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
  );
} 