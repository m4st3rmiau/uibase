"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Plus, Trash } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface ComboboxConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function ComboboxConfigPanel({ props, onChange }: ComboboxConfigPanelProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  const addItem = () => {
    const newItems = [
      ...props.items,
      { value: `item-${props.items.length + 1}`, label: `New Item ${props.items.length + 1}` },
    ]
    handleChange("items", newItems)
  }

  const removeItem = (index: number) => {
    const newItems = props.items.filter((_: any, i: number) => i !== index)
    handleChange("items", newItems)
  }

  const updateItem = (index: number, field: "value" | "label", value: string) => {
    const newItems = [...props.items]
    newItems[index] = { ...newItems[index], [field]: value }
    handleChange("items", newItems)
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <Card className="p-4 border-border shadow-none space-y-4">
          <div className="space-y-2">
            <Label htmlFor="placeholder">Placeholder</Label>
            <Input
              id="placeholder"
              value={props.placeholder}
              onChange={(e) => handleChange("placeholder", e.target.value)}
              placeholder="Select an option"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emptyText">Empty Text</Label>
            <Input
              id="emptyText"
              value={props.emptyText}
              onChange={(e) => handleChange("emptyText", e.target.value)}
              placeholder="No results found"
            />
          </div>
          <div className="space-y-4">
            <Label>Combobox Items</Label>
            {props.items.map((item: { value: string; label: string }, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={item.value}
                  onChange={(e) => updateItem(index, "value", e.target.value)}
                  placeholder="Value"
                />
                <Input
                  value={item.label}
                  onChange={(e) => updateItem(index, "label", e.target.value)}
                  placeholder="Label"
                />
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
          <div className="flex items-center justify-between">
            <Label htmlFor="autocomplete">Autocomplete</Label>
            <Switch
              id="autocomplete"
              checked={props.autocomplete || false}
              onCheckedChange={(checked) => handleChange("autocomplete", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="multiple">Multiple</Label>
            <Switch
              id="multiple"
              checked={props.multiple || false}
              onCheckedChange={(checked) => handleChange("multiple", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="disabled">Disabled</Label>
            <Switch
              id="disabled"
              checked={props.disabled || false}
              onCheckedChange={(checked) => handleChange("disabled", checked)}
            />
          </div>
        </Card>
      </div>
    </TooltipProvider>
  )
}
