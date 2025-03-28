/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['yt3.googleusercontent.com', 'i.ytimg.com'],
  },
  // Configuración para GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/Efis-Podcast' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Efis-Podcast/' : '',
  trailingSlash: true,
  // Configuración para evitar que las variables de entorno se expongan en el código fuente
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  // Configuración para manejo de rutas específicas
  redirects: async () => {
    return [
      {
        source: '/youtube',
        destination: process.env.NODE_ENV === 'production' ? '/Efis-Podcast/youtube/' : '/youtube/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig; 