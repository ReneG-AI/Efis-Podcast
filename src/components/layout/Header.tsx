"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHeadphones, 
  FaHome, 
  FaInfoCircle, 
  FaMicrophone,
  FaYoutube,
  FaEnvelope
} from 'react-icons/fa';

import Logo from '@/components/brand/Logo';
import ThemeToggle from '@/components/ui/ThemeToggle';
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
        ? 'py-2 glass' 
        : 'py-4 bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo with animated audio bar */}
          <Link href="/" className="flex items-center gap-2 group">
            <Logo animated={false} size="md" />
            <div className="hidden sm:flex items-end h-6 gap-[2px]">
              <motion.div 
                className="audio-bar h-3"
                initial={{ scaleY: 0.3 }}
                animate={{ scaleY: [0.3, 1, 0.3] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="audio-bar h-4"
                initial={{ scaleY: 0.3 }}
                animate={{ scaleY: [0.3, 1, 0.3] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                  delay: 0.2
                }}
              />
              <motion.div 
                className="audio-bar h-6"
                initial={{ scaleY: 0.3 }}
                animate={{ scaleY: [0.3, 1, 0.3] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                  delay: 0.4
                }}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {links.map((link) => {
              const isActive = activeLink === link.href;
              
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`relative px-4 py-2 rounded-full transition-all duration-300 focus-ring ${
                    isActive 
                      ? 'text-white bg-gradient-primary' 
                      : 'text-foreground/70 hover:text-foreground hover:bg-primary/5'
                  }`}
                  onClick={() => setActiveLink(link.href)}
                >
                  <span className="relative z-10 flex items-center">
                    {link.icon}
                    <span>{link.name}</span>
                  </span>
                  
                  {!isActive && (
                    <motion.span 
                      className="absolute bottom-0 left-0 right-0 h-full bg-gradient-primary rounded-full opacity-0"
                      initial={false}
                      whileHover={{ opacity: 0.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              );
            })}
            
            {/* Theme Toggle */}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <ThemeToggle className="mr-2" />
            <MenuIcon isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute top-full left-0 right-0 glass md:hidden border-t border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto p-4">
              <nav className="flex flex-col space-y-3">
                {links.map((link) => {
                  const isActive = activeLink === link.href;
                  
                  return (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-primary text-white font-medium' 
                          : 'hover:bg-primary/5 text-foreground/70 hover:text-foreground'
                      }`}
                      onClick={() => {
                        setActiveLink(link.href);
                        setIsOpen(false);
                      }}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                      
                      {isActive && (
                        <motion.div 
                          className="ml-auto flex h-5 items-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {link.href === "/" ? <FaHome className="text-white/70" /> : <FaMicrophone className="text-white/70" />}
                        </motion.div>
                      )}
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