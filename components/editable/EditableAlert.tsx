import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info, X, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EditableAlertProps {
  props: {
    title?: string
    description?: string
    variant?: "default" | "destructive" | "accent" | "ghost" | "error" | "warning" | "success" | "neutral"
    showIcon?: boolean
    showCloseButton?: boolean
    showActionButton?: boolean
    actionButtonText?: string
    emphasis?: "low" | "medium" | "high"
    showDescription?: boolean
    buttonVariant?: "outline" | "default" | "secondary" | "destructive" | "ghost" | "link"
    showSecondaryButton?: boolean
    secondaryButtonText?: string
  }
}

export function EditableAlert({ props }: EditableAlertProps) {
  const {
    title,
    description,
    variant = "default",
    showIcon = true,
    showCloseButton = false,
    showActionButton = false,
    actionButtonText = "Action",
    emphasis = "medium",
    showDescription = false,
    buttonVariant = "outline",
    showSecondaryButton = false,
    secondaryButtonText = "Secondary",
  } = props

  const buttonPosition = showDescription ? "side" : "below"

  // Get icon color based on variant and emphasis
  const getIconColor = () => {
    if (emphasis === "high") {
      return "#FFFFFF" // White for high emphasis
    }

    // Colors for low and medium emphasis
    switch (variant) {
      case "default":
        return "#000000" // Black
      case "accent":
        return "#3B82F6" // Blue-500
      case "destructive":
      case "error":
        return "#B91C1C" // Red-700
      case "warning":
        return "#B45309" // Yellow-700
      case "success":
        return "#15803D" // Green-700
      case "ghost":
      case "neutral":
        return "#374151" // Gray-700
      default:
        return "#000000" // Default black
    }
  }

  // Determine icon based on variant
  const getIcon = () => {
    switch (variant) {
      case "error":
      case "destructive":
        return AlertCircle
      case "warning":
        return AlertTriangle
      case "success":
        return CheckCircle
      default:
        return Info
    }
  }

  const IconComponent = getIcon()
  const iconColor = getIconColor()

  // Define variant classes with border colors for different emphasis levels
  const variantClasses = {
    default: {
      low: "bg-white text-black dark:bg-gray-950 dark:text-white border border-[#ECECED] dark:border-gray-800 shadow-[0px_1px_1px_0.05px_#18181B14]",
      medium: "bg-transparent text-black dark:text-white border border-gray-200 dark:border-gray-700",
      high: "bg-black text-white dark:bg-white dark:text-black",
    },
    accent: {
      low: "bg-white text-black dark:bg-gray-950 dark:text-white border border-[#ECECED] dark:border-gray-800 shadow-[0px_1px_1px_0.05px_#18181B14]",
      medium: "bg-blue-500/10 text-blue-500 border border-blue-200 dark:border-blue-800",
      high: "bg-blue-500 text-white",
    },
    destructive: {
      low: "bg-white text-black dark:bg-gray-950 dark:text-white border border-[#ECECED] dark:border-gray-800 shadow-[0px_1px_1px_0.05px_#18181B14]",
      medium:
        "bg-red-500/10 text-red-700 dark:text-red-300 hover:bg-red-500/20 border border-red-200 dark:border-red-800",
      high: "bg-red-500 text-white hover:bg-red-600",
    },
    ghost: {
      low: "bg-white text-black dark:bg-gray-950 dark:text-white border border-[#ECECED] dark:border-gray-800 shadow-[0px_1px_1px_0.05px_#18181B14]",
      medium:
        "bg-gray-500/10 text-gray-700 dark:text-gray-300 hover:bg-gray-500/20 border border-gray-200 dark:border-gray-700",
      high: "bg-gray-500 text-white hover:bg-gray-600",
    },
    error: {
      low: "bg-white text-black dark:bg-gray-950 dark:text-white border border-[#ECECED] dark:border-gray-800 shadow-[0px_1px_1px_0.05px_#18181B14]",
      medium:
        "bg-red-500/10 text-red-700 dark:text-red-300 hover:bg-red-500/20 border border-red-200 dark:border-red-800",
      high: "bg-red-500 text-white hover:bg-red-600",
    },
    warning: {
      low: "bg-white text-black dark:bg-gray-950 dark:text-white border border-[#ECECED] dark:border-gray-800 shadow-[0px_1px_1px_0.05px_#18181B14]",
      medium:
        "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-500/20 border border-yellow-200 dark:border-yellow-800",
      high: "bg-yellow-600 text-white hover:bg-yellow-700",
    },
    success: {
      low: "bg-white text-black dark:bg-gray-950 dark:text-white border border-[#ECECED] dark:border-gray-800 shadow-[0px_1px_1px_0.05px_#18181B14]",
      medium:
        "bg-green-500/10 text-green-700 dark:text-green-300 hover:bg-green-500/20 border border-green-200 dark:border-green-800",
      high: "bg-green-500 text-white hover:bg-green-600",
    },
    neutral: {
      low: "bg-white text-black dark:bg-gray-950 dark:text-white border border-[#ECECED] dark:border-gray-800 shadow-[0px_1px_1px_0.05px_#18181B14]",
      medium:
        "bg-gray-500/10 text-gray-700 dark:text-gray-300 hover:bg-gray-500/20 border border-gray-200 dark:border-gray-700",
      high: "bg-gray-800 text-white hover:bg-gray-900",
    },
  }

  // Get description color class based on emphasis
  const getDescriptionColorClass = () => {
    if (emphasis === "low") {
      return "text-[#71717A]"
    }
    return ""
  }

  // Determine if we should use the single-line centered layout
  const isSingleLine = !showDescription || !description

  return (
    <div className="w-[360px] mx-auto">
      <Alert className={cn("relative p-3 rounded-md", variantClasses[variant][emphasis])}>
        <div className={cn("flex", isSingleLine ? "items-center" : "")}>
          {showIcon && (
            <div className="flex-shrink-0 mr-2">
              <IconComponent
                className="h-5 w-5"
                color={iconColor}
                fill={iconColor}
                fillOpacity={0.1}
                style={{ color: iconColor }}
              />
            </div>
          )}
          <div className="flex-grow">
            <div className="flex flex-col">
              {title && (
                <AlertTitle className="font-medium text-sm leading-5 tracking-[-0.05px] mb-0">{title}</AlertTitle>
              )}
              {showDescription && description && (
                <AlertDescription className={cn("mt-1", getDescriptionColorClass())}>{description}</AlertDescription>
              )}
              {showActionButton && buttonPosition === "side" && (
                <div className="mt-3 flex gap-2">
                  <Button
                    variant={buttonVariant}
                    size="sm"
                    className={cn(
                      "h-8", // Set height to 32px (h-8)
                      buttonVariant === "default" ? "bg-primary text-primary-foreground hover:bg-primary/90" : "",
                      buttonVariant === "outline" ? "border-gray-200 dark:border-gray-700" : "",
                      variant === "default" && buttonVariant === "outline" ? "text-black dark:text-white" : "",
                    )}
                  >
                    {actionButtonText || "Action"}
                  </Button>
                  {showSecondaryButton && (
                    <Button variant="ghost" size="sm" className="h-8">
                      {secondaryButtonText || "Secondary"}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className={cn("flex gap-2 ml-auto", isSingleLine ? "items-center" : "items-start")}>
            {showActionButton && buttonPosition === "below" && (
              <Button
                variant={buttonVariant}
                size="sm"
                className={cn(
                  "h-8", // Set height to 32px (h-8)
                  buttonVariant === "default" ? "bg-primary text-primary-foreground hover:bg-primary/90" : "",
                  buttonVariant === "outline" ? "border-gray-200 dark:border-gray-700" : "",
                  variant === "default" && buttonVariant === "outline" ? "text-black dark:text-white" : "",
                )}
              >
                {actionButtonText || "Action"}
              </Button>
            )}

            {showCloseButton && (
              <Button variant="ghost" size="icon" className="h-5 w-5 p-0 hover:bg-transparent text-current">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </Alert>
    </div>
  )
}
