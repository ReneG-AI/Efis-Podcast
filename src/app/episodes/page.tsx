"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaFilter, FaSearch, FaTimes, FaHeadphones, FaInfoCircle, FaCalendarAlt, FaPlayCircle } from 'react-icons/fa';

import Section from '@/components/ui/Section';
import ScrollAnimation from '@/components/ui/ScrollAnimation';
import EpisodeCard from '@/components/episodes/EpisodeCard';
import AudioPlayer from '@/components/ui/AudioPlayer';
import AudioVisualizer from '@/components/ui/AudioVisualizer';

// Datos de ejemplo - En una aplicación real vendrían de una API
const episodes = [
  {
    id: '1',
    title: 'Crecimiento personal en la era digital',
    description: 'Conversamos sobre las estrategias más efectivas para el desarrollo personal en un mundo hiperconectado.',
    duration: '45:30',
    date: '15 Mar 2023',
    listens: '2.5K',
    image: 'https://via.placeholder.com/800x450/3F51B5/FFFFFF?text=Crecimiento+Personal',
    audioUrl: 'https://example.com/audio1.mp3',
    href: '/episodes/1',
    category: 'Desarrollo Personal'
  },
  {
    id: '2',
    title: 'La productividad y el bienestar',
    description: '¿Cómo equilibrar la productividad con el bienestar personal? Exploramos técnicas y enfoques.',
    duration: '38:15',
    date: '22 Feb 2023',
    listens: '1.8K',
    image: 'https://via.placeholder.com/800x450/673AB7/FFFFFF?text=Productividad',
    audioUrl: 'https://example.com/audio2.mp3',
    href: '/episodes/2',
    category: 'Productividad'
  },
  {
    id: '3',
    title: 'Inteligencia emocional en el trabajo',
    description: 'Analizamos la importancia de la inteligencia emocional en entornos laborales modernos.',
    duration: '42:50',
    date: '8 Feb 2023',
    listens: '3.2K',
    image: 'https://via.placeholder.com/800x450/00B8D4/FFFFFF?text=Inteligencia+Emocional',
    audioUrl: 'https://example.com/audio3.mp3',
    href: '/episodes/3',
    category: 'Desarrollo Profesional'
  },
  {
    id: '4',
    title: 'Mindfulness y meditación para principiantes',
    description: 'Guía práctica para incorporar técnicas de mindfulness y meditación en tu rutina diaria.',
    duration: '35:20',
    date: '1 Feb 2023',
    listens: '5.1K',
    image: 'https://via.placeholder.com/800x450/4CAF50/FFFFFF?text=Mindfulness',
    audioUrl: 'https://example.com/audio4.mp3',
    href: '/episodes/4',
    category: 'Bienestar'
  },
  {
    id: '5',
    title: 'Liderazgo efectivo en equipos remotos',
    description: 'Estrategias para liderar equipos distribuidos geográficamente y fomentar una cultura de trabajo remoto exitosa.',
    duration: '51:45',
    date: '25 Ene 2023',
    listens: '1.9K',
    image: 'https://via.placeholder.com/800x450/FF9800/FFFFFF?text=Liderazgo',
    audioUrl: 'https://example.com/audio5.mp3',
    href: '/episodes/5',
    category: 'Liderazgo'
  },
  {
    id: '6',
    title: 'Finanzas personales: Primeros pasos',
    description: 'Fundamentos de finanzas personales para comenzar a construir un futuro financiero sólido.',
    duration: '49:10',
    date: '18 Ene 2023',
    listens: '4.7K',
    image: 'https://via.placeholder.com/800x450/2196F3/FFFFFF?text=Finanzas',
    audioUrl: 'https://example.com/audio6.mp3',
    href: '/episodes/6',
    category: 'Finanzas'
  },
  {
    id: '7',
    title: 'Hábitos saludables para profesionales ocupados',
    description: 'Cómo mantener un estilo de vida saludable a pesar de una agenda apretada y responsabilidades laborales.',
    duration: '37:25',
    date: '11 Ene 2023',
    listens: '2.3K',
    image: 'https://via.placeholder.com/800x450/009688/FFFFFF?text=Habitos+Saludables',
    audioUrl: 'https://example.com/audio7.mp3',
    href: '/episodes/7',
    category: 'Bienestar'
  },
  {
    id: '8',
    title: 'Comunicación asertiva en entornos laborales',
    description: 'Técnicas para mejorar tu comunicación en el trabajo y expresar tus ideas de manera efectiva.',
    duration: '44:30',
    date: '4 Ene 2023',
    listens: '1.6K',
    image: 'https://via.placeholder.com/800x450/E91E63/FFFFFF?text=Comunicacion',
    audioUrl: 'https://example.com/audio8.mp3',
    href: '/episodes/8',
    category: 'Comunicación'
  }
];

