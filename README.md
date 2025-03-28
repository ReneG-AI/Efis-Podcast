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

## Integración con YouTube

Este proyecto incluye una integración completa con la API de YouTube que permite:

- Mostrar los videos y reels más recientes del canal
- Implementar un sistema de caché para reducir llamadas a la API
- Visualizar estadísticas del canal (suscriptores, vistas, etc.)
- Ofrecer acceso directo a los videos en YouTube

### Configuración de la API de YouTube

Para configurar la API de YouTube necesitas:

1. Obtener una clave de API de YouTube desde la [Google Cloud Console](https://console.cloud.google.com/)
2. Habilitar la API de YouTube Data v3 en tu proyecto de Google
3. Añadir la clave de API y el ID del canal en tu archivo `.env.local`:

```
NEXT_PUBLIC_YOUTUBE_API_KEY=tu_clave_api_aquí
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=id_del_canal_aquí
```

Si no configuras estas variables, el sistema utilizará valores predeterminados que pueden estar sujetos a limitaciones de cuota.

### Sistema de Caché

La integración incluye un sistema de caché que:
- Almacena los datos en localStorage
- Actualiza la información cada 7 días
- Reduce significativamente las llamadas a la API
- Mejora la velocidad de carga de la página

Para forzar una actualización de los datos, puedes borrar la caché del navegador o utilizar la función `clearCache()` desde la consola de desarrollo.

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
