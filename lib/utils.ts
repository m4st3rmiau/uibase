import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function applyTheme(element: HTMLElement, theme: any) {
  if (!theme) return

  // Limpiar clases de tema anteriores
  const themeClasses = Array.from(element.classList).filter((cls) => cls.startsWith("theme-"))
  themeClasses.forEach((cls) => element.classList.remove(cls))

  // Aplicar clase de tema
  if (theme.name) {
    element.classList.add(`theme-${theme.name}`)
  }

  // Aplicar CSS variables
  if (theme.cssVars) {
    Object.entries(theme.cssVars).forEach(([key, value]) => {
      element.style.setProperty(key, value as string)
    })
  }

  // Aplicar radio
  if (theme.borderRadius) {
    element.style.setProperty("--radius", `${theme.borderRadius}rem`)
  }

  // Aplicar modo (light/dark)
  if (theme.mode === "dark") {
    element.classList.add("dark")
  } else {
    element.classList.remove("dark")
  }

  // Aplicar tipografía
  if (theme.fontFamily) {
    element.style.setProperty("--font-sans", theme.fontFamily)
    if (!element.classList.contains(theme.fontFamily)) {
      element.classList.add(theme.fontFamily)
    }
  }
}
