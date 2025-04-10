"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface SeparatorConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function SeparatorConfigPanel({ props, onChange }: SeparatorConfigPanelProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border shadow-none space-y-4">
        <div className="space-y-2">
          <Label htmlFor="orientation">Orientation</Label>
          <Select
            value={props.orientation || "horizontal"}
            onValueChange={(value) => handleChange("orientation", value)}
          >
            <SelectTrigger id="orientation">
              <SelectValue placeholder="Select orientation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="horizontal">Horizontal</SelectItem>
              <SelectItem value="vertical">Vertical</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="className">Custom Class</Label>
          <Input
            id="className"
            value={props.className || ""}
            onChange={(e) => handleChange("className", e.target.value)}
            placeholder="e.g., my-6 bg-gray-200"
          />
        </div>
      </Card>
    </div>
  )
}
