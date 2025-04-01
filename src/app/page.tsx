"use client";

import React from "react";
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
  FaWallet,
  FaArrowRight,
  FaUsers,
  FaLightbulb
} from "react-icons/fa";
import Logo from "@/components/brand/Logo";
import AudioVisualizer from "@/components/ui/AudioVisualizer";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Dynamic import to avoid component conflicts
const DynamicEpisodeCard = dynamic(() => import('@/components/episodes/EpisodeCard'), {
  ssr: false,
});

import YouTubeEpisodes from '@/components/episodes/YouTubeEpisodes';

// Componente SectionTitle
const SectionTitle = ({ 
  subtitle, 
  title, 
  align = "center" 
}: { 
  subtitle: string; 
  title: string; 
  align?: "left" | "center" | "right" 
}) => {
  const alignClass = 
    align === "left" 
      ? "text-left" 
      : align === "right" 
        ? "text-right" 
        : "text-center mx-auto";
  
  return (
    <div className={`max-w-2xl ${alignClass}`}>
      <h3 className="text-sm font-medium tracking-wider text-primary uppercase mb-2">
        {subtitle}
      </h3>
      <h2 className="text-3xl md:text-4xl font-bold">
        {title}
      </h2>
    </div>
  );
};

// Animaciones para fade in
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

