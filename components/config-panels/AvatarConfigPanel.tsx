"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"

interface AvatarConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function AvatarConfigPanel({ props, onChange }: AvatarConfigPanelProps) {
  const handleChange = (key: string, value: any) => {
    if (key === "users" && value < 2) {
      value = 2
    }
    onChange({ ...props, [key]: value })
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border shadow-none space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">Style</Label>
          <Select
            value={props.style || "single"}
            onValueChange={(value) => {
              handleChange("style", value)
              // Reset size if switching to multiple and current size is not allowed
              if (value === "multiple" && !["xs", "sm", "md"].includes(props.size)) {
                handleChange("size", "md")
              }
            }}
          >
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
          <Label className="text-sm font-normal">Shape</Label>
          <Select value={props.shape || "circle"} onValueChange={(value) => handleChange("shape", value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="circle">Circle</SelectItem>
              <SelectItem value="square">Square</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">Type</Label>
          <Select value={props.type || "text"} onValueChange={(value) => handleChange("type", value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="icon">Icon</SelectItem>
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
              {props.style !== "multiple" ? (
                <>
                  <SelectItem value="3xl">3XL (64px)</SelectItem>
                  <SelectItem value="2xl">2XL (56px)</SelectItem>
                  <SelectItem value="xl">Extra Large (48px)</SelectItem>
                  <SelectItem value="lg">Large (40px)</SelectItem>
                  <SelectItem value="md">Medium (32px)</SelectItem>
                  <SelectItem value="sm">Small (24px)</SelectItem>
                  <SelectItem value="xs">Extra Small (20px)</SelectItem>
                  <SelectItem value="2xs">2X Small (16px)</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="md">Medium (32px)</SelectItem>
                  <SelectItem value="sm">Small (24px)</SelectItem>
                  <SelectItem value="xs">Extra Small (20px)</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>

        {props.type === "text" && (
          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Text</Label>
            <Input
              value={props.fallback || ""}
              onChange={(e) => handleChange("fallback", e.target.value)}
              className="w-[200px]"
              placeholder="Avatar text"
              maxLength={2}
            />
          </div>
        )}

        {props.type === "image" && (
          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Image URL</Label>
            <Input
              value={props.src || ""}
              onChange={(e) => handleChange("src", e.target.value)}
              className="w-[200px]"
              placeholder="https://..."
            />
          </div>
        )}

        <div className="space-y-4">
          {props.style === "multiple" ? (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-normal">Number of Users</Label>
                  <span className="text-sm text-muted-foreground">{props.users || 2}</span>
                </div>
                <Slider
                  value={[props.users || 2]}
                  onValueChange={([value]) => handleChange("users", value)}
                  min={2}
                  max={6}
                  step={1}
                />
                <div className="flex justify-between px-2 mt-1">
                  {[2, 3, 4, 5, 6].map((num) => (
                    <span key={num} className="text-xs text-muted-foreground">
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <Label className="text-sm font-normal">Online</Label>
                <Switch
                  checked={props.online || false}
                  onCheckedChange={(checked) => handleChange("online", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm font-normal">Check</Label>
                <Switch
                  checked={props.showCheck || false}
                  onCheckedChange={(checked) => handleChange("showCheck", checked)}
                />
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}
