"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaYoutube, FaHeadphones, FaSpotify, FaItunes, FaArrowRight, FaPlay } from 'react-icons/fa';

import Section from '@/components/ui/Section';
import ScrollAnimation from '@/components/ui/ScrollAnimation';
import EpisodeCard from '@/components/episodes/EpisodeCard';
import AudioPlayer from '@/components/ui/AudioPlayer';

const featuredEpisodes = [
  {
    id: '1',
    title: 'Crecimiento personal en la era digital',
    description: 'Conversamos sobre las estrategias más efectivas para el desarrollo personal en un mundo hiperconectado.',
    duration: '45:30',
    date: '15 Mar 2023',
    listens: '2.5K',
    image: '/images/placeholder-episode.jpg',
    audioUrl: 'https://example.com/audio1.mp3',
    href: '/episodes/1'
  },
  {
    id: '2',
    title: 'La productividad y el bienestar',
    description: '¿Cómo equilibrar la productividad con el bienestar personal? Exploramos técnicas y enfoques.',
    duration: '38:15',
    date: '22 Feb 2023',
    listens: '1.8K',
    image: '/images/placeholder-episode.jpg',
    audioUrl: 'https://example.com/audio2.mp3',
    href: '/episodes/2'
  },
  {
    id: '3',
    title: 'Inteligencia emocional en el trabajo',
    description: 'Analizamos la importancia de la inteligencia emocional en entornos laborales modernos.',
    duration: '42:50',
    date: '8 Feb 2023',
    listens: '3.2K',
    image: '/images/placeholder-episode.jpg',
    audioUrl: 'https://example.com/audio3.mp3',
    href: '/episodes/3'
  }
];

