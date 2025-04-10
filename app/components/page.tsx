"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { componentConfig } from "@/config/componentConfig"
import { Sidebar } from "@/components/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useEffect } from "react"
import { useTheme } from "@/app/providers"
import { applyTheme } from "@/lib/utils"
import { themes } from "@/lib/themes"

export default function ComponentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { currentTheme, radius, typography } = useTheme()

  const filteredComponents = Object.entries(componentConfig).filter(([key]) =>
    key.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Apply theme to component preview containers
  useEffect(() => {
    const theme = themes[currentTheme as keyof typeof themes]
    if (theme && componentConfig) {
      // Aplicar tema solo a los contenedores de componentes
      const previewContainers = document.querySelectorAll(".component-preview-container")
      previewContainers.forEach((container) => {
        applyTheme(container as HTMLElement, {
          ...theme,
          borderRadius: radius,
          fontFamily: typography,
        })
      })
    }
  }, [currentTheme, radius, typography])

  return (
    <div className="fixed inset-0 top-16 bg-background border-t border-border">
      <div className="grid h-full" style={{ gridTemplateColumns: "4rem 1fr" }}>
        {/* Sidebar */}
        <Sidebar initialSelectedIcon="book" />

        {/* Main Content */}
        <div className="overflow-hidden">
          <div className="h-14 border-b border-border flex items-center px-4 justify-between">
            <h1 className="text-sm font-medium">Components</h1>
          </div>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="p-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search components..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredComponents.map(([key, config]) => (
                  <Card key={key} className="flex flex-col border-b border-border shadow-none">
                    <CardHeader>
                      <CardTitle className="text-md">{key}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="p-4 border border-border rounded-md component-preview-container">
                        {config.component && <config.component props={config.defaultProps} />}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
