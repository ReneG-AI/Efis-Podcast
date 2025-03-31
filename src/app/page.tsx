"use client";

import Link from "next/link";
import { FaHeadphones, FaYoutube, FaSpotify, FaApple, FaPlay, FaChevronDown } from "react-icons/fa";
import Logo from "@/components/brand/Logo";
import AudioVisualizer from "@/components/ui/AudioVisualizer";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Importación dinámica para evitar conflictos de componentes
const DynamicEpisodeCard = dynamic(() => import('@/components/episodes/EpisodeCard'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Fondo con patrón de ondas sonoras */}
        <div className="absolute inset-0 bg-background">
          <div className="absolute inset-0 opacity-5">
            <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <defs>
                <pattern id="sound-waves" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M0 50 Q25 25, 50 50 T100 50" stroke="currentColor" fill="none" strokeWidth="2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#sound-waves)" />
            </svg>
          </div>
        </div>

        {/* Contenido del Hero */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Título con efecto de gradiente y animación */}
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 text-gradient-brand"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              EFIS PODCAST
            </motion.h1>

            {/* Descripción con animación */}
            <motion.p 
              className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Tu portal de información y entretenimiento sobre tecnología, aviación y mucho más.
            </motion.p>

            {/* Botones de acción con animación */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <Link 
                href="/episodios" 
                className="btn-gradient-brand px-8 py-4 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              >
                <FaPlay className="inline-block mr-2" />
                Escuchar Episodios
              </Link>
              <Link 
                href="https://www.youtube.com/@efispodcast" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary px-8 py-4 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              >
                <FaYoutube className="inline-block mr-2" />
                Ver en YouTube
              </Link>
            </motion.div>

            {/* Plataformas disponibles con animación */}
            <motion.div 
              className="mt-12 flex flex-wrap justify-center gap-6 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors">
                <FaSpotify className="text-2xl" />
                <span>Spotify</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors">
                <FaApple className="text-2xl" />
                <span>Apple Podcasts</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors">
                <FaYoutube className="text-2xl" />
                <span>YouTube</span>
              </div>
            </motion.div>
          </div>

          {/* Visualizador de ondas sonoras animadas */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-32 opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <AudioVisualizer barCount={40} maxHeight={40} className="w-full" />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FaChevronDown className="text-foreground/40" size={24} />
        </motion.div>
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