export default function Home() {
  const [selectedEpisode, setSelectedEpisode] = useState<null | typeof featuredEpisodes[0]>(null);
  const [isAudioPlayerVisible, setIsAudioPlayerVisible] = useState(false);

  // Mostrar el reproductor cuando se selecciona un episodio
  const handleEpisodePlay = (episode: typeof featuredEpisodes[0]) => {
    setSelectedEpisode(episode);
    setIsAudioPlayerVisible(true);
  };

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero con animación */}
      <section className="relative w-full min-h-[90vh] flex items-center py-20 lg:py-32 overflow-hidden">
        {/* Patrón de ondas sonoras en el fondo */}
        <div className="absolute inset-0 sound-waves-pattern opacity-5"></div>
        
        {/* Resplandor de gradiente en el fondo */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-primary/20 blur-[120px] rounded-full opacity-60"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-secondary/20 blur-[100px] rounded-full opacity-50"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
        
        <div className="container relative mx-auto px-4 z-10">
          <div className="flex flex-col items-center text-center">
            <ScrollAnimation variant="slide-up">
              <h1 className="text-gradient-brand mb-6 text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter">
                EFIS PODCAST
              </h1>
            </ScrollAnimation>
            
            <ScrollAnimation variant="slide-up" delay={0.1}>
              <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mb-8">
                Un espacio de conversación, reflexión y aprendizaje sobre desarrollo personal y profesional. Entrevistas, debates y contenido para potenciar tu crecimiento.
              </p>
            </ScrollAnimation>
            
            {/* CTA Buttons */}
            <ScrollAnimation variant="slide-up" delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/episodes"
                    className="bg-gradient-brand hover:opacity-90 transition-opacity px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 shadow-lg"
                  >
                    <FaHeadphones className="h-5 w-5" />
                    <span>Escuchar episodios</span>
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/youtube"
                    className="bg-background border border-primary/30 hover:border-primary/60 transition-colors px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                  >
                    <FaYoutube className="h-5 w-5 text-red-500" />
                    <span>Ver en YouTube</span>
                  </Link>
                </motion.div>
              </div>
            </ScrollAnimation>
            
            {/* Disponible en */}
            <ScrollAnimation variant="slide-up" delay={0.3}>
              <div className="w-full">
                <p className="text-xs text-foreground/60 uppercase tracking-wider mb-4">Disponible en</p>
                <div className="flex flex-wrap justify-center gap-6">
                  <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <PlatformLogo name="Spotify" icon={<FaSpotify className="text-[#1DB954]" />} />
                  </motion.div>
                  
                  <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <PlatformLogo name="Apple Podcasts" icon={<FaItunes className="text-[#872EC4]" />} />
                  </motion.div>
                  
                  <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <PlatformLogo name="YouTube" icon={<FaYoutube className="text-[#FF0000]" />} />
                  </motion.div>
                </div>
              </div>
            </ScrollAnimation>
            
            {/* Scroll indicator */}
            <motion.div 
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-5 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2">
                <motion.div 
                  className="w-1 h-1 rounded-full bg-primary"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Sección de Episodios Destacados */}
      <Section 
        title="EPISODIOS DESTACADOS" 
        subtitle="Explora nuestro contenido más relevante y descubre las conversaciones que están transformando vidas."
        background="gradient"
        titleAlignment="center"
      >
        <div className="flex justify-end mb-6">
          <Link href="/episodes" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <span>Ver todos los episodios</span>
            <FaArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEpisodes.map((episode, index) => (
            <ScrollAnimation 
              key={episode.id} 
              variant="slide-up" 
              delay={0.1 * index}
            >
              <div className="relative group">
                <EpisodeCard 
                  {...episode}
                  variant={index === 0 ? 'featured' : 'default'}
                />
                
                <motion.button
                  onClick={() => handleEpisodePlay(episode)}
                  className="absolute top-4 right-4 bg-primary rounded-full p-2 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaPlay className="w-3 h-3" />
                </motion.button>
              </div>
            </ScrollAnimation>
          ))}
        </div>
        
        {/* Reproductor de audio flotante */}
        <AnimatedAudioPlayer 
          episode={selectedEpisode} 
          isVisible={isAudioPlayerVisible}
          onClose={() => setIsAudioPlayerVisible(false)}
        />
      </Section>
      
      {/* Sección Testimonios/Stats */}
      <Section background="waves">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <ScrollAnimation variant="zoom" delay={0.1}>
            <StatCard number="50+" label="Episodios" />
          </ScrollAnimation>
          
          <ScrollAnimation variant="zoom" delay={0.2}>
            <StatCard number="10K+" label="Oyentes mensuales" />
          </ScrollAnimation>
          
          <ScrollAnimation variant="zoom" delay={0.3}>
            <StatCard number="4.8" label="Calificación promedio" />
          </ScrollAnimation>
        </div>
      </Section>
      
      {/* Sección Suscríbete */}
      <Section background="default">
        <div className="bg-gradient-to-br from-background to-background/80 border border-border/50 rounded-xl p-8 relative overflow-hidden">
          {/* Patrón de ondas sonoras */}
          <div className="absolute inset-0 sound-waves-pattern opacity-30"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <ScrollAnimation variant="slide-up">
              <h2 className="text-2xl font-bold mb-4">ÚNETE A NUESTRA COMUNIDAD</h2>
            </ScrollAnimation>
            
            <ScrollAnimation variant="slide-up" delay={0.1}>
              <p className="text-foreground/80 max-w-2xl mb-8">
                Recibe notificaciones sobre nuevos episodios, contenido exclusivo y más directamente en tu correo.
              </p>
            </ScrollAnimation>
            
            <ScrollAnimation variant="slide-up" delay={0.2}>
              <form className="w-full max-w-md flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="flex-1 px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:border-primary transition-colors"
                  required
                />
                <motion.button
                  type="submit"
                  className="bg-gradient-brand hover:opacity-90 transition-opacity px-6 py-3 rounded-lg font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Suscribirse
                </motion.button>
              </form>
            </ScrollAnimation>
          </div>
        </div>
      </Section>
    </main>
  );
}

// Componente para logos de plataformas
function PlatformLogo({ name, icon }: { name: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-2xl">
        {icon}
      </div>
      <span className="text-sm text-foreground/70">{name}</span>
    </div>
  );
}

// Componente para estadísticas
function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <motion.div 
      className="flex flex-col items-center p-6 bg-card/40 backdrop-blur-sm border border-border/30 rounded-xl"
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <span className="text-5xl font-extrabold text-gradient-brand mb-2">{number}</span>
      <span className="text-sm uppercase tracking-wider text-foreground/70">{label}</span>
    </motion.div>
  );
}

// Componente para el reproductor de audio flotante
function AnimatedAudioPlayer({ 
  episode, 
  isVisible, 
  onClose 
}: { 
  episode: typeof featuredEpisodes[0] | null; 
  isVisible: boolean;
  onClose: () => void;
}) {
  if (!episode) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
      <motion.div 
        className="w-full max-w-2xl mx-4 mb-4"
        initial={{ y: 100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : 100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30 
        }}
      >
        <div className="relative">
          <AudioPlayer 
            src={episode.audioUrl} 
            title={episode.title}
            variant="default"
            className="shadow-xl"
          />
          <button 
            onClick={onClose}
            className="absolute -top-2 -right-2 bg-foreground text-background rounded-full w-6 h-6 flex items-center justify-center text-xs"
            aria-label="Cerrar reproductor"
          >
            &times;
          </button>
        </div>
      </motion.div>
    </div>
  );
} 