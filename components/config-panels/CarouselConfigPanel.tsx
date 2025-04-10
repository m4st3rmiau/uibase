"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Plus, Trash } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CarouselConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function CarouselConfigPanel({ props, onChange }: CarouselConfigPanelProps) {
  const [items, setItems] = useState(props.items || [{ content: "Slide 1", imageUrl: "" }])

  const handleChange = (key: string, value: any, index?: number) => {
    if (index !== undefined && key === "items") {
      const newItems = [...items]
      newItems[index] = { ...newItems[index], ...value }
      setItems(newItems)
      onChange({ ...props, items: newItems })
    } else {
      onChange({ ...props, [key]: value })
    }
  }

  const addItem = () => {
    const newItem = { content: `Slide ${items.length + 1}`, imageUrl: "" }
    handleChange("items", [...items, newItem])
    setItems((prevItems) => [...prevItems, newItem])
  }

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    handleChange("items", newItems)
    setItems(newItems)
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border shadow-none space-y-4">
        <div className="space-y-2">
          <Label>Carousel Items</Label>
          {items.map((item: any, index: number) => (
            <Card key={index} className="p-4 space-y-2 shadow-none bg-accent/50 border-border">
              <div className="text-sm font-medium mb-2">Slide {index + 1}</div>
              <div className="flex items-center space-x-2">
                <Input
                  value={item.content || ""}
                  onChange={(e) => handleChange("items", { content: e.target.value }, index)}
                  placeholder={`Slide ${index + 1} content`}
                  className="flex-grow"
                />
                <Button variant="outline" size="icon" onClick={() => removeItem(index)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <Input
                  value={item.imageUrl || ""}
                  onChange={(e) => handleChange("items", { imageUrl: e.target.value }, index)}
                  placeholder="Image URL (optional)"
                  className="w-full"
                />
              </div>
            </Card>
          ))}
          <Button onClick={addItem} variant="outline" size="sm" className="w-full mt-2">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">Orientation</Label>
          <Select
            value={props.orientation || "horizontal"}
            onValueChange={(value) => handleChange("orientation", value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="horizontal">Horizontal</SelectItem>
              <SelectItem value="vertical">Vertical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">Auto Play</Label>
          <Switch
            checked={props.autoPlay === true}
            onCheckedChange={(checked) => handleChange("autoPlay", checked)}
            className="ml-auto"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">Show Controls</Label>
          <Switch
            checked={props.showControls !== false}
            onCheckedChange={(checked) => handleChange("showControls", checked)}
            className="ml-auto"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">Loop</Label>
          <Switch
            checked={props.loop === true}
            onCheckedChange={(checked) => handleChange("loop", checked)}
            className="ml-auto"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">Draggable</Label>
          <Switch
            checked={props.draggable === true}
            onCheckedChange={(checked) => handleChange("draggable", checked)}
            className="ml-auto"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">Show API</Label>
          <Switch
            checked={props.showAPI === true}
            onCheckedChange={(checked) => handleChange("showAPI", checked)}
            className="ml-auto"
          />
        </div>
      </Card>
    </div>
  )
}
