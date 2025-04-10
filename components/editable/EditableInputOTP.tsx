"use client"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface EditableInputOTPProps {
  props: {
    label?: string
    length?: number
    required?: boolean
    disabled?: boolean
    description?: string
    showLabel?: boolean
    blockDivider?: boolean
    placeholder?: string
    size?: "default" | "sm" | "lg"
    pattern?: string
    type?: "numeric" | "alphanumeric" | "alphabetic"
    maxLength?: number
    groupLength?: number
    optional?: boolean
    helpIcon?: boolean
  }
}

export function EditableInputOTP({ props }: EditableInputOTPProps) {
  const {
    label,
    length = 6,
    required,
    disabled = false,
    description,
    showLabel = true,
    blockDivider = false,
    placeholder = "○",
    size = "default",
    pattern = "[0-9]",
    type = "numeric",
    groupLength = 3,
    optional = false,
    helpIcon = false,
  } = props

  return (
    <div className="space-y-2">
      {showLabel && (
        <div className="flex items-center gap-1">
          <Label htmlFor="otp" className="text-sm font-medium">
            {label || "One-Time Password"}
            {required && <span className="text-destructive"> *</span>}
            {optional && <span className="text-muted-foreground text-xs"> (Optional)</span>}
          </Label>
          {helpIcon && (
            <span className="text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
            </span>
          )}
        </div>
      )}
      <InputOTP
        maxLength={length}
        pattern={pattern}
        type={type}
        disabled={disabled}
        render={({ slots }) => (
          <InputOTPGroup className="gap-2">
            {slots.map((slot) => {
              const { key, digit } = slot
              return (
                <InputOTPSlot
                  key={key}
                  defaultValue={digit}
                  className={cn(
                    "rounded-md border",
                    blockDivider && (key + 1) % groupLength === 0 && key !== length - 1 && "mr-2",
                    size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10",
                  )}
                />
              )
            })}
          </InputOTPGroup>
        )}
      />
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  )
}
