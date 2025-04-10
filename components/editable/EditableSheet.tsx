"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

interface EditableSheetProps {
  props: {
    triggerText: string
    title: string
    description: string
    content: string
    position: "top" | "right" | "bottom" | "left"
  }
}

export function EditableSheet({ props }: EditableSheetProps) {
  const { triggerText, title, description, content, position } = props
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          {triggerText}
        </Button>
      </SheetTrigger>
      <SheetContent side={position}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="py-4">{content}</div>
      </SheetContent>
    </Sheet>
  )
}
