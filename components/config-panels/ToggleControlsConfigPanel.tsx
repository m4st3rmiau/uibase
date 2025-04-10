"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle, X, PlusCircle } from "lucide-react"

interface ToggleControlsConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
  type: "Checkbox" | "Radio Group" | "Switch"
}

export function ToggleControlsConfigPanel({ props, onChange, type }: ToggleControlsConfigPanelProps) {
  const [labelEnabled, setLabelEnabled] = React.useState(props.showLabel !== false)
  const [descriptionEnabled, setDescriptionEnabled] = React.useState(!!props.description)
  const [helpIconEnabled, setHelpIconEnabled] = React.useState(!!props.helpIcon)
  const [disabledEnabled, setDisabledEnabled] = React.useState(!!props.disabled)
  const [optionalEnabled, setOptionalEnabled] = React.useState(!!props.optional)
  const [leadIconEnabled, setLeadIconEnabled] = React.useState(!!props.leadIcon)
  const [descriptionIconEnabled, setDescriptionIconEnabled] = React.useState(!!props.descriptionIcon)
  const [tailIconEnabled, setTailIconEnabled] = React.useState(!!props.tailIcon)
  const [badgeEnabled, setBadgeEnabled] = React.useState(!!props.badge)
  const [options, setOptions] = React.useState<string[]>(props.options || ["Option 1"])
  const [showOptionLabelEnabled, setShowOptionLabelEnabled] = React.useState(props.showOptionLabel !== false)

  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  const addOption = () => {
    setOptions([...options, ""])
    handleChange("options", [...options, ""])
  }

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index)
    setOptions(newOptions)
    handleChange("options", newOptions)
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
    handleChange("options", newOptions)
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex items-center justify-between px-4">
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

        <Card className="divide-y divide-border border-border shadow-none">
          <div className="py-4 pl-2 pr-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Switch
                  checked={labelEnabled}
                  onCheckedChange={(checked) => {
                    setLabelEnabled(checked)
                    handleChange("showLabel", checked)
                  }}
                  className="scale-75"
                />
                <Label className="cursor-pointer font-normal">Label</Label>
              </div>
              <Input
                value={props.label || ""}
                onChange={(e) => handleChange("label", e.target.value)}
                className="w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder={`${type} Label`}
                disabled={!labelEnabled}
              />
            </div>
          </div>

          <div className="py-4 pl-2 pr-4">
            <div className="flex items-center gap-1">
              <Switch
                checked={helpIconEnabled}
                onCheckedChange={(checked) => {
                  setHelpIconEnabled(checked)
                  handleChange("helpIcon", checked)
                }}
                className="scale-75"
              />
              <Label className="cursor-pointer font-normal">Help Icon</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add a help icon to provide additional information to the user.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="py-4 pl-2 pr-4">
            <div className="flex items-center gap-1">
              <Switch
                checked={disabledEnabled}
                onCheckedChange={(checked) => {
                  setDisabledEnabled(checked)
                  handleChange("disabled", checked)
                }}
                className="scale-75"
              />
              <Label className="cursor-pointer font-normal">Disabled</Label>
            </div>
          </div>

          <div className="py-4 pl-2 pr-4">
            <div className="flex items-center gap-1">
              <Switch
                checked={optionalEnabled}
                onCheckedChange={(checked) => {
                  setOptionalEnabled(checked)
                  handleChange("optional", checked)
                }}
                className="scale-75"
              />
              <Label className="cursor-pointer font-normal">Optional</Label>
            </div>
          </div>
        </Card>

        <Card className="divide-y divide-border border-border shadow-none">
          <div className="py-4 pl-2 pr-4">
            <div className="flex items-center gap-1">
              <Switch
                checked={leadIconEnabled}
                onCheckedChange={(checked) => {
                  setLeadIconEnabled(checked)
                  handleChange("leadIcon", checked)
                }}
                className="scale-75"
              />
              <Label className="cursor-pointer font-normal">Lead Icon</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add an icon at the beginning.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="py-4 pl-2 pr-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Switch
                  checked={descriptionEnabled}
                  onCheckedChange={(checked) => {
                    setDescriptionEnabled(checked)
                    handleChange("description", checked ? props.description || "" : undefined)
                  }}
                  className="scale-75"
                />
                <Label className="cursor-pointer font-normal">Description</Label>
              </div>
              <Input
                value={props.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter description"
                disabled={!descriptionEnabled}
              />
            </div>
          </div>

          <div className="py-4 pl-2 pr-4">
            <div className="flex items-center gap-1">
              <Switch
                checked={descriptionIconEnabled}
                onCheckedChange={(checked) => {
                  setDescriptionIconEnabled(checked)
                  handleChange("descriptionIcon", checked)
                }}
                className="scale-75"
              />
              <Label className="cursor-pointer font-normal">Description Icon</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add an icon next to the description.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="py-4 pl-2 pr-4">
            <div className="flex items-center gap-1">
              <Switch
                checked={tailIconEnabled}
                onCheckedChange={(checked) => {
                  setTailIconEnabled(checked)
                  handleChange("tailIcon", checked)
                }}
                className="scale-75"
              />
              <Label className="cursor-pointer font-normal">Tail Icon</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add an icon at the end.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

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
                    <p>Add a badge.</p>
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
          <div className="py-4 pl-2 pr-4">
            <div className="flex items-center gap-1">
              <Switch
                checked={showOptionLabelEnabled}
                onCheckedChange={(checked) => {
                  setShowOptionLabelEnabled(checked)
                  handleChange("showOptionLabel", checked)
                }}
                className="scale-75"
              />
              <Label className="cursor-pointer font-normal">Show option label</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Show or hide the label next to each option.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-border shadow-none space-y-2 bg-muted/50">
          <Label className="text-sm font-medium text-zinc-500">Options</Label>
          {options.map((option, index) => (
            <div key={index} className="relative">
              <Input
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder="Enter option"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeOption(index)}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-transparent"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addOption} className="w-full mt-2">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add option
          </Button>
        </Card>
      </div>
    </TooltipProvider>
  )
}
