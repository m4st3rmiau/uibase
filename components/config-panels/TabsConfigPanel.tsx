"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash } from "lucide-react"

interface TabsConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function TabsConfigPanel({ props, onChange }: TabsConfigPanelProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  const addTab = () => {
    const newItems = [...props.items, { title: `Tab ${props.items.length + 1}`, content: "New tab content" }]
    handleChange("items", newItems)
  }

  const updateTab = (index: number, field: "title" | "content", value: string) => {
    const newItems = [...props.items]
    newItems[index][field] = value
    handleChange("items", newItems)
  }

  const removeTab = (index: number) => {
    const newItems = props.items.filter((_: any, i: number) => i !== index)
    handleChange("items", newItems)
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border shadow-none space-y-4">
        {props.items.map((item: any, index: number) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Input
                value={item.title}
                onChange={(e) => updateTab(index, "title", e.target.value)}
                placeholder="Tab title"
              />
              <Button variant="destructive" size="icon" onClick={() => removeTab(index)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Textarea
              value={item.content}
              onChange={(e) => updateTab(index, "content", e.target.value)}
              placeholder="Tab content"
            />
          </div>
        ))}
        <Button onClick={addTab} variant="outline" size="sm" className="w-full mt-2">
          <Plus className="h-4 w-4 mr-2" />
          Add Tab
        </Button>
      </Card>
    </div>
  )
}
