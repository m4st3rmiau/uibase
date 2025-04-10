"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Plus, Trash } from "lucide-react"
import { useState } from "react"

interface CollapsibleConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function CollapsibleConfigPanel({ props, onChange }: CollapsibleConfigPanelProps) {
  const [items, setItems] = useState<string[]>(props.content || ["@radix-ui/primitives"])

  const handleChange = (key: string, value: any) => {
    if (key === "content") {
      setItems(value)
    }
    onChange({ ...props, [key]: value })
  }

  const addItem = () => {
    const newItems = [...items, ""]
    handleChange("content", newItems)
  }

  const updateItem = (index: number, value: string) => {
    const newItems = [...items]
    newItems[index] = value
    handleChange("content", newItems)
  }

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    handleChange("content", newItems)
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border shadow-none space-y-4">
        <div className="space-y-2">
          <Label htmlFor="triggerText">Header Text</Label>
          <Input
            id="triggerText"
            value={props.triggerText}
            onChange={(e) => handleChange("triggerText", e.target.value)}
            placeholder="@username starred 3 repositories"
          />
        </div>

        <div className="space-y-2">
          <Label>Content Items</Label>
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input value={item} onChange={(e) => updateItem(index, e.target.value)} placeholder="@org/repository" />
              <Button variant="outline" size="icon" onClick={() => removeItem(index)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button onClick={addItem} variant="outline" size="sm" className="w-full mt-2">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </Card>

      <Card className="p-4 border-border shadow-none space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="open">Open by default</Label>
          <Switch id="open" checked={props.open} onCheckedChange={(checked) => handleChange("open", checked)} />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="disabled">Disabled</Label>
          <Switch
            id="disabled"
            checked={props.disabled}
            onCheckedChange={(checked) => handleChange("disabled", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="animated">Animated</Label>
          <Switch
            id="animated"
            checked={props.animated}
            onCheckedChange={(checked) => handleChange("animated", checked)}
          />
        </div>
      </Card>
    </div>
  )
}
