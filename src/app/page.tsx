import Link from 'next/link';
import Image from 'next/image';
import { FaYoutube, FaHeadphones, FaSpotify, FaItunes, FaArrowRight } from 'react-icons/fa';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Sección Hero */}
      <section className="relative w-full py-20 lg:py-32 overflow-hidden">
        {/* Patrón de ondas sonoras en el fondo */}
        <div className="absolute inset-0 sound-waves-pattern"></div>
        
        {/* Resplandor de gradiente en el fondo */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-primary/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-secondary/20 blur-[100px] rounded-full"></div>
        
        <div className="container relative mx-auto px-4 z-10">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-gradient-brand mb-6">
              EFIS PODCAST
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mb-8">
              Un espacio de conversación, reflexión y aprendizaje sobre desarrollo personal y profesional. Entrevistas, debates y contenido para potenciar tu crecimiento.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/episodes"
                className="bg-gradient-brand hover:opacity-90 transition-opacity px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <FaHeadphones className="h-5 w-5" />
                <span>Escuchar episodios</span>
              </Link>
              
              <Link
                href="/youtube"
                className="bg-background border border-primary/30 hover:border-primary/60 transition-colors px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <FaYoutube className="h-5 w-5 text-red-500" />
                <span>Ver en YouTube</span>
              </Link>
            </div>
            
            {/* Disponible en */}
            <div className="w-full">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Disponible en</p>
              <div className="flex flex-wrap justify-center gap-6">
                <PlatformLogo name="Spotify" icon={<FaSpotify className="text-[#1DB954]" />} />
                <PlatformLogo name="Apple Podcasts" icon={<FaItunes className="text-[#872EC4]" />} />
                <PlatformLogo name="YouTube" icon={<FaYoutube className="text-[#FF0000]" />} />
                {/* Más plataformas aquí */}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sección de Episodios Destacados */}
      <section className="w-full py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">EPISODIOS DESTACADOS</h2>
            <Link href="/episodes" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
              <span>Ver todos</span>
              <FaArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Episode Card 1 */}
            <FeaturedEpisodeCard
              title="Crecimiento personal en la era digital"
              description="Conversamos sobre las estrategias más efectivas para el desarrollo personal en un mundo hiperconectado."
              duration="45:30"
              date="15 Mar 2023"
              image="/images/placeholder-episode.jpg"
              href="/episodes/1"
            />
            
            {/* Episode Card 2 */}
            <FeaturedEpisodeCard
              title="La productividad y el bienestar"
              description="¿Cómo equilibrar la productividad con el bienestar personal? Exploramos técnicas y enfoques."
              duration="38:15"
              date="22 Feb 2023"
              image="/images/placeholder-episode.jpg"
              href="/episodes/2"
            />
            
            {/* Episode Card 3 */}
            <FeaturedEpisodeCard
              title="Inteligencia emocional en el trabajo"
              description="Analizamos la importancia de la inteligencia emocional en entornos laborales modernos."
              duration="42:50"
              date="8 Feb 2023"
              image="/images/placeholder-episode.jpg"
              href="/episodes/3"
            />
          </div>
        </div>
      </section>
      
      {/* Sección Testimonios/Stats */}
      <section className="w-full py-16 relative">
        {/* Resplandor de gradiente en el fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 bg-primary/10 blur-[120px] rounded-full"></div>
        
        <div className="container relative mx-auto px-4 z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <StatCard number="50+" label="Episodios" />
            <StatCard number="10K+" label="Oyentes mensuales" />
            <StatCard number="4.8" label="Calificación promedio" />
          </div>
        </div>
      </section>
      
      {/* Sección Suscríbete */}
      <section className="w-full py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-background to-background/80 border border-border/50 rounded-xl p-8 relative overflow-hidden">
            {/* Patrón de ondas sonoras */}
            <div className="absolute inset-0 sound-waves-pattern opacity-30"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold mb-4">ÚNETE A NUESTRA COMUNIDAD</h2>
              
              <p className="text-foreground/80 max-w-2xl mb-8">
                Recibe notificaciones sobre nuevos episodios, contenido exclusivo y más directamente en tu correo.
              </p>
              
              <form className="w-full max-w-md flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="flex-1 px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:border-primary"
                  required
                />
                <button
                  type="submit"
                  className="bg-gradient-brand hover:opacity-90 transition-opacity px-6 py-3 rounded-lg font-medium"
                >
                  Suscribirse
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
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

// Componente para tarjetas de episodios destacados
function FeaturedEpisodeCard({
  title,
  description,
  duration,
  date,
  image,
  href
}: {
  title: string;
  description: string;
  duration: string;
  date: string;
  image: string;
  href: string;
}) {
  return (
    <Link href={href} className="group">
      <div className="bg-background border border-border/50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="relative aspect-video">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent h-1/2"></div>
          <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm text-xs px-2 py-1 rounded-full">
            {duration}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-2 mb-3">
            {description}
          </p>
          <div className="text-xs text-foreground/70">
            {date}
          </div>
        </div>
      </div>
    </Link>
  );
}

// Componente para estadísticas
function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-5xl font-extrabold text-gradient-brand mb-2">{number}</span>
      <span className="text-sm uppercase tracking-wider text-muted-foreground">{label}</span>
    </div>
  );
} 