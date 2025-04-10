"use client"

import { Progress } from "@/components/ui/progress"

interface EditableProgressProps {
  props: {
    value: number
    max?: number
    showValue?: boolean
  }
}

export function EditableProgress({ props }: EditableProgressProps) {
  const { value, max = 100, showValue = false } = props

  return (
    <div className="w-full">
      <Progress value={value} max={max} className="w-full" />
      {showValue && (
        <p className="text-sm text-center mt-2">
          {value} / {max}
        </p>
      )}
    </div>
  )
}
