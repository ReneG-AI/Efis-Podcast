// Tipos para los datos de YouTube
export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnails: {
    default: { url: string; width: number; height: number };
    medium: { url: string; width: number; height: number };
    high: { url: string; width: number; height: number };
    standard?: { url: string; width: number; height: number };
    maxres?: { url: string; width: number; height: number };
  };
  channelTitle: string;
  tags?: string[];
  duration?: string;
  viewCount?: string;
  likeCount?: string;
  commentCount?: string;
  isReel?: boolean;
}

export interface YouTubeChannel {
  id: string;
  title: string;
  description: string;
  customUrl: string;
  thumbnails: {
    default: { url: string; width: number; height: number };
    medium: { url: string; width: number; height: number };
    high: { url: string; width: number; height: number };
  };
  statistics: {
    viewCount: string;
    subscriberCount: string;
    videoCount: string;
  };
}

// Configuración de la API
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '';
const YOUTUBE_CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || '';
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Importar funciones de caché
import {
  getCachedVideos,
  getCachedReels,
  getCachedChannel,
  cacheVideos,
  cacheReels,
  cacheChannel
} from '../cache/youtube';

// Función para identificar si un video es un Reel basado en sus proporciones o hashtags
function isYouTubeReel(video: any): boolean {
  // Si la descripción o tags mencionan #shorts o #reel
  const hasShortTag = 
    video.snippet?.description?.toLowerCase().includes('#short') ||
    video.snippet?.description?.toLowerCase().includes('#reel') ||
    (video.snippet?.tags && video.snippet.tags.some((tag: string) => 
      tag.toLowerCase().includes('short') || 
      tag.toLowerCase().includes('reel')
    ));
  
  // Videos cortos (menos de 1 minuto)
  const isShortDuration = 
    video.contentDetails?.duration && 
    parseDuration(video.contentDetails.duration) < 60;
    
  return hasShortTag || isShortDuration;
}

// Función para analizar la duración en formato ISO 8601
function parseDuration(duration: string): number {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  
  const hours = (match && match[1]) 
    ? parseInt(match[1].replace('H', '')) 
    : 0;
  const minutes = (match && match[2]) 
    ? parseInt(match[2].replace('M', '')) 
    : 0;
  const seconds = (match && match[3]) 
    ? parseInt(match[3].replace('S', '')) 
    : 0;
    
  return hours * 3600 + minutes * 60 + seconds;
}

// Formatea la duración para mostrarla de manera legible
function formatDuration(duration: string): string {
  const seconds = parseDuration(duration);
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Función para obtener videos del canal
export async function getChannelVideos(maxResults = 50): Promise<YouTubeVideo[]> {
  console.log('Obteniendo videos del canal...');
  
  // Intentar obtener de la caché primero
  const cachedVideos = await getCachedVideos();
  if (cachedVideos) {
    console.log('Usando videos en caché');
    return cachedVideos;
  }
  
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    console.error('YouTube API key o Channel ID faltantes');
    return [];
  }

  try {
    // Primero, obtenemos los IDs de los videos del canal
    const searchUrl = `${YOUTUBE_API_BASE_URL}/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`;
    
    console.log('Fetching:', searchUrl.replace(YOUTUBE_API_KEY, '[API_KEY]'));
    
    const playlistResponse = await fetch(searchUrl);
    
    if (!playlistResponse.ok) {
      console.error('Error en búsqueda de videos:', playlistResponse.status, playlistResponse.statusText);
      const errorText = await playlistResponse.text();
      console.error('Detalles del error:', errorText);
      return [];
    }
    
    const playlistData = await playlistResponse.json();
    console.log('Videos encontrados:', playlistData.items?.length || 0);
    
    if (!playlistData.items || playlistData.items.length === 0) {
      console.warn('No se encontraron videos para el canal');
      return [];
    }
    
    const videoIds = playlistData.items.map((item: any) => item.id.videoId).join(',');
    
    // Luego, obtenemos información detallada de cada video
    const videosUrl = `${YOUTUBE_API_BASE_URL}/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=snippet,contentDetails,statistics`;
    
    const videoResponse = await fetch(videosUrl);
    
    if (!videoResponse.ok) {
      console.error('Error en obtener detalles de videos:', videoResponse.status, videoResponse.statusText);
      return [];
    }
    
    const videoData = await videoResponse.json();
    
    // Transformamos la respuesta en nuestro formato
    const videos = videoData.items.map((item: any) => {
      const isReel = isYouTubeReel(item);
      
      return {
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnails: item.snippet.thumbnails,
        channelTitle: item.snippet.channelTitle,
        tags: item.snippet.tags || [],
        duration: formatDuration(item.contentDetails.duration),
        viewCount: item.statistics.viewCount,
        likeCount: item.statistics.likeCount,
        commentCount: item.statistics.commentCount,
        isReel
      };
    });

    // Guardar en caché
    cacheVideos(videos);
    
    return videos;
  } catch (error) {
    console.error('Error obteniendo videos de YouTube:', error);
    return [];
  }
}

