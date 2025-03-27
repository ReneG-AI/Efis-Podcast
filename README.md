# EFIS PODCAST

Sitio web para Efis Podcast, una plataforma de podcast centrada en crecimiento personal y profesional.

## ⚠️ Problemas con PowerShell en Windows

Si tienes problemas para ejecutar los comandos de Node.js en PowerShell debido a restricciones de seguridad, puedes usar las siguientes alternativas:

### Opción 1: Usar el archivo batch
Simplemente haz doble clic en el archivo `start.bat` incluido en el proyecto para iniciar el servidor.

### Opción 2: Cambiar la política de ejecución de PowerShell
Puedes cambiar temporalmente la política de ejecución de PowerShell ejecutando el siguiente comando como administrador:

```
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### Opción 3: Usar el HTML estático
Si no puedes ejecutar Node.js, puedes abrir directamente el archivo `static-youtube.html` en tu navegador para ver los videos del canal.

## 🚀 Instrucciones de uso

1. Clona este repositorio
2. Configura las variables de entorno en un archivo `.env.local` (usa `.env.example` como referencia)
3. Instala las dependencias: `npm install`
4. Ejecuta el servidor de desarrollo: `npm run dev` o utiliza `start.bat`
5. Abre http://localhost:3000 en tu navegador

## 📋 Estructura del proyecto

- `/src/app`: Rutas y páginas de la aplicación (Next.js App Router)
- `/src/components`: Componentes reutilizables 
- `/src/styles`: Estilos globales y configuración de Tailwind
- `/src/app/youtube-direct/page.tsx`: Página que muestra un iframe con los videos del canal sin API key
- `static-youtube.html`: Versión HTML estática que funciona directamente sin Node.js
- `src/platforms.ts`: Configuración de plataformas y canales

## 📚 Tecnologías

- [Next.js](https://nextjs.org/): Framework de React para desarrollo web
- [TypeScript](https://www.typescriptlang.org/): Superset tipado de JavaScript
- [Tailwind CSS](https://tailwindcss.com/): Framework CSS para diseño rápido y responsive
- [Framer Motion](https://www.framer.com/motion/): Biblioteca para animaciones fluidas
- [YouTube Data API](https://developers.google.com/youtube/v3): API para integración con YouTube

## 🛡️ Seguridad

- Nunca expongas tus claves de API en código público
- No incluyas `NEXT_PUBLIC_` en variables de entorno que contengan secretos
- Usa `.env.local` para variables de entorno locales (este archivo está en `.gitignore`)

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias o mejoras.

## Licencia

Este proyecto está bajo la licencia ISC.
