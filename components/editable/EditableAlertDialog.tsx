"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react"

interface EditableAlertDialogProps {
  props: {
    triggerText?: string
    title?: string
    description?: string
    cancelText?: string
    actionText?: string
    variant?: "default" | "destructive" | "success" | "warning" | "info"
    showIcon?: boolean
    showCloseButton?: boolean
    showHeader?: boolean
    footerContent?: string
  }
}

export function EditableAlertDialog({ props }: EditableAlertDialogProps) {
  const {
    triggerText = "Open",
    title = "Are you absolutely sure?",
    description = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
    cancelText = "Cancel",
    actionText = "Continue",
    variant = "default",
    showIcon = false,
    showCloseButton = false,
    showHeader = true,
    footerContent = "",
  } = props

  const [open, setOpen] = useState(false)

  const icons = {
    info: Info,
    warning: AlertCircle,
    success: CheckCircle,
    destructive: XCircle,
  }
  const Icon = icons[variant] || Info

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          {triggerText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {showHeader && (
          <AlertDialogHeader>
            {showIcon && <Icon className="h-6 w-6 mr-2" />}
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
        )}
        {!showHeader && <div className="p-4">{description}</div>}
        <AlertDialogFooter>
          {footerContent ? (
            <div className="w-full">{footerContent}</div>
          ) : (
            <>
              <AlertDialogCancel onClick={() => setOpen(false)}>{cancelText}</AlertDialogCancel>
              <AlertDialogAction onClick={() => setOpen(false)}>{actionText}</AlertDialogAction>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
