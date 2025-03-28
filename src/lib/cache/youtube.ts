// Sistema de caché para datos de YouTube
import { YouTubeVideo, YouTubeChannel } from '../api/youtube';

// Nombres de las claves en localStorage
const CACHE_KEY_VIDEOS = 'youtube_cache_videos';
const CACHE_KEY_REELS = 'youtube_cache_reels';
const CACHE_KEY_CHANNEL = 'youtube_cache_channel';

// Duración de la caché: 7 días en ms
const CACHE_DURATION = 1000 * 60 * 60 * 24 * 7;

// Interfaz para los datos en caché
interface CacheData<T> {
  timestamp: number;
  data: T;
  lastVideoDate?: string;
}

// Función para obtener datos del localStorage de forma segura
function getFromStorage<T>(key: string): CacheData<T> | null {
  try {
    // Verificar si estamos en el navegador
    if (typeof window === 'undefined') {
      return null;
    }
    
    const dataString = localStorage.getItem(key);
    if (!dataString) return null;
    
    return JSON.parse(dataString) as CacheData<T>;
  } catch (error) {
    console.error(`Error al leer del localStorage (${key}):`, error);
    return null;
  }
}

// Función para guardar datos en localStorage de forma segura
function saveToStorage<T>(key: string, data: T, lastVideoDate?: string): boolean {
  try {
    // Verificar si estamos en el navegador
    if (typeof window === 'undefined') {
      return false;
    }
    
    const cacheData: CacheData<T> = {
      timestamp: Date.now(),
      data,
      lastVideoDate
    };
    
    localStorage.setItem(key, JSON.stringify(cacheData));
    return true;
  } catch (error) {
    console.error(`Error al guardar en localStorage (${key}):`, error);
    return false;
  }
}

// Verificar si la caché ha expirado
function isCacheExpired<T>(cacheData: CacheData<T> | null): boolean {
  if (!cacheData) return true;
  
  const now = Date.now();
  const expirationTime = cacheData.timestamp + CACHE_DURATION;
  
  return now > expirationTime;
}

// Funciones para manejar caché de videos
export async function getCachedVideos(): Promise<YouTubeVideo[] | null> {
  const cacheData = getFromStorage<YouTubeVideo[]>(CACHE_KEY_VIDEOS);
  
  if (isCacheExpired(cacheData)) {
    console.log('Caché de videos expirada o no encontrada');
    return null;
  }
  
  console.log('Caché de videos válida', new Date(cacheData!.timestamp).toLocaleString());
  return cacheData!.data;
}

export async function cacheVideos(videos: YouTubeVideo[]): Promise<boolean> {
  if (!videos || videos.length === 0) {
    console.warn('No hay videos para guardar en caché');
    return false;
  }
  
  // Encontrar la fecha del video más reciente
  const dates = videos.map(v => new Date(v.publishedAt).getTime());
  const maxDate = Math.max(...dates);
  const lastVideoDate = new Date(maxDate).toISOString();
  
  const result = saveToStorage(CACHE_KEY_VIDEOS, videos, lastVideoDate);
  console.log('Videos guardados en caché:', result ? 'Éxito' : 'Error');
  return result;
}

// Funciones para manejar caché de reels
export async function getCachedReels(): Promise<YouTubeVideo[] | null> {
  const cacheData = getFromStorage<YouTubeVideo[]>(CACHE_KEY_REELS);
  
  if (isCacheExpired(cacheData)) {
    console.log('Caché de reels expirada o no encontrada');
    return null;
  }
  
  console.log('Caché de reels válida', new Date(cacheData!.timestamp).toLocaleString());
  return cacheData!.data;
}

export async function cacheReels(reels: YouTubeVideo[]): Promise<boolean> {
  if (!reels || reels.length === 0) {
    console.warn('No hay reels para guardar en caché');
    return false;
  }
  
  // Encontrar la fecha del reel más reciente
  const dates = reels.map(v => new Date(v.publishedAt).getTime());
  const maxDate = Math.max(...dates);
  const lastVideoDate = new Date(maxDate).toISOString();
  
  const result = saveToStorage(CACHE_KEY_REELS, reels, lastVideoDate);
  console.log('Reels guardados en caché:', result ? 'Éxito' : 'Error');
  return result;
}

// Funciones para manejar caché del canal
export async function getCachedChannel(): Promise<YouTubeChannel | null> {
  const cacheData = getFromStorage<YouTubeChannel>(CACHE_KEY_CHANNEL);
  
  if (isCacheExpired(cacheData)) {
    console.log('Caché del canal expirada o no encontrada');
    return null;
  }
  
  console.log('Caché del canal válida', new Date(cacheData!.timestamp).toLocaleString());
  return cacheData!.data;
}

export async function cacheChannel(channel: YouTubeChannel): Promise<boolean> {
  if (!channel) {
    console.warn('No hay información del canal para guardar en caché');
    return false;
  }
  
  const result = saveToStorage(CACHE_KEY_CHANNEL, channel);
  console.log('Canal guardado en caché:', result ? 'Éxito' : 'Error');
  return result;
}

// Función para limpiar toda la caché
export function clearCache(): boolean {
  try {
    if (typeof window === 'undefined') {
      return false;
    }
    
    localStorage.removeItem(CACHE_KEY_VIDEOS);
    localStorage.removeItem(CACHE_KEY_REELS);
    localStorage.removeItem(CACHE_KEY_CHANNEL);
    
    console.log('Caché de YouTube limpiada correctamente');
    return true;
  } catch (error) {
    console.error('Error al limpiar la caché:', error);
    return false;
  }
} 