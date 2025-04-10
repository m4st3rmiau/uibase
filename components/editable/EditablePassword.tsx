"use client"

import * as React from "react"
import { Eye, EyeOff, Check, X, Lock, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface EditablePasswordProps {
  props: {
    label?: string
    placeholder?: string
    required?: boolean
    disabled?: boolean
    showLabel?: boolean
    helpIcon?: boolean
    optional?: boolean
    leadIcon?: boolean
    viewPassword?: boolean
    size?: "default" | "sm" | "lg"
  }
}

interface ValidationRule {
  id: string
  label: string
  validate: (value: string) => boolean
}

export function EditablePassword({ props }: EditablePasswordProps) {
  const [showPassword, setShowPassword] = React.useState(false)
  const [value, setValue] = React.useState("")

  const validationRules: ValidationRule[] = [
    {
      id: "length",
      label: "At least 8 characters",
      validate: (value) => value.length >= 8,
    },
    {
      id: "number",
      label: "At least 1 number",
      validate: (value) => /\d/.test(value),
    },
    {
      id: "lowercase",
      label: "At least 1 lowercase letter",
      validate: (value) => /[a-z]/.test(value),
    },
    {
      id: "uppercase",
      label: "At least 1 uppercase letter",
      validate: (value) => /[A-Z]/.test(value),
    },
  ]

  const getPasswordStrength = () => {
    const meetsRequirements = validationRules.filter((rule) => rule.validate(value))
    return (meetsRequirements.length / validationRules.length) * 100
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="space-y-1">
      {props.showLabel !== false && (
        <div className="flex items-center gap-2">
          <Label className={cn("font-medium", props.required && "after:content-['*'] after:ml-0.5 after:text-red-500")}>
            {props.label || "Password"}
            {props.optional && <span className="text-muted-foreground ml-1">(Optional)</span>}
          </Label>
          {props.helpIcon && <HelpCircle className="h-4 w-4 text-muted-foreground" />}
        </div>
      )}
      <div className="space-y-3">
        <div className="relative">
          {props.leadIcon && (
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          )}
          <Input
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={cn(
              props.leadIcon && "pl-10",
              props.viewPassword !== false && "pr-10",
              props.size === "sm" && "h-8 text-sm",
              props.size === "lg" && "h-12 text-lg",
            )}
            placeholder={props.placeholder || "Enter password"}
            required={props.required}
            disabled={props.disabled}
          />
          {props.viewPassword !== false && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={togglePasswordVisibility}
              disabled={props.disabled}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
            </Button>
          )}
        </div>
        <div>
          <Progress value={value ? getPasswordStrength() : 0} className="h-1" />
          <div className="space-y-2 mt-3">
            <p className="text-sm font-medium">Password requirements:</p>
            <div className="space-y-2">
              {validationRules.map((rule) => {
                const isValid = rule.validate(value)
                return (
                  <div key={rule.id} className="flex items-center gap-2 text-sm">
                    {isValid ? (
                      <Check className="h-4 w-4 text-[#059669]" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className={cn("text-muted-foreground", isValid && "text-[#059669]")}>{rule.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
