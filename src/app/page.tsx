import Image from "next/image";
import Link from "next/link";
import { FaSpotify, FaApple, FaGoogle, FaYoutube } from "react-icons/fa";
import RecentEpisodes from "@/components/episodes/RecentEpisodes";

const platforms = [
  { name: "Spotify", icon: FaSpotify, href: "#" },
  { name: "Apple Podcasts", icon: FaApple, href: "#" },
  { name: "Google Podcasts", icon: FaGoogle, href: "#" },
  { name: "YouTube", icon: FaYoutube, href: "#" },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-8">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="container flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Efis Podcast
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Conversaciones que inspiran, historias que transforman. Tu podcast de crecimiento personal y profesional.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/episodes"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Escuchar ahora
            </Link>
            <Link
              href="/about"
              className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Conócenos
            </Link>
            <Link
              href="/youtube"
              className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <FaYoutube className="mr-2 h-4 w-4" />
              Ver en YouTube
            </Link>
          </div>
          
          <div className="mt-10">
            <div className="text-center text-sm text-muted-foreground">
              Disponible en
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-8">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                return (
                  <a
                    key={platform.name}
                    href={platform.href}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{platform.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      
      {/* Recent Episodes Section */}
      <section className="container py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Episodios recientes</h2>
          <Link
            href="/episodes"
            className="text-sm font-medium text-primary hover:underline"
          >
            Ver todos los episodios
          </Link>
        </div>
        
        <RecentEpisodes />
      </section>
      
      {/* Newsletter Section */}
      <section className="bg-muted py-16">
        <div className="container">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight">Únete a nuestra comunidad</h2>
            <p className="mt-4 max-w-[600px] text-muted-foreground">
              Suscríbete para recibir notificaciones sobre nuevos episodios, invitados especiales y contenido exclusivo.
            </p>
            
            <form className="mt-6 flex w-full max-w-md flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="h-11 rounded-md border bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-grow"
                required
              />
              <button
                type="submit"
                className="h-11 rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
} 