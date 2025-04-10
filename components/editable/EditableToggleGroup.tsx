"use client"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Label } from "@/components/ui/label"
import { Home, Settings, User, Mail, Bell } from "lucide-react"

interface EditableToggleGroupProps {
  props: {
    label?: string
    showLabel?: boolean
    type: "single" | "multiple"
    items: {
      value: string
      label?: string
      icon?: string
    }[]
    disabled?: boolean
    variant?: "default" | "outline"
    size?: "default" | "sm" | "lg"
  }
}

export function EditableToggleGroup({ props }: EditableToggleGroupProps) {
  const { label, showLabel = true, type, items, disabled, variant, size } = props

  return (
    <div className="space-y-2">
      {showLabel && label && <Label>{label}</Label>}
      <ToggleGroup type={type} disabled={disabled} variant={variant} size={size}>
        {items.map((item) => {
          const IconComponent =
            item.icon && item.icon !== "none"
              ? {
                  Home,
                  Settings,
                  User,
                  Mail,
                  Bell,
                }[item.icon as keyof typeof Home]
              : null
          return (
            <ToggleGroupItem key={item.value} value={item.value}>
              {IconComponent && <IconComponent className="h-4 w-4 mr-2" />}
              {item.label}
            </ToggleGroupItem>
          )
        })}
      </ToggleGroup>
    </div>
  )
}
