"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"

interface PaginationConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function PaginationConfigPanel({ props, onChange }: PaginationConfigPanelProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border shadow-none space-y-4">
        <div className="space-y-2">
          <Label htmlFor="totalPages">Total Pages</Label>
          <Input
            id="totalPages"
            type="number"
            min={1}
            value={props.totalPages}
            onChange={(e) => handleChange("totalPages", Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currentPage">Current Page</Label>
          <Input
            id="currentPage"
            type="number"
            min={1}
            max={props.totalPages}
            value={props.currentPage}
            onChange={(e) => handleChange("currentPage", Number(e.target.value))}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="showPrevNext"
            checked={props.showPrevNext}
            onCheckedChange={(checked) => handleChange("showPrevNext", checked)}
          />
          <Label htmlFor="showPrevNext">Show Previous/Next</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="showEllipsis"
            checked={props.showEllipsis}
            onCheckedChange={(checked) => handleChange("showEllipsis", checked)}
          />
          <Label htmlFor="showEllipsis">Show Ellipsis</Label>
        </div>
      </Card>
    </div>
  )
}