// Extraer categorías únicas para los filtros
const categories = Array.from(new Set(episodes.map(episode => episode.category)));

export default function EpisodesPage() {
  const [selectedEpisode, setSelectedEpisode] = useState<null | typeof episodes[0]>(null);
  const [isAudioPlayerVisible, setIsAudioPlayerVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [hoveredEpisode, setHoveredEpisode] = useState<string | null>(null);

  // Filtrar episodios por búsqueda y categoría
  const filteredEpisodes = episodes.filter(episode => {
    const matchesSearch = episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          episode.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory ? episode.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  // Mostrar el reproductor cuando se selecciona un episodio
  const handleEpisodePlay = (episode: typeof episodes[0]) => {
    setSelectedEpisode(episode);
    setIsAudioPlayerVisible(true);
  };

  // Limpiar filtros
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Wave background */}
      <div className="fixed inset-0 -z-10 opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-secondary opacity-10 blur-[120px] rounded-full transform -translate-y-1/3 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-primary opacity-10 blur-[100px] rounded-full transform translate-y-1/3 -translate-x-1/3"></div>
      </div>
    
      {/* Encabezado con buscador y filtros */}
      <Section
        title="EPISODIOS"
        subtitle="Explora nuestra biblioteca completa de episodios sobre tecnología, aviación y desarrollo personal."
        titleAlignment="center"
        className="relative z-10"
      >
        <div className="relative -mt-10 mb-20 h-12 opacity-10 pointer-events-none">
          <AudioVisualizer barCount={80} maxHeight={40} className="w-full" />
        </div>
      
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            {/* Buscador */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-foreground/50" />
              </div>
              <input
                type="text"
                placeholder="Buscar episodios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-10 py-3 rounded-full glass focus-ring"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  <FaTimes className="text-foreground/50 hover:text-foreground" />
                </button>
              )}
            </div>
            
            {/* Filtro por categoría - Versión móvil */}
            <div className="md:hidden">
              <button
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                className="w-full py-3 px-4 glass rounded-full flex items-center justify-between focus-ring"
              >
                <span className="flex items-center">
                  <FaFilter className="mr-2 text-foreground/70" />
                  {selectedCategory || 'Todas las categorías'}
                </span>
                <span className="text-foreground/70">{isFilterMenuOpen ? '▲' : '▼'}</span>
              </button>
              
              <AnimatePresence>
                {isFilterMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-20 mt-2 w-full bg-card/90 backdrop-blur-md border border-border/30 rounded-xl shadow-lg overflow-hidden"
                  >
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setIsFilterMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-3 hover:bg-primary/10 ${!selectedCategory ? 'bg-primary/20 text-primary' : ''}`}
                    >
                      Todas las categorías
                    </button>
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsFilterMenuOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-3 hover:bg-primary/10 ${selectedCategory === category ? 'bg-primary/20 text-primary' : ''}`}
                      >
                        {category}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Filtro por categoría - Versión desktop */}
            <div className="hidden md:flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-5 py-2 rounded-full transition-all ${
                  !selectedCategory 
                    ? 'btn-primary' 
                    : 'glass hover:bg-primary/10'
                }`}
              >
                Todos
              </button>
              
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full transition-all ${
                    selectedCategory === category 
                      ? 'btn-primary' 
                      : 'glass hover:bg-primary/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Botón para limpiar filtros */}
            {(searchQuery || selectedCategory) && (
              <button
                onClick={clearFilters}
                className="md:w-auto flex-shrink-0 px-5 py-3 glass rounded-full hover:bg-primary/10 transition-all"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {/* Visualización de episodios */}
          {filteredEpisodes.length === 0 ? (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="glass inline-flex p-8 rounded-full mb-6">
                <FaSearch className="text-5xl text-foreground/30" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">No se encontraron episodios</h3>
              <p className="text-foreground/70 mb-6 max-w-md mx-auto">Intenta con otra búsqueda o elimina los filtros para ver todos los episodios disponibles</p>
              <button
                onClick={clearFilters}
                className="btn-primary"
              >
                Mostrar todos los episodios
              </button>
            </motion.div>
          ) : (
            <>
              {/* Mostrar resultados */}
              <div className="glass px-4 py-2 rounded-full inline-flex items-center mb-8 text-sm text-foreground/70">
                <FaInfoCircle className="mr-2 text-primary" />
                {filteredEpisodes.length} {filteredEpisodes.length === 1 ? 'episodio encontrado' : 'episodios encontrados'}
                {selectedCategory && ` en ${selectedCategory}`}
                {searchQuery && ` para "${searchQuery}"`}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                {filteredEpisodes.map((episode, index) => (
                  <motion.div
                    key={episode.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.05 * Math.min(index, 5) 
                    }}
                    onMouseEnter={() => setHoveredEpisode(episode.id)}
                    onMouseLeave={() => setHoveredEpisode(null)}
                    className="relative group"
                  >
                    <div className="card-hover">
                      <EpisodeCard 
                        {...episode}
                        variant="default"
                      />
                    </div>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-primary/30 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <motion.button
                        onClick={() => handleEpisodePlay(episode)}
                        className="relative z-10 glass p-6 rounded-full"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaPlayCircle className="w-10 h-10 text-primary" />
                      </motion.button>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="glass rounded-full px-3 py-1 flex items-center">
                          <FaHeadphones className="mr-2 text-primary" />
                          <span>{episode.listens}</span>
                        </div>
                        <div className="glass rounded-full px-3 py-1 flex items-center">
                          <FaCalendarAlt className="mr-2 text-secondary" />
                          <span>{episode.date}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {/* Paginación (simulada) */}
          {filteredEpisodes.length > 0 && (
            <motion.div 
              className="flex justify-center mt-12 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="glass p-1 rounded-full flex space-x-1">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors">3</button>
                <span className="w-10 h-10 flex items-center justify-center text-foreground/50">...</span>
                <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors">8</button>
              </div>
            </motion.div>
          )}
        </div>
      </Section>

      {/* Reproductor de audio flotante */}
      <AnimatePresence>
        {selectedEpisode && (
          <motion.div 
            className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
            initial={{ y: 100, opacity: 0 }}
            animate={{ 
              y: isAudioPlayerVisible ? 0 : 100, 
              opacity: isAudioPlayerVisible ? 1 : 0 
            }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
          >
            <div className="w-full max-w-2xl mx-4 mb-4 pointer-events-auto">
              <div className="neo p-1 rounded-2xl relative">
                <AudioPlayer 
                  src={selectedEpisode.audioUrl} 
                  title={selectedEpisode.title}
                  variant="default"
                />
                <button 
                  onClick={() => setIsAudioPlayerVisible(false)}
                  className="absolute -top-3 -right-3 bg-foreground text-background rounded-full w-7 h-7 flex items-center justify-center text-xs shadow-lg neo-inset"
                  aria-label="Cerrar reproductor"
                >
                  &times;
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 