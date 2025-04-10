import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { HelpCircle, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface EditableSelectProps {
  props: {
    label?: string
    id?: string
    placeholder?: string
    options?: string[]
    showLabel?: boolean
    description?: string
    helpIcon?: boolean
    optional?: boolean
    avatarImage?: boolean
    leadIcon?: boolean
    size?: "default" | "sm" | "lg"
    type?: string
  }
}

export function EditableSelect({ props }: EditableSelectProps) {
  const {
    showLabel,
    label,
    id,
    options,
    description,
    helpIcon,
    optional,
    avatarImage,
    leadIcon,
    size = "default",
    type = "text",
    ...selectProps
  } = props

  return (
    <div className="w-[360px] mx-auto">
      <div className="space-y-1">
        {showLabel !== false && (
          <div className="flex items-center gap-2">
            <Label htmlFor={id || "select"} className="font-medium">
              {label || "Select Label"}
              {optional && <span className="text-muted-foreground ml-1">(Optional)</span>}
            </Label>
            {helpIcon && <HelpCircle className="h-4 w-4 text-muted-foreground" />}
          </div>
        )}
        <Select>
          <SelectTrigger
            id={id || "select"}
            className={cn(
              "w-full",
              leadIcon && "pl-8",
              size === "sm" && "h-8 text-sm",
              size === "lg" && "h-12 text-lg",
            )}
          >
            {leadIcon && <ChevronDown className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2" />}
            <SelectValue placeholder={props.placeholder || "Select an option"} />
          </SelectTrigger>
          <SelectContent>
            {(options || ["Option 1", "Option 2", "Option 3"]).map((option, index) => (
              <SelectItem key={index} value={option}>
                <div className="flex items-center gap-2">
                  {avatarImage && (
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={`/placeholder.svg?text=${option.charAt(0)}`} alt={option} />
                      <AvatarFallback>{option.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  {option}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    </div>
  )
}
