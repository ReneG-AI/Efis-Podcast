/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['yt3.googleusercontent.com', 'i.ytimg.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
    ],
  },
  // Configuración para GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/Efis-Podcast' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Efis-Podcast/' : '',
  trailingSlash: true,
  // Configuración para evitar que las variables de entorno se expongan en el código fuente
  webpack: (config, { isServer }) => {
    // Ignorar módulos del lado del servidor cuando se ejecuta en el navegador
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        net: false,
        tls: false,
        child_process: false,
        crypto: false,
        stream: false,
        http: false,
        https: false,
        zlib: false,
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