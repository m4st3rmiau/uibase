"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, HelpCircle, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface EditableDatePickerProps {
  props: {
    label?: string
    placeholder?: string
    disabled?: boolean
    required?: boolean
    description?: string
    showLabel?: boolean
    helpIcon?: boolean
    optional?: boolean
    leadIcon?: boolean
    tailIcon?: boolean
    badge?: string
    size?: "default" | "sm" | "lg"
  }
}

export function EditableDatePicker({ props }: EditableDatePickerProps) {
  const [date, setDate] = useState<Date>()

  return (
    <div className="space-y-1">
      {props.showLabel !== false && (
        <div className="flex items-center gap-2">
          <Label className={cn("font-medium", props.required && "after:content-['*'] after:ml-0.5 after:text-red-500")}>
            {props.label || "Date Picker Label"}
            {props.optional && <span className="text-muted-foreground ml-1">(Optional)</span>}
          </Label>
          {props.helpIcon && <HelpCircle className="h-4 w-4 text-muted-foreground" />}
        </div>
      )}
      <div className="relative">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground",
                props.leadIcon !== false && "pl-8",
                props.size === "sm" && "h-8 text-sm",
                props.size === "lg" && "h-12 text-lg",
              )}
              disabled={props.disabled}
            >
              {props.leadIcon !== false && (
                <CalendarIcon className="mr-2 h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2" />
              )}
              {date ? format(date, "PPP") : props.placeholder || "Pick a date"}
              {props.tailIcon && <ChevronDown className="h-4 w-4 ml-auto" />}
              {props.badge && (
                <Badge variant="outline" className="ml-auto">
                  {props.badge}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>
      {props.description && <p className="text-sm text-muted-foreground mt-1">{props.description}</p>}
    </div>
  )
}
