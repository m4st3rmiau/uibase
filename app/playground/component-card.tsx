"use client"
import { Pencil, Trash2, GripVertical } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface ComponentCardProps {
  component: {
    id: string
    type: string
    props: Record<string, any>
  }
  onEdit: () => void
  onDelete: () => void
  theme?: {
    colors: Record<string, string>
    borderRadius: number
    shadow: string
    fontFamily: string
  }
}

export function ComponentCard({ component, onEdit, onDelete, theme }: ComponentCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: component.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...(theme
      ? {
          borderRadius: `${theme.borderRadius}rem`,
          boxShadow: theme.shadow === "none" ? "none" : `var(--shadow-${theme.shadow})`,
          borderColor: theme.colors.border,
        }
      : {}),
  }

  return (
    <Card ref={setNodeRef} style={style} className="relative flex h-10 items-center justify-between pl-1 pr-1">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 cursor-grab text-[#a1a1aa]"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
          <span className="sr-only">Drag to reorder</span>
        </Button>
        <span className="text-sm ml-2">{component.type}</span>
      </div>
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onEdit} className="h-8 w-8 flex items-center justify-center">
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={onDelete} className="h-8 w-8 flex items-center justify-center">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </Card>
  )
}
