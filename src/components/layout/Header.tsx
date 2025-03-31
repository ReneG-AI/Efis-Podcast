"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHeadphones, 
  FaHome, 
  FaInfoCircle, 
  FaYoutube,
  FaEnvelope
} from 'react-icons/fa';

import Logo from '@/components/brand/Logo';
import MenuIcon from '@/components/ui/MenuIcon';

// Navigation links
const links = [
  { name: "Inicio", href: "/", icon: <FaHome className="mr-2" /> },
  { name: "Episodios", href: "/episodes", icon: <FaHeadphones className="mr-2" /> },
  { name: "YouTube", href: "/youtube", icon: <FaYoutube className="mr-2" /> },
  { name: "Sobre nosotros", href: "/about", icon: <FaInfoCircle className="mr-2" /> },
  { name: "Contacto", href: "/contact", icon: <FaEnvelope className="mr-2" /> },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeLink, setActiveLink] = useState('/');

  // Handle scroll to change header appearance
  useEffect(() => {
    setMounted(true);
    
    // Set initial active link based on pathname
    if (typeof window !== 'undefined') {
      setActiveLink(window.location.pathname);
    }
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't render anything initially (prevents hydration errors)
  if (!mounted) return null;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'py-3 glass-effect border-b border-white/5' 
        : 'py-4 bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo animated={false} size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {links.map((link) => {
              const isActive = activeLink === link.href;
              
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`relative px-4 py-2 rounded-full transition-all duration-300 focus-ring ${
                    isActive 
                      ? 'text-white bg-primary font-medium' 
                      : 'text-foreground/80 hover:text-foreground hover:bg-white/5'
                  }`}
                  onClick={() => setActiveLink(link.href)}
                >
                  <span className="relative z-10 flex items-center text-sm">
                    {link.icon}
                    <span>{link.name}</span>
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <MenuIcon isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute top-full left-0 right-0 glass-effect md:hidden border-b border-white/5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto p-4">
              <nav className="flex flex-col space-y-2">
                {links.map((link) => {
                  const isActive = activeLink === link.href;
                  
                  return (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      className={`flex items-center px-4 py-3 rounded-full transition-all duration-300 ${
                        isActive 
                          ? 'bg-primary text-white font-medium' 
                          : 'hover:bg-white/5 text-foreground/80 hover:text-foreground'
                      }`}
                      onClick={() => {
                        setActiveLink(link.href);
                        setIsOpen(false);
                      }}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 