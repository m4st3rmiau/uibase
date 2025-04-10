import { Button } from "@/components/ui/button"
import { Mail, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface EditableButtonProps {
  props: {
    label?: string
    variant?: "default" | "secondary" | "outline" | "ghost" | "link"
    size?: "default" | "sm" | "lg"
    disabled?: boolean
    onlyIcon?: boolean
    destructive?: boolean
    dot?: boolean
    leadIcon?: boolean
    tailIcon?: boolean
    badge?: string
    fullWidth?: boolean
  }
}

export function EditableButton({ props }: EditableButtonProps) {
  const {
    label = "Button",
    variant = "default",
    size = "default",
    disabled = false,
    onlyIcon = false,
    destructive = false,
    dot = false,
    leadIcon = false,
    tailIcon = false,
    badge = "",
    fullWidth = true,
  } = props

  return (
    <Button
      className={cn(
        fullWidth ? "w-full" : "w-auto",
        "relative",
        dot && "after:absolute after:top-1 after:right-1 after:h-2 after:w-2 after:rounded-full after:bg-red-500",
      )}
      variant={destructive ? "destructive" : variant}
      size={size}
      disabled={disabled}
      data-dot={dot ? "true" : undefined}
    >
      {leadIcon && <Mail className="mr-2 h-4 w-4" />}
      {!onlyIcon && label}
      {onlyIcon && <Mail className="h-4 w-4" />}
      {tailIcon && <ArrowRight className="ml-2 h-4 w-4" />}
      {badge && (
        <Badge variant="secondary" className="ml-2">
          {badge}
        </Badge>
      )}
    </Button>
  )
}
