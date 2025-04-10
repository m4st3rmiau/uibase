"use client"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"

interface EditableHoverCardProps {
  props: {
    triggerText: string
    content: string
  }
}

export function EditableHoverCard({ props }: EditableHoverCardProps) {
  const { triggerText, content } = props

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">{triggerText}</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <div className="space-y-2">
          <p className="text-sm">{content}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
