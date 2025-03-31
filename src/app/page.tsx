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
  FaRss,
  FaMoneyBillWave,
  FaChartLine,
  FaWallet
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
              <span className="text-gradient-primary font-bold">Tu dinero, tus reglas.</span> Aprende a manejarlo sin estrés.
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

            {/* Financial icons with animation */}
            <motion.div 
              className="flex justify-center gap-16 items-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                className="flex flex-col items-center gap-2"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <FaMoneyBillWave className="text-2xl text-primary" />
                </div>
                <p className="text-sm font-medium">Maneja tu dinero</p>
              </motion.div>
              
              <motion.div 
                className="flex flex-col items-center gap-2"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <FaChartLine className="text-2xl text-primary" />
                </div>
                <p className="text-sm font-medium">Invierte para crecer</p>
              </motion.div>
              
              <motion.div 
                className="flex flex-col items-center gap-2"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <FaWallet className="text-2xl text-primary" />
                </div>
                <p className="text-sm font-medium">Libertad financiera</p>
              </motion.div>
            </motion.div>

            {/* Available platforms with animation */}
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

        {/* Modern Minimal Scroll Indicator */}
        <div className="fixed bottom-10 inset-x-0 z-40 pointer-events-none flex justify-center items-center">
          <motion.div 
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            {/* Elegant animated indicator */}
            <motion.div 
              className="relative h-14 w-6 border border-primary/40 rounded-full flex justify-center overflow-hidden backdrop-blur-sm"
              whileHover={{ opacity: 1 }}
            >
              {/* Shine effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-primary/10 via-secondary/5 to-transparent opacity-30"
                animate={{ y: [20, 0, 20] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Animated dot */}
              <motion.div 
                className="absolute w-2 h-2 rounded-full bg-primary/90"
                animate={{ 
                  y: [0, 28, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </motion.div>
            
            {/* Simple text label */}
            <motion.span 
              className="text-xs uppercase tracking-widest text-primary/60 font-light"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Scroll
            </motion.span>
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
                title="Cómo empezar a invertir con poco dinero"
                description="Descubre las mejores estrategias para comenzar a invertir cuando tienes un presupuesto limitado."
                image="https://via.placeholder.com/800x450/0066FF/FFFFFF?text=Inversiones"
                duration="45:22"
                number="EP 42"
                href="/episodes/42"
              />
            </div>
            
            {/* Episode 2 */}
            <div className="card-hover">
              <DynamicEpisodeCard 
                title="Finanzas personales para principiantes"
                description="Aprende lo básico para organizar tus finanzas y crear un plan de ahorro efectivo."
                image="https://via.placeholder.com/800x450/0A2C86/FFFFFF?text=Finanzas+Personales"
                duration="52:18"
                number="EP 41"
                href="/episodes/41"
              />
            </div>
            
            {/* Episode 3 */}
            <div className="card-hover">
              <DynamicEpisodeCard 
                title="Cómo salir de deudas rápidamente"
                description="Estrategias probadas para eliminar tus deudas y empezar a construir tu patrimonio."
                image="https://via.placeholder.com/800x450/80C9FF/000000?text=Sin+Deudas"
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
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-bold mb-4">Por qué escuchar Efis Podcast</h2>
              <div className="w-32 h-1 bg-gradient-primary mx-auto rounded-full"></div>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div
              className="glass p-8 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="mb-4 text-5xl font-bold text-primary">+500</div>
              <h3 className="text-xl font-semibold mb-2">Oyentes que mejoraron su economía</h3>
              <p className="text-foreground/80">Personas que aplicaron nuestros consejos y vieron resultados reales en su economía personal.</p>
            </motion.div>
            
            <motion.div
              className="glass p-8 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              <div className="mb-4 text-5xl font-bold text-primary">+50</div>
              <h3 className="text-xl font-semibold mb-2">Episodios llenos de valor</h3>
              <p className="text-foreground/80">Cada episodio te brinda consejos prácticos sobre dinero que puedes aplicar inmediatamente.</p>
            </motion.div>
            
            <motion.div
              className="glass p-8 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            >
              <div className="mb-4 text-5xl font-bold text-primary">100%</div>
              <h3 className="text-xl font-semibold mb-2">Contenido sin complicaciones</h3>
              <p className="text-foreground/80">Explicamos conceptos financieros complejos de forma simple y entretenida.</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-card relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-secondary opacity-10 blur-3xl rounded-full transform -translate-y-1/2 -translate-x-1/3"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-primary opacity-10 blur-3xl rounded-full transform translate-y-1/3 translate-x-1/4"></div>
        </div>
        
        <div className="container-modern relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-bold mb-4">Lo que dicen nuestros oyentes</h2>
              <div className="w-32 h-1 bg-gradient-primary mx-auto rounded-full"></div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              className="glass p-8 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  MS
                </div>
                <div>
                  <h4 className="font-bold">María Sánchez</h4>
                  <p className="text-sm text-foreground/70">Emprendedora, 32 años</p>
                </div>
              </div>
              <p className="text-foreground/80 italic">"Gracias a Efis Podcast, finalmente entendí cómo funciona la inversión. Comencé con pequeñas cantidades y ahora tengo un portafolio diversificado que está creciendo cada mes."</p>
            </motion.div>
            
            <motion.div
              className="glass p-8 rounded-xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  JR
                </div>
                <div>
                  <h4 className="font-bold">José Rodríguez</h4>
                  <p className="text-sm text-foreground/70">Profesional, 28 años</p>
                </div>
              </div>
              <p className="text-foreground/80 italic">"Apliqué el método de ahorro que explicaron en el episodio 38 y en seis meses logré juntar el dinero para el enganche de mi coche. ¡Sin sacrificar mi estilo de vida!"</p>
            </motion.div>
            
            <motion.div
              className="glass p-8 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  AC
                </div>
                <div>
                  <h4 className="font-bold">Ana Cortés</h4>
                  <p className="text-sm text-foreground/70">Estudiante, 25 años</p>
                </div>
              </div>
              <p className="text-foreground/80 italic">"Siempre pensé que la inversión era solo para ricos, pero Efis me enseñó que puedo empezar con lo que tengo. Ya llevo 9 meses invirtiendo y veo resultados increíbles."</p>
            </motion.div>
            
            <motion.div
              className="glass p-8 rounded-xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  LM
                </div>
                <div>
                  <h4 className="font-bold">Luis Mendoza</h4>
                  <p className="text-sm text-foreground/70">Empresario, 40 años</p>
                </div>
              </div>
              <p className="text-foreground/80 italic">"Los consejos sobre gestión de deudas me ayudaron a salir de un ciclo de tarjetas de crédito que parecía infinito. Ahora duermo tranquilo y estoy construyendo mi patrimonio."</p>
            </motion.div>
          </div>
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

      {/* Resources Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>
        
        <div className="container-modern relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-bold mb-4">Recursos Financieros</h2>
              <div className="w-32 h-1 bg-gradient-primary mx-auto rounded-full"></div>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="border border-border rounded-xl p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 bg-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <FaChartLine className="text-2xl text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Guías de Inversión</h3>
              <p className="text-foreground/80 mb-4">Descarga nuestras guías gratuitas para aprender a invertir paso a paso, desde principiante hasta avanzado.</p>
              <Link 
                href="/resources/investment-guides" 
                className="text-primary font-medium inline-flex items-center hover:underline"
              >
                Descargar guías <span className="ml-1">→</span>
              </Link>
            </motion.div>
            
            <motion.div
              className="border border-border rounded-xl p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 bg-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <FaWallet className="text-2xl text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Plantillas de Presupuesto</h3>
              <p className="text-foreground/80 mb-4">Controla tus gastos e ingresos con nuestras plantillas personalizables. Organizadas y fáciles de usar.</p>
              <Link 
                href="/resources/budget-templates" 
                className="text-primary font-medium inline-flex items-center hover:underline"
              >
                Obtener plantillas <span className="ml-1">→</span>
              </Link>
            </motion.div>
            
            <motion.div
              className="border border-border rounded-xl p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 bg-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <FaMicrophone className="text-2xl text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Mini Cursos</h3>
              <p className="text-foreground/80 mb-4">Formaciones cortas y gratuitas sobre temas específicos: ahorro, impuestos, inversiones y más.</p>
              <Link 
                href="/resources/mini-courses" 
                className="text-primary font-medium inline-flex items-center hover:underline"
              >
                Acceder a cursos <span className="ml-1">→</span>
              </Link>
            </motion.div>
          </div>
          
          {/* Community Section */}
          <div className="mt-24">
            <div className="bg-gradient-primary rounded-3xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-10 md:p-12">
                  <motion.h3 
                    className="text-white text-3xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    Únete a nuestra comunidad
                  </motion.h3>
                  <motion.p 
                    className="text-white/90 mb-8 text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                  >
                    Conecta con personas que, como tú, quieren mejorar su relación con el dinero. Comparte experiencias, haz preguntas y crece junto a nosotros.
                  </motion.p>
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                  >
                    <a 
                      href="https://t.me/efispodcast" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-6 py-3 rounded-lg text-white font-medium"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
                      </svg>
                      Grupo de Telegram
                    </a>
                    <a 
                      href="https://discord.gg/efispodcast" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-6 py-3 rounded-lg text-white font-medium"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 1-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
                      </svg>
                      Servidor de Discord
                    </a>
                  </motion.div>
                </div>
                <div className="relative hidden md:block">
                  <div className="absolute inset-0 bg-black/30"></div>
                  <Image 
                    src="https://via.placeholder.com/600x400/0A2C86/FFFFFF?text=Comunidad" 
                    alt="Comunidad Efis Podcast" 
                    width={600} 
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="1" fill="white" opacity="0.3" />
            <circle cx="30" cy="10" r="1" fill="white" opacity="0.3" />
            <circle cx="50" cy="10" r="1" fill="white" opacity="0.3" />
            <circle cx="70" cy="10" r="1" fill="white" opacity="0.3" />
            <circle cx="90" cy="10" r="1" fill="white" opacity="0.3" />
            <circle cx="10" cy="30" r="1" fill="white" opacity="0.3" />
            <circle cx="30" cy="30" r="1" fill="white" opacity="0.3" />
            <circle cx="50" cy="30" r="1" fill="white" opacity="0.3" />
            <circle cx="70" cy="30" r="1" fill="white" opacity="0.3" />
            <circle cx="90" cy="30" r="1" fill="white" opacity="0.3" />
            <circle cx="10" cy="50" r="1" fill="white" opacity="0.3" />
            <circle cx="30" cy="50" r="1" fill="white" opacity="0.3" />
            <circle cx="50" cy="50" r="1" fill="white" opacity="0.3" />
            <circle cx="70" cy="50" r="1" fill="white" opacity="0.3" />
            <circle cx="90" cy="50" r="1" fill="white" opacity="0.3" />
            <circle cx="10" cy="70" r="1" fill="white" opacity="0.3" />
            <circle cx="30" cy="70" r="1" fill="white" opacity="0.3" />
            <circle cx="50" cy="70" r="1" fill="white" opacity="0.3" />
            <circle cx="70" cy="70" r="1" fill="white" opacity="0.3" />
            <circle cx="90" cy="70" r="1" fill="white" opacity="0.3" />
            <circle cx="10" cy="90" r="1" fill="white" opacity="0.3" />
            <circle cx="30" cy="90" r="1" fill="white" opacity="0.3" />
            <circle cx="50" cy="90" r="1" fill="white" opacity="0.3" />
            <circle cx="70" cy="90" r="1" fill="white" opacity="0.3" />
            <circle cx="90" cy="90" r="1" fill="white" opacity="0.3" />
          </svg>
        </div>
        
        <div className="container-modern relative z-10 text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Tu dinero, tus reglas.
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/90 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            Comienza hoy a tomar el control de tus finanzas con los recursos y conocimientos que te brindamos.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <Link 
              href="/episodes"
              className="bg-white text-primary font-bold px-8 py-4 rounded-full shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30 transition-all duration-300 transform hover:scale-105"
            >
              Escuchar episodios
            </Link>
            
            <Link 
              href="/resources"
              className="border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Explorar recursos
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 