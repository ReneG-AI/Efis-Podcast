"use client";

import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Aquí iría la lógica de suscripción
    // Por ahora simulamos una respuesta exitosa
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <div className="newsletter-container">
      <div className="newsletter-content">
        <h2 className="newsletter-title">
          Suscríbete a nuestro newsletter
        </h2>
        <p className="newsletter-description">
          Recibe notificaciones de nuevos episodios y contenido exclusivo.
        </p>
        
        <form onSubmit={handleSubmit} className="newsletter-form">
          <div className="newsletter-form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo electrónico"
              required
              className="newsletter-input"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="newsletter-button"
            >
              {status === 'loading' ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Enviando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Suscribirse
                  <FaPaperPlane className="text-sm" />
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 