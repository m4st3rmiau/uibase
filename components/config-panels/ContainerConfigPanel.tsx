"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface ContainerConfigPanelProps {
  props: any
  onChange: (props: any) => void
  onAddNestedComponent?: () => void
}

export function ContainerConfigPanel({ props, onChange, onAddNestedComponent }: ContainerConfigPanelProps) {
  const [localProps, setLocalProps] = useState({
    showHeader: true,
    showFooter: false,
    headerTitle: "Container Title",
    headerDescription: "This container groups related components together",
    footerContent: "Container Footer",
    variant: "default",
    padding: "medium",
    borderRadius: "medium",
    backgroundColor: "default",
    borderColor: "default",
    width: "full",
    ...props,
  })

  const handleChange = (key: string, value: any) => {
    const updatedProps = { ...localProps, [key]: value }
    setLocalProps(updatedProps)
    onChange(updatedProps)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Container Settings</h3>
        <p className="text-sm text-muted-foreground">Configure the container appearance and content</p>
      </div>

      <Tabs defaultValue="content">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4 pt-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-header"
              checked={localProps.showHeader}
              onCheckedChange={(checked) => handleChange("showHeader", checked)}
            />
            <Label htmlFor="show-header">Show Header</Label>
          </div>

          {localProps.showHeader && (
            <div className="space-y-4 pl-6">
              <div className="space-y-2">
                <Label htmlFor="header-title">Header Title</Label>
                <Input
                  id="header-title"
                  value={localProps.headerTitle}
                  onChange={(e) => handleChange("headerTitle", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="header-description">Header Description</Label>
                <Textarea
                  id="header-description"
                  value={localProps.headerDescription}
                  onChange={(e) => handleChange("headerDescription", e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-footer"
              checked={localProps.showFooter}
              onCheckedChange={(checked) => handleChange("showFooter", checked)}
            />
            <Label htmlFor="show-footer">Show Footer</Label>
          </div>

          {localProps.showFooter && (
            <div className="space-y-2 pl-6">
              <Label htmlFor="footer-content">Footer Content</Label>
              <Textarea
                id="footer-content"
                value={localProps.footerContent}
                onChange={(e) => handleChange("footerContent", e.target.value)}
                rows={2}
              />
            </div>
          )}

          {onAddNestedComponent && (
            <div className="pt-4">
              <Button variant="outline" onClick={onAddNestedComponent} className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Component to Container
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Variant</Label>
            <RadioGroup
              value={localProps.variant}
              onValueChange={(value) => handleChange("variant", value)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="variant-default" />
                <Label htmlFor="variant-default">Default</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="outline" id="variant-outline" />
                <Label htmlFor="variant-outline">Outline</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ghost" id="variant-ghost" />
                <Label htmlFor="variant-ghost">Ghost</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="shadow" id="variant-shadow" />
                <Label htmlFor="variant-shadow">Shadow</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="variant-custom" />
                <Label htmlFor="variant-custom">Custom</Label>
              </div>
            </RadioGroup>
          </div>

          {localProps.variant === "custom" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="background-color">Background Color</Label>
                <Select
                  value={localProps.backgroundColor}
                  onValueChange={(value) => handleChange("backgroundColor", value)}
                >
                  <SelectTrigger id="background-color">
                    <SelectValue placeholder="Select background color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="accent">Accent</SelectItem>
                    <SelectItem value="muted">Muted</SelectItem>
                    <SelectItem value="transparent">Transparent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="border-color">Border Color</Label>
                <Select value={localProps.borderColor} onValueChange={(value) => handleChange("borderColor", value)}>
                  <SelectTrigger id="border-color">
                    <SelectValue placeholder="Select border color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="accent">Accent</SelectItem>
                    <SelectItem value="muted">Muted</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="border-radius">Border Radius</Label>
            <Select value={localProps.borderRadius} onValueChange={(value) => handleChange("borderRadius", value)}>
              <SelectTrigger id="border-radius">
                <SelectValue placeholder="Select border radius" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
                <SelectItem value="full">Full</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="padding">Padding</Label>
            <Select value={localProps.padding} onValueChange={(value) => handleChange("padding", value)}>
              <SelectTrigger id="padding">
                <SelectValue placeholder="Select padding" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="width">Width</Label>
            <Select value={localProps.width} onValueChange={(value) => handleChange("width", value)}>
              <SelectTrigger id="width">
                <SelectValue placeholder="Select width" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="full">Full</SelectItem>
                <SelectItem value="sm">Small (256px)</SelectItem>
                <SelectItem value="md">Medium (320px)</SelectItem>
                <SelectItem value="lg">Large (384px)</SelectItem>
                <SelectItem value="xl">Extra Large (512px)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
