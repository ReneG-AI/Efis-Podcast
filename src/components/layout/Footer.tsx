"use client";

import Link from "next/link";
import Logo from './Logo';
import { FaYoutube, FaSpotify, FaItunes, FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card border-t border-border relative overflow-hidden">
      {/* Patrón de ondas sonoras como fondo */}
      <div className="absolute inset-0 sound-waves-pattern opacity-20"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Logo y descripción */}
          <div className="md:col-span-1">
            <Logo size="normal" />
            <p className="mt-4 text-muted-foreground">
              Contenido innovador sobre desarrollo personal y profesional. Entrevistas, debates y reflexiones para potenciar tu crecimiento.
            </p>
          </div>
          
          {/* Enlaces rápidos */}
          <div className="md:col-span-1">
            <h3 className="text-md font-semibold mb-4 text-gradient-brand">ENLACES</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/episodes" className="text-muted-foreground hover:text-primary transition-colors">
                  Episodios
                </Link>
              </li>
              <li>
                <Link href="/youtube" className="text-muted-foreground hover:text-primary transition-colors">
                  YouTube
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Redes sociales */}
          <div className="md:col-span-1">
            <h3 className="text-md font-semibold mb-4 text-gradient-brand">SÍGUENOS</h3>
            <div className="flex flex-wrap gap-4">
              <SocialLink href="https://youtube.com/@EFISPODCAST" icon={<FaYoutube className="w-5 h-5" />} label="YouTube" />
              <SocialLink href="#" icon={<FaSpotify className="w-5 h-5" />} label="Spotify" />
              <SocialLink href="#" icon={<FaItunes className="w-5 h-5" />} label="Apple Podcasts" />
              <SocialLink href="#" icon={<FaTwitter className="w-5 h-5" />} label="Twitter" />
              <SocialLink href="#" icon={<FaInstagram className="w-5 h-5" />} label="Instagram" />
              <SocialLink href="#" icon={<FaTiktok className="w-5 h-5" />} label="TikTok" />
            </div>
          </div>
        </div>
        
        {/* Línea divisoria */}
        <div className="border-t border-border/50 my-8"></div>
        
        {/* Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Efis Podcast. Todos los derechos reservados.
          </p>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacidad
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Términos de uso
            </Link>
            <Link href="/cookies" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 hover:bg-accent/20 text-foreground hover:text-accent transition-all"
      title={label}
      aria-label={label}
    >
      {icon}
    </a>
  );
} 