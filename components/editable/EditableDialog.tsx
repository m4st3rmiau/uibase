"use client"
import type React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { PlusCircle } from "lucide-react"

interface EditableDialogProps {
  props: {
    triggerText: string
    title: string
    description: string
    content: string
    cancelText: string
    confirmText: string
    defaultOpen?: boolean
  }
  children?: React.ReactNode
  onAddComponent?: () => void
  isPreview?: boolean
}

export function EditableDialog({ props, children, onAddComponent, isPreview = false }: EditableDialogProps) {
  const { triggerText, title, description, content, cancelText, confirmText, defaultOpen = false } = props
  const [open, setOpen] = useState(isPreview ? true : defaultOpen)

  // Si estamos en modo preview, mostramos el contenido directamente
  if (isPreview) {
    return (
      <div className="border dark:border-gray-700 rounded-lg p-4 shadow-sm w-[420px] mx-auto bg-white dark:bg-gray-800">
        <div className="mb-4">
          <h3 className="text-lg font-medium dark:text-gray-100">{title}</h3>
          <p className="text-sm text-muted-foreground dark:text-gray-300">{description}</p>
        </div>
        <div className="py-2 dark:text-gray-200">
          <div>{content}</div>
          {children && <div className="mt-4">{children}</div>}
          {onAddComponent && (
            <div className="flex justify-center mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onAddComponent()
                }}
                className="text-xs flex items-center gap-1 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                <PlusCircle className="h-3 w-3" />
                Add Component
              </Button>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            {cancelText}
          </Button>
          <Button type="button" size="sm" className="dark:hover:bg-gray-600">
            {confirmText}
          </Button>
        </div>
      </div>
    )
  }

  // Versión normal del diálogo
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:bg-gray-800 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="dark:text-gray-100">{title}</DialogTitle>
          <DialogDescription className="dark:text-gray-300">{description}</DialogDescription>
        </DialogHeader>
        <div className="py-4 dark:text-gray-200">
          <div>{content}</div>
          {children && <div className="mt-4">{children}</div>}
          {onAddComponent && (
            <div className="flex justify-center mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onAddComponent()
                }}
                className="text-xs flex items-center gap-1 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                <PlusCircle className="h-3 w-3" />
                Add Component
              </Button>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setOpen(false)}
            className="dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            {cancelText}
          </Button>
          <Button type="button" onClick={() => setOpen(false)} className="dark:hover:bg-gray-600">
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
