"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaTelegram, FaDiscord, FaUsers, FaComments, FaLightbulb, FaHandshake, FaQuestion, FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  delay = 0 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className="p-6 bg-card rounded-xl border border-border hover:border-primary/30 transition-all duration-300"
    >
      <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-2xl mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-foreground/80">{description}</p>
    </motion.div>
  );
};

const TestimonialCard = ({
  quote,
  author,
  role,
  delay = 0
}: {
  quote: string;
  author: string;
  role: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className="bg-card p-6 rounded-xl border border-border relative"
    >
      <div className="absolute -top-3 left-6 w-6 h-6 text-primary text-4xl">"</div>
      <p className="text-foreground/80 italic mb-6">{quote}</p>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
          {author.split(' ').map(word => word[0]).join('')}
        </div>
        <div>
          <p className="font-medium">{author}</p>
          <p className="text-sm text-foreground/60">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function CommunityPage() {
  return (
    <main className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-primary py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circles" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="2" fill="white" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circles)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Comunidad Efis Podcast
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/80 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              Únete a miles de personas que, como tú, quieren tomar el control de sus finanzas. <br />
              <span className="font-medium text-white">Aprende, comparte y crece con nosotros.</span>
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
              <a 
                href="https://t.me/efispodcast" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#0088cc] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#0099dd] transition-colors"
              >
                <FaTelegram size={20} />
                Unirse a Telegram
              </a>
              
              <a 
                href="https://discord.gg/efispodcast" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#5865F2] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#6B74F3] transition-colors"
              >
                <FaDiscord size={20} />
                Unirse a Discord
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              ¿Por qué unirte a nuestra comunidad?
            </motion.h2>
            <motion.p
              className="text-foreground/80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            >
              Nuestra comunidad es un espacio seguro donde puedes compartir tus dudas, aprender de otros y conseguir el apoyo que necesitas para mejorar tus finanzas.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FaUsers />}
              title="Conexión con personas afines"
              description="Conoce a personas con intereses similares que están en el mismo camino financiero que tú."
            />
            
            <FeatureCard 
              icon={<FaQuestion />}
              title="Resuelve tus dudas"
              description="Pregunta y obtén respuestas sobre inversiones, ahorro, deudas y cualquier tema financiero."
              delay={0.1}
            />
            
            <FeatureCard 
              icon={<FaLightbulb />}
              title="Comparte ideas"
              description="Aprende de la experiencia de otros y comparte tus propios descubrimientos financieros."
              delay={0.2}
            />
            
            <FeatureCard 
              icon={<FaMoneyBillWave />}
              title="Retos financieros"
              description="Participa en desafíos de ahorro e inversión con otros miembros para alcanzar tus metas."
              delay={0.3}
            />
            
            <FeatureCard 
              icon={<FaCalendarAlt />}
              title="Eventos exclusivos"
              description="Accede a webinars, sesiones de preguntas y respuestas y talleres virtuales solo para miembros."
              delay={0.4}
            />
            
            <FeatureCard 
              icon={<FaHandshake />}
              title="Apoyo mutuo"
              description="Celebra tus logros financieros y recibe motivación cuando enfrentes desafíos."
              delay={0.5}
            />
          </div>
        </div>
      </section>
      
      {/* Community Platforms */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Nuestras plataformas comunitarias
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Telegram */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-white dark:bg-background p-8 rounded-2xl border border-border overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-xl bg-[#0088cc]/10 flex items-center justify-center">
                  <FaTelegram className="text-3xl text-[#0088cc]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Grupo de Telegram</h3>
                  <p className="text-foreground/70">+1,500 miembros</p>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <p>Comunicación directa con el equipo de Efis Podcast</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <p>Notificaciones de nuevos episodios y recursos</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <p>Preguntas rápidas y respuestas de la comunidad</p>
                </li>
              </ul>
              
              <a 
                href="https://t.me/efispodcast" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#0088cc] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#0099dd] transition-colors"
              >
                <FaTelegram size={20} />
                Unirse a Telegram
              </a>
            </motion.div>
            
            {/* Discord */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-white dark:bg-background p-8 rounded-2xl border border-border overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-xl bg-[#5865F2]/10 flex items-center justify-center">
                  <FaDiscord className="text-3xl text-[#5865F2]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Servidor de Discord</h3>
                  <p className="text-foreground/70">+2,000 miembros</p>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <p>Canales temáticos: inversiones, ahorro, deudas, etc.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <p>Eventos en vivo y sesiones de preguntas y respuestas</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <p>Comunidad activa con discusiones diarias sobre finanzas</p>
                </li>
              </ul>
              
              <a 
                href="https://discord.gg/efispodcast" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#5865F2] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#6B74F3] transition-colors"
              >
                <FaDiscord size={20} />
                Unirse a Discord
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Lo que dicen los miembros
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="Gracias a la comunidad de Efis pude encontrar respuestas a mis dudas sobre inversión que no encontraba en ningún otro lado. Ahora sigo un plan claro."
              author="Carlos Méndez"
              role="Miembro desde 2022"
            />
            
            <TestimonialCard 
              quote="El grupo de Telegram ha sido clave para mantenerme motivada. Los retos de ahorro me ayudaron a juntar para el enganche de mi casa en solo 8 meses."
              author="Laura Sánchez"
              role="Miembro desde 2021"
              delay={0.1}
            />
            
            <TestimonialCard 
              quote="Las discusiones diarias en Discord me han enseñado más sobre finanzas que años de educación formal. La comunidad es increíblemente generosa."
              author="Miguel Torres"
              role="Miembro desde 2023"
              delay={0.2}
            />
          </div>
        </div>
      </section>
      
      {/* Community Rules */}
      <section className="py-20 bg-gradient-primary-to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              className="text-3xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Normas de la comunidad
            </motion.h2>
            
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-lg">Respeto mutuo</h3>
                  <p className="text-foreground/80">Trata a todos los miembros con respeto. No se toleran comentarios ofensivos, discriminatorios o agresivos.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-lg">No spam ni promoción</h3>
                  <p className="text-foreground/80">No promociones productos, servicios o enlaces sin aprobación previa de los moderadores.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-lg">Mantén la relevancia</h3>
                  <p className="text-foreground/80">Las conversaciones deben estar relacionadas con finanzas personales, inversiones y temas de Efis Podcast.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-lg">No asesoramiento financiero formal</h3>
                  <p className="text-foreground/80">La información compartida es educativa. Para decisiones importantes, consulta con profesionales certificados.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  5
                </div>
                <div>
                  <h3 className="font-bold text-lg">Ayuda a otros</h3>
                  <p className="text-foreground/80">Si tienes conocimientos, compártelos. La comunidad crece cuando todos contribuimos y aprendemos juntos.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            ¡Te esperamos en la comunidad!
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/80 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            Únete hoy mismo y comienza tu camino hacia una mejor relación con el dinero junto a personas que comparten tus metas.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <a 
              href="https://t.me/efispodcast" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-primary font-medium px-8 py-4 rounded-lg hover:bg-white/90 transition-colors"
            >
              <FaTelegram size={20} />
              Unirse a Telegram
            </a>
            
            <a 
              href="https://discord.gg/efispodcast" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border-2 border-white bg-transparent text-white font-medium px-8 py-4 rounded-lg hover:bg-white/10 transition-colors"
            >
              <FaDiscord size={20} />
              Unirse a Discord
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 