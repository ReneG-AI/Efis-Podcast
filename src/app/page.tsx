"use client";

import Link from "next/link";
import { FaHeadphones, FaYoutube, FaSpotify, FaApple } from "react-icons/fa";
import Logo from "@/components/brand/Logo";
import AudioVisualizer from "@/components/ui/AudioVisualizer";
import dynamic from "next/dynamic";

// Importación dinámica para evitar conflictos de componentes
const DynamicEpisodeCard = dynamic(() => import('@/components/episodes/EpisodeCard'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      {/* Hero Section con patrón de ondas de sonido */}
      <section className="w-full relative overflow-hidden">
        {/* Background con ondas de sonido */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-primary/10 to-transparent"></div>
          <AudioVisualizer className="opacity-10" />
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Logo size="xl" animated={true} className="mx-auto mb-8" />
            
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gradient-brand">
              EL PODCAST QUE ELEVA TU CONOCIMIENTO
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl mx-auto">
              Descubre el mundo de la tecnología, aviación y desarrollo personal en un formato 
              dinámico y entretenido con nuestros anfitriones.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link 
                href="/episodes" 
                className="btn-gradient-brand px-8 py-3 rounded-full font-medium flex items-center justify-center gap-2 text-white"
              >
                <FaHeadphones />
                <span>Escuchar Episodios</span>
              </Link>
              
              <Link 
                href="/youtube" 
                className="border-gradient-brand px-8 py-3 rounded-full font-medium flex items-center justify-center gap-2 text-foreground hover:bg-accent/10 transition-colors"
              >
                <FaYoutube className="text-red-500" />
                <span>Ver en YouTube</span>
              </Link>
            </div>
          </div>

          {/* Plataformas disponibles */}
          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground mb-4">DISPONIBLE EN</p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              <a 
                href="https://open.spotify.com/show/example" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <FaSpotify className="w-8 h-8 text-[#1ED760] mb-2" />
                <span className="text-xs text-muted-foreground">Spotify</span>
              </a>
              
              <a 
                href="https://podcasts.apple.com/podcast/example" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <FaApple className="w-8 h-8 text-[#8e44ad] mb-2" />
                <span className="text-xs text-muted-foreground">Apple Podcasts</span>
              </a>
              
              <a 
                href="https://youtube.com/@example" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <FaYoutube className="w-8 h-8 text-[#FF0000] mb-2" />
                <span className="text-xs text-muted-foreground">YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Episodes Section */}
      <section className="w-full py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Episodios Destacados</h2>
            <div className="w-24 h-1 bg-gradient-brand mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Episodio 1 */}
            <DynamicEpisodeCard 
              title="El futuro de la aviación autónoma"
              description="Exploramos las tendencias en aviación no tripulada y su impacto en el transporte aéreo comercial."
              image="https://via.placeholder.com/800x450/2563EB/FFFFFF?text=Aviacion+Autonoma"
              duration="45:22"
              number="EP 42"
              href="/episodes/42"
            />
            
            {/* Episodio 2 */}
            <DynamicEpisodeCard 
              title="Desarrollo web en 2023"
              description="Frameworks, lenguajes y herramientas que dominarán el desarrollo web este año."
              image="https://via.placeholder.com/800x450/0891B2/FFFFFF?text=Desarrollo+Web"
              duration="52:18"
              number="EP 41"
              href="/episodes/41"
            />
            
            {/* Episodio 3 */}
            <DynamicEpisodeCard 
              title="Inteligencia Artificial y ética"
              description="Debatimos los límites éticos de la IA y cómo afectará a diferentes industrias."
              image="https://via.placeholder.com/800x450/8B5CF6/FFFFFF?text=IA+y+Etica"
              duration="58:05"
              number="EP 40"
              href="/episodes/40"
            />
          </div>

          <div className="text-center mt-10">
            <Link 
              href="/episodes" 
              className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border rounded-full text-primary bg-transparent border-primary/50 hover:bg-primary/10 px-8 py-2"
            >
              Ver todos los episodios
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-gradient-brand">120+</div>
              <div className="text-muted-foreground text-sm">Episodios publicados</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-gradient-brand">10k+</div>
              <div className="text-muted-foreground text-sm">Oyentes mensuales</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-gradient-brand">4.8</div>
              <div className="text-muted-foreground text-sm">Valoración promedio</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-20 bg-card relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-brand opacity-10"></div>
          <AudioVisualizer className="opacity-20" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">¿No quieres perderte ningún episodio?</h2>
            <p className="text-muted-foreground mb-6">
              Suscríbete para recibir notificaciones cuando publiquemos nuevos episodios
            </p>
            
            <form className="flex flex-col sm:flex-row gap-2 mx-auto max-w-md">
              <input 
                type="email" 
                placeholder="Tu email" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                required
              />
              <button 
                type="submit"
                className="btn-gradient-brand h-10 px-4 py-2 rounded-md font-medium"
              >
                Suscribirme
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
} 