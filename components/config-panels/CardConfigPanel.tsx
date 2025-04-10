"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
// Add imports for the component selector
import { PlusCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { COMPONENTS } from "@/app/playground/component-list"
import { Button } from "@/components/ui/button"

interface CardConfigPanelProps {
  props: any
  onChange: (updatedProps: any) => void
  onAddNestedComponent?: () => void
}

export function CardConfigPanel({ props, onChange, onAddNestedComponent }: CardConfigPanelProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border shadow-none space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">Card Type</Label>
          <Select value={props.cardType || "default"} onValueChange={(value) => handleChange("cardType", value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select card type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="payment">Payment Method</SelectItem>
              <SelectItem value="account">Account</SelectItem>
              <SelectItem value="shared">Shared</SelectItem>
              <SelectItem value="cookie-settings">Cookie Settings</SelectItem>
              <SelectItem value="team">Team</SelectItem>
              <SelectItem value="report">Report</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={props.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Card Title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={props.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Card Description"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="showHeader">Show Header</Label>
          <Switch
            id="showHeader"
            checked={props.showHeader !== false}
            onCheckedChange={(checked) => handleChange("showHeader", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="showFooter">Show Footer</Label>
          <Switch
            id="showFooter"
            checked={props.showFooter || false}
            onCheckedChange={(checked) => handleChange("showFooter", checked)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="width">Width</Label>
          <Input
            id="width"
            value={props.width || ""}
            onChange={(e) => handleChange("width", e.target.value)}
            placeholder="w-[350px]"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">Rounded</Label>
          <Select value={props.rounded || "md"} onValueChange={(value) => handleChange("rounded", value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="md">Medium</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
              <SelectItem value="xl">Extra Large</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="bordered">Bordered</Label>
          <Switch
            id="bordered"
            checked={props.bordered !== false}
            onCheckedChange={(checked) => handleChange("bordered", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="elevated">Elevated</Label>
          <Switch
            id="elevated"
            checked={props.elevated || false}
            onCheckedChange={(checked) => handleChange("elevated", checked)}
          />
        </div>

        {props.cardType === "default" && (
          <>
            <div className="flex items-center justify-between">
              <Label className="text-sm font-normal">Button Layout</Label>
              <Select
                value={props.buttonLayout || "side-by-side"}
                onValueChange={(value) => handleChange("buttonLayout", value)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="side-by-side">Side by Side</SelectItem>
                  <SelectItem value="stacked">Stacked</SelectItem>
                  <SelectItem value="spaced">Spaced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm font-normal">Button Variant</Label>
              <Select
                value={props.buttonVariant || "default"}
                onValueChange={(value) => handleChange("buttonVariant", value)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="outline">Outline</SelectItem>
                  <SelectItem value="ghost">Ghost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {props.cardType === "payment" && (
          <>
            <div className="flex items-center justify-between">
              <Label htmlFor="showPaymentIcons">Show Payment Icons</Label>
              <Switch
                id="showPaymentIcons"
                checked={props.showPaymentIcons !== false}
                onCheckedChange={(checked) => handleChange("showPaymentIcons", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="showCVC">Show CVC</Label>
              <Switch
                id="showCVC"
                checked={props.showCVC !== false}
                onCheckedChange={(checked) => handleChange("showCVC", checked)}
              />
            </div>
          </>
        )}

        {/* Add Component Dialog */}
        {onAddNestedComponent && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full mt-4">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Nested Component
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Component to Card</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-2">
                  {COMPONENTS.filter((c) => !c.disabled)
                    .slice(0, 10)
                    .map((component) => (
                      <Button
                        key={component.name}
                        variant="outline"
                        className="justify-start"
                        onClick={() => {
                          onAddNestedComponent()
                        }}
                      >
                        {component.name}
                      </Button>
                    ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </Card>
    </div>
  )
}
