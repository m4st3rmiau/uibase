"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

interface PopoverConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function PopoverConfigPanel({ props, onChange }: PopoverConfigPanelProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border shadow-none space-y-4">
        <div className="space-y-2">
          <Label htmlFor="triggerText">Trigger Text</Label>
          <Input
            id="triggerText"
            value={props.triggerText}
            onChange={(e) => handleChange("triggerText", e.target.value)}
            placeholder="Open Popover"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Popover Content</Label>
          <Textarea
            id="content"
            value={props.content}
            onChange={(e) => handleChange("content", e.target.value)}
            placeholder="Enter popover content"
          />
        </div>
      </Card>
    </div>
  )
}
