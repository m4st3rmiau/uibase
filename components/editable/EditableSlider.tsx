import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface EditableSliderProps {
  props: {
    label?: string
    min?: number
    max?: number
    step?: number
    disabled?: boolean
    showLabel?: boolean
    description?: string
    helpIcon?: boolean
    orientation?: "horizontal" | "vertical"
    marks?: boolean
  }
}

export function EditableSlider({ props }: EditableSliderProps) {
  const {
    label,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    showLabel = true,
    description,
    helpIcon = false,
    orientation = "horizontal",
    marks = false,
  } = props

  const markPositions = marks ? Array.from({ length: (max - min) / step + 1 }, (_, i) => min + i * step) : []

  return (
    <div className={cn("space-y-2", orientation === "vertical" && "flex items-center gap-4")}>
      {showLabel && (
        <div className="flex items-center gap-2">
          <Label className="font-medium">{label || "Slider Label"}</Label>
          {helpIcon && <HelpCircle className="h-4 w-4 text-muted-foreground" />}
        </div>
      )}
      <div className={cn("relative", orientation === "vertical" && "h-[200px]")}>
        <Slider
          defaultValue={[min]}
          max={max}
          min={min}
          step={step}
          disabled={disabled}
          orientation={orientation}
          className={cn(orientation === "vertical" && "h-full")}
        />
        {marks && (
          <div
            className={cn(
              "absolute top-full left-0 right-0 flex justify-between mt-2",
              orientation === "vertical" && "flex-col h-full top-0 right-full left-auto mt-0 mr-2",
            )}
          >
            {markPositions.map((value) => (
              <span
                key={value}
                className={cn(
                  "text-xs text-muted-foreground",
                  orientation === "vertical" && "transform -translate-y-1/2",
                )}
                style={{
                  [orientation === "horizontal" ? "left" : "bottom"]: `${((value - min) / (max - min)) * 100}%`,
                }}
              >
                {value}
              </span>
            ))}
          </div>
        )}
      </div>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  )
}
