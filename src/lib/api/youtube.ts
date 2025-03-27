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
export const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '';
export const YOUTUBE_CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || '';
export const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Función para identificar si un video es un Reel basado en sus proporciones o hashtags
const isYouTubeReel = (video: any): boolean => {
  // Primero verificamos si es un Short basado en la URL
  const isShort = 
    video.snippet?.description?.includes('/shorts/') ||
    (video.snippet?.tags && 
      video.snippet.tags.some((tag: string) => 
        tag.toLowerCase().includes('#shorts') || 
        tag.toLowerCase().includes('#short')));
  
  // Verificamos si es vertical basado en las miniaturas
  const standard = video.snippet?.thumbnails?.standard;
  const isVertical = standard && standard.height > standard.width;
  
  // Verificamos si es video corto (menos de 60 segundos) 
  const isShortDuration = 
    video.contentDetails?.duration && 
    parseDuration(video.contentDetails.duration) < 60;
    
  return isShort || isVertical || isShortDuration;
};

// Función para analizar la duración en formato ISO 8601
const parseDuration = (duration: string): number => {
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
};

// Formatea la duración para mostrarla de manera legible
const formatDuration = (duration: string): string => {
  const seconds = parseDuration(duration);
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Función para obtener videos del canal
export async function getChannelVideos(maxResults = 50): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    console.error('YouTube API key or Channel ID missing');
    return [];
  }

  try {
    // Primero, obtenemos los IDs de los videos del canal
    const searchUrl = `${YOUTUBE_API_BASE_URL}/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`;
    
    const playlistResponse = await fetch(searchUrl, { 
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!playlistResponse.ok) {
      console.error(`YouTube API search error: ${playlistResponse.status} ${playlistResponse.statusText}`);
      return [];
    }
    
    const playlistData = await playlistResponse.json();
    
    if (!playlistData.items || playlistData.items.length === 0) {
      console.warn('No videos found for channel');
      return [];
    }
    
    const videoIds = playlistData.items.map((item: any) => item.id.videoId).join(',');
    
    // Luego, obtenemos información detallada de cada video
    const videosUrl = `${YOUTUBE_API_BASE_URL}/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=snippet,contentDetails,statistics`;
    
    const videoResponse = await fetch(videosUrl, { 
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!videoResponse.ok) {
      console.error(`YouTube API videos error: ${videoResponse.status} ${videoResponse.statusText}`);
      return [];
    }
    
    const videoData = await videoResponse.json();
    
    // Transformamos la respuesta en nuestro formato
    return videoData.items.map((item: any) => {
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
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
}

// Función para obtener información del canal
export async function getChannelInfo(): Promise<YouTubeChannel | null> {
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    console.error('YouTube API key or Channel ID missing');
    return null;
  }

  try {
    // Usamos directamente el ID del canal, asegurándonos de que comience con UC
    const channelId = YOUTUBE_CHANNEL_ID.startsWith('UC') 
      ? YOUTUBE_CHANNEL_ID 
      : `UC${YOUTUBE_CHANNEL_ID.replace(/^UC/, '')}`;
      
    const channelUrl = `${YOUTUBE_API_BASE_URL}/channels?key=${YOUTUBE_API_KEY}&id=${channelId}&part=snippet,statistics`;
    
    const response = await fetch(channelUrl, { 
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      console.error(`YouTube API channel error: ${response.status} ${response.statusText}`);
      return null;
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      // Si no encontramos el canal por ID, intentamos por nombre de usuario
      return await getChannelByUsername();
    }
    
    const channel = data.items[0];
    
    return {
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
  } catch (error) {
    console.error('Error fetching YouTube channel:', error);
    return null;
  }
}

// Función auxiliar para buscar canal por nombre de usuario
async function getChannelByUsername(): Promise<YouTubeChannel | null> {
  try {
    // Intentamos buscar por nombre de usuario (EFISPODCAST)
    const usernameUrl = `${YOUTUBE_API_BASE_URL}/channels?key=${YOUTUBE_API_KEY}&forUsername=EFISPODCAST&part=snippet,statistics`;
    
    const response = await fetch(usernameUrl, { 
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return null;
    }
    
    const channel = data.items[0];
    
    return {
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
  } catch (error) {
    console.error('Error fetching YouTube channel by username:', error);
    return null;
  }
}

// Función para obtener solo los Reels
export async function getChannelReels(maxResults = 20): Promise<YouTubeVideo[]> {
  const videos = await getChannelVideos(maxResults);
  return videos.filter(video => video.isReel);
}

// Función para obtener videos regulares (no reels)
export async function getChannelRegularVideos(maxResults = 20): Promise<YouTubeVideo[]> {
  const videos = await getChannelVideos(maxResults);
  return videos.filter(video => !video.isReel);
}

// Función para obtener un video específico por ID
export async function getVideoById(videoId: string): Promise<YouTubeVideo | null> {
  if (!YOUTUBE_API_KEY) {
    console.error('YouTube API key missing');
    return null;
  }

  try {
    console.log('Fetching video by ID', { videoId });
    
    const videoUrl = `${YOUTUBE_API_BASE_URL}/videos?key=${YOUTUBE_API_KEY}&id=${videoId}&part=snippet,contentDetails,statistics`;
    console.log('Fetching video with URL (partial):', videoUrl.substring(0, videoUrl.indexOf('key=') + 10) + '...');
    
    const response = await fetch(videoUrl, { 
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch video: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
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
    console.error('Error fetching YouTube video:', error);
    return null;
  }
} 