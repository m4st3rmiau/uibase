"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

interface SheetConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function SheetConfigPanel({ props, onChange }: SheetConfigPanelProps) {
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
            placeholder="Open Sheet"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={props.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Sheet Title"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={props.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Sheet Description"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={props.content}
            onChange={(e) => handleChange("content", e.target.value)}
            placeholder="Sheet Content"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <Select value={props.position} onValueChange={(value) => handleChange("position", value)}>
            <SelectTrigger id="position">
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="top">Top</SelectItem>
              <SelectItem value="right">Right</SelectItem>
              <SelectItem value="bottom">Bottom</SelectItem>
              <SelectItem value="left">Left</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>
    </div>
  )
}
