"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

interface ScrollAreaConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function ScrollAreaConfigPanel({ props, onChange }: ScrollAreaConfigPanelProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border shadow-none space-y-4">
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={props.content}
            onChange={(e) => handleChange("content", e.target.value)}
            placeholder="Enter scroll area content"
            rows={5}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height</Label>
          <Input
            id="height"
            value={props.height}
            onChange={(e) => handleChange("height", e.target.value)}
            placeholder="e.g., 200px"
          />
        </div>
      </Card>
    </div>
  )
}
