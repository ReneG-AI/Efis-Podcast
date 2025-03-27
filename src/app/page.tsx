import Image from "next/image";
import Link from "next/link";
import { FaSpotify, FaApple, FaGoogle, FaYoutube, FaExternalLinkAlt } from "react-icons/fa";
import RecentEpisodes from "@/components/episodes/RecentEpisodes";
import { platforms } from "@/platforms";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-8">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Fondo con degradado */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background"></div>
        
        {/* Círculos decorativos */}
        <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-10 left-[5%] w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>
        
        <div className="container relative z-10 flex flex-col items-center text-center">
          <div className="inline-block relative">
            <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/20 to-primary/40 blur-xl opacity-70"></span>
            <h1 className="relative text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Efis Podcast
            </h1>
          </div>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Conversaciones que inspiran, historias que transforman. Tu podcast de crecimiento personal y profesional.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/episodes"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-md hover:shadow-lg"
            >
              Escuchar ahora
            </Link>
            <Link
              href="/about"
              className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background/80 backdrop-blur-sm px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-sm hover:shadow-md"
            >
              Conócenos
            </Link>
            <a
              href="/youtube-direct"
              className="inline-flex h-11 items-center justify-center rounded-md bg-red-600 px-8 text-sm font-medium text-white hover:bg-red-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-md hover:shadow-lg"
            >
              <FaYoutube className="mr-2 h-5 w-5" />
              Ver Canal YouTube
            </a>
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
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className={`h-5 w-5 ${platform.name === 'Spotify' ? 'text-green-500' : 
                                              platform.name === 'Apple Podcasts' ? 'text-purple-500' : 
                                              platform.name === 'Google Podcasts' ? 'text-blue-500' : 
                                              'text-red-600'}`} />
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
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-background"></div>
        
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-background/80 backdrop-blur-sm shadow-xl">
            <div className="flex flex-col md:flex-row">
              <div className="bg-primary/10 p-6 md:p-10 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-4 md:w-1/2">
                <h2 className="text-3xl font-bold tracking-tight">Únete a nuestra comunidad</h2>
                <p className="text-muted-foreground max-w-md">
                  Suscríbete para recibir notificaciones sobre nuevos episodios, invitados especiales y contenido exclusivo.
                </p>
                <div className="hidden md:flex mt-6 space-x-4">
                  {platforms.map((platform) => {
                    const Icon = platform.icon;
                    return (
                      <a
                        key={platform.name}
                        href={platform.href}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-background/50 text-primary hover:bg-primary hover:text-background transition-all duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={platform.name}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
              
              <div className="p-6 md:p-10 md:w-1/2">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Nombre</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Tu nombre"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Correo electrónico</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Tu correo electrónico"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full h-10 rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm"
                  >
                    Suscribirse
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 