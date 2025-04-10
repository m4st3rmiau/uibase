"use client"

import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"

interface TextareaConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function TextareaConfigPanel({ props, onChange }: TextareaConfigPanelProps) {
  const [labelEnabled, setLabelEnabled] = React.useState(props.showLabel !== false)
  const [descriptionEnabled, setDescriptionEnabled] = React.useState(!!props.description)
  const [helpIconEnabled, setHelpIconEnabled] = React.useState(!!props.helpIcon)
  const [optionalEnabled, setOptionalEnabled] = React.useState(!!props.optional)
  const [placeholderEnabled, setPlaceholderEnabled] = React.useState(!!props.placeholder)
  const [tailTextEnabled, setTailTextEnabled] = React.useState(!!props.tailText)
  const [leadIconEnabled, setLeadIconEnabled] = React.useState(!!props.leadIcon)
  const [switchEnabled, setSwitchEnabled] = React.useState(!!props.switch)

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
                placeholder="Textarea Label"
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
                <TooltipContent>
                  <p>Mark this field as optional.</p>
                </TooltipContent>
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
                placeholder="Enter placeholder"
                value={props.placeholder || ""}
                onChange={(e) => handleChange("placeholder", e.target.value)}
                className="w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!placeholderEnabled}
              />
            </div>
          </div>

          <div className="py-4 pl-2 pr-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Switch
                  checked={tailTextEnabled}
                  onCheckedChange={(checked) => {
                    setTailTextEnabled(checked)
                    handleChange("tailText", checked ? props.tailText || "" : undefined)
                  }}
                  className="scale-75"
                />
                <Label className="cursor-pointer font-normal">Tail Text</Label>
              </div>
              <Input
                placeholder="Enter tail text"
                value={props.tailText || ""}
                onChange={(e) => handleChange("tailText", e.target.value)}
                className="w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!tailTextEnabled}
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
                <TooltipContent>
                  <p>Add an icon at the beginning of the textarea.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="py-4 pl-2 pr-4">
            <div className="flex items-center gap-1">
              <Switch
                checked={switchEnabled}
                onCheckedChange={(checked) => {
                  setSwitchEnabled(checked)
                  handleChange("switch", checked)
                }}
                className="scale-75"
              />
              <Label className="cursor-pointer font-normal">Switch</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add a switch control to the textarea.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </Card>
      </div>
    </TooltipProvider>
  )
}
