"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"

interface WorkflowCanvasProps {
  children: React.ReactNode
  className?: string
  configPanel?: React.ReactNode
  selectedComponent: any
  onDeleteComponent?: (id: string) => void
  onClickOutside?: () => void
}

export function WorkflowCanvas({
  children,
  className,
  configPanel,
  selectedComponent,
  onDeleteComponent,
  onClickOutside,
}: WorkflowCanvasProps) {
  const [zoom, setZoom] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.1, 2))
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.5))
  const handleResetZoom = () => setZoom(1)

  const handleDeleteComponent = () => {
    if (selectedComponent && onDeleteComponent) {
      onDeleteComponent(selectedComponent.id)
      toast.success("Component deleted")
    }
  }

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || e.target === containerRef.current?.firstChild) {
      onClickOutside?.()
    }
  }

  const contentStyle =
    selectedComponent && configPanel ? { width: "calc(100% - 320px)", marginLeft: 0 } : { width: "100%", marginLeft: 0 }

  return (
    <div className="relative w-full h-full overflow-hidden flex">
      {/* Main Canvas Area */}
      <div
        className="flex-1 relative transition-all duration-200 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 bg-grid-pattern"
        style={contentStyle}
      >
        {/* Zoom Controls */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-background rounded-lg border shadow-sm p-2 z-10">
          <Button variant="outline" size="icon" onClick={handleZoomOut} className="h-8 w-8">
            <Minus className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleResetZoom} className="h-8 px-2 text-xs font-medium">
            {Math.round(zoom * 100)}%
          </Button>
          <Button variant="outline" size="icon" onClick={handleZoomIn} className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Canvas Content */}
        <div
          ref={containerRef}
          className={cn("w-full h-full flex items-center justify-center", className)}
          onClick={handleCanvasClick}
        >
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "center center",
            }}
            className="transition-transform duration-200"
          >
            {children}
          </div>
        </div>
      </div>

      {/* Config Panel */}
      {selectedComponent && configPanel && (
        <div className="w-80 h-full border-l border-border bg-background overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-3 border-b">
            <h3 className="text-sm font-medium">{selectedComponent.type} Settings</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={handleDeleteComponent}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4">{configPanel}</div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}
