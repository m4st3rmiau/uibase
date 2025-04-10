"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface EditableDropdownMenuProps {
  props: {
    triggerText: string
    items: {
      type: "item" | "label" | "separator"
      text?: string
    }[]
  }
}

export function EditableDropdownMenu({ props }: EditableDropdownMenuProps) {
  const { triggerText, items } = props

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{triggerText}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {items.map((item, index) => {
          switch (item.type) {
            case "item":
              return <DropdownMenuItem key={index}>{item.text}</DropdownMenuItem>
            case "label":
              return <DropdownMenuLabel key={index}>{item.text}</DropdownMenuLabel>
            case "separator":
              return <DropdownMenuSeparator key={index} />
            default:
              return null
          }
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