// Función para obtener información del canal
export async function getChannelInfo(): Promise<YouTubeChannel | null> {
  console.log('Obteniendo información del canal...');
  
  // Intentar obtener de la caché primero
  const cachedChannel = await getCachedChannel();
  if (cachedChannel) {
    console.log('Usando información del canal en caché');
    return cachedChannel;
  }
  
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    console.error('YouTube API key o Channel ID faltantes');
    return null;
  }

  try {
    const channelUrl = `${YOUTUBE_API_BASE_URL}/channels?key=${YOUTUBE_API_KEY}&id=${YOUTUBE_CHANNEL_ID}&part=snippet,statistics`;
    
    console.log('Fetching:', channelUrl.replace(YOUTUBE_API_KEY, '[API_KEY]'));
    
    const response = await fetch(channelUrl);
    
    if (!response.ok) {
      console.error('Error en obtener canal:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Detalles del error:', errorText);
      return null;
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      console.warn('No se encontró el canal con el ID proporcionado');
      return null;
    }
    
    const channel = data.items[0];
    console.log('Canal encontrado:', channel.snippet.title);
    
    const channelInfo = {
      id: channel.id,
      title: channel.snippet.title,
      description: channel.snippet.description,
      customUrl: channel.snippet.customUrl,
      thumbnails: channel.snippet.thumbnails,
      statistics: {
        viewCount: channel.statistics.viewCount,
        subscriberCount: channel.statistics.subscriberCount,
        videoCount: channel.statistics.videoCount
      }
    };

    // Guardar en caché
    cacheChannel(channelInfo);
    
    return channelInfo;
  } catch (error) {
    console.error('Error obteniendo información del canal de YouTube:', error);
    return null;
  }
}

// Función para obtener solo los Reels
export async function getChannelReels(maxResults = 20): Promise<YouTubeVideo[]> {
  // Intentar obtener de la caché primero
  const cachedReels = await getCachedReels();
  if (cachedReels) {
    console.log('Usando reels en caché');
    return cachedReels;
  }

  const videos = await getChannelVideos(maxResults);
  const reels = videos.filter(video => video.isReel);
  
  // Guardar en caché
  cacheReels(reels);
  
  return reels;
}

// Función para obtener videos regulares (no reels)
export async function getChannelRegularVideos(maxResults = 20): Promise<YouTubeVideo[]> {
  const videos = await getChannelVideos(maxResults);
  return videos.filter(video => !video.isReel);
}

// Función para obtener un video específico por ID
export async function getVideoById(videoId: string): Promise<YouTubeVideo | null> {
  if (!YOUTUBE_API_KEY) {
    console.error('YouTube API key faltante');
    return null;
  }

  try {
    const videoUrl = `${YOUTUBE_API_BASE_URL}/videos?key=${YOUTUBE_API_KEY}&id=${videoId}&part=snippet,contentDetails,statistics`;
    
    const response = await fetch(videoUrl);
    
    if (!response.ok) {
      console.error('Error en obtener video específico:', response.status, response.statusText);
      return null;
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      console.warn('No se encontró el video con el ID proporcionado');
      return null;
    }
    
    const item = data.items[0];
    const isReel = isYouTubeReel(item);
    
    return {
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
      thumbnails: item.snippet.thumbnails,
      channelTitle: item.snippet.channelTitle,
      tags: item.snippet.tags || [],
      duration: formatDuration(item.contentDetails.duration),
      viewCount: item.statistics.viewCount,
      likeCount: item.statistics.likeCount,
      commentCount: item.statistics.commentCount,
      isReel
    };
  } catch (error) {
    console.error('Error obteniendo video específico de YouTube:', error);
    return null;
  }
} 