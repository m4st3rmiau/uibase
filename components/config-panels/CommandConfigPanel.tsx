"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Trash } from "lucide-react"

interface CommandConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function CommandConfigPanel({ props, onChange }: CommandConfigPanelProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  const addGroup = () => {
    const newItems = [...props.items, { group: `Group ${props.items.length + 1}`, items: [] }]
    handleChange("items", newItems)
  }

  const addItem = (groupIndex: number) => {
    const newItems = [...props.items]
    newItems[groupIndex].items.push({
      value: `item-${newItems[groupIndex].items.length + 1}`,
      label: `New Item ${newItems[groupIndex].items.length + 1}`,
    })
    handleChange("items", newItems)
  }

  const updateGroup = (index: number, value: string) => {
    const newItems = [...props.items]
    newItems[index].group = value
    handleChange("items", newItems)
  }

  const updateItem = (groupIndex: number, itemIndex: number, field: "value" | "label", value: string) => {
    const newItems = [...props.items]
    newItems[groupIndex].items[itemIndex][field] = value
    handleChange("items", newItems)
  }

  const removeGroup = (index: number) => {
    const newItems = props.items.filter((_: any, i: number) => i !== index)
    handleChange("items", newItems)
  }

  const removeItem = (groupIndex: number, itemIndex: number) => {
    const newItems = [...props.items]
    newItems[groupIndex].items = newItems[groupIndex].items.filter((_: any, i: number) => i !== itemIndex)
    handleChange("items", newItems)
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border shadow-none space-y-4">
        <div className="space-y-2">
          <Label htmlFor="placeholder">Placeholder</Label>
          <Input
            id="placeholder"
            value={props.placeholder}
            onChange={(e) => handleChange("placeholder", e.target.value)}
            placeholder="Type a command or search..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="emptyMessage">Empty Message</Label>
          <Input
            id="emptyMessage"
            value={props.emptyMessage}
            onChange={(e) => handleChange("emptyMessage", e.target.value)}
            placeholder="No results found."
          />
        </div>
        <div className="space-y-2">
          <Label>Command Groups and Items</Label>
          {props.items.map((group: any, groupIndex: number) => (
            <Card key={groupIndex} className="p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Input
                  value={group.group}
                  onChange={(e) => updateGroup(groupIndex, e.target.value)}
                  placeholder="Group name"
                />
                <Button variant="destructive" size="icon" onClick={() => removeGroup(groupIndex)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              {group.items.map((item: any, itemIndex: number) => (
                <div key={itemIndex} className="flex items-center space-x-2">
                  <Input
                    value={item.value}
                    onChange={(e) => updateItem(groupIndex, itemIndex, "value", e.target.value)}
                    placeholder="Value"
                  />
                  <Input
                    value={item.label}
                    onChange={(e) => updateItem(groupIndex, itemIndex, "label", e.target.value)}
                    placeholder="Label"
                  />
                  <Button variant="destructive" size="icon" onClick={() => removeItem(groupIndex, itemIndex)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button onClick={() => addItem(groupIndex)} variant="outline" size="sm" className="w-full mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </Card>
          ))}
          <Button onClick={addGroup} variant="outline" size="sm" className="w-full mt-2">
            <Plus className="h-4 w-4 mr-2" />
            Add Group
          </Button>
        </div>
      </Card>
    </div>
  )
}
