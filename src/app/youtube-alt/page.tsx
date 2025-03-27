export const metadata = {
  title: "YouTube | Efis Podcast",
  description: "Videos y Reels del canal de YouTube de Efis Podcast"
};

export default function YouTubeAltPage() {
  return (
    <div className="container max-w-screen-xl py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Canal de YouTube</h1>
        <p className="mt-2 text-muted-foreground">
          Videos y Shorts del canal oficial de Efis Podcast en YouTube.
        </p>
      </div>
      
      <div className="mb-6 text-center">
        <a 
          href="https://www.youtube.com/@EFISPODCAST"
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md bg-red-600 px-6 py-3 text-sm font-medium text-white hover:bg-red-700 transition-colors"
        >
          Ver Canal Completo
        </a>
      </div>
      
      <div className="relative w-full pt-[56.25%]">
        <iframe 
          className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
          src="https://www.youtube.com/embed?listType=user_uploads&list=EFISPODCAST" 
          title="Canal de YouTube EFISPODCAST"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
} 