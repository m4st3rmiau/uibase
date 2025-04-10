"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { createContext, useContext, useEffect, useState } from "react"
import type { ThemeRadius, Typography } from "@/lib/themes"

// Define the theme context type
type ThemeContextType = {
  currentTheme: string
  radius: ThemeRadius
  typography: Typography
  setCurrentTheme: (theme: string) => void
  setRadius: (radius: ThemeRadius) => void
  setTypography: (typography: Typography) => void
}

// Create the theme context
const ThemeContext = createContext<ThemeContextType>({
  currentTheme: "zinc",
  radius: "0.5",
  typography: "inter",
  setCurrentTheme: () => {},
  setRadius: () => {},
  setTypography: () => {},
})

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext)

export function Providers({ children, ...props }: ThemeProviderProps) {
  // Theme state
  const [currentTheme, setCurrentTheme] = useState<string>("zinc")
  const [radius, setRadius] = useState<ThemeRadius>("0.5")
  const [typography, setTypography] = useState<Typography>("inter")
  const [mounted, setMounted] = useState(false)

  // Load theme from localStorage on initial mount
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("builderui-theme") || "zinc"
    const savedRadius = (localStorage.getItem("builderui-radius") as ThemeRadius) || "0.5"
    const savedTypography = (localStorage.getItem("builderui-typography") as Typography) || "inter"

    setCurrentTheme(savedTheme)
    setRadius(savedRadius)
    setTypography(savedTypography)
  }, [])

  // Save theme changes to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("builderui-theme", currentTheme)
      localStorage.setItem("builderui-radius", radius)
      localStorage.setItem("builderui-typography", typography)

      // No aplicamos el tema al body aquí para evitar afectar al sistema general
      // Solo guardamos las preferencias en localStorage para persistencia
    }
  }, [currentTheme, radius, typography, mounted])

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        radius,
        typography,
        setCurrentTheme,
        setRadius,
        setTypography,
      }}
    >
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange {...props}>
        {children}
      </NextThemesProvider>
    </ThemeContext.Provider>
  )
}
