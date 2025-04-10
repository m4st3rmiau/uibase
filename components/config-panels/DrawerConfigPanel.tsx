"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

interface DrawerConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function DrawerConfigPanel({ props, onChange }: DrawerConfigPanelProps) {
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
            placeholder="Open Drawer"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={props.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Drawer Title"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={props.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Drawer Description"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={props.content}
            onChange={(e) => handleChange("content", e.target.value)}
            placeholder="Drawer Content"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="closeText">Close Text</Label>
          <Input
            id="closeText"
            value={props.closeText}
            onChange={(e) => handleChange("closeText", e.target.value)}
            placeholder="Close"
          />
        </div>
      </Card>
    </div>
  )
}
