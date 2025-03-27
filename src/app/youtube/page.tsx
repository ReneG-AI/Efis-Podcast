import YouTubeEpisodes from "@/components/episodes/YouTubeEpisodes";

export const metadata = {
  title: "YouTube | Efis Podcast",
  description: "Videos y Reels del canal de YouTube de Efis Podcast"
};

export default function YouTubePage() {
  return (
    <div className="container max-w-screen-xl py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Canal de YouTube</h1>
        <p className="mt-2 text-muted-foreground">
          Videos y Shorts del canal oficial de Efis Podcast en YouTube.
        </p>
      </div>
      
      <YouTubeEpisodes />
    </div>
  );
} 