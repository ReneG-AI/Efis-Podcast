import Image from 'next/image';
import Link from 'next/link';

// Componente de logo EFIS PODCAST con ondas sonoras
export default function Logo({ size = 'normal' }: { size?: 'small' | 'normal' | 'large' }) {
  // Determinando los tamaños basados en la prop size
  const containerClasses = {
    small: 'h-8',
    normal: 'h-12',
    large: 'h-16',
  }[size];

  const textClasses = {
    small: 'text-xl',
    normal: 'text-2xl',
    large: 'text-3xl',
  }[size];

  return (
    <Link href="/" className={`flex items-center ${containerClasses}`}>
      <div className="relative flex items-center">
        {/* Contenedor del logo con efecto de resplandor */}
        <div className="relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-gradient-brand opacity-70 blur-lg"></div>
          
          {/* Logo principal */}
          <div className="relative flex items-center p-1">
            {/* Ondas sonoras a la izquierda */}
            <div className="hidden sm:flex h-full mr-2">
              <WavesEffect />
            </div>
            
            {/* Texto del logo */}
            <div className={`${textClasses} font-extrabold tracking-widest logo-text flex flex-col sm:flex-row items-center`}>
              <span className="text-gradient-brand mr-1">EFIS</span>
              <span className="font-medium text-xs sm:text-sm text-foreground/80 tracking-wider">PODCAST</span>
            </div>
            
            {/* Ondas sonoras a la derecha */}
            <div className="hidden sm:flex h-full ml-2">
              <WavesEffect />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Componente para las ondas sonoras
function WavesEffect() {
  return (
    <div className="flex items-center h-full space-x-0.5">
      <Wave height="40%" delay="0s" />
      <Wave height="65%" delay="0.1s" />
      <Wave height="90%" delay="0.2s" />
      <Wave height="65%" delay="0.3s" />
      <Wave height="40%" delay="0.4s" />
    </div>
  );
}

// Componente para cada onda individual
function Wave({ height, delay }: { height: string; delay: string }) {
  return (
    <div 
      className="w-0.5 bg-gradient-brand rounded-full"
      style={{ 
        height, 
        animation: `wave 1.5s infinite ease-in-out ${delay}`,
        opacity: 0.8
      }}
    />
  );
}

// Agregar la definición de la animación al estilo global
if (typeof document !== 'undefined') {
  // Solo ejecutar en el cliente
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes wave {
      0%, 100% {
        transform: scaleY(1);
      }
      50% {
        transform: scaleY(0.5);
      }
    }
  `;
  document.head.appendChild(styleSheet);
} 