"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface ContainerProps {
  showHeader?: boolean
  showFooter?: boolean
  headerTitle?: string
  headerDescription?: string
  footerContent?: string
  variant?: "default" | "outline" | "ghost" | "shadow" | "custom"
  padding?: "small" | "medium" | "large" | "none"
  borderRadius?: "none" | "small" | "medium" | "large" | "full"
  backgroundColor?: "default" | "primary" | "secondary" | "accent" | "muted" | "transparent"
  borderColor?: "default" | "primary" | "secondary" | "accent" | "muted" | "none"
  width?: "auto" | "full" | "sm" | "md" | "lg" | "xl"
  className?: string
}

interface EditableContainerProps {
  props: ContainerProps
  children?: React.ReactNode
  onAddComponent?: () => void
}

export function EditableContainer({ props, children, onAddComponent }: EditableContainerProps) {
  const {
    showHeader = true,
    showFooter = false,
    headerTitle = "Container Title",
    headerDescription = "This container groups related components together",
    footerContent = "Container Footer",
    variant = "default",
    padding = "medium",
    borderRadius = "medium",
    backgroundColor = "default",
    borderColor = "default",
    width = "full",
    className,
  } = props

  const variantStyles = {
    default: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
    outline: "border border-gray-200 dark:border-gray-700 bg-transparent",
    ghost: "bg-transparent",
    shadow: "bg-white dark:bg-gray-800 shadow-md",
    custom: "",
  }

  const paddingStyles = {
    none: "p-0",
    small: "p-2",
    medium: "p-4",
    large: "p-6",
  }

  const contentPaddingStyles = {
    none: "p-0",
    small: "p-2",
    medium: "p-4",
    large: "p-6",
  }

  const borderRadiusStyles = {
    none: "rounded-none",
    small: "rounded-sm",
    medium: "rounded-md",
    large: "rounded-lg",
    full: "rounded-full",
  }

  const backgroundColorStyles = {
    default: "bg-white dark:bg-gray-800",
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent",
    muted: "bg-muted",
    transparent: "bg-transparent",
  }

  const borderColorStyles = {
    default: "border-gray-200 dark:border-gray-700",
    primary: "border-primary",
    secondary: "border-secondary",
    accent: "border-accent",
    muted: "border-muted",
    none: "border-transparent",
  }

  const widthStyles = {
    auto: "w-auto",
    full: "w-full",
    sm: "w-64",
    md: "w-80",
    lg: "w-96",
    xl: "w-[32rem]",
  }

  const containerStyle =
    variant !== "custom"
      ? variantStyles[variant]
      : cn("border", backgroundColorStyles[backgroundColor], borderColorStyles[borderColor])

  return (
    <div className={cn("mx-auto", widthStyles[width])}>
      <div className={cn(borderRadiusStyles[borderRadius], containerStyle, className)}>
        {showHeader && (
          <div className={cn("border-b", borderColorStyles[borderColor], paddingStyles[padding])}>
            <h3 className="text-lg font-medium text-foreground">{headerTitle}</h3>
            {headerDescription && <p className="mt-1 text-sm text-muted-foreground">{headerDescription}</p>}
          </div>
        )}

        <div className={contentPaddingStyles[padding]}>
          {children ? (
            <div className="space-y-4 w-full">
              {children}
              {onAddComponent && (
                <div className="mt-4 flex justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onAddComponent}
                    className="w-full dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add More Components
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="py-8 flex flex-col items-center justify-center text-center text-muted-foreground">
              <p className="mb-4 text-sm">No components added yet</p>
              {onAddComponent && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onAddComponent}
                  className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Component
                </Button>
              )}
            </div>
          )}
        </div>

        {showFooter && (
          <div className={cn("border-t", borderColorStyles[borderColor], paddingStyles[padding])}>
            <p className="text-sm text-muted-foreground">{footerContent}</p>
          </div>
        )}
      </div>
    </div>
  )
}
