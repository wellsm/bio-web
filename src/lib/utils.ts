import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function src(source: string): string {
  if (source.includes('http://') || source.includes('https://')) {
    return source;
  }

  return `${import.meta.env.VITE_API_MEDIA_BASE_URL.replace(/^\/|\/$/g, '')}/${source.replace(/^\/|\/$/g, '')}`
}

export function fallback(name: string, size: number = 2): string {
  return name.split(' ').map(l => l.substring(0, 1)).splice(0, size).join('');
}