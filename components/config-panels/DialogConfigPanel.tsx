"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

interface DialogConfigPanelProps {
  props: {
    triggerText: string
    title: string
    description: string
    content: string
    cancelText: string
    confirmText: string
    defaultOpen?: boolean
  }
  onChange: (props: any) => void
  onAddNestedComponent?: () => void
}

export function DialogConfigPanel({ props, onChange, onAddNestedComponent }: DialogConfigPanelProps) {
  const [localProps, setLocalProps] = useState(props)

  const handleChange = (key: string, value: any) => {
    const updatedProps = { ...localProps, [key]: value }
    setLocalProps(updatedProps)
    onChange(updatedProps)
  }

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="triggerText">Trigger Text</Label>
        <Input
          id="triggerText"
          value={localProps.triggerText}
          onChange={(e) => handleChange("triggerText", e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={localProps.title} onChange={(e) => handleChange("title", e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={localProps.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={localProps.content}
          onChange={(e) => handleChange("content", e.target.value)}
          rows={3}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="cancelText">Cancel Button Text</Label>
        <Input
          id="cancelText"
          value={localProps.cancelText}
          onChange={(e) => handleChange("cancelText", e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="confirmText">Confirm Button Text</Label>
        <Input
          id="confirmText"
          value={localProps.confirmText}
          onChange={(e) => handleChange("confirmText", e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <Label htmlFor="defaultOpen">Default Open</Label>
        <Switch
          id="defaultOpen"
          checked={localProps.defaultOpen || false}
          onCheckedChange={(checked) => handleChange("defaultOpen", checked)}
        />
      </div>

      {onAddNestedComponent && (
        <div className="mt-2">
          <Button variant="outline" size="sm" onClick={onAddNestedComponent} className="w-full">
            Add Nested Component
          </Button>
        </div>
      )}
    </div>
  )
}
