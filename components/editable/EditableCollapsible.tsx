"use client"

import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface EditableCollapsibleProps {
  props: {
    triggerText: string
    content: string[]
    open: boolean
    disabled?: boolean
    icon?: "chevron" | "plus" | "arrow"
    iconPosition?: "left" | "right"
    variant?: "default" | "ghost" | "outline"
    size?: "sm" | "default" | "lg"
    fullWidth?: boolean
    rounded?: boolean
    animated?: boolean
  }
}

export function EditableCollapsible({ props }: EditableCollapsibleProps) {
  const {
    triggerText,
    content,
    open: initialOpen,
    disabled = false,
    icon = "chevron",
    iconPosition = "right",
    variant = "default",
    size = "default",
    fullWidth = true,
    rounded = true,
    animated = true,
  } = props

  const [isOpen, setIsOpen] = useState(initialOpen)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={cn("w-full space-y-2")}>
      <div className="flex items-center justify-between space-x-4 px-1">
        <h4 className="text-sm font-semibold">{triggerText}</h4>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-9 p-0"
            onClick={() => setIsOpen(!isOpen)} // Agregamos el manejador onClick
          >
            <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        {content.map((item, index) => (
          <div key={index} className={cn("rounded-md border border-border bg-card px-4 py-3 font-mono text-sm")}>
            {item}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
