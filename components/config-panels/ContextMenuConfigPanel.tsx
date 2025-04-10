"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Trash } from "lucide-react"

interface ContextMenuConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function ContextMenuConfigPanel({ props, onChange }: ContextMenuConfigPanelProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  const addItem = (parentIndex?: number) => {
    const newItems = [...props.items]
    const newItem = { label: "New Item", action: "" }
    if (parentIndex !== undefined) {
      if (!newItems[parentIndex].items) {
        newItems[parentIndex].items = []
      }
      newItems[parentIndex].items.push(newItem)
    } else {
      newItems.push(newItem)
    }
    handleChange("items", newItems)
  }

  const updateItem = (index: number, field: string, value: string, parentIndex?: number) => {
    const newItems = [...props.items]
    if (parentIndex !== undefined) {
      newItems[parentIndex].items[index][field] = value
    } else {
      newItems[index][field] = value
    }
    handleChange("items", newItems)
  }

  const removeItem = (index: number, parentIndex?: number) => {
    const newItems = [...props.items]
    if (parentIndex !== undefined) {
      newItems[parentIndex].items = newItems[parentIndex].items.filter((_: any, i: number) => i !== index)
    } else {
      newItems.splice(index, 1)
    }
    handleChange("items", newItems)
  }

  const renderItems = (items: any[], parentIndex?: number) => {
    return items.map((item, index) => (
      <Card key={index} className="p-4 space-y-2">
        <div className="flex items-center space-x-2">
          <Input
            value={item.label}
            onChange={(e) => updateItem(index, "label", e.target.value, parentIndex)}
            placeholder="Label"
          />
          <Input
            value={item.action}
            onChange={(e) => updateItem(index, "action", e.target.value, parentIndex)}
            placeholder="Action"
          />
          <Button variant="destructive" size="icon" onClick={() => removeItem(index, parentIndex)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
        {item.items && renderItems(item.items, index)}
        {!item.items && (
          <Button
            onClick={() => addItem(parentIndex !== undefined ? parentIndex : index)}
            variant="outline"
            size="sm"
            className="w-full mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Sub-Item
          </Button>
        )}
      </Card>
    ))
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
            placeholder="Right click here"
          />
        </div>
        <div className="space-y-2">
          <Label>Context Menu Items</Label>
          {renderItems(props.items)}
          <Button onClick={() => addItem()} variant="outline" size="sm" className="w-full mt-2">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </Card>
    </div>
  )
}
