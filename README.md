# Efis Podcast

Aplicación web para el Podcast de Efis sobre desarrollo personal y profesional.

> ⚠️ Este es un repositorio privado. Si necesitas acceso, contacta al administrador del proyecto.

## Características

- Listado de episodios con reproductor integrado
- Canal de YouTube con videos y reels
- Diseño responsive y moderno
- Modo oscuro/claro
- Optimizado para SEO

## Instalación

1. Clona el repositorio (requiere acceso):
```bash
git clone https://github.com/ReneG-AI/Efis-Podcast.git
cd Efis-Podcast
```

2. Instala dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
   - Copia el archivo `.env.example` a `.env.local`
   - Completa las variables con tus propias claves
   - O utiliza el script `start.bat` que creará uno básico automáticamente

## Configuración de YouTube API

Para que funcione la integración con YouTube:

1. Asegúrate de que las siguientes variables están configuradas en `.env.local`:
```
NEXT_PUBLIC_YOUTUBE_API_KEY=tu_clave_api
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=id_de_tu_canal
```

2. Si necesitas generar una nueva clave de API:
   - Ve a [Google Cloud Console](https://console.cloud.google.com/)
   - Crea un proyecto nuevo
   - Habilita YouTube Data API v3
   - Genera una clave de API en "Credenciales"

## Ejecutar en desarrollo

Utiliza el script de inicio para ejecutar el proyecto con verificación de configuración:

```bash
# Windows
start.bat

# Alternativa manual
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del proyecto

- `src/app/` - Páginas de la aplicación (Next.js App Router)
- `src/components/` - Componentes reutilizables
- `src/lib/` - Utilidades, APIs y configuraciones
- `public/` - Archivos estáticos (imágenes, fuentes, etc.)

## Despliegue

La aplicación está optimizada para ser desplegada en Vercel:

```bash
npm run build
```

## Colaboración

1. Solicita acceso al repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Seguridad

- No compartas tus claves de API
- No subas archivos `.env` al repositorio
- Mantén actualizadas las dependencias
- Reporta cualquier problema de seguridad al administrador
