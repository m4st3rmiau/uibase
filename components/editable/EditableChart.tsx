"use client"

import React from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Trash } from "lucide-react"

interface ChartData {
  name: string
  total: number
}

interface EditableChartProps {
  props: {
    data: ChartData[]
  }
}

export function EditableChart({ props }: EditableChartProps) {
  const [data, setData] = React.useState<ChartData[]>(props.data || [])

  const addDataPoint = () => {
    setData([...data, { name: "New", total: 0 }])
  }

  const updateDataPoint = (index: number, field: keyof ChartData, value: string) => {
    const newData = [...data]
    if (field === "total") {
      newData[index][field] = Number.parseFloat(value)
    } else {
      newData[index][field] = value
    }
    setData(newData)
  }

  const removeDataPoint = (index: number) => {
    setData(data.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      {data.map((point, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor={`point-${index}-name`}>Name</Label>
            <Input
              id={`point-${index}-name`}
              value={point.name}
              onChange={(e) => updateDataPoint(index, "name", e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor={`point-${index}-total`}>Total</Label>
            <Input
              id={`point-${index}-total`}
              type="number"
              value={point.total}
              onChange={(e) => updateDataPoint(index, "total", e.target.value)}
            />
          </div>
          <Button variant="destructive" size="sm" onClick={() => removeDataPoint(index)}>
            <Trash className="h-4 w-4 mr-2" />
            Remove Data Point
          </Button>
        </div>
      ))}
      <Button onClick={addDataPoint}>
        <Plus className="h-4 w-4 mr-2" />
        Add Data Point
      </Button>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
