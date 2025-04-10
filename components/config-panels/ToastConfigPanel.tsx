"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"

interface ToastConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function ToastConfigPanel({ props, onChange }: ToastConfigPanelProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border shadow-none space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={props.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Toast Title"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={props.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Toast Description"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="action">Action Label</Label>
          <Input
            id="action"
            value={props.action}
            onChange={(e) => handleChange("action", e.target.value)}
            placeholder="Action Label"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="variant">Variant</Label>
          <Select value={props.variant || "default"} onValueChange={(value) => handleChange("variant", value)}>
            <SelectTrigger id="variant">
              <SelectValue placeholder="Select variant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="destructive">Destructive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration (ms)</Label>
          <Input
            id="duration"
            type="number"
            value={props.duration}
            onChange={(e) => handleChange("duration", Number(e.target.value))}
            placeholder="3000"
          />
        </div>
      </Card>
    </div>
  )
}
