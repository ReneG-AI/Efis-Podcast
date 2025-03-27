import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases de Tailwind con soporte para condiciones
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 