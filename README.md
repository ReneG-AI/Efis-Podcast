# Efis Podcast Website

Sitio web oficial para un podcast sobre desarrollo personal y profesional.

> ⚠️ Este es un repositorio privado. Para contribuir, contacta al administrador del proyecto.

## Características

- Sitio web moderno y responsive
- Integración con servicios de streaming
- Listado de episodios y contenido multimedia
- Modo oscuro/claro automático
- Optimizado para SEO y rendimiento

## Instalación

1. Clona el repositorio (requiere acceso):
```bash
git clone [URL_REPOSITORIO]
cd [NOMBRE_DIRECTORIO]
```

2. Instala dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
   - Copia el archivo `.env.example` a `.env.local`
   - Rellena las variables según las instrucciones en el archivo
   - El script `start.bat` puede ayudarte a configurar lo básico

## Integración con API de contenido multimedia

Este proyecto incluye integración con APIs para mostrar contenido multimedia que permite:

- Visualizar contenido reciente
- Sistema de caché para optimizar rendimiento
- Estadísticas y métricas
- Enlaces directos a las plataformas originales

### Configuración de APIs

Para configurar las integraciones necesitas:

1. Obtener las claves de API necesarias desde los respectivos proveedores
2. Habilitar los servicios requeridos en cada plataforma
3. Añadir las claves en tu archivo `.env.local` siguiendo el formato del ejemplo

```
NEXT_PUBLIC_API_KEY=tu_clave_aquí
NEXT_PUBLIC_CHANNEL_ID=tu_id_aquí
```

El sistema tiene valores predeterminados de ejemplo para desarrollo, pero están sujetos a limitaciones.

### Sistema de Caché

La integración incluye un sistema de caché que:
- Almacena los datos localmente en el navegador
- Actualiza la información periódicamente
- Reduce significativamente las llamadas a las APIs
- Mejora la velocidad de carga de la página

Para forzar una actualización de los datos durante el desarrollo, puedes limpiar el almacenamiento del navegador.

## Ejecutar en desarrollo

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
- `public/` - Archivos estáticos

## Despliegue

La aplicación está optimizada para ser desplegada en plataformas modernas:

```bash
npm run build
```

## Colaboración

1. Solicita acceso al repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Seguridad

- No compartas tus claves de API
- No subas archivos `.env` al repositorio
- Mantén actualizadas las dependencias
- Reporta cualquier problema de seguridad al administrador
