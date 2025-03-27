import { FaSpotify, FaApple, FaGoogle, FaYoutube } from "react-icons/fa";
import { IconType } from "react-icons";

export const YOUTUBE_CHANNEL = "https://www.youtube.com/@EFISPODCAST";

interface Platform {
  name: string;
  icon: IconType;
  href: string;
}

export const platforms: Platform[] = [
  { 
    name: "Spotify", 
    icon: FaSpotify, 
    href: "#" 
  },
  { 
    name: "Apple Podcasts", 
    icon: FaApple, 
    href: "#" 
  },
  { 
    name: "Google Podcasts", 
    icon: FaGoogle, 
    href: "#" 
  },
  { 
    name: "YouTube", 
    icon: FaYoutube, 
    href: YOUTUBE_CHANNEL
  },
]; 