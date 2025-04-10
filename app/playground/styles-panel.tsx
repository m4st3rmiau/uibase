"use client"

import { useState } from "react"
import { Code } from "lucide-react"
import { themes, radiusOptions, typographyOptions, type ThemeRadius, type Typography } from "@/lib/themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "@/app/providers"

interface StylesPanelProps {
  onThemeChange?: (theme: string) => void
  onRadiusChange?: (radius: ThemeRadius) => void
  onTypographyChange?: (typography: Typography) => void
}

export function StylesPanel({ onThemeChange, onRadiusChange, onTypographyChange }: StylesPanelProps) {
  const [isCodeDialogOpen, setIsCodeDialogOpen] = useState(false)
  const { currentTheme, radius, typography, setCurrentTheme, setRadius, setTypography } = useTheme()

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme)
    if (onThemeChange) onThemeChange(theme)
  }

  const handleRadiusChange = (radius: ThemeRadius) => {
    setRadius(radius)
    if (onRadiusChange) onRadiusChange(radius)
  }

  const handleTypographyChange = (typography: Typography) => {
    setTypography(typography)
    if (onTypographyChange) onTypographyChange(typography)
  }

  const generateThemeCode = () => {
    const selectedTheme = themes[currentTheme as keyof typeof themes]
    return `
import { createTheme } from "@/components/ui/themes"

export const ${currentTheme}Theme = createTheme({
name: "${selectedTheme.name}",
cssVars: {
${Object.entries(selectedTheme.cssVars)
  .map(([key, value]) => `    ${key}: "${value}"`)
  .join(",\n")}
},
radius: "${radius}",
})
`
  }

  return (
    <div className="space-y-[16px]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Color</Label>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {Object.values(themes).map((t) => (
            <Button
              key={t.name}
              variant="outline"
              className={cn("justify-center gap-2 h-auto p-2", currentTheme === t.name && "border-2 border-primary")}
              onClick={() => handleThemeChange(t.name)}
            >
              <span className="h-4 w-4 rounded-full" style={{ backgroundColor: t.activeColor }} />
              {t.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Radius</Label>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {radiusOptions.map((r) => (
            <Button
              key={r.value}
              variant="outline"
              className={cn("h-auto p-2", radius === r.value && "border-2 border-primary")}
              onClick={() => handleRadiusChange(r.value)}
            >
              {r.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Typography</Label>
        </div>
        <Select value={typography} onValueChange={handleTypographyChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            {typographyOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Dialog open={isCodeDialogOpen} onOpenChange={setIsCodeDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <Code className="mr-2 h-4 w-4" />
            View Code
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Theme Code</DialogTitle>
          </DialogHeader>
          <ScrollArea className="mt-4 h-[350px] w-full rounded-md border p-4">
            <pre className="text-sm">
              <code>{generateThemeCode()}</code>
            </pre>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}
