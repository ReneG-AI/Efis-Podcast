"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Menu, X } from "lucide-react";
import { FaYoutube, FaHeadphones } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/episodes", label: "Episodios" },
  { href: "/youtube", label: "YouTube", icon: <FaYoutube className="h-4 w-4 text-red-600" /> },
  { href: "/about", label: "Sobre Nosotros" },
  { href: "/contact", label: "Contacto" },
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
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
              <FaHeadphones className="h-4 w-4 text-primary" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Efis Podcast</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium transition-colors hover:text-primary group ${
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              } flex items-center gap-1`}
            >
              {link.icon && link.icon}
              {link.label}
              {pathname === link.href && (
                <span className="absolute -bottom-[21px] left-0 w-full h-[2px] bg-primary"></span>
              )}
              <span className="absolute -bottom-[21px] left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          <div className="pl-2 border-l border-border/40">
            <ModeToggle />
          </div>
        </nav>
        
        {/* Mobile Menu Toggle */}
        <button
          className="flex md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-background/95 backdrop-blur border-b border-border/40 shadow-md">
          <div className="container py-6 flex flex-col space-y-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon && link.icon}
                <span>{link.label}</span>
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
    </header>
  );
} 