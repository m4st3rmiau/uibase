"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

interface AspectRatioConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function AspectRatioConfigPanel({ props, onChange }: AspectRatioConfigPanelProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border shadow-none space-y-4">
        <div className="space-y-2">
          <Label htmlFor="ratio">Ratio</Label>
          <Input
            id="ratio"
            type="number"
            value={props.ratio}
            onChange={(e) => handleChange("ratio", Number.parseFloat(e.target.value))}
            step="0.1"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="src">Image Source</Label>
          <Input id="src" type="text" value={props.src} onChange={(e) => handleChange("src", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="alt">Alt Text</Label>
          <Input id="alt" type="text" value={props.alt} onChange={(e) => handleChange("alt", e.target.value)} />
        </div>
      </Card>
    </div>
  )
}
