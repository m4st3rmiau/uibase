"use client"

import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"

interface SliderConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function SliderConfigPanel({ props, onChange }: SliderConfigPanelProps) {
  const [labelEnabled, setLabelEnabled] = React.useState(props.showLabel !== false)
  const [descriptionEnabled, setDescriptionEnabled] = React.useState(!!props.description)
  const [helpIconEnabled, setHelpIconEnabled] = React.useState(!!props.helpIcon)
  const [disabledEnabled, setDisabledEnabled] = React.useState(!!props.disabled)
  const [marksEnabled, setMarksEnabled] = React.useState(!!props.marks)

  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex items-center justify-between px-4">
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
                placeholder="Slider Label"
                value={props.label || ""}
                onChange={(e) => handleChange("label", e.target.value)}
                className="w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!labelEnabled}
              />
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
                placeholder="Enter description"
                value={props.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!descriptionEnabled}
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
        </Card>

        <Card className="divide-y divide-border border-border shadow-none">
          <div className="py-4 pl-2 pr-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-normal">Min Value</Label>
              <Input
                type="number"
                value={props.min || 0}
                onChange={(e) => handleChange("min", Number(e.target.value))}
                className="w-[200px]"
              />
            </div>
          </div>

          <div className="py-4 pl-2 pr-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-normal">Max Value</Label>
              <Input
                type="number"
                value={props.max || 100}
                onChange={(e) => handleChange("max", Number(e.target.value))}
                className="w-[200px]"
              />
            </div>
          </div>

          <div className="py-4 pl-2 pr-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-normal">Step</Label>
              <Input
                type="number"
                value={props.step || 1}
                onChange={(e) => handleChange("step", Number(e.target.value))}
                className="w-[200px]"
              />
            </div>
          </div>

          <div className="py-4 pl-2 pr-4">
            <div className="flex items-center gap-1">
              <Switch
                checked={marksEnabled}
                onCheckedChange={(checked) => {
                  setMarksEnabled(checked)
                  handleChange("marks", checked)
                }}
                className="scale-75"
              />
              <Label className="cursor-pointer font-normal">Show Marks</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Display marks on the slider track.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </Card>
      </div>
    </TooltipProvider>
  )
}
