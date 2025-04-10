import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { HelpCircle, Check, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface EditableRadioGroupProps {
  props: {
    label?: string
    options?: string[]
    showLabel?: boolean
    description?: string
    helpIcon?: boolean
    optional?: boolean
    leadIcon?: boolean
    descriptionIcon?: boolean
    tailIcon?: boolean
    badge?: string
    variant?: "default" | "outline"
    size?: "default" | "sm" | "lg"
    disabled?: boolean
  }
}

export function EditableRadioGroup({ props }: EditableRadioGroupProps) {
  return (
    <div className="space-y-2">
      {props.showLabel && (
        <div className="flex items-center gap-2">
          <Label className="font-medium">
            {props.label || "Radio Group Label"}
            {props.optional && <span className="text-muted-foreground ml-1">(Optional)</span>}
          </Label>
          {props.helpIcon && <HelpCircle className="h-4 w-4 text-muted-foreground" />}
        </div>
      )}

      <RadioGroup defaultValue={props.options?.[0] || "option1"} className="space-y-4">
        {(props.options || ["Option 1", "Option 2"]).map((option, index) => (
          <div key={index} className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value={option.toLowerCase().replace(" ", "-")}
                  id={option.toLowerCase().replace(" ", "-")}
                  disabled={props.disabled}
                  className={cn(props.size === "sm" && "h-4 w-4", props.size === "lg" && "h-6 w-6")}
                />
                {props.leadIcon && <Check className="h-4 w-4 text-muted-foreground" />}
                <Label htmlFor={option.toLowerCase().replace(" ", "-")}>{option}</Label>
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
      </RadioGroup>
    </div>
  )
}
