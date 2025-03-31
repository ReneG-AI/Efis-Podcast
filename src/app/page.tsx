"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  FaHeadphones, 
  FaYoutube, 
  FaSpotify, 
  FaApple, 
  FaPlay, 
  FaChevronDown, 
  FaMicrophone,
  FaPodcast,
  FaRss
} from "react-icons/fa";
import Logo from "@/components/brand/Logo";
import AudioVisualizer from "@/components/ui/AudioVisualizer";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Dynamic import to avoid component conflicts
const DynamicEpisodeCard = dynamic(() => import('@/components/episodes/EpisodeCard'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with animated sound waves */}
        <div className="absolute inset-0 bg-background">
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 opacity-5 bg-gradient-primary"></div>
          
          {/* SVG sound waves animation */}
          <div className="absolute inset-0">
            <svg
              className="w-full h-full"
              width="100%"
              height="100%"
              viewBox="0 0 1440 800"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--secondary))" />
                </linearGradient>
              </defs>
              
              {/* Dynamic sound waves */}
              <motion.path
                d="M0,128 C320,128 320,50 640,50 C960,50 960,96 1280,96 L1280,256 L0,256 Z"
                fill="url(#waveGradient)"
                fillOpacity="0.05"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.05 }}
                transition={{ duration: 1 }}
              >
                <animate 
                  attributeName="d" 
                  dur="15s" 
                  repeatCount="indefinite" 
                  values="
                    M0,128 C320,128 320,50 640,50 C960,50 960,96 1280,96 L1280,800 L0,800 Z;
                    M0,96 C320,96 320,32 640,32 C960,32 960,64 1280,64 L1280,800 L0,800 Z;
                    M0,64 C320,64 320,80 640,80 C960,80 960,32 1280,32 L1280,800 L0,800 Z;
                    M0,32 C320,32 320,64 640,64 C960,64 960,48 1280,48 L1280,800 L0,800 Z;
                    M0,128 C320,128 320,50 640,50 C960,50 960,96 1280,96 L1280,800 L0,800 Z"
                  calcMode="spline"
                  keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
                />
              </motion.path>
              
              <motion.path
                d="M0,192 C320,192 320,128 640,128 C960,128 960,160 1280,160 L1280,256 L0,256 Z"
                fill="url(#waveGradient)"
                fillOpacity="0.075"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.075 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <animate 
                  attributeName="d" 
                  dur="20s" 
                  repeatCount="indefinite" 
                  values="
                    M0,192 C320,192 320,128 640,128 C960,128 960,160 1280,160 L1280,800 L0,800 Z;
                    M0,160 C320,160 320,96 640,96 C960,96 960,112 1280,112 L1280,800 L0,800 Z;
                    M0,128 C320,128 320,160 640,160 C960,160 960,144 1280,144 L1280,800 L0,800 Z;
                    M0,144 C320,144 320,112 640,112 C960,112 960,128 1280,128 L1280,800 L0,800 Z;
                    M0,192 C320,192 320,128 640,128 C960,128 960,160 1280,160 L1280,800 L0,800 Z"
                  calcMode="spline"
                  keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
                />
              </motion.path>
              
              {/* Additional wave from main branch */}
              <motion.path
                d="M0,96 C180,96 320,64 500,64 C680,64 820,96 1000,96 C1180,96 1320,64 1500,64 L1500,256 L0,256 Z"
                fill="url(#waveGradient)"
                fillOpacity="0.15"
                transform="translate(-100, 0)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                <animate 
                  attributeName="d" 
                  dur="25s" 
                  repeatCount="indefinite" 
                  values="
                    M0,96 C180,96 320,64 500,64 C680,64 820,96 1000,96 C1180,96 1320,64 1500,64 L1500,800 L0,800 Z;
                    M0,64 C180,64 320,96 500,96 C680,96 820,64 1000,64 C1180,64 1320,96 1500,96 L1500,800 L0,800 Z;
                    M0,128 C180,128 320,96 500,96 C680,96 820,128 1000,128 C1180,128 1320,96 1500,96 L1500,800 L0,800 Z;
                    M0,64 C180,64 320,128 500,128 C680,128 820,64 1000,64 C1180,64 1320,128 1500,128 L1500,800 L0,800 Z;
                    M0,96 C180,96 320,64 500,64 C680,64 820,96 1000,96 C1180,96 1320,64 1500,64 L1500,800 L0,800 Z"
                  calcMode="spline"
                  keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
                />
              </motion.path>
            </svg>
          </div>
        </div>

        {/* Hero content */}
        <div className="container-modern relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo with animated audio wave */}
            <motion.div
              className="flex justify-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative">
                <Logo size="xl" animated={true} />
                <motion.div
                  className="absolute -right-6 top-1/2 -translate-y-1/2 flex items-end h-12 gap-[3px] opacity-70"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="audio-bar"
                      style={{ height: `${i * 6 + 12}px` }}
                      animate={{ scaleY: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Title with gradient effect */}
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-8 text-gradient-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              EFIS PODCAST
            </motion.h1>

            {/* Description with animation */}
            <motion.p 
              className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
              Tu portal de información y entretenimiento sobre tecnología, aviación y mucho más.
            </motion.p>

            {/* Action buttons with animation - combining styles from both branches */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            >
              <Link 
                href="/episodes"
                className="relative group overflow-hidden bg-gradient-primary px-8 py-4 rounded-full text-white font-medium shadow-lg shadow-primary/20 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
              >
                <span className="flex items-center justify-center gap-3 relative z-10">
                  <FaHeadphones className="text-xl group-hover:scale-110 transition-transform" />
                  <span>Escuchar Episodios</span>
                </span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </Link>
              
              <Link 
                href="https://www.youtube.com/@efispodcast" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative group overflow-hidden border-2 border-primary/30 bg-background/80 backdrop-blur-sm px-8 py-4 rounded-full text-foreground font-medium shadow-lg transition-all duration-300 transform hover:scale-105 hover:border-primary/50 hover:bg-primary/5"
              >
                <span className="flex items-center justify-center gap-3 relative z-10">
                  <FaYoutube className="text-xl text-red-500 group-hover:scale-110 transition-transform" />
                  <span>Ver en YouTube</span>
                </span>
                <span className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></span>
              </Link>
            </motion.div>

            {/* Available platforms with animation - combining styles from both branches */}
            <motion.div 
              className="flex flex-wrap justify-center gap-8 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            >
              <a 
                href="https://open.spotify.com/show/example" 
                target="_blank"
                rel="noopener noreferrer"
                className="group glass flex items-center gap-3 px-5 py-3 rounded-full card-hover"
              >
                <FaSpotify className="text-2xl text-[#1DB954] group-hover:text-[#1ED760] transition-colors" />
                <span className="text-foreground/70 group-hover:text-foreground transition-colors">Spotify</span>
              </a>
              
              <a 
                href="https://podcasts.apple.com/podcast/example" 
                target="_blank"
                rel="noopener noreferrer"
                className="group glass flex items-center gap-3 px-5 py-3 rounded-full card-hover"
              >
                <FaApple className="text-2xl text-[#8e44ad] group-hover:text-[#9b59b6] transition-colors" />
                <span className="text-foreground/70 group-hover:text-foreground transition-colors">Apple Podcasts</span>
              </a>
              
              <a 
                href="https://youtube.com/@efispodcast" 
                target="_blank"
                rel="noopener noreferrer"
                className="group glass flex items-center gap-3 px-5 py-3 rounded-full card-hover"
              >
                <FaYoutube className="text-2xl text-[#FF0000] group-hover:text-[#FF3333] transition-colors" />
                <span className="text-foreground/70 group-hover:text-foreground transition-colors">YouTube</span>
              </a>
            </motion.div>
          </div>

          {/* Audio visualizer at bottom */}
          <motion.div 
            className="absolute -bottom-16 left-0 right-0 h-60 opacity-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <AudioVisualizer barCount={60} maxHeight={60} className="w-full" />
          </motion.div>
        </div>

        {/* Modern Scroll Indicator - Elegant design with pulse animation */}
        <div className="fixed bottom-12 inset-x-0 z-40 pointer-events-none flex justify-center items-center">
          <motion.div 
            className="relative flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 1.5, delay: 1.6 }}
          >
            {/* Pulsing outer ring */}
            <motion.div
              className="absolute rounded-full border border-primary/30 backdrop-blur-sm"
              initial={{ width: 50, height: 50 }}
              animate={{ 
                width: [50, 60, 50],
                height: [50, 60, 50],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            
            {/* Main circle background */}
            <motion.div 
              className="relative glass w-12 h-12 rounded-full flex items-center justify-center shadow-lg overflow-hidden"
            >
              {/* Shimmer effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-secondary/10 to-transparent"
                animate={{ 
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
              
              {/* Arrow container with floating animation */}
              <motion.div
                className="relative z-10 flex flex-col items-center justify-center gap-[2px]"
                animate={{ y: [0, -2, 0, 2, 0] }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                {/* Three animated arrows */}
                {[0, 1, 2].map(index => (
                  <motion.div
                    key={index}
                    className="w-4 h-4 flex items-center justify-center"
                    initial={{ opacity: 0.3 }}
                    animate={{ 
                      opacity: [
                        0.3, 
                        index === 0 ? 1 : 0.3, 
                        index === 1 ? 1 : 0.3, 
                        index === 2 ? 1 : 0.3, 
                        0.3
                      ],
                      y: [0, index === 0 ? 2 : 0, index === 1 ? 2 : 0, index === 2 ? 2 : 0, 0]
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: index * 0.2,
                      ease: "easeInOut"
                    }}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="text-primary"
                    >
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Episodes Section */}
      <section className="py-20 bg-card relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-secondary opacity-10 blur-3xl rounded-full transform -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-primary opacity-10 blur-3xl rounded-full transform translate-y-1/3 -translate-x-1/4"></div>
        </div>
        
        <div className="container-modern relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-bold mb-4">Episodios Destacados</h2>
              <div className="w-32 h-1 bg-gradient-primary mx-auto rounded-full"></div>
            </motion.div>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {/* Episode 1 */}
            <div className="card-hover">
              <DynamicEpisodeCard 
                title="El futuro de la aviación autónoma"
                description="Exploramos las tendencias en aviación no tripulada y su impacto en el transporte aéreo comercial."
                image="https://via.placeholder.com/800x450/3F51B5/FFFFFF?text=Aviacion+Autonoma"
                duration="45:22"
                number="EP 42"
                href="/episodes/42"
              />
            </div>
            
            {/* Episode 2 */}
            <div className="card-hover">
              <DynamicEpisodeCard 
                title="Desarrollo web en 2023"
                description="Frameworks, lenguajes y herramientas que dominarán el desarrollo web este año."
                image="https://via.placeholder.com/800x450/673AB7/FFFFFF?text=Desarrollo+Web"
                duration="52:18"
                number="EP 41"
                href="/episodes/41"
              />
            </div>
            
            {/* Episode 3 */}
            <div className="card-hover">
              <DynamicEpisodeCard 
                title="Inteligencia Artificial y ética"
                description="Debatimos los límites éticos de la IA y cómo afectará a diferentes industrias."
                image="https://via.placeholder.com/800x450/00B8D4/FFFFFF?text=IA+y+Etica"
                duration="58:05"
                number="EP 40"
                href="/episodes/40"
              />
            </div>
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <Link 
              href="/episodes" 
              className="btn-secondary"
            >
              Ver todos los episodios
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-primary-to-accent/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <pattern id="grid-pattern" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2"></path>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-pattern)"></rect>
          </svg>
        </div>
        
        <div className="container-modern relative z-10">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <motion.div 
              className="flex flex-col items-center neo px-6 py-8 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="flex items-end justify-center h-10 mb-4">
                <FaPodcast className="text-4xl text-primary" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 text-gradient-primary">120+</div>
              <div className="text-foreground/60 text-sm">Episodios publicados</div>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center neo px-6 py-8 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-end justify-center h-10 mb-4">
                <FaHeadphones className="text-4xl text-secondary" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 text-gradient-secondary">10k+</div>
              <div className="text-foreground/60 text-sm">Oyentes mensuales</div>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center neo px-6 py-8 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex items-end justify-center h-10 mb-4">
                <FaYoutube className="text-4xl text-red-500" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 text-gradient-primary">4.8</div>
              <div className="text-foreground/60 text-sm">Valoración promedio</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 glass relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none"
            animate={{ opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <AudioVisualizer barCount={100} maxHeight={80} className="w-full" />
          </motion.div>
        </div>
        
        <div className="container-modern relative z-10">
          <motion.div 
            className="max-w-xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4">
              <FaRss className="text-3xl text-accent mx-auto" />
            </div>
            <h2 className="text-3xl font-bold mb-4">¿No quieres perderte ningún episodio?</h2>
            <p className="text-foreground/80 mb-8">
              Suscríbete para recibir notificaciones cuando publiquemos nuevos episodios
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 mx-auto max-w-md">
              <input 
                type="email" 
                placeholder="Tu email" 
                className="flex-1 px-4 py-3 rounded-full bg-background/90 border border-border focus-ring"
                required
              />
              <button 
                type="submit"
                className="btn-accent"
              >
                Suscribirme
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 