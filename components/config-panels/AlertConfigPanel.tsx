"use client"

import React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"

interface AlertConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function AlertConfigPanel({ props, onChange }: AlertConfigPanelProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  // Set default values when component mounts
  React.useEffect(() => {
    // Only set defaults if they're not already set
    const defaults = {
      showDescription: false, // Default to false
      emphasis: props.emphasis || "medium",
      variant: props.variant || "default",
      buttonPosition: props.buttonPosition || "below",
      buttonVariant: props.buttonVariant || "outline",
      showSecondaryButton: props.showSecondaryButton || false,
    }

    // Check if we need to apply any defaults
    const needsDefaults = Object.keys(defaults).some((key) => props[key] === undefined)

    if (needsDefaults) {
      onChange({
        ...props,
        ...Object.fromEntries(Object.entries(defaults).filter(([key]) => props[key] === undefined)),
      })
    }
  }, [])

  // Remove this effect that changes button position when description is toggled:

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border shadow-none space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">Variant</Label>
          <Select value={props.variant || "default"} onValueChange={(value) => handleChange("variant", value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="destructive">Destructive</SelectItem>
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
          <Select value={props.emphasis || "medium"} onValueChange={(value) => handleChange("emphasis", value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Title</Label>
            <Input
              value={props.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-[200px]"
              placeholder="Alert title"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Description</Label>
            <Switch
              checked={props.showDescription === true}
              onCheckedChange={(checked) => handleChange("showDescription", checked)}
            />
          </div>

          {props.showDescription === true && (
            <div className="flex items-center justify-between">
              <Label className="text-sm font-normal">Description</Label>
              <Input
                value={props.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-[200px]"
                placeholder="Alert description"
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Icon Alert</Label>
            <Switch
              checked={props.showIcon || false}
              onCheckedChange={(checked) => handleChange("showIcon", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Close Button</Label>
            <Switch
              checked={props.showCloseButton || false}
              onCheckedChange={(checked) => handleChange("showCloseButton", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Action Button</Label>
            <Switch
              checked={props.showActionButton || false}
              onCheckedChange={(checked) => handleChange("showActionButton", checked)}
            />
          </div>

          {props.showActionButton && (
            <>
              <div className="flex items-center justify-between">
                <Label className="text-sm font-normal">Text</Label>
                <Input
                  value={props.actionButtonText || ""}
                  onChange={(e) => handleChange("actionButtonText", e.target.value)}
                  className="w-[200px]"
                  placeholder="Action button text"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm font-normal">Variant</Label>
                <Select
                  value={props.buttonVariant || "outline"}
                  onValueChange={(value) => handleChange("buttonVariant", value)}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="outline">Outline</SelectItem>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="destructive">Destructive</SelectItem>
                    <SelectItem value="ghost">Ghost</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm font-normal">Action Two</Label>
                <Switch
                  checked={props.showSecondaryButton || false}
                  onCheckedChange={(checked) => handleChange("showSecondaryButton", checked)}
                />
              </div>

              {props.showSecondaryButton && (
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-normal">Text</Label>
                  <Input
                    value={props.secondaryButtonText || ""}
                    onChange={(e) => handleChange("secondaryButtonText", e.target.value)}
                    className="w-[200px]"
                    placeholder="Secondary button text"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </Card>
    </div>
  )
}
