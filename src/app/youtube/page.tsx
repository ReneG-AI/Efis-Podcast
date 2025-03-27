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
          <FaYoutube className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">Canal de YouTube</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Todos nuestros episodios y reels disponibles en nuestro canal oficial de YouTube.
        </p>
      </div>
      
      <div className="bg-muted p-6 rounded-lg mb-10">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-1/3">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-card shadow-md">
              <div className="absolute inset-0 flex items-center justify-center">
                <FaYoutube className="h-16 w-16 text-primary" />
              </div>
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-2">@EFISPODCAST</h2>
            <p className="text-muted-foreground mb-4">
              Canal oficial de Efis Podcast, donde compartimos episodios completos, 
              momentos destacados, reels y contenido exclusivo para nuestra audiencia.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-card p-3 rounded-lg shadow-sm">
                <p className="text-sm text-muted-foreground">Suscriptores</p>
                <p className="text-xl font-semibold">5.4K</p>
              </div>
              <div className="bg-card p-3 rounded-lg shadow-sm">
                <p className="text-sm text-muted-foreground">Videos</p>
                <p className="text-xl font-semibold">78</p>
              </div>
              <div className="bg-card p-3 rounded-lg shadow-sm">
                <p className="text-sm text-muted-foreground">Visualizaciones</p>
                <p className="text-xl font-semibold">320K</p>
              </div>
            </div>
            <div className="mt-4">
              <a 
                href="https://www.youtube.com/@EFISPODCAST?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <FaYoutube className="mr-2 h-5 w-5" />
                Suscribirse
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <YouTubeEpisodes />
    </div>
  );
} 