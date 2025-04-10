"use client"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

interface EditablePopoverProps {
  props: {
    triggerText: string
    content: string
  }
}

export function EditablePopover({ props }: EditablePopoverProps) {
  const { triggerText, content } = props
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          {triggerText}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Popover Content</h4>
            <p className="text-sm text-muted-foreground">{content}</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
