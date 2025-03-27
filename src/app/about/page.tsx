import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

// Datos del equipo (esto sería reemplazado con datos reales)
const teamMembers = [
  {
    id: "1",
    name: "Carlos Rodríguez",
    role: "Host Principal",
    bio: "Carlos es un apasionado del crecimiento personal con más de 10 años de experiencia en comunicación y desarrollo profesional.",
    image: "/images/team-1.jpg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
    },
  },
  {
    id: "2",
    name: "Laura Martínez",
    role: "Co-Host",
    bio: "Laura es coach ejecutiva certificada y especialista en liderazgo, trayendo una perspectiva única a nuestras conversaciones.",
    image: "/images/team-2.jpg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
    },
  },
  {
    id: "3",
    name: "Miguel Ángel López",
    role: "Productor",
    bio: "Miguel es el genio detrás de la producción, asegurando que cada episodio suene profesional y atractivo para nuestros oyentes.",
    image: "/images/team-3.jpg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
    },
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16 py-12">
      {/* Hero Section */}
      <section className="container">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Sobre Efis Podcast
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Efis Podcast nació con la misión de compartir conversaciones significativas sobre crecimiento personal y profesional. Nuestro objetivo es inspirar a nuestros oyentes a alcanzar su máximo potencial a través de entrevistas con expertos y discusiones sobre temas que realmente importan.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Desde 2023, hemos construido una comunidad de personas comprometidas con su desarrollo, que buscan constantemente aprender y crecer en todas las áreas de su vida.
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
            <div className="absolute inset-0 bg-neutral-300 animate-pulse"></div>
            {/* <Image
              src="/images/about-hero.jpg"
              alt="Estudio de Efis Podcast"
              fill
              className="object-cover"
            /> */}
          </div>
        </div>
      </section>
      
      {/* Nuestra Historia */}
      <section className="bg-muted py-16">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight">Nuestra Historia</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div className="flex flex-col gap-2">
              <div className="text-3xl font-bold text-primary">2023</div>
              <h3 className="text-xl font-semibold">Los inicios</h3>
              <p className="text-muted-foreground">
                Comenzamos Efis Podcast en un pequeño estudio improvisado, con un micrófono y muchas ideas. Nuestros primeros episodios fueron escuchados por amigos y familiares.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-3xl font-bold text-primary">2024</div>
              <h3 className="text-xl font-semibold">Crecimiento</h3>
              <p className="text-muted-foreground">
                Ampliamos nuestro alcance y comenzamos a entrevistar a expertos reconocidos en diferentes campos. Nuestra audiencia creció considerablemente y nos expandimos a más plataformas.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-3xl font-bold text-primary">2025</div>
              <h3 className="text-xl font-semibold">El presente</h3>
              <p className="text-muted-foreground">
                Actualmente, Efis Podcast es escuchado por miles de personas cada semana. Hemos mejorado nuestra producción y colaboramos con organizaciones afines a nuestra misión.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Nuestro Equipo */}
      <section className="container py-12">
        <h2 className="text-3xl font-bold tracking-tight">Nuestro Equipo</h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
          Somos un equipo apasionado por crear contenido que inspire y transforme. Cada uno de nosotros aporta una perspectiva única a lo que hacemos.
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground">
              <div className="relative h-60 w-full overflow-hidden">
                <div className="absolute inset-0 bg-neutral-300 animate-pulse"></div>
                {/* <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                /> */}
              </div>
              <div className="flex flex-col p-4">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                <div className="mt-4 flex gap-4">
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <FaLinkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <FaTwitter className="h-5 w-5" />
                  </a>
                  <a
                    href={member.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <FaInstagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight">Únete a nosotros en este viaje</h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg">
            Escucha nuestros episodios, comparte tus pensamientos y crece con nuestra comunidad. Juntos podemos construir una vida más plena y significativa.
          </p>
          <div className="mt-8">
            <Link
              href="/episodes"
              className="inline-flex h-11 items-center justify-center rounded-md bg-background text-primary px-8 text-sm font-medium transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Explora los episodios
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 