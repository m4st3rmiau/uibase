"use client"

import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"

interface UploaderConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function UploaderConfigPanel({ props, onChange }: UploaderConfigPanelProps) {
  const [labelEnabled, setLabelEnabled] = React.useState(props.showLabel !== false)
  const [descriptionEnabled, setDescriptionEnabled] = React.useState(!!props.description)
  const [helpIconEnabled, setHelpIconEnabled] = React.useState(!!props.helpIcon)
  const [disabledEnabled, setDisabledEnabled] = React.useState(!!props.disabled)
  const [optionalEnabled, setOptionalEnabled] = React.useState(!!props.optional)
  const [uploadIconEnabled, setUploadIconEnabled] = React.useState(props.showUploadIcon !== false)
  const [titleTextEnabled, setTitleTextEnabled] = React.useState(!!props.titleText)
  const [instructionsEnabled, setInstructionsEnabled] = React.useState(!!props.instructions)
  const [buttonTextEnabled, setButtonTextEnabled] = React.useState(!!props.buttonText)
  const [requiredEnabled, setRequiredEnabled] = React.useState(!!props.required)
  const [multipleEnabled, setMultipleEnabled] = React.useState(!!props.multiple)

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
                placeholder="Input file"
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
            <div className="flex items-center gap-1">
              <Switch
                checked={uploadIconEnabled}
                onCheckedChange={(checked) => {
                  setUploadIconEnabled(checked)
                  handleChange("showUploadIcon", checked)
                }}
                className="scale-75"
              />
              <Label className="cursor-pointer font-normal">Upload icon</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Show or hide the upload cloud icon in the uploader.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div className="py-4 pl-2 pr-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Switch
                  checked={titleTextEnabled}
                  onCheckedChange={(checked) => {
                    setTitleTextEnabled(checked)
                    handleChange("titleText", checked ? props.titleText || "" : undefined)
                  }}
                  className="scale-75"
                />
                <Label className="cursor-pointer font-normal">Title text</Label>
              </div>
              <Input
                placeholder="Choose a file or drag & drop it here"
                value={props.titleText || ""}
                onChange={(e) => handleChange("titleText", e.target.value)}
                className="w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!titleTextEnabled}
              />
            </div>
          </div>

          <div className="py-4 pl-2 pr-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Switch
                  checked={instructionsEnabled}
                  onCheckedChange={(checked) => {
                    setInstructionsEnabled(checked)
                    handleChange("instructions", checked ? props.instructions || "" : undefined)
                  }}
                  className="scale-75"
                />
                <Label className="cursor-pointer font-normal">Instructions</Label>
              </div>
              <Input
                placeholder="JPEG and PNG formats, up to 20MB"
                value={props.instructions || ""}
                onChange={(e) => handleChange("instructions", e.target.value)}
                className="w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!instructionsEnabled}
              />
            </div>
          </div>

          <div className="py-4 pl-2 pr-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Switch
                  checked={buttonTextEnabled}
                  onCheckedChange={(checked) => {
                    setButtonTextEnabled(checked)
                    handleChange("buttonText", checked ? props.buttonText || "" : undefined)
                  }}
                  className="scale-75"
                />
                <Label className="cursor-pointer font-normal">Button text</Label>
              </div>
              <Input
                placeholder="Browse File"
                value={props.buttonText || ""}
                onChange={(e) => handleChange("buttonText", e.target.value)}
                className="w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!buttonTextEnabled}
              />
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

          <div className="py-4 pl-2 pr-4">
            <div className="flex items-center gap-1">
              <Switch
                checked={multipleEnabled}
                onCheckedChange={(checked) => {
                  setMultipleEnabled(checked)
                  handleChange("multiple", checked)
                }}
                className="scale-75"
              />
              <Label className="cursor-pointer font-normal">Allow multiple files</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Allow users to upload multiple files at once.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </Card>
      </div>
    </TooltipProvider>
  )
}
