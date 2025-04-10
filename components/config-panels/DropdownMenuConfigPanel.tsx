"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash } from "lucide-react"

interface DropdownMenuConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function DropdownMenuConfigPanel({ props, onChange }: DropdownMenuConfigPanelProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  const addItem = () => {
    const newItems = [...props.items, { type: "item", text: "New Item" }]
    handleChange("items", newItems)
  }

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...props.items]
    newItems[index][field] = value
    handleChange("items", newItems)
  }

  const removeItem = (index: number) => {
    const newItems = props.items.filter((_: any, i: number) => i !== index)
    handleChange("items", newItems)
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
            placeholder="Open Menu"
          />
        </div>
        <div className="space-y-2">
          <Label>Menu Items</Label>
          {props.items.map((item: any, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <Select value={item.type} onValueChange={(value) => updateItem(index, "type", value)}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="item">Item</SelectItem>
                  <SelectItem value="label">Label</SelectItem>
                  <SelectItem value="separator">Separator</SelectItem>
                </SelectContent>
              </Select>
              {item.type !== "separator" && (
                <Input
                  value={item.text}
                  onChange={(e) => updateItem(index, "text", e.target.value)}
                  placeholder={item.type === "item" ? "Menu item text" : "Menu label text"}
                />
              )}
              <Button variant="destructive" size="icon" onClick={() => removeItem(index)}>
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
    </div>
  )
}
