"use client";

import Link from "next/link";
import { FaSpotify, FaYoutube, FaPodcast, FaItunes, FaTiktok, FaInstagram, FaTwitter } from "react-icons/fa";
import Logo from "@/components/brand/Logo";

const socialLinks = [
  {
    name: "Spotify",
    href: "https://open.spotify.com/show/example",
    icon: <FaSpotify size={16} />,
    color: "hover:text-[#1ED760]"
  },
  {
    name: "Apple Podcasts",
    href: "https://podcasts.apple.com/podcast/example",
    icon: <FaItunes size={16} />,
    color: "hover:text-[#8e44ad]"
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@EFISPODCAST",
    icon: <FaYoutube size={16} />,
    color: "hover:text-[#FF0000]"
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@example",
    icon: <FaTiktok size={14} />,
    color: "hover:text-white"
  },
  {
    name: "Instagram",
    href: "https://instagram.com/@example",
    icon: <FaInstagram size={16} />,
    color: "hover:text-[#E1306C]"
  },
  {
    name: "Twitter",
    href: "https://twitter.com/example",
    icon: <FaTwitter size={16} />,
    color: "hover:text-[#1DA1F2]"
  }
];

// Links rápidos para el footer
const quickLinks = [
  { label: "Inicio", href: "/" },
  { label: "Episodios", href: "/episodes" },
  { label: "YouTube", href: "/youtube" },
  { label: "Sobre nosotros", href: "/about" },
  { label: "Contacto", href: "/contact" }
];

// Enlaces próximamente
const comingSoonLinks = [
  { label: "Comunidad (Próximamente)", href: "#" },
  { label: "Recursos financieros (Próximamente)", href: "#" }
];

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  name: string;
  color: string;
}

const SocialLink = ({ href, icon, name, color }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center gap-2 text-foreground/60 transition-all duration-300 ${color} hover:translate-x-1`}
    aria-label={name}
  >
    <span className="text-lg">{icon}</span>
    <span className="text-sm font-light">{name}</span>
  </a>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative glass-effect border-t border-white/5">
      {/* Patrón de ondas de sonido en el fondo */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path 
            fill="url(#footer-gradient)" 
            fillOpacity="1" 
            d="M0,192L48,202.7C96,213,192,235,288,224C384,213,480,171,576,165.3C672,160,768,192,864,197.3C960,203,1056,181,1152,176C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
          </path>
          <defs>
            <linearGradient id="footer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="50%" stopColor="hsl(var(--secondary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto py-16 px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo y descripción */}
          <div className="flex flex-col space-y-4">
            <Logo size="md" />
            <p className="text-muted-foreground text-sm mt-2 max-w-xs font-light leading-relaxed">
              EFIS Podcast tiene el objetivo de hacer la vida más fácil a las personas a través de nuestro contenido. Entendemos que cada persona tiene una historia detrás.
            </p>
          </div>

          {/* Links rápidos */}
          <div className="space-y-8">
            <div>
              <h3 className="font-medium text-foreground mb-5 text-sm tracking-wider uppercase">Enlaces</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-foreground/60 hover:text-gradient-brand transition-all duration-300 text-sm font-light inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-5 text-sm tracking-wider uppercase">Próximamente</h3>
              <ul className="space-y-3">
                {comingSoonLinks.map((link, idx) => (
                  <li key={idx}>
                    <span className="text-foreground/40 text-sm font-light inline-block">
                      {link.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Redes sociales */}
          <div>
            <h3 className="font-medium text-foreground mb-5 text-sm tracking-wider uppercase">Síguenos</h3>
            <div className="flex flex-col space-y-3">
              {socialLinks.map((link) => (
                <SocialLink
                  key={link.name}
                  href={link.href}
                  icon={link.icon}
                  name={link.name}
                  color={link.color}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/5 mt-14 pt-14">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-medium text-gradient-brand inline-block mb-3 text-lg">Suscríbete a nuestro newsletter</h3>
            <p className="text-muted-foreground text-sm mb-6 font-light">Recibe notificaciones de nuevos episodios y contenido exclusivo.</p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="flex-1 px-4 py-3 rounded-full bg-white/5 border border-white/10 focus:border-primary focus:outline-none text-sm"
              />
              <button 
                type="submit"
                className="btn-gradient-brand text-white font-medium px-6 py-3 rounded-full transition-colors text-sm"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        {/* Copyright y línea final */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-white/5 mt-14 pt-8 text-xs text-muted-foreground font-light">
          <p>© {currentYear} EFIS Podcast. Todos los derechos reservados.</p>
          <p className="mt-2 sm:mt-0">
            Diseñado con <span className="text-gradient-brand inline-block">♥</span> por EFIS Team
          </p>
        </div>
      </div>
    </footer>
  );
} 