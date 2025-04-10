"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { HelpCircle, Mail, Lock } from "lucide-react"

interface EditableInputProps {
  props: {
    label?: string
    placeholder?: string
    description?: string
    id?: string
    type?: string
    disabled?: boolean
    required?: boolean
    optional?: boolean
    showLabel?: boolean
    helpIcon?: boolean
    leadIcon?: boolean
    tailIcon?: boolean
    tailText?: string
    size?: "sm" | "default" | "lg"
  }
  className?: string
}

export function EditableInput({ props, className }: EditableInputProps) {
  const {
    label = "Input Label",
    placeholder = "Enter text",
    description,
    id = "input",
    type = "text",
    disabled = false,
    required = false,
    optional = false,
    showLabel = true,
    helpIcon = false,
    leadIcon = false,
    tailIcon = false,
    tailText,
    size = "default",
  } = props

  const inputClassName = cn(
    leadIcon && "pl-10",
    tailIcon && "pr-10",
    size === "sm" && "h-8 text-sm",
    size === "lg" && "h-12 text-lg",
  )

  return (
    <div className={cn("space-y-2 w-full", className)}>
      {showLabel && (
        <div className="flex items-center gap-2">
          <Label
            htmlFor={id}
            className={cn("font-medium", required && "after:content-['*'] after:ml-0.5 after:text-red-500")}
          >
            {label}
            {optional && <span className="text-muted-foreground ml-1">(Optional)</span>}
          </Label>
          {helpIcon && <HelpCircle className="h-4 w-4 text-muted-foreground" />}
        </div>
      )}
      <div className="relative w-full">
        {leadIcon && <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />}
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={inputClassName}
        />
        {tailIcon && <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />}
        {tailText && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{tailText}</span>
        )}
      </div>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  )
}
