"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Plus, Trash } from "lucide-react"

interface ToggleGroupConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function ToggleGroupConfigPanel({ props, onChange }: ToggleGroupConfigPanelProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  const addItem = () => {
    const newItems = [
      ...props.items,
      { value: `item-${props.items.length + 1}`, label: `Item ${props.items.length + 1}` },
    ]
    handleChange("items", newItems)
  }

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...props.items]
    newItems[index] = { ...newItems[index], [field]: value }
    handleChange("items", newItems)
  }

  const removeItem = (index: number) => {
    const newItems = props.items.filter((_: any, i: number) => i !== index)
    handleChange("items", newItems)
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <Card className="p-4 border-border shadow-none space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Type</Label>
            <Select value={props.type} onValueChange={(value) => handleChange("type", value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="multiple">Multiple</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Variant</Label>
            <Select value={props.variant || "default"} onValueChange={(value) => handleChange("variant", value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="outline">Outline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Size</Label>
            <Select value={props.size || "default"} onValueChange={(value) => handleChange("size", value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="show-label"
              checked={props.showLabel}
              onCheckedChange={(checked) => handleChange("showLabel", checked)}
            />
            <Label htmlFor="show-label">Show Label</Label>
          </div>

          {props.showLabel && (
            <div className="space-y-2">
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={props.label || ""}
                onChange={(e) => handleChange("label", e.target.value)}
                placeholder="Toggle Group Label"
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Switch
              id="disabled"
              checked={props.disabled}
              onCheckedChange={(checked) => handleChange("disabled", checked)}
            />
            <Label htmlFor="disabled">Disabled</Label>
          </div>

          <div className="space-y-2">
            <Label>Toggle Items</Label>
            {props.items.map((item: any, index: number) => (
              <Card key={index} className="p-4 space-y-2">
                <div className="flex items-center space-x-2">
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
                  <Select value={item.icon || "none"} onValueChange={(value) => updateItem(index, "icon", value)}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Icon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="Home">Home</SelectItem>
                      <SelectItem value="Settings">Settings</SelectItem>
                      <SelectItem value="User">User</SelectItem>
                      <SelectItem value="Mail">Mail</SelectItem>
                      <SelectItem value="Bell">Bell</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="destructive" size="icon" onClick={() => removeItem(index)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
            <Button onClick={addItem} variant="outline" size="sm" className="w-full mt-2">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </Card>
      </div>
    </TooltipProvider>
  )
}
