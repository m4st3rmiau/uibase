import { useDrag } from "react-dnd"
import { Card } from "@/components/ui/card"
import { GripVertical } from "lucide-react"

interface DraggableComponentProps {
  name: string
  type: string
  className?: string
  onDrop?: (item: any) => void
}

export function DraggableComponent({ name, type, className, onDrop }: DraggableComponentProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "component",
    item: { name, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <Card
      ref={drag}
      className={`p-2 mb-2 text-sm shadow-none bg-background border border-border dark:border-[#27272a] cursor-move !flex !flex-row items-center gap-2 ${isDragging ? "opacity-50" : ""} ${className || ""}`}
    >
      <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground" />
      <span>{name}</span>
    </Card>
  )
}
