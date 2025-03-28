/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Configuración para GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/Efis-Podcast' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Efis-Podcast/' : '',
  trailingSlash: true,
  // Evitar el uso de `env` y en su lugar usar las variables de entorno directamente
  // porque los valores de `env` se incrustan en tiempo de compilación
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
};

module.exports = nextConfig; 