"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface BadgeConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function BadgeConfigPanel({ props, onChange }: BadgeConfigPanelProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border shadow-none space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">Size</Label>
          <Select value={props.size || "2xsmall"} onValueChange={(value) => handleChange("size", value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2xsmall">2X Small</SelectItem>
              <SelectItem value="xsmall">Extra Small</SelectItem>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">Colour</Label>
          <Select value={props.colour || "accent"} onValueChange={(value) => handleChange("colour", value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="accent">Accent</SelectItem>
              <SelectItem value="ghost">Ghost</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">Emphasis</Label>
          <Select value={props.emphasis || "low"} onValueChange={(value) => handleChange("emphasis", value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">Text Case</Label>
          <Select value={props.textCase || "default"} onValueChange={(value) => handleChange("textCase", value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="capitalize">All Caps</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Text</Label>
            <Input
              value={props.text || ""}
              onChange={(e) => handleChange("text", e.target.value)}
              className="w-[200px]"
              placeholder="Badge text"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Icon Only</Label>
            <Switch
              checked={props.iconOnly || false}
              onCheckedChange={(checked) => handleChange("iconOnly", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Counter</Label>
            <Switch checked={props.counter || false} onCheckedChange={(checked) => handleChange("counter", checked)} />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Checkbox</Label>
            <Switch
              checked={props.checkbox || false}
              onCheckedChange={(checked) => handleChange("checkbox", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Dot</Label>
            <Switch checked={props.dot || false} onCheckedChange={(checked) => handleChange("dot", checked)} />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Avatar</Label>
            <Switch checked={props.avatar || false} onCheckedChange={(checked) => handleChange("avatar", checked)} />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Flag</Label>
            <Switch checked={props.flag || false} onCheckedChange={(checked) => handleChange("flag", checked)} />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Tail Icon</Label>
            <Switch
              checked={props.tailIcon || false}
              onCheckedChange={(checked) => handleChange("tailIcon", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Lead Icon</Label>
            <Switch
              checked={props.leadIcon || false}
              onCheckedChange={(checked) => handleChange("leadIcon", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">App Icon</Label>
            <Switch checked={props.appIcon || false} onCheckedChange={(checked) => handleChange("appIcon", checked)} />
          </div>
        </div>
      </Card>
    </div>
  )
}
