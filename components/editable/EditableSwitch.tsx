import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { HelpCircle, Check, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface EditableSwitchProps {
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
    showOptionLabel?: boolean
  }
}

export function EditableSwitch({ props }: EditableSwitchProps) {
  const options = props.options || ["Option 1"]

  return (
    <div className="space-y-1">
      {props.showLabel && (
        <div className="flex items-center gap-2">
          <Label className="font-medium">
            {props.label || "Switch Label"}
            {props.optional && <span className="text-muted-foreground ml-1">(Optional)</span>}
          </Label>
          {props.helpIcon && <HelpCircle className="h-4 w-4 text-muted-foreground" />}
        </div>
      )}
      <div className="space-y-4">
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="flex items-center gap-2">
              {props.leadIcon && <Check className="h-4 w-4 text-muted-foreground" />}
              <Switch id={`${props.id || "switch"}-${index}`} disabled={props.disabled || false} />
              {props.tailIcon && <Check className="h-4 w-4 text-muted-foreground" />}
            </div>
            {(props.showOptionLabel ?? true) && <Label htmlFor={`${props.id || "switch"}-${index}`}>{option}</Label>}
            {props.badge && <Badge variant="outline">{props.badge}</Badge>}
          </div>
        ))}
        {props.description && (
          <div className="flex items-center gap-2 pl-6">
            {props.descriptionIcon && <AlertCircle className="h-4 w-4 text-muted-foreground" />}
            <span className="text-sm text-muted-foreground">{props.description}</span>
          </div>
        )}
      </div>
    </div>
  )
}
