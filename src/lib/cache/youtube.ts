import fs from 'fs';
import path from 'path';
import { YouTubeVideo, YouTubeChannel } from '../api/youtube';

const CACHE_DIR = path.join(process.cwd(), '.cache', 'youtube');
const CACHE_DURATION = 1000 * 60 * 60 * 24 * 7; // 7 días en milisegundos

// Asegurarse de que el directorio de caché existe
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

interface CacheData<T> {
  data: T;
  timestamp: number;
  lastVideoDate: string; // Fecha del video más reciente
}

function getCachePath(key: string): string {
  return path.join(CACHE_DIR, `${key}.json`);
}

function readCache<T>(key: string): T | null {
  try {
    const cachePath = getCachePath(key);
    if (!fs.existsSync(cachePath)) return null;

    const cacheContent = fs.readFileSync(cachePath, 'utf-8');
    const cache: CacheData<T> = JSON.parse(cacheContent);

    // Verificar si la caché ha expirado
    if (Date.now() - cache.timestamp > CACHE_DURATION) {
      return null;
    }

    return cache.data;
  } catch (error) {
    console.error(`Error reading cache for ${key}:`, error);
    return null;
  }
}

function writeCache<T>(key: string, data: T, lastVideoDate: string): void {
  try {
    const cachePath = getCachePath(key);
    const cache: CacheData<T> = {
      data,
      timestamp: Date.now(),
      lastVideoDate
    };
    fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
  } catch (error) {
    console.error(`Error writing cache for ${key}:`, error);
  }
}

// Claves de caché
const CACHE_KEYS = {
  VIDEOS: 'videos',
  REELS: 'reels',
  CHANNEL: 'channel'
} as const;

export async function getCachedVideos(): Promise<YouTubeVideo[] | null> {
  return readCache<YouTubeVideo[]>(CACHE_KEYS.VIDEOS);
}

export async function getCachedReels(): Promise<YouTubeVideo[] | null> {
  return readCache<YouTubeVideo[]>(CACHE_KEYS.REELS);
}

export async function getCachedChannel(): Promise<YouTubeChannel | null> {
  return readCache<YouTubeChannel>(CACHE_KEYS.CHANNEL);
}

export function cacheVideos(videos: YouTubeVideo[]): void {
  const lastVideoDate = videos[0]?.publishedAt || new Date().toISOString();
  writeCache(CACHE_KEYS.VIDEOS, videos, lastVideoDate);
}

export function cacheReels(reels: YouTubeVideo[]): void {
  const lastVideoDate = reels[0]?.publishedAt || new Date().toISOString();
  writeCache(CACHE_KEYS.REELS, reels, lastVideoDate);
}

export function cacheChannel(channel: YouTubeChannel): void {
  writeCache(CACHE_KEYS.CHANNEL, channel, new Date().toISOString());
}

// Función para limpiar la caché
export function clearCache(): void {
  try {
    const files = fs.readdirSync(CACHE_DIR);
    for (const file of files) {
      fs.unlinkSync(path.join(CACHE_DIR, file));
    }
    console.log('YouTube cache cleared successfully');
  } catch (error) {
    console.error('Error clearing YouTube cache:', error);
  }
} 