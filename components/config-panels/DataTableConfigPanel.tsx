"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Trash } from "lucide-react"

interface DataTableConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function DataTableConfigPanel({ props, onChange }: DataTableConfigPanelProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value })
  }

  const addColumn = () => {
    const newColumns = [
      ...props.columns,
      { key: `column-${props.columns.length + 1}`, label: `Column ${props.columns.length + 1}` },
    ]
    handleChange("columns", newColumns)
  }

  const updateColumn = (index: number, field: "key" | "label", value: string) => {
    const newColumns = [...props.columns]
    newColumns[index][field] = value
    handleChange("columns", newColumns)
  }

  const removeColumn = (index: number) => {
    const newColumns = props.columns.filter((_: any, i: number) => i !== index)
    handleChange("columns", newColumns)
  }

  const addRow = () => {
    const newRow: Record<string, string> = {}
    props.columns.forEach((column: { key: string }) => {
      newRow[column.key] = ""
    })
    const newData = [...props.data, newRow]
    handleChange("data", newData)
  }

  const updateCell = (rowIndex: number, columnKey: string, value: string) => {
    const newData = [...props.data]
    newData[rowIndex][columnKey] = value
    handleChange("data", newData)
  }

  const removeRow = (index: number) => {
    const newData = props.data.filter((_: any, i: number) => i !== index)
    handleChange("data", newData)
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border shadow-none space-y-4">
        <div className="space-y-2">
          <Label>Columns</Label>
          {props.columns.map((column: any, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                value={column.key}
                onChange={(e) => updateColumn(index, "key", e.target.value)}
                placeholder="Column key"
              />
              <Input
                value={column.label}
                onChange={(e) => updateColumn(index, "label", e.target.value)}
                placeholder="Column label"
              />
              <Button variant="destructive" size="icon" onClick={() => removeColumn(index)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button onClick={addColumn} variant="outline" size="sm" className="w-full mt-2">
            <Plus className="h-4 w-4 mr-2" />
            Add Column
          </Button>
        </div>
        <div className="space-y-2">
          <Label>Rows</Label>
          {props.data.map((row: any, rowIndex: number) => (
            <Card key={rowIndex} className="p-4 space-y-2">
              {props.columns.map((column: any) => (
                <div key={column.key} className="flex items-center space-x-2">
                  <Label>{column.label}</Label>
                  <Input
                    value={row[column.key]}
                    onChange={(e) => updateCell(rowIndex, column.key, e.target.value)}
                    placeholder={`Enter ${column.label}`}
                  />
                </div>
              ))}
              <Button variant="destructive" size="sm" onClick={() => removeRow(rowIndex)}>
                <Trash className="h-4 w-4 mr-2" />
                Remove Row
              </Button>
            </Card>
          ))}
          <Button onClick={addRow} variant="outline" size="sm" className="w-full mt-2">
            <Plus className="h-4 w-4 mr-2" />
            Add Row
          </Button>
        </div>
      </Card>
    </div>
  )
}
