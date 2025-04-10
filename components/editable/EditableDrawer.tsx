"use client"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface EditableDrawerProps {
  props: {
    triggerText: string
    title: string
    description: string
    content: string
    closeText: string
  }
}

export function EditableDrawer({ props }: EditableDrawerProps) {
  const { triggerText, title, description, content, closeText } = props
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          {triggerText}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">{content}</div>
        <div className="mt-4 flex flex-col gap-2 p-4 pt-0">
          <Button variant="outline" onClick={() => setOpen(false)}>
            {closeText}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
