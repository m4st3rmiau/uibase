"use client"

import type React from "react"
import { useDrop } from "react-dnd"
import { useEffect, useCallback } from "react"
import { PreviewComponent } from "@/app/playground/preview-component"
import { WorkflowCanvas } from "./WorkflowCanvas"
import { WorkflowNode } from "./WorkflowNode"
import { ZoomIn } from "lucide-react"

interface PreviewAreaProps {
  onDrop: (item: any) => void
  components: any[]
  onSelectComponent: (component: any) => void
  selectedComponent: any
  theme: string
  radius: string
  mode?: "light" | "dark"
  typography: string
  onDeleteComponent: (id: string) => void
  configPanel: React.ReactNode
  onAddNestedComponent?: (parentId: string, componentType: string, itemIndex?: number) => void
}

export function PreviewArea({
  onDrop,
  components,
  onSelectComponent,
  selectedComponent,
  theme,
  radius,
  mode = "light",
  typography,
  onDeleteComponent,
  configPanel,
  onAddNestedComponent,
}: PreviewAreaProps) {
  const [, drop] = useDrop(() => ({
    accept: "component",
    drop: (item: any, monitor) => {
      const offset = monitor.getClientOffset()
      if (offset) {
        onDrop({ ...item, position: offset })
      }
    },
  }))

  const handleComponentClick = (component: any, event: React.MouseEvent) => {
    event.stopPropagation()
    onSelectComponent(component)
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Delete" && selectedComponent) {
        onDeleteComponent(selectedComponent.id)
      }
    },
    [selectedComponent, onDeleteComponent],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  // Filter out nested components (they will be rendered by their parents)
  const topLevelComponents = components.filter((component) => !component.parentId)

  return (
    <div
      ref={drop}
      className="w-full h-full relative preview-area"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onSelectComponent(null)
        }
      }}
    >
      <WorkflowCanvas
        configPanel={configPanel}
        selectedComponent={selectedComponent}
        onDeleteComponent={onDeleteComponent}
        onClickOutside={() => onSelectComponent(null)}
      >
        <div className="flex flex-col items-center justify-center gap-8 p-8">
          {topLevelComponents.map((component) => (
            <WorkflowNode
              key={component.id}
              title={component.type}
              isSelected={selectedComponent?.id === component.id}
              onClick={(e) => handleComponentClick(component, e)}
            >
              <PreviewComponent
                component={component}
                theme={theme}
                radius={radius}
                mode={mode}
                typography={typography}
                onAddNestedComponent={onAddNestedComponent}
                nestedComponents={components}
                onSelectComponent={onSelectComponent}
                selectedComponent={selectedComponent}
              />
            </WorkflowNode>
          ))}
          {topLevelComponents.length === 0 && (
            <div className="text-center text-muted-foreground p-8 border border-dashed rounded-lg">
              <div className="mb-2">
                <ZoomIn className="h-6 w-6 mx-auto text-muted-foreground/50" />
              </div>
              <p>Drag and drop components here</p>
              <p className="text-sm text-muted-foreground/70 mt-1">Components will appear in the workflow canvas</p>
            </div>
          )}
        </div>
      </WorkflowCanvas>
    </div>
  )
}
