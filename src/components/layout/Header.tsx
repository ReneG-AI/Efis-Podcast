"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaYoutube, FaHeadphones, FaHome, FaInfoCircle } from 'react-icons/fa';

import Logo from '@/components/brand/Logo';
import ThemeToggle from '@/components/ui/ThemeToggle';
import MenuIcon from '@/components/ui/MenuIcon';

// Enlaces de navegación
const links = [
  { name: "Inicio", href: "/", icon: <FaHome className="mr-2" /> },
  { name: "Episodios", href: "/episodes", icon: <FaHeadphones className="mr-2" /> },
  { name: "YouTube", href: "/youtube", icon: <FaYoutube className="mr-2" /> },
  { name: "Sobre nosotros", href: "/about", icon: <FaInfoCircle className="mr-2" /> },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Manejar el scroll para cambiar la apariencia del header
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // No renderizar nada inicialmente (evita errores de hidratación)
  if (!mounted) return null;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'py-2 glass-effect' 
        : 'py-4 bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo animated={false} size="md" />

          {/* Navegación para Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="relative px-4 py-2 rounded-lg text-foreground/70 hover:text-foreground transition-colors group hover-glow"
              >
                <span>{link.name}</span>
                <motion.span 
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-brand rounded-full"
                  initial={{ width: 0, x: "50%" }}
                  whileHover={{ width: "70%", x: "15%" }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </Link>
            ))}
            
            {/* Toggle de Tema */}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </nav>

          {/* Botón Menú Mobile */}
          <div className="flex items-center md:hidden">
            <ThemeToggle className="mr-2" />
            <MenuIcon isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />
          </div>
        </div>
      </div>

      {/* Menú Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute top-full left-0 right-0 glass-effect md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto p-4">
              <nav className="flex flex-col space-y-3">
                {links.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className="flex items-center px-4 py-3 rounded-lg hover:bg-primary/5 transition-colors hover-glow"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 