// Animaciones para contenido que aparece secuencialmente
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Video de fondo */}
      <div className="video-background">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          poster="/images/podcast-poster.jpg" // Asegúrate de tener esta imagen como fallback
        >
          <source src="/videos/podcast-background.mp4" type="video/mp4" />
          {/* Asegúrate de incluir múltiples formatos para compatibilidad */}
          <source src="/videos/podcast-background.webm" type="video/webm" />
        </video>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center">
        <div className="container-modern content-width">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-spacing max-w-4xl mx-auto"
          >
            {/* Título principal */}
            <motion.h1 
              variants={fadeIn}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-tight"
            >
              <span className="block text-white">Tu dinero,</span>
              <span className="text-gradient-brand mt-2">tus reglas.</span>
            </motion.h1>

            {/* Descripción */}
            <motion.p 
              variants={fadeIn}
              className="text-lg sm:text-xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto"
            >
              Un podcast que te enseña a tomar el control de tus finanzas con estrategias prácticas y consejos reales que puedes aplicar hoy mismo.
            </motion.p>

            {/* Call to action */}
            <motion.div 
              variants={fadeIn}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
            >
              <Link 
                href="/episodes"
                className="btn-gradient-brand button-padding flex items-center gap-2 min-w-[200px] justify-center"
              >
                <FaHeadphones />
                <span>Escuchar ahora</span>
              </Link>
              <Link 
                href="/about" 
                className="btn-secondary button-padding flex items-center gap-2 min-w-[200px] justify-center"
              >
                <span>Conoce más</span>
                <FaArrowRight className="text-sm" />
              </Link>
            </motion.div>

            {/* Plataformas */}
            <motion.div 
              variants={fadeIn}
              className="pt-12 flex flex-col items-center"
            >
              <p className="text-white/60 text-sm uppercase tracking-wider mb-6 font-medium">
                Disponible en
              </p>
              <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              <a 
                href="https://open.spotify.com/show/example" 
                target="_blank"
                rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white hover:text-[#1ED760] transition-colors"
              >
                  <FaSpotify className="text-3xl" />
                  <span className="font-medium">Spotify</span>
              </a>
              <a 
                href="https://podcasts.apple.com/podcast/example" 
                target="_blank"
                rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white hover:text-[#8e44ad] transition-colors"
              >
                  <FaApple className="text-3xl" />
                  <span className="font-medium">Apple Podcasts</span>
              </a>
              <a 
                  href="https://youtube.com/@example" 
                target="_blank"
                rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white hover:text-[#FF0000] transition-colors"
              >
                  <FaYoutube className="text-3xl" />
                  <span className="font-medium">YouTube</span>
              </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
          <motion.div 
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ 
            delay: 2,
                  duration: 2, 
                  repeat: Infinity, 
            repeatType: "loop"
          }}
          className="absolute bottom-10 left-0 right-0 flex justify-center"
        >
          <div className="flex flex-col items-center text-white/60">
            <span className="text-xs font-light mb-2">Desliza hacia abajo</span>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="animate-bounce opacity-60"
            >
              <path d="M12 5L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 12L12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          </motion.div>
      </section>

      {/* Características Section */}
      <section className="section-padding bg-background">
        <div className="container-modern content-width">
          <SectionTitle 
            subtitle="POR QUÉ ESCUCHARNOS"
            title="Enfoque práctico para tus finanzas"
            align="center"
          />
          
          <div className="grid-responsive mt-12">
            {/* Feature cards with consistent padding */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card rounded-lg card-padding border border-white/5 hover:border-white/10 hover:bg-card/60 transition-all card-hover"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-brand flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L12 12L16 10M16 10L20 10V20L16 20M16 10L16 20M8 20L12 22L16 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 7C13.1046 7 14 6.10457 14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5C10 6.10457 10.8954 7 12 7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Educación Financiera</h3>
              <p className="text-muted-foreground leading-relaxed">
                Explicamos conceptos financieros complejos de forma sencilla para que puedas entender y aplicar en tu día a día.
              </p>
            </motion.div>

            {/* Feature 2 */}
          <motion.div 
              initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-lg card-padding border border-white/5 hover:border-white/10 hover:bg-card/60 transition-all card-hover"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-brand flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17V17.0111" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 13.5V7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
              <h3 className="text-xl font-semibold mb-2">Consejos Reales</h3>
              <p className="text-muted-foreground leading-relaxed">
                No teoría, sino estrategias prácticas que puedes implementar hoy mismo para mejorar tu salud financiera.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
          <motion.div 
              initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card rounded-lg card-padding border border-white/5 hover:border-white/10 hover:bg-card/60 transition-all card-hover"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-brand flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 10L11 14L9 12M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Casos de éxito</h3>
              <p className="text-muted-foreground leading-relaxed">
                Compartimos historias reales de personas que han logrado transformar sus finanzas y cómo lo hicieron.
              </p>
          </motion.div>
          </div>
        </div>
      </section>

      {/* Últimos episodios */}
      <section className="section-padding bg-card">
        <div className="container-modern content-width">
          <div className="episodes-section">
            <div className="episodes-header">
              <SectionTitle 
                subtitle="ESCUCHA AHORA"
                title="Últimos episodios"
                align="left"
              />
              <Link href="/episodes" className="text-primary hover:text-primary/90 flex items-center gap-1 font-medium">
                Ver todos
                <FaArrowRight className="text-sm" />
              </Link>
            </div>
            
            <div className="episodes-grid">
              {/* Episodio 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="episode-card"
              >
                <div className="relative">
                  <Image
                    src="/episode1.jpg"
                    alt="Episodio 1"
                    width={400}
                    height={225}
                    className="episode-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="episode-content">
                  <h3 className="episode-title">Inversiones para principiantes</h3>
                  <p className="episode-description">
                    Aprende los conceptos básicos de inversión y cómo comenzar tu viaje financiero con confianza.
                  </p>
                  <div className="episode-meta">
                    <span>Episodio 1</span>
                    <span>•</span>
                    <span>45 min</span>
                  </div>
                </div>
              </motion.div>

              {/* Episodio 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="episode-card"
              >
                <div className="relative">
                  <Image
                    src="/episode2.jpg"
                    alt="Episodio 2"
                    width={400}
                    height={225}
                    className="episode-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="episode-content">
                  <h3 className="episode-title">Presupuesto inteligente</h3>
                  <p className="episode-description">
                    Descubre cómo crear y mantener un presupuesto efectivo que te ayude a alcanzar tus metas financieras.
                  </p>
                  <div className="episode-meta">
                    <span>Episodio 2</span>
                    <span>•</span>
                    <span>38 min</span>
                  </div>
                </div>
              </motion.div>

              {/* Episodio 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="episode-card"
              >
                <div className="relative">
                  <Image
                    src="/episode3.jpg"
                    alt="Episodio 3"
                    width={400}
                    height={225}
                    className="episode-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="episode-content">
                  <h3 className="episode-title">Deuda inteligente</h3>
                  <p className="episode-description">
                    Aprende a manejar la deuda de manera efectiva y cómo usarla a tu favor.
                  </p>
                  <div className="episode-meta">
                    <span>Episodio 3</span>
                    <span>•</span>
                    <span>42 min</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-gradient-brand" />
        
        <div className="container-modern content-width relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center text-spacing"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Toma el control de tus finanzas <span className="text-gradient-brand">hoy mismo</span>
            </h2>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
              Aprende, implementa y transforma tu relación con el dinero. Únete a nuestra comunidad de oyentes que están cambiando su futuro financiero.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link 
                href="/episodes" 
                className="btn-gradient-brand button-padding flex items-center gap-2 justify-center"
              >
                <FaHeadphones />
                <span>Comenzar a escuchar</span>
              </Link>
              <Link 
                href="/community" 
                className="btn-secondary button-padding flex items-center gap-2 justify-center"
              >
                <span>Unirme a la comunidad</span>
                <FaArrowRight className="text-sm" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 