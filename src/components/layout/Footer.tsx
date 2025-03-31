"use client";

import Link from "next/link";
import { FaSpotify, FaYoutube, FaPodcast, FaItunes, FaTiktok, FaInstagram, FaTwitter, FaMoneyBillWave } from "react-icons/fa";
import Logo from "@/components/brand/Logo";

const socialLinks = [
  {
    name: "Spotify",
    href: "https://open.spotify.com/show/example",
    icon: <FaSpotify size={18} />,
    color: "hover:text-[#1ED760]"
  },
  {
    name: "Apple Podcasts",
    href: "https://podcasts.apple.com/podcast/example",
    icon: <FaItunes size={18} />,
    color: "hover:text-[#8e44ad]"
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@example",
    icon: <FaYoutube size={18} />,
    color: "hover:text-[#FF0000]"
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@example",
    icon: <FaTiktok size={16} />,
    color: "hover:text-foreground"
  },
  {
    name: "Instagram",
    href: "https://instagram.com/example",
    icon: <FaInstagram size={18} />,
    color: "hover:text-[#E1306C]"
  },
  {
    name: "Twitter",
    href: "https://twitter.com/example",
    icon: <FaTwitter size={18} />,
    color: "hover:text-[#1DA1F2]"
  }
];

// Links rápidos para el footer
const quickLinks = [
  { label: "Episodios", href: "/episodes" },
  { label: "Comunidad", href: "/community" },
  { label: "Recursos", href: "/resources" },
  { label: "Sobre nosotros", href: "/about" }
];

// Links a recursos financieros
const resourceLinks = [
  { label: "Guías de inversión", href: "/resources/investment-guides" },
  { label: "Plantillas de presupuesto", href: "/resources/budget-templates" },
  { label: "Mini cursos financieros", href: "/resources/mini-courses" },
  { label: "Calculadoras financieras", href: "/resources/calculators" }
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
    <span className="text-sm">{name}</span>
  </a>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative glass-effect">
      {/* Patrón de ondas de sonido en el fondo */}
      <div className="absolute inset-0 pointer-events-none opacity-3">
        <svg viewBox="0 0 1200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,100 C150,180 350,0 500,100 C650,180 850,0 1000,100 C1150,180 1350,0 1500,100 V200 H0 Z" className="fill-primary/5"></path>
          <path d="M0,100 C150,20 350,180 500,100 C650,20 850,180 1000,100 C1150,20 1350,180 1500,100 V200 H0 Z" className="fill-primary/5"></path>
          <path d="M0,100 C150,140 350,60 500,100 C650,140 850,60 1000,100 C1150,140 1350,60 1500,100 V200 H0 Z" className="fill-primary/5"></path>
        </svg>
      </div>

      <div className="container mx-auto py-12 px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="flex flex-col space-y-3">
            <Logo size="md" />
            <p className="text-muted-foreground text-sm mt-2 max-w-xs">
              <span className="font-bold text-primary">Tu dinero, tus reglas.</span> EFIS Podcast te enseña a manejar tus finanzas de forma fácil y sin estrés.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <FaMoneyBillWave className="text-primary" />
              <span className="text-sm font-medium">Educación financiera accesible</span>
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Enlaces rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-foreground/60 hover:text-foreground hover:translate-x-1 transition-all duration-300 text-sm inline-block hover-glow"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos financieros */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Recursos financieros</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-foreground/60 hover:text-foreground hover:translate-x-1 transition-all duration-300 text-sm inline-block hover-glow"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes sociales */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Síguenos</h3>
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
        <div className="border-t border-border/20 mt-10 pt-10">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-bold text-foreground mb-2">¿Quieres recibir tips financieros?</h3>
            <p className="text-muted-foreground text-sm mb-4">Suscríbete a nuestro newsletter y recibe consejos financieros directamente en tu bandeja de entrada.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="flex-1 px-4 py-2 rounded-lg bg-card border border-border focus:border-primary outline-none"
              />
              <button 
                type="submit"
                className="bg-primary text-white font-medium px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        {/* Copyright y línea final */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-border/20 mt-10 pt-6 text-sm text-muted-foreground">
          <p>© {currentYear} EFIS Podcast. Todos los derechos reservados.</p>
          <p className="mt-2 sm:mt-0">
            Diseñado con <span className="text-primary">♥</span> por EFIS Team
          </p>
        </div>
      </div>
    </footer>
  );
} 