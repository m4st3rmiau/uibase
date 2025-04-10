"use client"

import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"

interface PasswordConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function PasswordConfigPanel({ props, onChange }: PasswordConfigPanelProps) {
  const [labelEnabled, setLabelEnabled] = React.useState(props.showLabel !== false)
  const [helpIconEnabled, setHelpIconEnabled] = React.useState(!!props.helpIcon)
  const [disabledEnabled, setDisabledEnabled] = React.useState(!!props.disabled)
  const [optionalEnabled, setOptionalEnabled] = React.useState(!!props.optional)
  const [placeholderEnabled, setPlaceholderEnabled] = React.useState(!!props.placeholder)
  const [leadIconEnabled, setLeadIconEnabled] = React.useState(!!props.leadIcon)
  const [viewPasswordEnabled, setViewPasswordEnabled] = React.useState(props.viewPassword !== false)
  const [requiredEnabled, setRequiredEnabled] = React.useState(!!props.required)

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
                placeholder="Password"
                value={props.label || ""}
                onChange={(e) => handleChange("label", e.target.value)}
                className="w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
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
                placeholder="Enter password"
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
                <TooltipContent>
                  <p>Add an icon at the beginning of the password field.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="py-4 pl-2 pr-4">
            <div className="flex items-center gap-1">
              <Switch
                checked={viewPasswordEnabled}
                onCheckedChange={(checked) => {
                  setViewPasswordEnabled(checked)
                  handleChange("viewPassword", checked)
                }}
                className="scale-75"
              />
              <Label className="cursor-pointer font-normal">View Password</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Allow users to toggle password visibility.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="py-4 pl-2 pr-4">
            <div className="flex items-center gap-1">
              <Switch
                checked={requiredEnabled}
                onCheckedChange={(checked) => {
                  setRequiredEnabled(checked)
                  handleChange("required", checked)
                }}
                className="scale-75"
              />
              <Label className="cursor-pointer font-normal">Required</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Make this field required.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </Card>
      </div>
    </TooltipProvider>
  )
}
