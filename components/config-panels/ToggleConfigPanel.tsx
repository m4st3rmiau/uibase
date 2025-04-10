"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"

interface ToggleConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function ToggleConfigPanel({ props, onChange }: ToggleConfigPanelProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border shadow-none space-y-4">
        <div className="space-y-2">
          <Label htmlFor="label">Label</Label>
          <Input
            id="label"
            value={props.label}
            onChange={(e) => handleChange("label", e.target.value)}
            placeholder="Toggle label"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="pressed"
            checked={props.pressed || false}
            onCheckedChange={(checked) => handleChange("pressed", checked)}
          />
          <Label htmlFor="pressed">Pressed</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="disabled"
            checked={props.disabled || false}
            onCheckedChange={(checked) => handleChange("disabled", checked)}
          />
          <Label htmlFor="disabled">Disabled</Label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="variant">Variant</Label>
          <Select value={props.variant || "default"} onValueChange={(value) => handleChange("variant", value)}>
            <SelectTrigger id="variant">
              <SelectValue placeholder="Select variant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="outline">Outline</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="size">Size</Label>
          <Select value={props.size || "default"} onValueChange={(value) => handleChange("size", value)}>
            <SelectTrigger id="size">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>
    </div>
  )
}
