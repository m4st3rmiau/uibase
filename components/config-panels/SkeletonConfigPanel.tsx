"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

interface SkeletonConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function SkeletonConfigPanel({ props, onChange }: SkeletonConfigPanelProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border shadow-none space-y-4">
        <div className="space-y-2">
          <Label htmlFor="width">Width</Label>
          <Input
            id="width"
            value={props.width}
            onChange={(e) => handleChange("width", e.target.value)}
            placeholder="100%"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height</Label>
          <Input
            id="height"
            value={props.height}
            onChange={(e) => handleChange("height", e.target.value)}
            placeholder="20px"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="className">Custom Class</Label>
          <Input
            id="className"
            value={props.className || ""}
            onChange={(e) => handleChange("className", e.target.value)}
            placeholder="rounded-full bg-muted"
          />
        </div>
      </Card>
    </div>
  )
}
