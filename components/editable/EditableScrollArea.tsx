"use client"

import { ScrollArea } from "@/components/ui/scroll-area"

interface EditableScrollAreaProps {
  props: {
    content: string
    height: string
  }
}

export function EditableScrollArea({ props }: EditableScrollAreaProps) {
  const { content, height } = props

  return (
    <ScrollArea className="rounded-md border" style={{ height }}>
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Scroll Area Content</h4>
        {content.split("\n").map((paragraph, index) => (
          <p key={index} className="text-sm">
            {paragraph}
          </p>
        ))}
      </div>
    </ScrollArea>
  )
}
