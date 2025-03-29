"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Menu, X } from "lucide-react";
import { FaYoutube, FaHeadphones } from "react-icons/fa";
import Logo from './Logo';

const links = [
  { name: 'Inicio', href: '/' },
  { name: 'Episodios', href: '/episodes' },
  { name: 'YouTube', href: '/youtube' },
  { name: 'Sobre Nosotros', href: '/about' },
  { name: 'Contacto', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
      scrolled 
        ? "border-border/40 bg-background/95 backdrop-blur shadow-sm" 
        : "border-transparent bg-background/50 backdrop-blur-sm"
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo size="normal" />
          </div>
          
          {/* Navegación principal */}
          <nav className="hidden md:flex items-center space-x-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    px-4 py-2 text-sm font-medium uppercase tracking-wide transition-colors rounded-md
                    ${
                      isActive
                        ? 'bg-primary/10 text-primary relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-gradient-brand'
                        : 'hover:bg-accent/10 hover:text-accent'
                    }
                  `}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          
          {/* Elementos de la derecha */}
          <div className="flex items-center space-x-4">
            {/* Botón para modo oscuro/claro */}
            <ModeToggle />
            
            {/* Botón de menú móvil */}
            <button
              className="md:hidden p-2 rounded-md bg-accent/10 hover:bg-accent/20 transition-colors"
              aria-label="Menú"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
        
        {/* Menú móvil - se mostraría cuando esté activo */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute w-full bg-background/95 backdrop-blur border-b border-border/40 shadow-md">
            <div className="container py-6 flex flex-col space-y-5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.href ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{link.name}</span>
                  {pathname === link.href && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"></span>
                  )}
                </Link>
              ))}
              <div className="pt-2 border-t border-border/20 flex justify-between items-center">
                <span className="text-xs text-muted-foreground">© Efis Podcast {new Date().getFullYear()}</span>
                <ModeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// Componente para el icono de menú
function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-foreground"
    >
      <line x1="4" y1="8" x2="20" y2="8" />
      <line x1="4" y1="16" x2="20" y2="16" />
    </svg>
  );
} 