"use client"

import { Toggle } from "@/components/ui/toggle"

interface EditableToggleProps {
  props: {
    label: string
    pressed?: boolean
    disabled?: boolean
    variant?: "default" | "outline"
    size?: "default" | "sm" | "lg"
  }
}

export function EditableToggle({ props }: EditableToggleProps) {
  const { label, pressed = false, disabled = false, variant = "default", size = "default" } = props

  return (
    <Toggle pressed={pressed} disabled={disabled} variant={variant} size={size}>
      {label}
    </Toggle>
  )
}
