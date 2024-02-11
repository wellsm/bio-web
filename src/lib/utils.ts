import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function src(source: string): string {
  return `${import.meta.env.VITE_API_MEDIA_BASE_URL.replace(/^\/|\/$/g, '')}/${source.replace(/^\/|\/$/g, '')}`
}
