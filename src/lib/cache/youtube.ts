// Sistema de caché para datos de YouTube
import type { YouTubeVideo, YouTubeChannel } from '../api/youtube';

// Duración del caché: 7 días (en milisegundos)
const CACHE_DURATION = 1000 * 60 * 60 * 24 * 7;

// Claves para localStorage
const CACHE_KEYS = {
  VIDEOS: 'youtube_videos_cache',
  REELS: 'youtube_reels_cache',
  CHANNEL: 'youtube_channel_cache'
};

// Interfaz para datos almacenados en caché
interface CacheData<T> {
  data: T;
  timestamp: number;
  expiration: number;
  lastVideoDate?: string;
}

// Verificar si la caché expiró
function isCacheExpired<T>(cacheData: CacheData<T> | null): boolean {
  if (!cacheData) return true;
  return Date.now() > cacheData.expiration;
}

// Función para guardar datos en localStorage
function setCache<T>(key: string, data: T, lastVideoDate?: string): void {
  try {
    if (typeof window === 'undefined') return; // Solo ejecutar en el cliente
    
    const cacheData: CacheData<T> = {
      data,
      timestamp: Date.now(),
      expiration: Date.now() + CACHE_DURATION,
      lastVideoDate
    };
    
    localStorage.setItem(key, JSON.stringify(cacheData));
    console.log(`Datos guardados en caché: ${key}`);
  } catch (error) {
    console.error(`Error al guardar en caché ${key}:`, error);
  }
}

// Función para obtener datos de localStorage
function getCache<T>(key: string): CacheData<T> | null {
  try {
    if (typeof window === 'undefined') return null; // Solo ejecutar en el cliente
    
    const cachedData = localStorage.getItem(key);
    if (!cachedData) return null;
    
    const parsedData = JSON.parse(cachedData) as CacheData<T>;
    
    // Verificar si expiró
    if (isCacheExpired(parsedData)) {
      console.log(`Caché expirado para ${key}`);
      localStorage.removeItem(key);
      return null;
    }
    
    return parsedData;
  } catch (error) {
    console.error(`Error al leer caché ${key}:`, error);
    return null;
  }
}

// Funciones para videos
export async function getCachedVideos(): Promise<YouTubeVideo[] | null> {
  const cacheData = getCache<YouTubeVideo[]>(CACHE_KEYS.VIDEOS);
  return cacheData ? cacheData.data : null;
}

export async function cacheVideos(videos: YouTubeVideo[]): Promise<void> {
  // Obtener la fecha del video más reciente
  const sortedVideos = [...videos].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  
  const lastVideoDate = sortedVideos.length > 0 ? sortedVideos[0].publishedAt : undefined;
  setCache(CACHE_KEYS.VIDEOS, videos, lastVideoDate);
}

// Funciones para reels
export async function getCachedReels(): Promise<YouTubeVideo[] | null> {
  const cacheData = getCache<YouTubeVideo[]>(CACHE_KEYS.REELS);
  return cacheData ? cacheData.data : null;
}

export async function cacheReels(reels: YouTubeVideo[]): Promise<void> {
  // Obtener la fecha del reel más reciente
  const sortedReels = [...reels].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  
  const lastVideoDate = sortedReels.length > 0 ? sortedReels[0].publishedAt : undefined;
  setCache(CACHE_KEYS.REELS, reels, lastVideoDate);
}

// Funciones para información del canal
export async function getCachedChannel(): Promise<YouTubeChannel | null> {
  const cacheData = getCache<YouTubeChannel>(CACHE_KEYS.CHANNEL);
  return cacheData ? cacheData.data : null;
}

export async function cacheChannel(channelInfo: YouTubeChannel): Promise<void> {
  setCache(CACHE_KEYS.CHANNEL, channelInfo);
}

// Función para limpiar toda la caché
export function clearCache(): void {
  try {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(CACHE_KEYS.VIDEOS);
    localStorage.removeItem(CACHE_KEYS.REELS);
    localStorage.removeItem(CACHE_KEYS.CHANNEL);
    
    console.log('Caché de YouTube eliminada');
  } catch (error) {
    console.error('Error al limpiar la caché:', error);
  }
} 