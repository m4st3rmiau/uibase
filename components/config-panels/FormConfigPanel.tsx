"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash } from "lucide-react"

interface FormConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function FormConfigPanel({ props, onChange }: FormConfigPanelProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  const addField = () => {
    const newFields = [...props.fields, { name: `field${props.fields.length + 1}`, label: "New Field", type: "text" }]
    handleChange("fields", newFields)
  }

  const updateField = (index: number, field: string, value: string) => {
    const newFields = [...props.fields]
    newFields[index][field] = value
    handleChange("fields", newFields)
  }

  const removeField = (index: number) => {
    const newFields = props.fields.filter((_: any, i: number) => i !== index)
    handleChange("fields", newFields)
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border shadow-none space-y-4">
        {props.fields.map((field: any, index: number) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Input
                value={field.name}
                onChange={(e) => updateField(index, "name", e.target.value)}
                placeholder="Field name"
              />
              <Input
                value={field.label}
                onChange={(e) => updateField(index, "label", e.target.value)}
                placeholder="Field label"
              />
              <Select value={field.type} onValueChange={(value) => updateField(index, "type", value)}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="password">Password</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="destructive" size="icon" onClick={() => removeField(index)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Input
              value={field.placeholder || ""}
              onChange={(e) => updateField(index, "placeholder", e.target.value)}
              placeholder="Placeholder (optional)"
            />
            <Input
              value={field.description || ""}
              onChange={(e) => updateField(index, "description", e.target.value)}
              placeholder="Description (optional)"
            />
          </div>
        ))}
        <Button onClick={addField} variant="outline" size="sm" className="w-full mt-2">
          <Plus className="h-4 w-4 mr-2" />
          Add Field
        </Button>
        <div className="space-y-2">
          <Label htmlFor="submitText">Submit Button Text</Label>
          <Input
            id="submitText"
            value={props.submitText}
            onChange={(e) => handleChange("submitText", e.target.value)}
            placeholder="Submit"
          />
        </div>
      </Card>
    </div>
  )
}
