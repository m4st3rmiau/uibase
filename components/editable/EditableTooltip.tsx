"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

interface EditableTooltipProps {
  props: {
    triggerText: string
    content: string
    side?: "top" | "right" | "bottom" | "left"
    align?: "start" | "center" | "end"
  }
}

export function EditableTooltip({ props }: EditableTooltipProps) {
  const { triggerText, content, side = "top", align = "center" } = props

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">{triggerText}</Button>
        </TooltipTrigger>
        <TooltipContent side={side} align={align}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
