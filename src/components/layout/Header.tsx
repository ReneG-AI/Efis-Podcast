"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Menu, X } from "lucide-react";
import { FaYoutube } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/episodes", label: "Episodios" },
  { href: "/youtube", label: "YouTube" },
  { href: "/about", label: "Sobre Nosotros" },
  { href: "/contact", label: "Contacto" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">Efis Podcast</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              } ${link.href === "/youtube" ? "flex items-center gap-1" : ""}`}
            >
              {link.href === "/youtube" && <FaYoutube className="h-4 w-4" />}
              {link.label}
            </Link>
          ))}
          <ModeToggle />
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
        <div className="md:hidden">
          <div className="container py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                } ${link.href === "/youtube" ? "flex items-center gap-1" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.href === "/youtube" && <FaYoutube className="h-4 w-4" />}
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <ModeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 