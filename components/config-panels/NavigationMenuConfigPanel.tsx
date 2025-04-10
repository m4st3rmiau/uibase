"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash } from "lucide-react"

interface NavigationMenuConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function NavigationMenuConfigPanel({ props, onChange }: NavigationMenuConfigPanelProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  const addItem = (parentItems?: any[]) => {
    const newItems = parentItems || [...props.items]
    newItems.push({ title: "New Item", href: "#" })
    handleChange("items", newItems)
  }

  const updateItem = (index: number, field: string, value: string, parentItems?: any[]) => {
    const newItems = parentItems || [...props.items]
    newItems[index][field] = value
    handleChange("items", newItems)
  }

  const removeItem = (index: number, parentItems?: any[]) => {
    const newItems = parentItems || [...props.items]
    newItems.splice(index, 1)
    handleChange("items", newItems)
  }

  const renderItems = (items: any[], level = 0) => {
    return items.map((item, index) => (
      <Card key={index} className={`p-4 mt-2 space-y-2 ${level > 0 ? "ml-4" : ""}`}>
        <div className="flex items-center space-x-2">
          <Input
            value={item.title}
            onChange={(e) => updateItem(index, "title", e.target.value, items)}
            placeholder="Item title"
          />
          <Input
            value={item.href || ""}
            onChange={(e) => updateItem(index, "href", e.target.value, items)}
            placeholder="Item href"
          />
          <Button variant="destructive" size="icon" onClick={() => removeItem(index, items)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
        {item.description && (
          <Textarea
            value={item.description}
            onChange={(e) => updateItem(index, "description", e.target.value, items)}
            placeholder="Item description"
          />
        )}
        {item.items && renderItems(item.items, level + 1)}
        <Button onClick={() => addItem(item.items)} variant="outline" size="sm" className="w-full mt-2">
          <Plus className="h-4 w-4 mr-2" />
          Add Sub Item
        </Button>
      </Card>
    ))
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border shadow-none space-y-4">
        {renderItems(props.items)}
        <Button onClick={() => addItem()} variant="outline" size="sm" className="w-full mt-2">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </Card>
    </div>
  )
}
