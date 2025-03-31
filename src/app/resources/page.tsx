"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaFileAlt, 
  FaDownload, 
  FaCalculator, 
  FaChartLine, 
  FaBookReader, 
  FaWallet, 
  FaCreditCard,
  FaMoneyBillWave, 
  FaPiggyBank
} from 'react-icons/fa';

const ResourceCard = ({ 
  icon, 
  title, 
  description, 
  href, 
  delay = 0,
  tag
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  href: string; 
  delay?: number;
  tag?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className="border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 bg-card group"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-2xl mb-4 group-hover:bg-primary/20 transition-all duration-300">
            {icon}
          </div>
          {tag && (
            <span className="inline-block px-3 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">
              {tag}
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-foreground/80 mb-4">{description}</p>
        <Link 
          href={href} 
          className="text-primary font-medium inline-flex items-center transition-all duration-300 group-hover:translate-x-1"
        >
          Acceder <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default function ResourcesPage() {
  return (
    <main className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-primary py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
            <path fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="6,6" strokeOpacity="0.3" d="M0,100 L100,0"></path>
            <path fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="6,6" strokeOpacity="0.3" d="M100,100 L0,0"></path>
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
              Recursos Financieros
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/80 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              Herramientas gratuitas para ayudarte a tomar el control de tus finanzas. <br />
              <span className="text-white font-medium">Tu dinero, tus reglas.</span>
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Guides Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Guías de Inversión
            </motion.h2>
            <motion.p
              className="text-foreground/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            >
              Aprende los fundamentos de la inversión con nuestras guías detalladas, diseñadas para todos los niveles de experiencia.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ResourceCard 
              icon={<FaChartLine />}
              title="Inversión para principiantes"
              description="Todo lo que necesitas saber para dar tus primeros pasos en el mundo de la inversión de forma segura."
              href="/resources/investment-guides/beginners"
              tag="Gratuito"
            />
            
            <ResourceCard 
              icon={<FaMoneyBillWave />}
              title="Diversificación de cartera"
              description="Aprende a distribuir tus inversiones para maximizar rendimientos y minimizar riesgos."
              href="/resources/investment-guides/diversification"
              delay={0.1}
              tag="Gratuito"
            />
            
            <ResourceCard 
              icon={<FaPiggyBank />}
              title="Inversión a largo plazo"
              description="Estrategias para construir riqueza gradualmente con un enfoque en inversiones sostenibles."
              href="/resources/investment-guides/long-term"
              delay={0.2}
              tag="Gratuito"
            />
          </div>
        </div>
      </section>
      
      {/* Budget Templates Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="mb-16 max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Plantillas de Presupuesto
            </motion.h2>
            <motion.p
              className="text-foreground/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            >
              Controla tus ingresos y gastos con nuestras plantillas personalizables. Organizadas y fáciles de usar.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ResourceCard 
              icon={<FaWallet />}
              title="Presupuesto mensual"
              description="Plantilla completa para registrar ingresos y gastos mensuales, con categorías predefinidas."
              href="/resources/budget-templates/monthly"
              tag="Descargable"
            />
            
            <ResourceCard 
              icon={<FaCreditCard />}
              title="Rastreador de deudas"
              description="Lleva el control de tus préstamos y tarjetas de crédito para eliminar deudas más rápido."
              href="/resources/budget-templates/debt-tracker"
              delay={0.1}
              tag="Descargable"
            />
            
            <ResourceCard 
              icon={<FaFileAlt />}
              title="Planificador de ahorro"
              description="Establece objetivos de ahorro y haz seguimiento de tu progreso con esta plantilla visual."
              href="/resources/budget-templates/savings-planner"
              delay={0.2}
              tag="Descargable"
            />
          </div>
        </div>
      </section>
      
      {/* Financial Calculators Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Calculadoras Financieras
            </motion.h2>
            <motion.p
              className="text-foreground/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            >
              Herramientas interactivas para ayudarte a planificar mejor tu futuro financiero.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ResourceCard 
              icon={<FaCalculator />}
              title="Calculadora de interés compuesto"
              description="Descubre cómo crecen tus inversiones con el poder del interés compuesto a lo largo del tiempo."
              href="/resources/calculators/compound-interest"
              tag="Interactiva"
            />
            
            <ResourceCard 
              icon={<FaMoneyBillWave />}
              title="Simulador de préstamos"
              description="Calcula cuotas mensuales y el costo total de préstamos personales, hipotecas o automotrices."
              href="/resources/calculators/loan-simulator"
              delay={0.1}
              tag="Interactiva"
            />
            
            <ResourceCard 
              icon={<FaBookReader />}
              title="Calculadora de jubilación"
              description="Planifica tu futuro financiero y determina cuánto necesitas ahorrar para una jubilación cómoda."
              href="/resources/calculators/retirement"
              delay={0.2}
              tag="Interactiva"
            />
          </div>
        </div>
      </section>
      
      {/* Mini Courses Banner */}
      <section className="py-20 bg-gradient-primary-to-accent/5">
        <div className="container mx-auto px-4">
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-10 flex flex-col justify-center">
                <motion.h3 
                  className="text-3xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  Mini Cursos Financieros
                </motion.h3>
                <motion.p 
                  className="text-foreground/80 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                >
                  Formaciones cortas y gratuitas sobre temas específicos: ahorro, impuestos, inversiones y más. Diseñadas para que aprendas a tu ritmo.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                >
                  <Link 
                    href="/resources/mini-courses" 
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 transition-colors px-6 py-3 rounded-lg text-white font-medium"
                  >
                    Explorar cursos gratuitos
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </motion.div>
              </div>
              <div className="relative hidden md:block h-80">
                <Image 
                  src="https://via.placeholder.com/600x400/0066FF/FFFFFF?text=Mini+Cursos+Financieros" 
                  alt="Mini Cursos Financieros"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <motion.h2 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              ¿Quieres recibir más recursos?
            </motion.h2>
            <motion.p
              className="text-foreground/80 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            >
              Suscríbete a nuestro newsletter y recibe guías, plantillas y consejos financieros directamente en tu bandeja de entrada.
            </motion.p>
            
            <motion.form 
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="flex-1 px-4 py-3 rounded-lg bg-card border border-border focus:outline-none focus:border-primary"
                required
              />
              <button 
                type="submit"
                className="bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Suscribirme
              </button>
            </motion.form>
            <motion.p
              className="text-xs text-foreground/60 mt-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              No hacemos spam. Puedes darte de baja en cualquier momento.
            </motion.p>
          </div>
        </div>
      </section>
    </main>
  );
} 