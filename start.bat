@echo off
echo ===================================
echo    EFIS PODCAST - INICIANDO APP
echo ===================================
echo.

cd %~dp0
echo Directorio: %CD%
echo.

echo Comprobando variables de entorno...
if exist .env.local (
  echo Archivo .env.local encontrado
  echo Se verificarán las claves de YouTube:
  
  findstr "NEXT_PUBLIC_YOUTUBE_API_KEY" .env.local
  findstr "NEXT_PUBLIC_YOUTUBE_CHANNEL_ID" .env.local
  
  echo.
) else (
  echo ADVERTENCIA: No se encontró archivo .env.local
  echo Creando archivo .env.local básico...
  
  echo # API URLs > .env.local
  echo NEXT_PUBLIC_API_URL=http://localhost:3000/api >> .env.local
  echo. >> .env.local
  echo # YouTube API >> .env.local
  echo NEXT_PUBLIC_YOUTUBE_API_KEY=AIzaSyDlZTI4JfF8uzwjKcdtDau8mgP8VKfBRQ0 >> .env.local
  echo NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=UCj_orkn7ilVdxmpElajgEfQ >> .env.local
  echo. >> .env.local
  echo # Configuración del sitio >> .env.local
  echo NEXT_PUBLIC_SITE_URL=http://localhost:3000 >> .env.local
  echo NEXT_PUBLIC_SITE_NAME=Efis Podcast >> .env.local
  
  echo Archivo .env.local creado con configuración básica.
  echo.
)

echo Ejecutando servidor Next.js...
echo.
call node_modules\.bin\next dev

pause 