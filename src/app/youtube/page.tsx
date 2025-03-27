import YouTubeEpisodes from "@/components/episodes/YouTubeEpisodes";
import { FaYoutube } from "react-icons/fa";

export const metadata = {
  title: "YouTube - Efis Podcast",
  description: "Videos y Reels de Efis Podcast en YouTube. Mira nuestros episodios y contenido exclusivo.",
};

export default function YouTubePage() {
  return (
    <div className="container py-12">
      <div className="mb-8 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <FaYoutube className="h-8 w-8 text-red-600" />
          <h1 className="text-4xl font-bold tracking-tight">Canal de YouTube</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Todos nuestros episodios y reels disponibles en nuestro canal oficial de YouTube.
        </p>
      </div>
      
      <YouTubeEpisodes />
    </div>
  );
} 