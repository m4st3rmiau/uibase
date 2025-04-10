import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, Flag, Mail, ChevronRight, AppWindowIcon as App } from "lucide-react"
import { cn } from "@/lib/utils"

interface EditableBadgeProps {
  props: {
    text?: string
    size?: "2xsmall" | "xsmall" | "small" | "medium"
    colour?: "accent" | "ghost" | "error" | "warning" | "success" | "neutral"
    emphasis?: "low" | "high"
    textCase?: "default" | "capitalize"
    iconOnly?: boolean
    counter?: boolean
    checkbox?: boolean
    dot?: boolean
    avatar?: boolean
    flag?: boolean
    tailIcon?: boolean
    leadIcon?: boolean
    appIcon?: boolean
  }
}

export function EditableBadge({ props }: EditableBadgeProps) {
  const {
    text = "Badge",
    size = "2xsmall",
    colour = "accent",
    emphasis = "low",
    textCase = "default",
    iconOnly = false,
    counter = false,
    checkbox = false,
    dot = false,
    avatar = false,
    flag = false,
    tailIcon = false,
    leadIcon = false,
    appIcon = false,
  } = props

  const sizeClasses = {
    "2xsmall": "h-5 text-xs",
    xsmall: "h-6 text-xs",
    small: "h-7 text-sm",
    medium: "h-8 text-sm",
  }

  const colourClasses = {
    accent: {
      low: "bg-blue-50 text-blue-600 hover:bg-blue-100",
      high: "bg-blue-500 text-white hover:bg-blue-600",
    },
    ghost: {
      low: "bg-transparent text-neutral-600 hover:bg-neutral-100 border border-neutral-200",
      high: "bg-neutral-500 text-white hover:bg-neutral-600",
    },
    error: {
      low: "bg-red-50 text-red-700 hover:bg-red-100",
      high: "bg-red-500 text-white hover:bg-red-600",
    },
    warning: {
      low: "bg-yellow-100 text-yellow-600 hover:bg-yellow-200",
      high: "bg-yellow-600 text-white hover:bg-yellow-700",
    },
    success: {
      low: "bg-emerald-100 text-emerald-500 hover:bg-emerald-200",
      high: "bg-emerald-500 text-white hover:bg-emerald-600",
    },
    neutral: {
      low: "bg-neutral-100 text-neutral-800 hover:bg-neutral-200",
      high: "bg-neutral-800 text-white hover:bg-neutral-900",
    },
  }

  const textCaseClasses = {
    default: "",
    capitalize: "uppercase",
  }

  const iconSizeClasses = {
    "2xsmall": "h-3 w-3",
    xsmall: "h-3.5 w-3.5",
    small: "h-4 w-4",
    medium: "h-5 w-5",
  }

  return (
    <Badge
      className={cn(
        "inline-flex items-center gap-1 px-2 rounded-full transition-colors",
        sizeClasses[size],
        colourClasses[colour][emphasis],
        textCaseClasses[textCase],
        iconOnly && "aspect-square p-0 flex items-center justify-center",
        dot &&
          "relative pl-6 before:absolute before:left-2 before:top-1/2 before:-translate-y-1/2 before:h-2 before:w-2 before:rounded-full before:bg-current",
        colour === "ghost" && emphasis === "low" && "border border-neutral-200",
      )}
    >
      {leadIcon && !iconOnly && <Mail className={iconSizeClasses[size]} />}
      {checkbox && <Checkbox className={cn(iconSizeClasses[size], "mr-1")} />}
      {avatar && (
        <Avatar className={cn(iconSizeClasses[size], "mr-1")}>
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      )}
      {flag && <Flag className={cn(iconSizeClasses[size], "mr-1")} />}
      {appIcon && <App className={cn(iconSizeClasses[size], "mr-1")} />}
      {iconOnly ? <Check className={iconSizeClasses[size]} /> : text}
      {counter && !iconOnly && <span className="ml-1">+99</span>}
      {tailIcon && !iconOnly && <ChevronRight className={iconSizeClasses[size]} />}
    </Badge>
  )
}
