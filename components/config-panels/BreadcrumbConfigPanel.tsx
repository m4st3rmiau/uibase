"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Trash, Plus } from "lucide-react"

interface BreadcrumbConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function BreadcrumbConfigPanel({ props, onChange }: BreadcrumbConfigPanelProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  const addItem = () => {
    const newItems = [...props.items, { type: "link", label: "New Item", href: "#" }]
    handleChange("items", newItems)
  }

  const addDropdownItem = (itemIndex: number) => {
    const newItems = [...props.items]
    if (!newItems[itemIndex].dropdownItems) {
      newItems[itemIndex].dropdownItems = []
    }
    newItems[itemIndex].dropdownItems.push({ label: "New Item", href: "#" })
    handleChange("items", newItems)
  }

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...props.items]
    newItems[index] = { ...newItems[index], [field]: value }
    handleChange("items", newItems)
  }

  const updateDropdownItem = (itemIndex: number, dropdownIndex: number, field: string, value: string) => {
    const newItems = [...props.items]
    newItems[itemIndex].dropdownItems[dropdownIndex] = {
      ...newItems[itemIndex].dropdownItems[dropdownIndex],
      [field]: value,
    }
    handleChange("items", newItems)
  }

  const removeItem = (index: number) => {
    const newItems = props.items.filter((_: any, i: number) => i !== index)
    handleChange("items", newItems)
  }

  const removeDropdownItem = (itemIndex: number, dropdownIndex: number) => {
    const newItems = [...props.items]
    newItems[itemIndex].dropdownItems = newItems[itemIndex].dropdownItems.filter(
      (_: any, i: number) => i !== dropdownIndex,
    )
    handleChange("items", newItems)
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border shadow-none space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">Separator</Label>
          <Select value={props.separator || "slash"} onValueChange={(value) => handleChange("separator", value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="slash">Slash</SelectItem>
              <SelectItem value="chevron">Chevron</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">Size</Label>
          <Select value={props.size || "md"} onValueChange={(value) => handleChange("size", value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="md">Medium</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">Show Icon</Label>
          <Switch checked={props.showIcon || false} onCheckedChange={(checked) => handleChange("showIcon", checked)} />
        </div>

        {props.showIcon && (
          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Icon Position</Label>
            <Select value={props.iconPosition || "left"} onValueChange={(value) => handleChange("iconPosition", value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label>Breadcrumb Items</Label>
          {props.items.map((item: any, index: number) => (
            <Card key={index} className="p-4 space-y-4 shadow-none bg-accent/50 border-border">
              <div className="flex items-center space-x-2">
                <Select value={item.type} onValueChange={(value) => updateItem(index, "type", value)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="link">Link</SelectItem>
                    <SelectItem value="page">Page</SelectItem>
                    <SelectItem value="ellipsis">Ellipsis</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  value={item.label}
                  onChange={(e) => updateItem(index, "label", e.target.value)}
                  placeholder="Label"
                />
                {item.type === "link" && (
                  <Input
                    value={item.href}
                    onChange={(e) => updateItem(index, "href", e.target.value)}
                    placeholder="URL"
                  />
                )}
                <Button variant="outline" size="icon" onClick={() => removeItem(index)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>

              {item.type === "ellipsis" && (
                <div className="space-y-2">
                  <Label>Dropdown Items</Label>
                  {(item.dropdownItems || []).map((dropdownItem: any, dropdownIndex: number) => (
                    <div key={dropdownIndex} className="flex items-center space-x-2">
                      <Input
                        value={dropdownItem.label}
                        onChange={(e) => updateDropdownItem(index, dropdownIndex, "label", e.target.value)}
                        placeholder="Label"
                      />
                      <Input
                        value={dropdownItem.href}
                        onChange={(e) => updateDropdownItem(index, dropdownIndex, "href", e.target.value)}
                        placeholder="URL"
                      />
                      <Button variant="outline" size="icon" onClick={() => removeDropdownItem(index, dropdownIndex)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => addDropdownItem(index)} className="w-full mt-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Dropdown Item
                  </Button>
                </div>
              )}
            </Card>
          ))}
          <Button variant="outline" size="sm" onClick={addItem} className="w-full mt-2">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </Card>
    </div>
  )
}
