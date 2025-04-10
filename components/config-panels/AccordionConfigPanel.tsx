"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
// Add imports for the component selector
import { Plus, Trash, AlignLeft, AlignCenter, AlignRight, ArrowUp, ArrowDown } from "lucide-react"

// Update the interface to remove componentType
interface AccordionConfigPanelProps {
  props: any
  onChange: (updatedProps: any) => void
  onAddNestedComponent?: (itemIndex: number) => void
}

export function AccordionConfigPanel({ props, onChange, onAddNestedComponent }: AccordionConfigPanelProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  // 2. Actualizar la función addItem para quitar los campos relacionados con el botón
  const addItem = () => {
    const newItems = [
      ...props.items,
      {
        title: "New Item",
        subheader: "",
        content: "New content",
        components: [],
        showImage: false,
        imageUrl: "",
        imageAlt: "",
        imageWidth: 300,
        imageHeight: 200,
        imagePosition: "below",
        imageAlignment: "center",
        imageFillWidth: false,
      },
    ]
    handleChange("items", newItems)
  }

  // 1. Actualizar la función updateItem para quitar los campos relacionados con el botón
  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...props.items]
    newItems[index][field] = value
    handleChange("items", newItems)
  }

  const removeItem = (index: number) => {
    const newItems = props.items.filter((_: any, i: number) => i !== index)
    handleChange("items", newItems)
  }

  return (
    <div className="space-y-4 pb-6">
      <Card className="p-4 border-border shadow-none space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">Style</Label>
          <Select value={props.style || "default"} onValueChange={(value) => handleChange("style", value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="tabs">Tabs</SelectItem>
              <SelectItem value="table">Table</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">Type</Label>
          <Select value={props.type || "single"} onValueChange={(value) => handleChange("type", value)}>
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

        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">Title Icon</Label>
          <Switch
            checked={props.showTitleIcon || false}
            onCheckedChange={(checked) => handleChange("showTitleIcon", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">Collapsible</Label>
          <Switch
            checked={props.collapsible || false}
            onCheckedChange={(checked) => handleChange("collapsible", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">Disable Hover</Label>
          <Switch
            checked={props.disableHover || false}
            onCheckedChange={(checked) => handleChange("disableHover", checked)}
          />
        </div>
      </Card>

      <Card className="p-4 border-border shadow-none space-y-4">
        <Label className="text-sm font-medium">Accordion Items</Label>
        {props.items.map((item: any, index: number) => (
          <Card key={index} className="p-4 space-y-3 shadow-none bg-accent/50">
            <div className="flex items-center space-x-2">
              <Input
                value={item.title}
                onChange={(e) => updateItem(index, "title", e.target.value)}
                placeholder="Item title"
              />
              <Button variant="outline" size="icon" onClick={() => removeItem(index)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Input
              value={item.subheader || ""}
              onChange={(e) => updateItem(index, "subheader", e.target.value)}
              placeholder="Subheader (optional)"
            />
            <Input
              value={item.content}
              onChange={(e) => updateItem(index, "content", e.target.value)}
              placeholder="Item content"
            />

            {/* Image toggle switch - removed icon */}
            <div className="flex items-center justify-between mt-2">
              <Label className="text-sm font-normal">Show Image</Label>
              <Switch
                checked={item.showImage || false}
                onCheckedChange={(checked) => updateItem(index, "showImage", checked)}
              />
            </div>

            {/* Image configuration fields (only shown when showImage is true) - removed border-l-2 */}
            {item.showImage && (
              <div className="space-y-3 mt-3 pt-1 pb-2">
                <Input
                  value={item.imageUrl || ""}
                  onChange={(e) => updateItem(index, "imageUrl", e.target.value)}
                  placeholder="Image URL"
                />
                <Input
                  value={item.imageAlt || ""}
                  onChange={(e) => updateItem(index, "imageAlt", e.target.value)}
                  placeholder="Image alt text"
                />

                {/* Fill width toggle */}
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-normal">Fill Width</Label>
                  <Switch
                    checked={item.imageFillWidth || false}
                    onCheckedChange={(checked) => updateItem(index, "imageFillWidth", checked)}
                  />
                </div>

                {/* Only show width/height controls if not fill width */}
                {!item.imageFillWidth && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs mb-1 block">Width</Label>
                      <Input
                        type="number"
                        value={item.imageWidth || 300}
                        onChange={(e) => updateItem(index, "imageWidth", Number.parseInt(e.target.value))}
                        placeholder="Width (px)"
                      />
                    </div>
                    <div>
                      <Label className="text-xs mb-1 block">Height</Label>
                      <Input
                        type="number"
                        value={item.imageHeight || 200}
                        onChange={(e) => updateItem(index, "imageHeight", Number.parseInt(e.target.value))}
                        placeholder="Height (px)"
                      />
                    </div>
                  </div>
                )}

                {/* Only show alignment if not fill width */}
                {!item.imageFillWidth && (
                  <div>
                    <Label className="text-xs mb-1 block">Alignment</Label>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={item.imageAlignment === "left" ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
                        onClick={() => updateItem(index, "imageAlignment", "left")}
                      >
                        <AlignLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant={item.imageAlignment === "center" || !item.imageAlignment ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
                        onClick={() => updateItem(index, "imageAlignment", "center")}
                      >
                        <AlignCenter className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant={item.imageAlignment === "right" ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
                        onClick={() => updateItem(index, "imageAlignment", "right")}
                      >
                        <AlignRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Image position selector - always show */}
                <div>
                  <Label className="text-xs mb-1 block">Position</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={item.imagePosition === "above" ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                      onClick={() => updateItem(index, "imagePosition", "above")}
                    >
                      <ArrowUp className="h-4 w-4 mr-1" />
                      Above Text
                    </Button>
                    <Button
                      type="button"
                      variant={item.imagePosition === "below" || !item.imagePosition ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                      onClick={() => updateItem(index, "imagePosition", "below")}
                    >
                      <ArrowDown className="h-4 w-4 mr-1" />
                      Below Text
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
        <Button onClick={addItem} variant="outline" size="sm" className="w-full mt-4 mb-2">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </Card>
    </div>
  )
}
