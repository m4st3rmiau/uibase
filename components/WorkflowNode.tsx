"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface WorkflowNodeProps {
  children: React.ReactNode
  title: string
  isSelected?: boolean
  onClick?: (event: React.MouseEvent) => void
}

export function WorkflowNode({ children, title, isSelected, onClick }: WorkflowNodeProps) {
  return (
    <div className="relative group" onClick={onClick}>
      {/* Component Label */}
      {isSelected && (
        <div className="absolute -top-7 left-0 text-xs text-background bg-primary px-2 py-1 rounded-md">
          {title.toLowerCase()}
        </div>
      )}

      {/* Component Container */}
      <div
        className={cn(
          "relative rounded-lg overflow-visible transition-all",
          isSelected ? "ring-1 ring-primary p-2" : "hover:ring-1 hover:ring-primary/50 p-2",
        )}
      >
        {/* Component Content */}
        <div className="relative">{children}</div>
      </div>
    </div>
  )
}
