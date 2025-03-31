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

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-primary py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              EFIS PODCAST
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="font-bold text-white">Tu dinero, tus reglas.</span> Aprende de las experiencias de empresarios y expertos financieros.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link href="/episodes" className="btn-primary">
                <div className="flex items-center">
                  <FaHeadphones className="mr-2" />
                  <span>Escuchar episodios</span>
                </div>
              </Link>
              
              <Link href="/youtube" className="btn-secondary">
                <div className="flex items-center">
                  <FaYoutube className="mr-2" />
                  <span>Ver en YouTube</span>
                </div>
              </Link>
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <a href="https://open.spotify.com/show/example" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                <FaSpotify size={24} />
              </a>
              <a href="https://podcasts.apple.com/podcast/example" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                <FaApple size={24} />
              </a>
              <a href="https://youtube.com/@EFISPODCAST" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                <FaYoutube size={24} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Sección de Episodios Destacados */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">Episodios destacados</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Entrevistas con empresarios consolidados, gestores de patrimonio, expertos inmobiliarios y mucho más.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Episodio 1 */}
            <motion.div 
              className="bg-card rounded-xl overflow-hidden shadow-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="relative aspect-video">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
                <Image 
                  src="https://via.placeholder.com/640x360/0066FF/FFFFFF?text=Empresario+Exitoso" 
                  alt="Empresario compartiendo su historia" 
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 text-white">
                  <FaPlay className="text-primary" />
                  <span className="text-sm">32:15</span>
                </div>
              </div>
              <div className="p-6">
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium mb-2">
                  Emprendimiento
                </span>
                <h3 className="text-xl font-bold mb-2 line-clamp-2">Cómo construí mi empresa desde cero</h3>
                <p className="text-foreground/70 mb-4 line-clamp-3">
                  Un empresario exitoso comparte su trayectoria, desde los primeros pasos hasta consolidar su negocio.
                </p>
                <Link 
                  href="/episodes/1" 
                  className="text-primary font-medium flex items-center justify-between"
                >
                  <span>Escuchar episodio</span>
                  <FaArrowRight className="text-sm" />
                </Link>
              </div>
            </motion.div>
            
            {/* Episodio 2 */}
            <motion.div 
              className="bg-card rounded-xl overflow-hidden shadow-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative aspect-video">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
                <Image 
                  src="https://via.placeholder.com/640x360/0066FF/FFFFFF?text=Gestor+Patrimonio" 
                  alt="Gestor de patrimonio" 
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 text-white">
                  <FaPlay className="text-primary" />
                  <span className="text-sm">45:30</span>
                </div>
              </div>
              <div className="p-6">
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium mb-2">
                  Inversiones
                </span>
                <h3 className="text-xl font-bold mb-2 line-clamp-2">Estrategias de gestión de patrimonio a largo plazo</h3>
                <p className="text-foreground/70 mb-4 line-clamp-3">
                  Un gestor de patrimonio profesional revela sus mejores consejos para construir riqueza a largo plazo.
                </p>
                <Link 
                  href="/episodes/2" 
                  className="text-primary font-medium flex items-center justify-between"
                >
                  <span>Escuchar episodio</span>
                  <FaArrowRight className="text-sm" />
                </Link>
              </div>
            </motion.div>
            
            {/* Episodio 3 */}
            <motion.div 
              className="bg-card rounded-xl overflow-hidden shadow-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative aspect-video">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
                <Image 
                  src="https://via.placeholder.com/640x360/0066FF/FFFFFF?text=Real+Estate" 
                  alt="Experto inmobiliario" 
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 text-white">
                  <FaPlay className="text-primary" />
                  <span className="text-sm">38:45</span>
                </div>
              </div>
              <div className="p-6">
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium mb-2">
                  Inmobiliario
                </span>
                <h3 className="text-xl font-bold mb-2 line-clamp-2">El mercado de propiedades de lujo en 2024</h3>
                <p className="text-foreground/70 mb-4 line-clamp-3">
                  Una gestora de alquileres turísticos comparte las tendencias actuales y oportunidades en el mercado inmobiliario premium.
                </p>
                <Link 
                  href="/episodes/3" 
                  className="text-primary font-medium flex items-center justify-between"
                >
                  <span>Escuchar episodio</span>
                  <FaArrowRight className="text-sm" />
                </Link>
              </div>
            </motion.div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/episodes" className="btn-secondary inline-flex items-center gap-2">
              <span>Ver todos los episodios</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
      
      {/* About EFIS */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div 
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">EFIS es un estilo de vida</h2>
              <p className="text-foreground/80 mb-4">
                En EFIS Podcast, entendemos que cada persona tiene una historia detrás. Nuestro objetivo es hacer la vida más fácil a las personas a través de nuestro contenido.
              </p>
              <p className="text-foreground/80 mb-6">
                A través de conversaciones con empresarios, inversores, expertos en bienes raíces y muchos otros profesionales, ofrecemos perspectivas únicas que inspiran y educan.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="flex flex-col items-center p-4 bg-background rounded-lg">
                  <FaLightbulb className="text-2xl text-primary mb-3" />
                  <h3 className="font-bold text-center">Inspiración</h3>
                  <p className="text-sm text-center text-foreground/70">Historias que motivan</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-background rounded-lg">
                  <FaChartLine className="text-2xl text-primary mb-3" />
                  <h3 className="font-bold text-center">Crecimiento</h3>
                  <p className="text-sm text-center text-foreground/70">Desarrollo personal</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-background rounded-lg">
                  <FaUsers className="text-2xl text-primary mb-3" />
                  <h3 className="font-bold text-center">Comunidad</h3>
                  <p className="text-sm text-center text-foreground/70">Compartir experiencias</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-primary blur-3xl opacity-30 -z-10 rounded-full transform -translate-x-1/4 translate-y-1/4"></div>
              <div className="relative bg-card overflow-hidden rounded-2xl border border-border/50 shadow-xl">
                <Image 
                  src="https://via.placeholder.com/800x600/0066FF/FFFFFF?text=EFIS+PODCAST" 
                  alt="EFIS Podcast Studio" 
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* YouTube Channel Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">Nuestro canal de YouTube</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Contenido exclusivo, entrevistas y momentos destacados de nuestros episodios.
            </p>
          </motion.div>
          
          <YouTubeEpisodes />
        </div>
      </section>
      
      {/* Próximamente: Comunidad y Recursos */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Próximamente
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Comunidad - Próximamente */}
            <motion.div 
              className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-white">
                  <FaUsers size={24} />
                </div>
                <h3 className="text-2xl font-bold">Comunidad EFIS</h3>
              </div>
              <p className="mb-6">
                Estamos trabajando en crear una comunidad donde podrás conectar con otros oyentes, compartir experiencias y aprender juntos.
              </p>
              <div className="bg-white/5 p-4 rounded-lg">
                <p className="text-sm text-white/80">
                  <strong>Características próximamente:</strong>
                </p>
                <ul className="mt-2 text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70"></span>
                    <span>Grupos de Telegram y Discord</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70"></span>
                    <span>Eventos virtuales con invitados especiales</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70"></span>
                    <span>Acceso a contenido exclusivo</span>
                  </li>
                </ul>
              </div>
            </motion.div>
            
            {/* Recursos - Próximamente */}
            <motion.div 
              className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-white">
                  <FaChartLine size={24} />
                </div>
                <h3 className="text-2xl font-bold">Recursos Financieros</h3>
              </div>
              <p className="mb-6">
                Pronto ofreceremos herramientas y guías para ayudarte a mejorar tu relación con el dinero y alcanzar tus metas financieras.
              </p>
              <div className="bg-white/5 p-4 rounded-lg">
                <p className="text-sm text-white/80">
                  <strong>Recursos en desarrollo:</strong>
                </p>
                <ul className="mt-2 text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70"></span>
                    <span>Guías de inversión para principiantes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70"></span>
                    <span>Plantillas de presupuesto personalizables</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70"></span>
                    <span>Calculadoras financieras interactivas</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg text-white/80">
              Mantente atento a nuestras novedades para ser el primero en acceder.
            </p>
          </div>
        </div>
      </section>
      
      {/* Testimonios */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Lo que dicen nuestros oyentes
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              className="glass p-8 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
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
              <p className="text-foreground/80 italic">"Gracias a Efis Podcast, finalmente entendí cómo funciona la inversión. Las entrevistas con expertos son muy claras y me han ayudado a tomar mejores decisiones financieras."</p>
            </motion.div>

            <motion.div
              className="glass p-8 rounded-xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  JL
                </div>
                <div>
                  <h4 className="font-bold">Jorge López</h4>
                  <p className="text-sm text-foreground/70">Consultor, 45 años</p>
                </div>
              </div>
              <p className="text-foreground/80 italic">"Las entrevistas con empresarios consolidados me han inspirado a dar el salto y comenzar mi propio negocio. El contenido es de gran calidad y los invitados comparten información realmente valiosa."</p>
            </motion.div>
          </div>

          <div className="text-center mt-10">
            <button className="btn-secondary inline-flex items-center gap-2">
              <span>Más testimonios</span>
              <FaArrowRight />
            </button>
          </div>
        </div>
      </section>
      
      {/* CTA Final */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl text-white font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            EFIS es un estilo de vida. Únete a nosotros.
          </motion.h2>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <a 
              href="https://youtube.com/@EFISPODCAST" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-primary font-medium px-6 py-3 rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
            >
              <FaYoutube size={20} />
              <span>Ver en YouTube</span>
            </a>
            
            <Link 
              href="/episodes" 
              className="border-2 border-white text-white font-medium px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Explorar episodios
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 