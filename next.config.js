/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Comentamos la salida estática para que funcione la API
  // output: 'export',
  // basePath: '/Efis-Podcast',
  images: {
    unoptimized: true,
    domains: ['i.ytimg.com', 'yt3.ggpht.com', 'yt3.googleusercontent.com'],
  },
  // trailingSlash: true,
};

module.exports = nextConfig; 