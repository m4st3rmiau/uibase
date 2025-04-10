"use client"

import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"

interface ButtonConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function ButtonConfigPanel({ props, onChange }: ButtonConfigPanelProps) {
  const [labelEnabled, setLabelEnabled] = React.useState(!props.onlyIcon)
  const [onlyIconEnabled, setOnlyIconEnabled] = React.useState(!!props.onlyIcon)
  const [destructiveEnabled, setDestructiveEnabled] = React.useState(!!props.destructive)
  const [disabledEnabled, setDisabledEnabled] = React.useState(!!props.disabled)
  const [dotEnabled, setDotEnabled] = React.useState(!!props.dot)
  const [leadIconEnabled, setLeadIconEnabled] = React.useState(!!props.leadIcon)
  const [tailIconEnabled, setTailIconEnabled] = React.useState(!!props.tailIcon)
  const [badgeEnabled, setBadgeEnabled] = React.useState(!!props.badge)
  const [fullWidthEnabled, setFullWidthEnabled] = React.useState(props.fullWidth !== false) // Default to true if not specified

  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-4">
        <Label className="text-sm font-normal">Variant</Label>
        <Select value={props.variant || "default"} onValueChange={(value) => handleChange("variant", value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="secondary">Secondary</SelectItem>
            <SelectItem value="outline">Outline</SelectItem>
            <SelectItem value="ghost">Ghost</SelectItem>
            <SelectItem value="link">Link</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between px-4">
        <Label className="text-sm font-normal">Size</Label>
        <Select value={props.size || "default"} onValueChange={(value) => handleChange("size", value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sm">Small</SelectItem>
            <SelectItem value="default">Medium</SelectItem>
            <SelectItem value="lg">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between px-4">
        <Label className="text-sm font-normal">Width</Label>
        <Select
          value={fullWidthEnabled ? "full" : "hug"}
          onValueChange={(value) => {
            setFullWidthEnabled(value === "full")
            handleChange("fullWidth", value === "full")
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full">Full Width</SelectItem>
            <SelectItem value="hug">Hug Content</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="divide-y divide-border border-border shadow-none">
        <div className="py-4 pl-2 pr-4">
          <div className="flex items-center gap-1">
            <Switch
              checked={onlyIconEnabled}
              onCheckedChange={(checked) => {
                setOnlyIconEnabled(checked)
                setLabelEnabled(!checked)
                handleChange("onlyIcon", checked)
                if (checked) {
                  handleChange("label", undefined)
                }
              }}
              className="scale-75"
            />
            <Label className="cursor-pointer font-normal">Only Icon</Label>
          </div>
        </div>

        <div className="py-4 pl-2 pr-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Switch
                checked={labelEnabled}
                onCheckedChange={(checked) => {
                  setLabelEnabled(checked)
                  handleChange("label", checked ? props.label || "Button" : undefined)
                }}
                className="scale-75"
                disabled={onlyIconEnabled}
              />
              <Label className="cursor-pointer font-normal">Label</Label>
            </div>
            <Input
              value={props.label || ""}
              onChange={(e) => handleChange("label", e.target.value)}
              className="w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Button"
              disabled={!labelEnabled || onlyIconEnabled}
            />
          </div>
        </div>

        <TooltipProvider>
          {[
            { key: "destructive", label: "Destructive", state: destructiveEnabled, setState: setDestructiveEnabled },
            { key: "disabled", label: "Disabled", state: disabledEnabled, setState: setDisabledEnabled },
            { key: "dot", label: "Dot", state: dotEnabled, setState: setDotEnabled },
            { key: "leadIcon", label: "Lead Icon", state: leadIconEnabled, setState: setLeadIconEnabled },
            { key: "tailIcon", label: "Tail Icon", state: tailIconEnabled, setState: setTailIconEnabled },
          ].map(({ key, label, state, setState }) => (
            <div key={key} className="py-4 pl-2 pr-4">
              <div className="flex items-center gap-1">
                <Switch
                  checked={state}
                  onCheckedChange={(checked) => {
                    setState(checked)
                    handleChange(key, checked)
                  }}
                  className="scale-75"
                />
                <Label className="cursor-pointer font-normal">{label}</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle {label.toLowerCase()} for the button</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          ))}

          <div className="py-4 pl-2 pr-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Switch
                  checked={badgeEnabled}
                  onCheckedChange={(checked) => {
                    setBadgeEnabled(checked)
                    handleChange("badge", checked ? props.badge || "" : undefined)
                  }}
                  className="scale-75"
                />
                <Label className="cursor-pointer font-normal">Badge</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add a badge to the button</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                placeholder="Badge text"
                value={props.badge || ""}
                onChange={(e) => handleChange("badge", e.target.value)}
                className="w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!badgeEnabled}
              />
            </div>
          </div>
        </TooltipProvider>
      </Card>
    </div>
  )
}
