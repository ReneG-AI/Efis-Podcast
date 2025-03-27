"use client";

import { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    
    // Simulación de envío del formulario (en un proyecto real, esto se conectaría a un backend)
    try {
      // Simulación de retraso de red
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulación de éxito
      setSubmitSuccess(true);
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitError("Se produjo un error al enviar el formulario. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Contacto</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Estamos aquí para responder tus preguntas y escuchar tus comentarios. No dudes en ponerte en contacto con nosotros.
        </p>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Formulario de Contacto */}
        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Envíanos un mensaje</h2>
          
          {submitSuccess ? (
            <div className="bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-md p-4 mt-4">
              <p className="text-green-800 dark:text-green-300">
                ¡Gracias por contactarnos! Hemos recibido tu mensaje y te responderemos lo antes posible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nombre
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Asunto
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formState.subject}
                  onChange={handleChange}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="general">Consulta general</option>
                  <option value="collaboration">Propuesta de colaboración</option>
                  <option value="sponsorship">Patrocinio</option>
                  <option value="suggestion">Sugerencia de episodio</option>
                  <option value="other">Otro</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formState.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                ></textarea>
              </div>
              
              {submitError && (
                <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-md p-4">
                  <p className="text-red-800 dark:text-red-300">{submitError}</p>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                {isSubmitting ? "Enviando..." : "Enviar mensaje"}
              </button>
            </form>
          )}
        </div>
        
        {/* Información de Contacto */}
        <div className="flex flex-col gap-8">
          <div className="bg-card rounded-lg border p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Información de contacto</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Ubicación</h3>
                  <p className="text-muted-foreground">Calle Ejemplo 123, Madrid, España</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaPhone className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Teléfono</h3>
                  <p className="text-muted-foreground">+34 91 123 45 67</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaEnvelope className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">info@efispodcast.com</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* FAQ */}
          <div className="bg-card rounded-lg border p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Preguntas frecuentes</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">¿Cómo puedo colaborar con Efis Podcast?</h3>
                <p className="text-muted-foreground">
                  Aceptamos propuestas de colaboración a través de nuestro formulario de contacto. Por favor, selecciona "Propuesta de colaboración" en el campo de asunto.
                </p>
              </div>
              <div>
                <h3 className="font-medium">¿Puedo sugerir un invitado o tema?</h3>
                <p className="text-muted-foreground">
                  ¡Claro! Nos encantaría escuchar tus sugerencias. Utiliza el formulario y selecciona "Sugerencia de episodio" como asunto.
                </p>
              </div>
              <div>
                <h3 className="font-medium">¿Cuánto tardan en responder?</h3>
                <p className="text-muted-foreground">
                  Intentamos responder a todos los mensajes en un plazo de 48-72 horas laborables.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 