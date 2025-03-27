"use client";

import Link from "next/link";
import { FaYoutube, FaSpotify, FaInstagram, FaTwitter } from "react-icons/fa";

const socialLinks = [
  { href: "https://youtube.com", icon: FaYoutube, label: "YouTube" },
  { href: "https://spotify.com", icon: FaSpotify, label: "Spotify" },
  { href: "https://instagram.com", icon: FaInstagram, label: "Instagram" },
  { href: "https://twitter.com", icon: FaTwitter, label: "Twitter" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">Efis Podcast</span>
        </div>
        
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
                aria-label={link.label}
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
        </div>
        
        <div className="text-sm text-muted-foreground">
          &copy; {currentYear} Efis Podcast. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
} 