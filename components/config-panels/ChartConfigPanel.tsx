"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

interface ChartConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function ChartConfigPanel({ props, onChange }: ChartConfigPanelProps) {
  const [activeTab, setActiveTab] = useState("general")

  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  const handleDataChange = (value: string) => {
    try {
      const parsedData = JSON.parse(value)
      handleChange("data", parsedData)
    } catch (error) {
      console.error("Invalid JSON data format")
    }
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 pt-4">
          <Card className="p-4 border-border shadow-none space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-normal">Chart Type</Label>
              <Select value={props.chartType || "line"} onValueChange={(value) => handleChange("chartType", value)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="area">Area Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                  <SelectItem value="donut">Donut Chart</SelectItem>
                  <SelectItem value="scatter">Scatter Plot</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm font-normal">Title</Label>
              <Input
                value={props.title || ""}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-[200px]"
                placeholder="Chart Title"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm font-normal">Height</Label>
              <Input
                type="number"
                value={props.height || 300}
                onChange={(e) => handleChange("height", Number.parseInt(e.target.value, 10))}
                className="w-[200px]"
                min={100}
                max={800}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Show Legend</Label>
              <Switch
                checked={props.showLegend || false}
                onCheckedChange={(checked) => handleChange("showLegend", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Show Grid</Label>
              <Switch
                checked={props.showGrid || false}
                onCheckedChange={(checked) => handleChange("showGrid", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Show Tooltip</Label>
              <Switch
                checked={props.showTooltip !== false}
                onCheckedChange={(checked) => handleChange("showTooltip", checked)}
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-4 pt-4">
          <Card className="p-4 border-border shadow-none space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-normal">Chart Data (JSON)</Label>
              <Textarea
                value={props.data ? JSON.stringify(props.data, null, 2) : ""}
                onChange={(e) => handleDataChange(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
                placeholder='[{"name": "Jan", "value": 100}, {"name": "Feb", "value": 200}]'
              />
              <p className="text-xs text-muted-foreground">Enter valid JSON data for the chart</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="style" className="space-y-4 pt-4">
          <Card className="p-4 border-border shadow-none space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-normal">Color Scheme</Label>
              <Select
                value={props.colorScheme || "default"}
                onValueChange={(value) => handleChange("colorScheme", value)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="pastel">Pastel</SelectItem>
                  <SelectItem value="vibrant">Vibrant</SelectItem>
                  <SelectItem value="monochrome">Monochrome</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm font-normal">Stroke Width</Label>
              <Input
                type="number"
                value={props.strokeWidth || 2}
                onChange={(e) => handleChange("strokeWidth", Number.parseInt(e.target.value, 10))}
                className="w-[200px]"
                min={1}
                max={10}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Curved Lines</Label>
              <Switch
                checked={props.curvedLines || false}
                onCheckedChange={(checked) => handleChange("curvedLines", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Responsive</Label>
              <Switch
                checked={props.responsive !== false}
                onCheckedChange={(checked) => handleChange("responsive", checked)}
              />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
