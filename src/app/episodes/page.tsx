"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaFilter, FaSearch, FaTimes } from 'react-icons/fa';

import Section from '@/components/ui/Section';
import ScrollAnimation from '@/components/ui/ScrollAnimation';
import EpisodeCard from '@/components/episodes/EpisodeCard';
import AudioPlayer from '@/components/ui/AudioPlayer';

// Datos de ejemplo - En una aplicación real vendrían de una API
const episodes = [
  {
    id: '1',
    title: 'Crecimiento personal en la era digital',
    description: 'Conversamos sobre las estrategias más efectivas para el desarrollo personal en un mundo hiperconectado.',
    duration: '45:30',
    date: '15 Mar 2023',
    listens: '2.5K',
    image: '/images/placeholder-episode.jpg',
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
    image: '/images/placeholder-episode.jpg',
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
    image: '/images/placeholder-episode.jpg',
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
    image: '/images/placeholder-episode.jpg',
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
    image: '/images/placeholder-episode.jpg',
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
    image: '/images/placeholder-episode.jpg',
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
    image: '/images/placeholder-episode.jpg',
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
    image: '/images/placeholder-episode.jpg',
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
    <div className="min-h-screen">
      {/* Encabezado con buscador y filtros */}
      <Section
        title="EPISODIOS"
        subtitle="Explora nuestra biblioteca completa de episodios sobre desarrollo personal y profesional."
        background="waves"
        titleAlignment="center"
      >
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
              className="block w-full pl-10 pr-10 py-3 rounded-lg bg-card border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <FaTimes className="text-foreground/50 hover:text-foreground" />
              </button>
            )}
          </div>
          
          {/* Filtro por categoría - Versión móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className="w-full py-3 px-4 bg-card border border-border rounded-lg flex items-center justify-between"
            >
              <span className="flex items-center">
                <FaFilter className="mr-2" />
                {selectedCategory || 'Todas las categorías'}
              </span>
              <span>{isFilterMenuOpen ? '▲' : '▼'}</span>
            </button>
            
            {isFilterMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-20 mt-1 w-full bg-card border border-border rounded-lg shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setIsFilterMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 hover:bg-primary/10 ${!selectedCategory ? 'bg-primary/20 text-primary' : ''}`}
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
                    className={`block w-full text-left px-4 py-2 hover:bg-primary/10 ${selectedCategory === category ? 'bg-primary/20 text-primary' : ''}`}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
          
          {/* Filtro por categoría - Versión desktop */}
          <div className="hidden md:flex space-x-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                !selectedCategory 
                  ? 'bg-primary text-white' 
                  : 'bg-card border border-border hover:bg-primary/10 transition-colors'
              }`}
            >
              Todos
            </button>
            
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  selectedCategory === category 
                    ? 'bg-primary text-white' 
                    : 'bg-card border border-border hover:bg-primary/10 transition-colors'
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
              className="md:w-auto flex-shrink-0 px-4 py-3 bg-card border border-border rounded-lg hover:bg-primary/10 transition-colors"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Visualización de episodios */}
        {filteredEpisodes.length === 0 ? (
          <div className="text-center py-20">
            <ScrollAnimation variant="fade">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No se encontraron episodios</h3>
              <p className="text-foreground/70 mb-6">Intenta con otra búsqueda o elimina los filtros</p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Mostrar todos los episodios
              </button>
            </ScrollAnimation>
          </div>
        ) : (
          <>
            {/* Mostrar resultados */}
            <p className="text-sm text-foreground/70 mb-6">
              {filteredEpisodes.length} {filteredEpisodes.length === 1 ? 'episodio encontrado' : 'episodios encontrados'}
              {selectedCategory && ` en ${selectedCategory}`}
              {searchQuery && ` para "${searchQuery}"`}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {filteredEpisodes.map((episode, index) => (
                <ScrollAnimation 
                  key={episode.id} 
                  variant="slide-up" 
                  delay={0.05 * index}
                >
                  <div className="relative group">
                    <EpisodeCard 
                      {...episode}
                      variant="default"
                    />
                    
                    <motion.button
                      onClick={() => handleEpisodePlay(episode)}
                      className="absolute top-4 right-4 bg-primary rounded-full p-2 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaPlay className="w-3 h-3" />
                    </motion.button>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </>
        )}

        {/* Paginación (simulada) */}
        {filteredEpisodes.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-card hover:bg-primary/10 transition-colors">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-card hover:bg-primary/10 transition-colors">3</button>
              <span className="w-10 h-10 flex items-center justify-center">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-card hover:bg-primary/10 transition-colors">8</button>
            </div>
          </div>
        )}
      </Section>

      {/* Reproductor de audio flotante */}
      {selectedEpisode && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
          <motion.div 
            className="w-full max-w-2xl mx-4 mb-4"
            initial={{ y: 100, opacity: 0 }}
            animate={{ 
              y: isAudioPlayerVisible ? 0 : 100, 
              opacity: isAudioPlayerVisible ? 1 : 0 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
          >
            <div className="relative">
              <AudioPlayer 
                src={selectedEpisode.audioUrl} 
                title={selectedEpisode.title}
                variant="default"
                className="shadow-xl"
              />
              <button 
                onClick={() => setIsAudioPlayerVisible(false)}
                className="absolute -top-2 -right-2 bg-foreground text-background rounded-full w-6 h-6 flex items-center justify-center text-xs"
                aria-label="Cerrar reproductor"
              >
                &times;
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 