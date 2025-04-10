"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { CloudUpload, Trash2, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface EditableFileUploadProps {
  props: {
    label?: string
    titleText?: string
    instructions?: string
    description?: string
    buttonText?: string
    required?: boolean
    disabled?: boolean
    showLabel?: boolean
    multiple?: boolean
    helpIcon?: boolean
    optional?: boolean
    showUploadIcon?: boolean
    size?: "default" | "sm" | "lg"
  }
}

export function EditableFileUpload({ props }: EditableFileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const addFiles = useCallback(
    (newFiles: FileList) => {
      const filesArray = Array.from(newFiles)
      if (props.multiple) {
        setFiles((prevFiles) => [...prevFiles, ...filesArray])
      } else {
        setFiles([filesArray[0]])
      }
    },
    [props.multiple],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        addFiles(e.dataTransfer.files)
      }
    },
    [addFiles],
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      if (e.target.files && e.target.files.length > 0) {
        addFiles(e.target.files)
      }
    },
    [addFiles],
  )

  const onButtonClick = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const handleDelete = useCallback(
    (fileToDelete: File) => {
      setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToDelete))
      if (!props.multiple && inputRef.current) {
        inputRef.current.value = ""
      }
    },
    [props.multiple],
  )

  return (
    <div className="space-y-1 max-w-lg">
      {(props.showLabel ?? true) && (
        <div className="flex items-center gap-2">
          <Label className={cn("font-medium", props.required && "after:content-['*'] after:ml-0.5 after:text-red-500")}>
            {props.label || "Upload File"}
            {props.optional && <span className="text-muted-foreground ml-1">(Optional)</span>}
          </Label>
          {props.helpIcon && <HelpCircle className="h-4 w-4 text-muted-foreground" />}
        </div>
      )}
      <div
        className={cn(
          "relative flex flex-col items-center justify-center border border-dashed rounded-lg transition-colors",
          dragActive ? "border-primary" : "border-[#E4E4E7]",
          "bg-muted/5 hover:bg-muted/10",
          props.size === "sm" && "h-40",
          props.size === "default" && "h-52",
          props.size === "lg" && "h-64",
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
          required={props.required}
          disabled={props.disabled}
          accept="image/jpeg,image/png"
          multiple={props.multiple}
        />
        <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
          {(props.showUploadIcon ?? true) && <CloudUpload className="h-10 w-10 text-muted-foreground mb-3" />}
          <p className="mb-2 text-sm text-muted-foreground">
            <span className="font-semibold">
              {props.titleText ||
                (props.multiple ? "Choose files or drag & drop them here" : "Choose a file or drag & drop it here")}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">{props.instructions || "JPEG and PNG formats, up to 20MB"}</p>
          <Button type="button" variant="outline" className="mt-4" onClick={onButtonClick} disabled={props.disabled}>
            {props.buttonText || (props.multiple ? "Browse Files" : "Browse File")}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {files.map((file, index) => (
          <Card key={index} className="p-3 flex items-center justify-between border shadow-none">
            <div className="flex items-center space-x-3">
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file) || "/placeholder.svg"}
                  alt="Preview"
                  className="w-10 h-10 object-cover rounded-lg"
                />
              ) : (
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-xs font-medium">{file.name.split(".").pop()?.toUpperCase()}</span>
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-sm font-medium">{file.name}</span>
                <span className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(0)} KB
                  <span className="text-green-500 ml-2">• Completed</span>
                </span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => handleDelete(file)} className="group">
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete file</span>
            </Button>
          </Card>
        ))}
      </div>
      {props.description && <p className="text-sm text-muted-foreground mt-1">{props.description}</p>}
    </div>
  )
}
