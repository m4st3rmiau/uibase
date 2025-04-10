"use client"

import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"

interface DatePickerConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

interface InfoTooltipProps {
  image: string
  description: string
}

const InfoTooltip = ({ image, description }: InfoTooltipProps) => (
  <TooltipContent className="w-80">
    <div className="flex flex-col items-center">
      <img src={image || "/placeholder.svg"} alt="Info" className="w-full h-40 object-cover rounded-md m-2" />
      <p className="text-sm text-center">{description}</p>
    </div>
  </TooltipContent>
)

export function DatePickerConfigPanel({ props, onChange }: DatePickerConfigPanelProps) {
  const [labelEnabled, setLabelEnabled] = React.useState(props.showLabel !== false)
  const [descriptionEnabled, setDescriptionEnabled] = React.useState(!!props.description)
  const [helpIconEnabled, setHelpIconEnabled] = React.useState(!!props.helpIcon)
  const [disabledEnabled, setDisabledEnabled] = React.useState(!!props.disabled)
  const [optionalEnabled, setOptionalEnabled] = React.useState(!!props.optional)
  const [placeholderEnabled, setPlaceholderEnabled] = React.useState(!!props.placeholder)
  const [leadIconEnabled, setLeadIconEnabled] = React.useState(props.leadIcon !== false)
  const [tailIconEnabled, setTailIconEnabled] = React.useState(!!props.tailIcon)
  const [badgeEnabled, setBadgeEnabled] = React.useState(!!props.badge)

  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
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
                placeholder="Date Picker"
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
                <InfoTooltip
                  image="/placeholder.svg?height=160&width=320"
                  description="Add a help icon to provide additional information to the user."
                />
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
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <InfoTooltip image="/placeholder.svg?height=160&width=320" description="Mark this field as optional." />
              </Tooltip>
            </div>
          </div>
        </Card>

        <Card className="divide-y divide-border border-border shadow-none">
          <div className="py-4 pl-2 pr-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Switch
                  checked={placeholderEnabled}
                  onCheckedChange={(checked) => {
                    setPlaceholderEnabled(checked)
                    handleChange("placeholder", checked ? props.placeholder || "" : undefined)
                  }}
                  className="scale-75"
                />
                <Label className="cursor-pointer font-normal">Placeholder</Label>
              </div>
              <Input
                placeholder="Pick a date"
                value={props.placeholder || ""}
                onChange={(e) => handleChange("placeholder", e.target.value)}
                className="w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!placeholderEnabled}
              />
            </div>
          </div>

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
                <InfoTooltip
                  image="/placeholder.svg?height=160&width=320"
                  description="Add an icon at the beginning of the date picker."
                />
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
                <InfoTooltip
                  image="/placeholder.svg?height=160&width=320"
                  description="Add an icon at the end of the date picker."
                />
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
                  <InfoTooltip
                    image="/placeholder.svg?height=160&width=320"
                    description="Add a badge to the date picker."
                  />
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
        </Card>
      </div>
    </TooltipProvider>
  )
}
