import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface EditableAvatarProps {
  props: {
    style?: "single" | "multiple"
    shape?: "circle" | "square"
    type?: "text" | "image" | "icon"
    size?: "3xl" | "2xl" | "xl" | "lg" | "md" | "sm" | "xs" | "2xs"
    src?: string
    alt?: string
    fallback?: string
    online?: boolean
    showCheck?: boolean
    users?: number
  }
}

export function EditableAvatar({ props }: EditableAvatarProps) {
  const {
    style = "single",
    shape = "circle",
    type = "text",
    size = "md",
    src = "",
    alt = "Avatar",
    fallback = "A",
    online = false,
    showCheck = false,
    users = 2,
  } = props

  const sizeClasses = {
    "3xl": "h-16 w-16 text-xl",
    "2xl": "h-14 w-14 text-lg",
    xl: "h-12 w-12 text-base",
    lg: "h-10 w-10 text-base",
    md: "h-8 w-8 text-sm",
    sm: "h-6 w-6 text-xs",
    xs: "h-5 w-5 text-xs",
    "2xs": "h-4 w-4 text-xs",
  }

  const iconSizeClasses = {
    "3xl": "h-10 w-10",
    "2xl": "h-8 w-8",
    xl: "h-7 w-7",
    lg: "h-6 w-6",
    md: "h-5 w-5",
    sm: "h-4 w-4",
    xs: "h-3 w-3",
    "2xs": "h-2 w-2",
  }

  const dotSizeClasses = {
    "3xl": "h-4 w-4",
    "2xl": "h-3.5 w-3.5",
    xl: "h-3 w-3",
    lg: "h-2.5 w-2.5",
    md: "h-2 w-2",
    sm: "h-1.5 w-1.5",
    xs: "h-1 w-1",
    "2xs": "h-1 w-1",
  }

  const checkSizeClasses = {
    "3xl": "h-6 w-6 p-1",
    "2xl": "h-5 w-5 p-1",
    xl: "h-4 w-4 p-0.5",
    lg: "h-3.5 w-3.5 p-0.5",
    md: "h-3 w-3 p-0.5",
    sm: "h-2.5 w-2.5 p-0.5",
    xs: "h-2 w-2 p-0.5",
    "2xs": "h-2 w-2 p-0.5",
  }

  const SingleAvatar = ({ index = 0 }) => (
    <Avatar
      className={cn(
        sizeClasses[size],
        shape === "square" && "!rounded-lg",
        "relative",
        index > 0 && "-ml-3",
        "ring-2 ring-background",
      )}
    >
      {type === "image" && <AvatarImage src={src || "/placeholder.svg"} alt={alt} />}
      {type === "icon" && (
        <AvatarFallback>
          <User className={iconSizeClasses[size]} />
        </AvatarFallback>
      )}
      {type === "text" && <AvatarFallback>{fallback}</AvatarFallback>}

      {online && (
        <span
          className={cn(
            "absolute -top-0.5 -right-0.5 block rounded-full bg-green-500 ring-2 ring-background",
            dotSizeClasses[size],
          )}
        />
      )}

      {showCheck && (
        <span
          className={cn(
            "absolute -top-0.5 -right-0.5 flex items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background",
            checkSizeClasses[size],
          )}
        >
          <Check className="h-full w-full" />
        </span>
      )}
    </Avatar>
  )

  if (style === "multiple") {
    const visibleAvatars = Math.min(users, 6)
    return (
      <div className="flex">
        {Array.from({ length: visibleAvatars }).map((_, index) => (
          <SingleAvatar key={index} index={index} />
        ))}
      </div>
    )
  }

  return <SingleAvatar />
}
