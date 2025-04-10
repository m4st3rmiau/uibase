import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { HelpCircle, Check, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface EditableCheckboxProps {
  props: {
    label?: string
    id?: string
    disabled?: boolean
    showLabel?: boolean
    options?: string[]
    description?: string
    helpIcon?: boolean
    optional?: boolean
    leadIcon?: boolean
    descriptionIcon?: boolean
    tailIcon?: boolean
    badge?: string
    variant?: "default" | "outline"
    size?: "default" | "sm" | "lg"
  }
}

export function EditableCheckbox({ props }: EditableCheckboxProps) {
  const options = props.options || ["Option 1"]

  return (
    <div className="space-y-2">
      {props.showLabel && (
        <div className="flex items-center gap-2">
          <Label className="font-medium">
            {props.label || "Checkbox Label"}
            {props.optional && <span className="text-muted-foreground ml-1">(Optional)</span>}
          </Label>
          {props.helpIcon && <HelpCircle className="h-4 w-4 text-muted-foreground" />}
        </div>
      )}

      <div className="space-y-4">
        {options.map((option, index) => (
          <div key={index} className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`${props.id || "checkbox"}-${index}`}
                  disabled={props.disabled}
                  className={cn(props.size === "sm" && "h-4 w-4", props.size === "lg" && "h-6 w-6")}
                />
                {props.leadIcon && <Check className="h-4 w-4 text-muted-foreground" />}
                <Label htmlFor={`${props.id || "checkbox"}-${index}`}>{option}</Label>
                {props.tailIcon && <Check className="h-4 w-4 text-muted-foreground" />}
              </div>
              {props.badge && <Badge variant="outline">{props.badge}</Badge>}
            </div>
            {props.description && (
              <div className="flex items-center gap-2 pl-6">
                {props.descriptionIcon && <AlertCircle className="h-4 w-4 text-muted-foreground" />}
                <span className="text-sm text-muted-foreground">{props.description}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
