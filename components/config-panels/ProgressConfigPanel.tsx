"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"

interface ProgressConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function ProgressConfigPanel({ props, onChange }: ProgressConfigPanelProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border shadow-none space-y-4">
        <div className="space-y-2">
          <Label htmlFor="value">Value</Label>
          <Input
            id="value"
            type="number"
            value={props.value}
            onChange={(e) => handleChange("value", Number(e.target.value))}
            min={0}
            max={props.max || 100}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="max">Max Value</Label>
          <Input
            id="max"
            type="number"
            value={props.max || 100}
            onChange={(e) => handleChange("max", Number(e.target.value))}
            min={1}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="showValue"
            checked={props.showValue || false}
            onCheckedChange={(checked) => handleChange("showValue", checked)}
          />
          <Label htmlFor="showValue">Show Value</Label>
        </div>
      </Card>
    </div>
  )
}
