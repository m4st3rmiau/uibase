"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Sidebar } from "@/components/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Maximize2, BarChart, Mail, ListTodo, Music, Layout, Palette } from "lucide-react"
import { useTheme } from "@/app/providers"
import { applyTheme } from "@/lib/utils"
import { themes } from "@/lib/themes"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { ThemeRadius } from "@/app/providers"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import CodeViewer from "@/components/CodeViewer"

export default function ThemesPage() {
  const { currentTheme, radius, typography, setCurrentTheme, setRadius } = useTheme()
  const [activeTab, setActiveTab] = useState("cards")
  const [themeColors, setThemeColors] = useState<any>({})
  const [isCodeDialogOpen, setIsCodeDialogOpen] = useState(false)

  const handleViewThemeCode = () => {
    setIsCodeDialogOpen(true)
  }

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme)
  }

  const handleRadiusChange = (radius: ThemeRadius) => {
    setRadius(radius)
  }

  // Extract theme colors for the palette display
  useEffect(() => {
    if (!currentTheme) return

    const theme = themes[currentTheme as keyof typeof themes]
    if (!theme) return

    // Convert HSL values from theme.cssVars to displayable colors
    const convertHslToColor = (hslValue: string) => {
      if (!hslValue) return ""
      return `hsl(${hslValue})`
    }

    const colors = {
      // Primary Theme Colors
      background: convertHslToColor(theme.cssVars["--background"]),
      foreground: convertHslToColor(theme.cssVars["--foreground"]),
      primary: convertHslToColor(theme.cssVars["--primary"]),
      primaryForeground: convertHslToColor(theme.cssVars["--primary-foreground"]),

      // Secondary & Accent Colors
      secondary: convertHslToColor(theme.cssVars["--secondary"]),
      secondaryForeground: convertHslToColor(theme.cssVars["--secondary-foreground"]),
      accent: convertHslToColor(theme.cssVars["--accent"]),
      accentForeground: convertHslToColor(theme.cssVars["--accent-foreground"]),

      // UI Component Colors
      card: convertHslToColor(theme.cssVars["--card"]),
      cardForeground: convertHslToColor(theme.cssVars["--card-foreground"]),
      popover: convertHslToColor(theme.cssVars["--popover"]),
      popoverForeground: convertHslToColor(theme.cssVars["--popover-foreground"]),
      muted: convertHslToColor(theme.cssVars["--muted"]),
      mutedForeground: convertHslToColor(theme.cssVars["--muted-foreground"]),

      // Utility & Form Colors
      border: convertHslToColor(theme.cssVars["--border"]),
      input: convertHslToColor(theme.cssVars["--input"]),
      ring: convertHslToColor(theme.cssVars["--ring"]),
    }

    setThemeColors(colors)
  }, [currentTheme])

  // Apply theme to component preview containers
  useEffect(() => {
    const theme = themes[currentTheme as keyof typeof themes]
    if (theme) {
      // Apply theme to the preview containers
      const previewContainers = document.querySelectorAll(".theme-preview-container")
      previewContainers.forEach((container) => {
        applyTheme(container as HTMLElement, {
          ...theme,
          borderRadius: radius,
          fontFamily: typography,
        })
      })

      // Also apply theme to the active tab content
      const activeTabContent = document.querySelector(`[data-state="active"][role="tabpanel"]`)
      if (activeTabContent) {
        applyTheme(activeTabContent as HTMLElement, {
          ...theme,
          borderRadius: radius,
          fontFamily: typography,
        })
      }
    }
  }, [currentTheme, radius, typography, activeTab])

  const radiusOptions = [
    { label: "0", value: "0" },
    { label: "0.3", value: "0.3" },
    { label: "0.5", value: "0.5" },
    { label: "0.75", value: "0.75" },
    { label: "1.0", value: "1.0" },
  ]

  // Color swatch component
  const ColorSwatch = ({ color, name }: { color: string; name: string }) => {
    return (
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded border border-border" style={{ backgroundColor: color }}></div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{color}</p>
        </div>
      </div>
    )
  }

  // Generate theme code for viewing with both light and dark mode
  const getThemeCode = () => {
    // Theme CSS variables based on the selected theme
    const themeVars = {
      zinc: {
        light: `    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: ${radius}rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;`,
        dark: `    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;`,
      },
      red: {
        light: `    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 0 72.2% 50.6%;
    --primary-foreground: 0 85.7% 97.3%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 72.2% 50.6%;
    --radius: ${radius}rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;`,
        dark: `    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 72.2% 50.6%;
    --primary-foreground: 0 85.7% 97.3%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 72.2% 50.6%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;`,
      },
      rose: {
        light: `    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 346.8 77.2% 49.8%;
    --primary-foreground: 355.7 100% 97.3%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 346.8 77.2% 49.8%;
    --radius: ${radius}rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;`,
        dark: `    --background: 20 14.3% 4.1%;
    --foreground: 0 0% 95%;
    --card: 24 9.8% 10%;
    --card-foreground: 0 0% 95%;
    --popover: 0 0% 9%;
    --popover-foreground: 0 0% 95%;
    --primary: 346.8 77.2% 49.8%;
    --primary-foreground: 355.7 100% 97.3%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 15%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 12 6.5% 15.1%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 346.8 77.2% 49.8%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;`,
      },
      orange: {
        light: `    --background: 0 0% 100%;
    --foreground: 20 14.3% 4.1%;
    --card: 0 0% 100%;
    --card-foreground: 20 14.3% 4.1%;
    --popover: 0 0% 100%;
    --popover-foreground: 20 14.3% 4.1%;
    --primary: 24.6 95% 53.1%;
    --primary-foreground: 60 9.1% 97.8%;
    --secondary: 60 4.8% 95.9%;
    --secondary-foreground: 24 9.8% 10%;
    --muted: 60 4.8% 95.9%;
    --muted-foreground: 25 5.3% 44.7%;
    --accent: 60 4.8% 95.9%;
    --accent-foreground: 24 9.8% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 60 9.1% 97.8%;
    --border: 20 5.9% 90%;
    --input: 20 5.9% 90%;
    --ring: 24.6 95% 53.1%;
    --radius: ${radius}rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;`,
        dark: `    --background: 20 14.3% 4.1%;
    --foreground: 60 9.1% 97.8%;
    --card: 20 14.3% 4.1%;
    --card-foreground: 60 9.1% 97.8%;
    --popover: 20 14.3% 4.1%;
    --popover-foreground: 60 9.1% 97.8%;
    --primary: 20.5 90.2% 48.2%;
    --primary-foreground: 60 9.1% 97.8%;
    --secondary: 12 6.5% 15.1%;
    --secondary-foreground: 60 9.1% 97.8%;
    --muted: 12 6.5% 15.1%;
    --muted-foreground: 24 5.4% 63.9%;
    --accent: 12 6.5% 15.1%;
    --accent-foreground: 60 9.1% 97.8%;
    --destructive: 0 72.2% 50.6%;
    --destructive-foreground: 60 9.1% 97.8%;
    --border: 12 6.5% 15.1%;
    --input: 12 6.5% 15.1%;
    --ring: 20.5 90.2% 48.2%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;`,
      },
      green: {
        light: `    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 142.1 76.2% 36.3%;
    --primary-foreground: 355.7 100% 97.3%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 142.1 76.2% 36.3%;
    --radius: ${radius}rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;`,
        dark: `    --background: 20 14.3% 4.1%;
    --foreground: 0 0% 95%;
    --card: 24 9.8% 10%;
    --card-foreground: 0 0% 95%;
    --popover: 0 0% 9%;
    --popover-foreground: 0 0% 95%;
    --primary: 142.1 70.6% 45.3%;
    --primary-foreground: 144.9 80.4% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 15%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 12 6.5% 15.1%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 142.4 71.8% 29.2%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;`,
      },
      blue: {
        light: `    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: ${radius}rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;`,
        dark: `    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;`,
      },
      yellow: {
        light: `    --background: 0 0% 100%;
    --foreground: 20 14.3% 4.1%;
    --card: 0 0% 100%;
    --card-foreground: 20 14.3% 4.1%;
    --popover: 0 0% 100%;
    --popover-foreground: 20 14.3% 4.1%;
    --primary: 47.9 95.8% 53.1%;
    --primary-foreground: 26 83.3% 14.1%;
    --secondary: 60 4.8% 95.9%;
    --secondary-foreground: 24 9.8% 10%;
    --muted: 60 4.8% 95.9%;
    --muted-foreground: 25 5.3% 44.7%;
    --accent: 60 4.8% 95.9%;
    --accent-foreground: 24 9.8% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 60 9.1% 97.8%;
    --border: 20 5.9% 90%;
    --input: 20 5.9% 90%;
    --ring: 47.9 95.8% 53.1%;
    --radius: ${radius}rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;`,
        dark: `    --background: 20 14.3% 4.1%;
    --foreground: 60 9.1% 97.8%;
    --card: 20 14.3% 4.1%;
    --card-foreground: 60 9.1% 97.8%;
    --popover: 20 14.3% 4.1%;
    --popover-foreground: 60 9.1% 97.8%;
    --primary: 47.9 95.8% 53.1%;
    --primary-foreground: 26 83.3% 14.1%;
    --secondary: 12 6.5% 15.1%;
    --secondary-foreground: 60 9.1% 97.8%;
    --muted: 12 6.5% 15.1%;
    --muted-foreground: 24 5.4% 63.9%;
    --accent: 12 6.5% 15.1%;
    --accent-foreground: 60 9.1% 97.8%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 60 9.1% 97.8%;
    --border: 12 6.5% 15.1%;
    --input: 12 6.5% 15.1%;
    --ring: 35.5 91.7% 32.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;`,
      },
      violet: {
        light: `    --background: 0 0% 100%;
    --foreground: 224 71.4% 4.1%;
    --card: 0 0% 100%;
    --card-foreground: 224 71.4% 4.1%;
    --popover: 0 0% 100%;
    --popover-foreground: 224 71.4% 4.1%;
    --primary: 262.1 83.3% 57.8%;
    --primary-foreground: 210 20% 98%;
    --secondary: 220 14.3% 95.9%;
    --secondary-foreground: 220.9 39.3% 11%;
    --muted: 220 14.3% 95.9%;
    --muted-foreground: 220 8.9% 46.1%;
    --accent: 220 14.3% 95.9%;
    --accent-foreground: 220.9 39.3% 11%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 20% 98%;
    --border: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: 262.1 83.3% 57.8%;
    --radius: ${radius}rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;`,
        dark: `    --background: 224 71.4% 4.1%;
    --foreground: 210 20% 98%;
    --card: 224 71.4% 4.1%;
    --card-foreground: 210 20% 98%;
    --popover: 224 71.4% 4.1%;
    --popover-foreground: 210 20% 98%;
    --primary: 263.4 70% 50.4%;
    --primary-foreground: 210 20% 98%;
    --secondary: 215 27.9% 16.9%;
    --secondary-foreground: 210 20% 98%;
    --muted: 215 27.9% 16.9%;
    --muted-foreground: 217.9 10.6% 64.9%;
    --accent: 215 27.9% 16.9%;
    --accent-foreground: 210 20% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 20% 98%;
    --border: 215 27.9% 16.9%;
    --input: 215 27.9% 16.9%;
    --ring: 263.4 70% 50.4%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;`,
      },
    }

    return `@layer base {
  :root {
${themeVars[currentTheme as keyof typeof themeVars]?.light || themeVars.blue.light}
  }

  .dark {
${themeVars[currentTheme as keyof typeof themeVars]?.dark || themeVars.blue.dark}
  }
}`
  }

  return (
    <div className="fixed inset-0 bg-background">
      <div className="grid h-full" style={{ gridTemplateColumns: "4rem 1fr" }}>
        {/* Sidebar */}
        <Sidebar initialSelectedIcon="palette" />

        {/* Main Content */}
        <div className="overflow-hidden">
          <div className="h-14 border-b border-border flex items-center px-4 justify-between">
            <h1 className="text-sm font-medium">Themes</h1>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="border-b border-border p-4 flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-2 mr-4">
              {Object.values(themes).map((t) => (
                <Button
                  key={t.name}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "rounded-full px-0 h-8 w-8 flex items-center justify-center bg-background",
                    currentTheme === t.name && "border-primary",
                  )}
                  onClick={() => handleThemeChange(t.name)}
                  title={t.label}
                >
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: t.activeColor }}></div>
                </Button>
              ))}
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex gap-2 ml-4">
              {radiusOptions.map((r) => (
                <Button
                  key={r.value}
                  variant="outline"
                  size="sm"
                  className={cn("h-8 w-8 rounded-full", radius === r.value && "bg-background border-primary")}
                  onClick={() => handleRadiusChange(r.value)}
                >
                  {r.label}
                </Button>
              ))}
            </div>
            <div className="ml-auto">
              <Button size="sm" className="bg-black text-white hover:bg-black/90" onClick={handleViewThemeCode}>
                View code
              </Button>
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-7.5rem)]" type="always">
            <div className="p-4 pb-16 space-y-4">
              <div className="theme-preview-container">
                <Tabs defaultValue="cards" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="bg-background/50 p-1">
                    <TabsTrigger value="cards" className="flex items-center gap-1.5">
                      <Layout className="h-4 w-4" />
                      <span>Cards</span>
                    </TabsTrigger>
                    <TabsTrigger value="mail" className="flex items-center gap-1.5">
                      <Mail className="h-4 w-4" />
                      <span>Mail</span>
                    </TabsTrigger>
                    <TabsTrigger value="tasks" className="flex items-center gap-1.5">
                      <ListTodo className="h-4 w-4" />
                      <span>Tasks</span>
                    </TabsTrigger>
                    <TabsTrigger value="music" className="flex items-center gap-1.5">
                      <Music className="h-4 w-4" />
                      <span>Music</span>
                    </TabsTrigger>
                    <TabsTrigger value="dashboard" className="flex items-center gap-1.5">
                      <BarChart className="h-4 w-4" />
                      <span>Dashboard</span>
                    </TabsTrigger>
                    <TabsTrigger value="palette" className="flex items-center gap-1.5">
                      <Palette className="h-4 w-4" />
                      <span>Color Palette</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Cards Tab */}
                  <TabsContent value="cards" className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage src="/placeholder.svg?height=40&width=40" />
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">John Doe</p>
                              <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                            </div>
                          </div>
                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Plan:</span>
                              <Badge>Pro</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Billing Cycle:</span>
                              <span className="text-sm">Monthly</span>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-between">
                            <Button variant="outline" size="sm">
                              Cancel
                            </Button>
                            <Button size="sm">Upgrade</Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6 space-y-4">
                          <h3 className="font-medium">Notifications</h3>
                          <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Email Notifications</span>
                              <div className="h-4 w-8 bg-primary rounded-full relative">
                                <div className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full bg-white"></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Push Notifications</span>
                              <div className="h-4 w-8 bg-primary rounded-full relative">
                                <div className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full bg-white"></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">SMS Notifications</span>
                              <div className="h-4 w-8 bg-muted rounded-full relative">
                                <div className="absolute left-0.5 top-0.5 h-3 w-3 rounded-full bg-white"></div>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" className="w-full mt-2">
                            Save Preferences
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Mail Tab */}
                  <TabsContent value="mail" className="p-4">
                    <Card>
                      <CardContent className="p-0">
                        <div className="p-3 border-b">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">Inbox</h3>
                            <Badge>3 new</Badge>
                          </div>
                        </div>
                        <div className="divide-y">
                          <div className="p-3 hover:bg-muted/50 cursor-pointer">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>TS</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium">Team Standup</p>
                                  <p className="text-xs text-muted-foreground line-clamp-1">
                                    Daily standup meeting at 10:00 AM
                                  </p>
                                </div>
                              </div>
                              <span className="text-xs text-muted-foreground">09:45 AM</span>
                            </div>
                          </div>
                          <div className="p-3 hover:bg-muted/50 cursor-pointer bg-muted/20">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium">Jane Doe</p>
                                  <p className="text-xs text-muted-foreground line-clamp-1">
                                    Project update: We've completed the initial design phase
                                  </p>
                                </div>
                              </div>
                              <span className="text-xs text-muted-foreground">Yesterday</span>
                            </div>
                          </div>
                          <div className="p-3 hover:bg-muted/50 cursor-pointer">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>MS</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium">Marketing Strategy</p>
                                  <p className="text-xs text-muted-foreground line-clamp-1">
                                    Review the Q3 marketing strategy and campaign plans
                                  </p>
                                </div>
                              </div>
                              <span className="text-xs text-muted-foreground">Aug 15</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-2 border-t text-center">
                          <Button variant="ghost" size="sm">
                            View All
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Tasks Tab */}
                  <TabsContent value="tasks" className="p-4">
                    <Card>
                      <CardContent className="p-0">
                        <div className="p-3 border-b">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">Tasks</h3>
                            <Badge variant="outline">5/8 completed</Badge>
                          </div>
                        </div>
                        <div className="divide-y">
                          <div className="p-3 flex items-center">
                            <div className="h-4 w-4 rounded border border-primary mr-3 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-sm bg-primary"></div>
                            </div>
                            <span className="text-sm line-through opacity-70">Update user documentation</span>
                          </div>
                          <div className="p-3 flex items-center">
                            <div className="h-4 w-4 rounded border border-primary mr-3 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-sm bg-primary"></div>
                            </div>
                            <span className="text-sm line-through opacity-70">Create wireframes for new feature</span>
                          </div>
                          <div className="p-3 flex items-center">
                            <div className="h-4 w-4 rounded border border-input mr-3"></div>
                            <span className="text-sm">Review pull requests</span>
                          </div>
                          <div className="p-3 flex items-center">
                            <div className="h-4 w-4 rounded border border-input mr-3"></div>
                            <span className="text-sm">Prepare presentation for stakeholders</span>
                          </div>
                          <div className="p-3 flex items-center">
                            <div className="h-4 w-4 rounded border border-input mr-3"></div>
                            <span className="text-sm">Deploy application to production</span>
                          </div>
                        </div>
                        <div className="p-2 border-t flex justify-between">
                          <Button variant="ghost" size="sm">
                            Add Task
                          </Button>
                          <Button variant="outline" size="sm">
                            View All
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Music Tab */}
                  <TabsContent value="music" className="p-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="h-40 w-40 bg-muted rounded-md flex items-center justify-center">
                            <Music className="h-16 w-16 text-muted-foreground/50" />
                          </div>
                          <div className="text-center">
                            <h3 className="font-medium">Midnight Serenade</h3>
                            <p className="text-sm text-muted-foreground">Ambient Orchestra</p>
                          </div>
                          <div className="w-full">
                            <div className="h-1 w-full bg-muted rounded-full">
                              <div className="h-1 w-1/3 bg-primary rounded-full"></div>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>1:23</span>
                              <span>3:45</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <polygon points="19 20 9 12 19 4 19 20"></polygon>
                                <line x1="5" y1="19" x2="5" y2="5"></line>
                              </svg>
                            </Button>
                            <Button variant="default" size="icon" className="h-10 w-10 rounded-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                              >
                                <rect x="6" y="4" width="4" height="16"></rect>
                                <rect x="14" y="4" width="4" height="16"></rect>
                              </svg>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <polygon points="5 4 15 12 5 20 5 4"></polygon>
                                <line x1="19" y1="5" x2="19" y2="19"></line>
                              </svg>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Dashboard Tab */}
                  <TabsContent value="dashboard" className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-medium">Total Revenue</h3>
                          <div className="space-y-1 mt-2">
                            <div className="text-3xl font-bold">$15,231.89</div>
                            <div className="text-sm text-muted-foreground flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 mr-1 text-green-500"
                              >
                                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                                <polyline points="16 7 22 7 22 13"></polyline>
                              </svg>
                              <span>+20.1% from last month</span>
                            </div>
                          </div>
                          <div className="mt-4 h-[60px] flex items-end justify-between">
                            {[0.3, 0.5, 0.4, 0.3, 0.2, 0.3, 0.5, 0.8].map((value, i) => (
                              <div
                                key={i}
                                className="w-[8%] bg-primary/20 rounded-sm"
                                style={{ height: `${value * 100}%` }}
                              >
                                <div
                                  className="w-full bg-primary rounded-sm"
                                  style={{ height: `${value * 60}%` }}
                                ></div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-medium">Subscriptions</h3>
                          <div className="space-y-1 mt-2">
                            <div className="text-3xl font-bold">+2350</div>
                            <div className="text-sm text-muted-foreground flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 mr-1 text-green-500"
                              >
                                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                                <polyline points="16 7 22 7 22 13"></polyline>
                              </svg>
                              <span>+180.1% from last month</span>
                            </div>
                          </div>
                          <div className="mt-4 h-[60px] flex items-end justify-between">
                            {[0.6, 0.7, 0.5, 0.6, 0.4, 0.5, 0.7, 0.5].map((value, i) => (
                              <div
                                key={i}
                                className="w-[8%] bg-primary rounded-sm"
                                style={{ height: `${value * 100}%` }}
                              ></div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="mt-4">
                      <CardContent className="p-6">
                        <h3 className="font-medium">Create an account</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Enter your email below to create your account
                        </p>
                        <div className="grid gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="w-full">
                              <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                              Github
                            </Button>
                            <Button variant="outline" className="w-full">
                              <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path
                                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                  viewBox="0 0 24 24"
                                />
                              </svg>
                              Google
                            </Button>
                          </div>
                          <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                              <Separator className="w-full" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                            </div>
                          </div>
                          <div className="grid gap-2">
                            <label className="text-sm font-medium leading-none" htmlFor="email">
                              Email
                            </label>
                            <Input id="email" placeholder="m@example.com" />
                          </div>
                          <div className="grid gap-2">
                            <label className="text-sm font-medium leading-none" htmlFor="password">
                              Password
                            </label>
                            <Input id="password" type="password" />
                          </div>
                          <Button className="w-full">Create account</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Color Palette Tab */}
                  <TabsContent value="palette" className="p-4 overflow-visible">
                    <Card>
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-medium mb-4">Primary Theme Colors</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <ColorSwatch color={themeColors.background} name="Background" />
                              <ColorSwatch color={themeColors.foreground} name="Foreground" />
                              <ColorSwatch color={themeColors.primary} name="Primary" />
                              <ColorSwatch color={themeColors.primaryForeground} name="Primary Foreground" />
                            </div>
                          </div>

                          <Separator />

                          <div>
                            <h3 className="text-lg font-medium mb-4">Secondary & Accent Colors</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <ColorSwatch color={themeColors.secondary} name="Secondary" />
                              <ColorSwatch color={themeColors.secondaryForeground} name="Secondary Foreground" />
                              <ColorSwatch color={themeColors.accent} name="Accent" />
                              <ColorSwatch color={themeColors.accentForeground} name="Accent Foreground" />
                            </div>
                          </div>

                          <Separator />

                          <div>
                            <h3 className="text-lg font-medium mb-4">UI Component Colors</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <ColorSwatch color={themeColors.card} name="Card" />
                              <ColorSwatch color={themeColors.cardForeground} name="Card Foreground" />
                              <ColorSwatch color={themeColors.popover} name="Popover" />
                              <ColorSwatch color={themeColors.popoverForeground} name="Popover Foreground" />
                              <ColorSwatch color={themeColors.muted} name="Muted" />
                              <ColorSwatch color={themeColors.mutedForeground} name="Muted Foreground" />
                            </div>
                          </div>

                          <Separator />

                          <div>
                            <h3 className="text-lg font-medium mb-4">Utility & Form Colors</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <ColorSwatch color={themeColors.border} name="Border" />
                              <ColorSwatch color={themeColors.input} name="Input" />
                              <ColorSwatch color={themeColors.ring} name="Ring" />
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded border border-border bg-background"></div>
                                <div>
                                  <p className="font-medium">Radius</p>
                                  <p className="text-xs text-muted-foreground">{radius}rem</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
      {/* Theme Code Dialog */}
      <Dialog open={isCodeDialogOpen} onOpenChange={setIsCodeDialogOpen}>
        <DialogContent className="w-[90vw] max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Theme Code</DialogTitle>
          </DialogHeader>
          <div className="bg-[#101012] rounded-md overflow-hidden h-[calc(90vh-8rem)]">
            <CodeViewer code={getThemeCode()} language="javascript" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
