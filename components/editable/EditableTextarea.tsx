import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { HelpCircle, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"

interface EditableTextareaProps {
  props: {
    label?: string
    id?: string
    placeholder?: string
    required?: boolean
    showLabel?: boolean
    description?: string
    helpIcon?: boolean
    optional?: boolean
    tailText?: string
    leadIcon?: boolean
    switch?: boolean
    size?: "default" | "sm" | "lg"
  }
}

export function EditableTextarea({ props }: EditableTextareaProps) {
  const {
    showLabel,
    label,
    id,
    description,
    helpIcon,
    optional,
    tailText,
    switch: switchProp,
    leadIcon,
    size = "default",
    ...textareaProps
  } = props

  return (
    <div className="space-y-1">
      {showLabel !== false && (
        <div className="flex items-center gap-2">
          <Label htmlFor={id || "textarea"} className="font-medium">
            {label || "Textarea Label"}
            {optional && <span className="text-muted-foreground ml-1">(Optional)</span>}
          </Label>
          {helpIcon && <HelpCircle className="h-4 w-4 text-muted-foreground" />}
        </div>
      )}
      <div className="relative">
        {leadIcon && <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />}
        <Textarea
          id={id || "textarea"}
          className={cn(
            leadIcon && "pl-10",
            size === "sm" && "min-h-[80px]",
            size === "default" && "min-h-[100px]",
            size === "lg" && "min-h-[120px]",
          )}
          placeholder={props.placeholder || "Enter text..."}
          {...textareaProps}
        />
        {tailText && <span className="absolute right-3 bottom-3 text-sm text-muted-foreground">{tailText}</span>}
      </div>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {switchProp && (
        <div className="flex items-center space-x-2 mt-2">
          <Switch id={`${id || "textarea"}-switch`} defaultChecked={switchProp} />
          <Label htmlFor={`${id || "textarea"}-switch`}>Enable feature</Label>
        </div>
      )}
    </div>
  )
}
