"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface EditableToastProps {
  props: {
    title: string
    description?: string
    action?: string
    variant?: "default" | "destructive"
    duration?: number
  }
}

export function EditableToast({ props }: EditableToastProps) {
  const { title, description, action, variant = "default", duration = 3000 } = props
  const [toastId, setToastId] = useState<string | number | null>(null)

  const showToast = () => {
    const id = toast(title, {
      description: description,
      action: action
        ? {
            label: action,
            onClick: () => console.log("Toast action clicked"),
          }
        : undefined,
      variant: variant,
      duration: duration,
    })
    setToastId(id)
  }

  const dismissToast = () => {
    if (toastId !== null) {
      toast.dismiss(toastId)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <Button onClick={showToast}>Show Toast</Button>
      {toastId !== null && (
        <Button variant="outline" onClick={dismissToast}>
          Dismiss Toast
        </Button>
      )}
    </div>
  )
}
