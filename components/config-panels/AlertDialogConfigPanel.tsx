"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface AlertDialogConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function AlertDialogConfigPanel({ props, onChange }: AlertDialogConfigPanelProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <Card className="p-4 border-border shadow-none space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Variant</Label>
            <Select value={props.variant || "default"} onValueChange={(value) => handleChange("variant", value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select variant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="destructive">Destructive</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Trigger Text</Label>
            <Input
              value={props.triggerText || ""}
              onChange={(e) => handleChange("triggerText", e.target.value)}
              className="w-[200px]"
              placeholder="Open"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Title</Label>
            <Input
              value={props.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-[200px]"
              placeholder="Are you absolutely sure?"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Label className="text-sm font-normal">Description</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>The main content of the alert dialog</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              value={props.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-[200px]"
              placeholder="This action cannot be undone."
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Cancel Text</Label>
            <Input
              value={props.cancelText || ""}
              onChange={(e) => handleChange("cancelText", e.target.value)}
              className="w-[200px]"
              placeholder="Cancel"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Action Text</Label>
            <Input
              value={props.actionText || ""}
              onChange={(e) => handleChange("actionText", e.target.value)}
              className="w-[200px]"
              placeholder="Continue"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Show Icon</Label>
            <Switch
              checked={props.showIcon || false}
              onCheckedChange={(checked) => handleChange("showIcon", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Show Close Button</Label>
            <Switch
              checked={props.showCloseButton || false}
              onCheckedChange={(checked) => handleChange("showCloseButton", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Show Header</Label>
            <Switch
              checked={props.showHeader || false}
              onCheckedChange={(checked) => handleChange("showHeader", checked)}
            />
          </div>
        </Card>
      </div>
    </TooltipProvider>
  )
}
