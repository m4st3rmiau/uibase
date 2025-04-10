"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const InputOTPGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center", className)} {...props} />,
)
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    index?: number
  }
>(({ className, index, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-10 w-10 items-center justify-center text-center text-base border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
))
InputOTPSlot.displayName = "InputOTPSlot"

interface InputOTPProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  maxLength?: number
  pattern?: string
  type?: "numeric" | "alphanumeric" | "alphabetic"
  render?: (props: { slots: { key: number; digit: string }[] }) => React.ReactNode
}

const InputOTP = React.forwardRef<HTMLInputElement, InputOTPProps>(
  ({ className, maxLength = 6, pattern, type = "numeric", render, ...props }, ref) => {
    const [value, setValue] = React.useState("")
    const inputRef = React.useRef<HTMLInputElement>(null)
    const slots = React.useMemo(() => {
      const digits = value.split("")
      return Array.from({ length: maxLength }).map((_, i) => ({
        key: i,
        digit: digits[i] || "",
      }))
    }, [value, maxLength])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      if (newValue.length <= maxLength) {
        setValue(newValue)
        props.onChange?.(e)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && value.length > 0) {
        setValue(value.slice(0, -1))
      }
    }

    const handleSlotChange = (index: number, digit: string) => {
      if (digit.length <= 1) {
        const newValue = value.split("")
        newValue[index] = digit
        setValue(newValue.join("").slice(0, maxLength))
      }
    }

    const handleSlotKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        if ((e.target as HTMLInputElement).value === "") {
          // Focus previous input if current is empty
          const prevInput = document.querySelector(`[data-slot-index="${index - 1}"]`) as HTMLInputElement
          if (prevInput) {
            prevInput.focus()
          }
        }
        const newValue = value.split("")
        newValue[index] = ""
        setValue(newValue.join(""))
      } else if (e.key === "ArrowLeft") {
        const prevInput = document.querySelector(`[data-slot-index="${index - 1}"]`) as HTMLInputElement
        if (prevInput) {
          prevInput.focus()
        }
      } else if (e.key === "ArrowRight") {
        const nextInput = document.querySelector(`[data-slot-index="${index + 1}"]`) as HTMLInputElement
        if (nextInput) {
          nextInput.focus()
        }
      }
    }

    const handleSlotInput = (index: number, e: React.FormEvent<HTMLInputElement>) => {
      const digit = (e.target as HTMLInputElement).value.slice(-1)
      handleSlotChange(index, digit)

      // Auto-focus next input
      if (digit) {
        const nextInput = document.querySelector(`[data-slot-index="${index + 1}"]`) as HTMLInputElement
        if (nextInput) {
          nextInput.focus()
        }
      }
    }

    // Hidden input to store the actual value
    return (
      <>
        <input ref={ref} type="hidden" value={value} name={props.name} onChange={handleChange} />
        {render ? (
          render({ slots })
        ) : (
          <InputOTPGroup>
            {slots.map((slot, index) => (
              <InputOTPSlot
                key={slot.key}
                index={index}
                data-slot-index={index}
                value={slot.digit}
                onInput={(e) => handleSlotInput(index, e)}
                onKeyDown={(e) => handleSlotKeyDown(index, e)}
                inputMode={type === "numeric" ? "numeric" : "text"}
                pattern={pattern || (type === "numeric" ? "[0-9]" : type === "alphabetic" ? "[A-Za-z]" : "[A-Za-z0-9]")}
                maxLength={1}
                disabled={props.disabled}
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </InputOTPGroup>
        )}
      </>
    )
  },
)
InputOTP.displayName = "InputOTP"

export { InputOTP, InputOTPGroup, InputOTPSlot }
