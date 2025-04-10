import type { Component } from "@/types/component"

interface GeneratedCode {
  imports: Set<string>
  componentCode: string
  shadcnComponents: Set<string>
}

// Asegúrate de que la función generateComponentCode pueda manejar componentes anidados
export function generateComponentCode(components: any[], allComponents: any[] = []): GeneratedCode {
  // Si allComponents está vacío, usamos los componentes proporcionados
  const componentsToUse = allComponents.length > 0 ? allComponents : components
  // Usar todos los componentes disponibles para buscar hijos si se proporcionan
  const allComponentsToSearch = allComponents.length > 0 ? allComponents : components

  // Inicializar colecciones para almacenar resultados
  const imports = new Set<string>()
  const hasUseClient = new Set<boolean>()
  const shadcnComponents = new Set<string>()
  let componentCode = ""

  // Helper function to generate JSX for a single component
  const generateComponentJSX = (component: Component, allComponents: Component[] = []) => {
    const { props: componentProps, type } = component
    let jsx = ""

    switch (type) {
      case "Button": {
        imports.add('import { Button } from "@/components/ui/button"')
        shadcnComponents.add("button")

        const iconImports = []
        if (componentProps.leadIcon) {
          iconImports.push("Mail")
        }
        if (componentProps.tailIcon) {
          iconImports.push("ArrowRight")
        }
        if (componentProps.onlyIcon) {
          iconImports.push("Mail")
        }
        if (iconImports.length > 0) {
          imports.add(`import { ${iconImports.join(", ")} } from 'lucide-react'`)
        }

        if (componentProps.badge) {
          imports.add('import { Badge } from "@/components/ui/badge"')
          shadcnComponents.add("badge")
        }

        const className = []
        if (componentProps.dot) {
          className.push(
            "relative after:absolute after:top-1 after:right-1 after:h-2 after:w-2 after:rounded-full after:bg-red-500",
          )
        }

        const buttonProps = []
        if (componentProps.variant && componentProps.variant !== "default") {
          buttonProps.push(`variant="${componentProps.variant}"`)
        }
        if (componentProps.size && componentProps.size !== "default") {
          buttonProps.push(`size="${componentProps.size}"`)
        }
        if (componentProps.disabled) {
          buttonProps.push(`disabled`)
        }
        if (componentProps.destructive) {
          buttonProps.push(`destructive`)
        }
        if (className.length > 0 || componentProps.onlyIcon) {
          buttonProps.push(
            `className={cn(${className.map((c) => `"${c}"`).join(", ")}, ${componentProps.onlyIcon ? '"w-10 h-10 p-0"' : '""'})}`,
          )
        }

        const propsString = buttonProps.length > 0 ? ` ${buttonProps.join(" ")}` : ""

        const buttonContent = []
        if (componentProps.leadIcon && !componentProps.onlyIcon) {
          buttonContent.push('<Mail className="h-4 w-4 mr-2" />')
        }

        if (!componentProps.onlyIcon && componentProps.label) {
          buttonContent.push(componentProps.label || "Button")
        } else if (componentProps.onlyIcon) {
          buttonContent.push('<Mail className="h-4 w-4" />')
        }

        if (componentProps.tailIcon && !componentProps.onlyIcon) {
          buttonContent.push('<ArrowRight className="h-4 w-4 ml-2" />')
        }

        if (componentProps.badge && !componentProps.onlyIcon) {
          buttonContent.push(
            `<Badge variant="secondary" className="ml-2 rounded-sm px-1">${componentProps.badge}</Badge>`,
          )
        }

        jsx = `<Button${propsString}>${buttonContent.join("")}</Button>`
        break
      }
      case "Input":
        imports.add('import { Input } from "@/components/ui/input"')
        shadcnComponents.add("input")
        if (componentProps.showLabel !== false) {
          imports.add('import { Label } from "@/components/ui/label"')
          shadcnComponents.add("label")
        }

        const iconImports = []
        if (componentProps.helpIcon) {
          iconImports.push("HelpCircle")
        }
        if (componentProps.leadIcon) {
          iconImports.push("Mail")
        }
        if (componentProps.tailIcon) {
          iconImports.push("Lock")
        }
        if (iconImports.length > 0) {
          imports.add(`import { ${iconImports.join(", ")} } from 'lucide-react'`)
        }

        const className = []
        if (componentProps.leadIcon) {
          className.push("pl-10")
        }
        if (componentProps.tailIcon) {
          className.push("pr-10")
        }
        if (componentProps.size === "sm") {
          className.push("h-8 text-sm")
        }
        if (componentProps.size === "lg") {
          className.push("h-12 text-lg")
        }

        const inputProps = []
        if (componentProps.placeholder) {
          inputProps.push(`placeholder="${componentProps.placeholder}"`)
        }
        if (componentProps.type && componentProps.type !== "text") {
          inputProps.push(`type="${componentProps.type}"`)
        }
        if (componentProps.disabled) {
          inputProps.push(`disabled`)
        }
        if (componentProps.required) {
          inputProps.push(`required`)
        }
        if (className.length > 0) {
          inputProps.push(`className=${className.map((c) => `"${c}"`).join(", ")}`)
        }

        const propsString = inputProps.length > 0 ? ` ${inputProps.join(" ")}` : ""

        jsx = `<div className="space-y-2">
  ${
    componentProps.showLabel !== false
      ? `<div className="flex items-center gap-2">
    <Label htmlFor="${componentProps.id || "input"}" className="font-medium" ${componentProps.required ? "\"after:content-['*'] after:ml-0.5 after:text-red-500\"" : ""}>
      ${componentProps.label || "Input Label"}
      ${componentProps.optional ? '<span className="text-muted-foreground ml-1">(Optional)</span>' : ""}
    </Label>
    ${componentProps.helpIcon ? '<HelpCircle className="h-4 w-4 text-muted-foreground" />' : ""}
  </div>`
      : ""
  }
  <div className="relative">
    ${
      componentProps.leadIcon
        ? '<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />'
        : ""
    }
    <Input
      id="${componentProps.id || "input"}"${propsString}
    />
    ${
      componentProps.tailIcon
        ? '<Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />'
        : ""
    }
    ${
      componentProps.tailText
        ? `<span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
        ${componentProps.tailText}
      </span>`
        : ""
    }
  </div>
  ${componentProps.description ? `<p className="text-sm text-muted-foreground">${componentProps.description}</p>` : ""}
</div>`
        break
      case "Checkbox":
        imports.add('import { Checkbox } from "@/components/ui/checkbox"')
        imports.add('import { Label } from "@/components/ui/label"')
        shadcnComponents.add("checkbox")
        shadcnComponents.add("label")
        jsx = `<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`
        break
      case "Radio Group":
        imports.add('import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"')
        imports.add('import { Label } from "@/components/ui/label"')
        shadcnComponents.add("radio-group")
        shadcnComponents.add("label")
        jsx = `<RadioGroup defaultValue="comfortable">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="comfortable" id="r2" />
    <Label htmlFor="r2">Comfortable</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="compact" id="r3" />
    <Label htmlFor="r3">Compact</Label>
  </div>
</RadioGroup>`
        break
      case "Select":
        imports.add(
          'import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"',
        )
        shadcnComponents.add("select")
        jsx = `<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>`
        break
      case "Textarea":
        imports.add('import { Textarea } from "@/components/ui/textarea"')
        shadcnComponents.add("textarea")
        jsx = `<Textarea placeholder="Type your message here." />`
        break
      case "Switch":
        imports.add('import { Switch } from "@/components/ui/switch"')
        imports.add('import { Label } from "@/components/ui/label"')
        shadcnComponents.add("switch")
        shadcnComponents.add("label")
        jsx = `<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>`
        break
      case "Slider":
        imports.add('import { Slider } from "@/components/ui/slider"')
        shadcnComponents.add("slider")
        jsx = `<Slider defaultValue={[33]} max={100} step={1} />`
        break
      case "Calendar": {
        hasUseClient.add(true)
        imports.add('import * as React from "react"')
        imports.add('import { Calendar } from "@/components/ui/calendar"')
        imports.add('import { cn } from "@/lib/utils"')
        imports.add('import { Button } from "@/components/ui/button"')
        imports.add("import { ChevronLeft, ChevronRight } from 'lucide-react'")
        shadcnComponents.add("button")
        shadcnComponents.add("calendar")
        imports.add('import { format } from "date-fns"')

        // Add imports based on calendar type
        const calendarType = componentProps.calendarType || "default"
        const navigationType = componentProps.navigationType || "default"
        const mode = componentProps.mode || "single"
        const dateRange = componentProps.dateRange || false
        const multiple = componentProps.multiple || false
        const showFooter = componentProps.showFooter || false
        const showDivider = componentProps.showDivider || false
        const numberOfMonths = componentProps.numberOfMonths || 1
        const buttonPosition = componentProps.buttonPosition || "right"

        if (dateRange || calendarType === "range" || calendarType === "withPresets") {
          imports.add('import { DateRange } from "react-day-picker"')
          imports.add('import { format } from "date-fns"')
        }

        if (multiple) {
          imports.add('import { format } from "date-fns"')
        }

        if (numberOfMonths > 1 || calendarType === "pricing") {
          imports.add('import { format, addMonths } from "date-fns"')
        } else if (navigationType !== "default") {
          imports.add('import { format } from "date-fns"')
        }

        if (navigationType === "monthYearSelect" || navigationType === "yearlySelectNav") {
          imports.add(
            'import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"',
          )
          shadcnComponents.add("select")
        }

        if (showFooter && componentProps.showInput) {
          imports.add('import { Label } from "@/components/ui/label"')
          imports.add('import { Input } from "@/components/ui/input"')
          shadcnComponents.add("label")
          shadcnComponents.add("input")

          if (componentProps.inputType === "date") {
            imports.add("import { CalendarIcon } from 'lucide-react'")
          } else if (componentProps.inputType === "time") {
            imports.add("import { Clock } from 'lucide-react'")
          }
        }

        const { disabled = false, showDots = false, startOfWeek = 0, disablePastDates = false } = componentProps

        // Generate the appropriate JSX for the default calendar type
        const calendarJSX = `<div className="w-fit mx-auto border rounded-md overflow-hidden">
  {/* Navigation outside the calendar container */}
  ${
    navigationType === "default"
      ? `
  <div className="flex items-center justify-between px-4 pt-3">
    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7"
      onClick={() => {
        const newMonth = new Date(month)
        newMonth.setMonth(month.getMonth() - 1)
        setMonth(newMonth)
      }}
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>

    <div className="text-sm font-medium">{format(month, "MMMM yyyy")}</div>

    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7"
      onClick={() => {
        const newMonth = new Date(month)
        newMonth.setMonth(month.getMonth() + 1)
        setMonth(newMonth)
      }}
    >
      <ChevronRight className="h-4 w-4" />
    </Button>
  </div>`
      : ""
  }

  ${
    navigationType === "rightNav"
      ? `
  <div className="flex items-center justify-between px-4 pt-3">
    <div className="text-sm font-medium">{format(month, "MMMM yyyy")}</div>
    <div className="flex items-center">
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        onClick={() => {
          const newMonth = new Date(month)
          newMonth.setMonth(month.getMonth() - 1)
          setMonth(newMonth)
        }}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        onClick={() => {
          const newMonth = new Date(month)
          newMonth.setMonth(month.getMonth() + 1)
          setMonth(newMonth)
        }}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  </div>`
      : ""
  }

  ${
    navigationType === "yearlySelectNav"
      ? `
  <div className="flex items-center justify-between px-4 pt-3">
    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7"
      onClick={() => {
        const newMonth = new Date(month)
        newMonth.setMonth(month.getMonth() - 1)
        setMonth(newMonth)
      }}
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>

    <div className="flex items-center">
      <div className="text-sm font-medium">{format(month, "MMMM")}</div>
      <div className="relative ml-1">
        <Select
          value={month.getFullYear().toString()}
          onValueChange={(value) => {
            const newYear = Number.parseInt(value, 10)
            const newMonth = new Date(month)
            newMonth.setFullYear(newYear)
            setMonth(newMonth)
          }}
        >
          <SelectTrigger className="h-auto p-0 px-1 text-sm font-medium border-0 bg-transparent hover:bg-muted/50 rounded">
            <div className="flex items-center mr-1">{month.getFullYear()}</div>
          </SelectTrigger>
          <SelectContent className="p-0">
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>

    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7"
      onClick={() => {
        const newMonth = new Date(month)
        newMonth.setMonth(month.getMonth() + 1)
        setMonth(newMonth)
      }}
    >
      <ChevronRight className="h-4 w-4" />
    </Button>
  </div>`
      : ""
  }

  ${
    navigationType === "monthYearSelect"
      ? `
  <div className="flex w-full items-center gap-1 px-3 pt-3 space-x-2">
    <Select
      value={month.getMonth().toString()}
      onValueChange={(value) => {
        const newMonth = new Date(month)
        newMonth.setMonth(Number.parseInt(value))
        setMonth(newMonth)
      }}
    >
      <SelectTrigger className="w-fill h-8">
        <SelectValue placeholder="Month" />
      </SelectTrigger>
      <SelectContent className="p-0">
        {months.map((month, index) => (
          <SelectItem key={month} value={index.toString()}>
            {month}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    <Select
      value={month.getFullYear().toString()}
      onValueChange={(value) => {
        const newMonth = new Date(month)
        newMonth.setFullYear(Number.parseInt(value))
        setMonth(newMonth)
      }}
    >
      <SelectTrigger className="w-[140px] h-8">
        <SelectValue placeholder="Year" />
      </SelectTrigger>
      <SelectContent className="p-0">
        {years.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>`
      : ""
  }

  <Calendar
    mode={${multiple ? '"multiple"' : dateRange ? '"range"' : '"single"'}}
    selected={${multiple ? "dates" : dateRange ? "dateRange" : "date"}}
    onSelect={${multiple ? "(newDates) => setDates(newDates || [])" : dateRange ? "setDateRange" : "setDate"}}
    numberOfMonths={${numberOfMonths}}
    disabled={${disabled}}
    weekStartsOn={${startOfWeek} as 0 | 1}
    showOutsideDays={${showDots}}
    fromDate={${disablePastDates} ? new Date() : undefined}
    month={month}
    onMonthChange={setMonth}
    className={cn("rounded-t-md", ${showFooter} ? "border-0" : "border-0")}
    classNames={{
      months: ${showDivider && numberOfMonths > 1} ? "flex divide-x" : "flex",
      month: ${showDivider && numberOfMonths > 1} ? "first:pr-3 last:pl-3" : "",
      // Hide native calendar navigation for all navigation types
      nav: "hidden",
      // Hide native month/year title for all navigation types
      caption: "hidden",
    }}
  />
  
  ${
    multiple && componentProps.showSelectedDates
      ? `
  {/* Show selected dates for multiple selection mode */}
  {dates && dates.length > 0 && (
    <div className="p-3 border-t border-border">
      <p className="text-sm font-medium mb-2">Selected dates: {dates.length}</p>
      <div className="flex flex-wrap gap-1">
        {dates.slice(0, 8).map((date, index) => (
          <span key={index} className="bg-muted px-2 py-1 rounded-md text-xs">
            {format(date, "MMM d")}
          </span>
        ))}
        {dates.length > 8 && (
          <span className="bg-muted px-2 py-1 rounded-md text-xs font-medium">+{dates.length - 8}</span>
        )}
      </div>
    </div>
  )}`
      : ""
  }

  ${
    showFooter
      ? `
  {/* Custom footer */}
  <div className={cn("p-3", ${componentProps.showDividerFooter} && "border-t border-border")}>
    <div className={cn("flex flex-col space-y-3")}>
      <div className={cn(
        "flex items-center",
        ${buttonPosition === "right"} ? "justify-between" : "flex-row-reverse justify-between",
      )}>
        <div className="flex flex-col space-y-2">
          ${
            componentProps.showInput
              ? `
          <div className="flex items-center space-x-2">
            <Label htmlFor="calendar-input" className="text-sm font-medium">
              ${componentProps.inputType === "date" ? "Date:" : "Time:"}
            </Label>
            <div className="relative">
              ${
                componentProps.inputType === "date"
                  ? `
              <Input
                id="calendar-input"
                type="text"
                value={inputValue}
                onChange={handleDateChange}
                className="pl-8 h-8 w-[150px]"
              />
              <CalendarIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              `
                  : `
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Input
                    id="calendar-input"
                    type="text"
                    value={formatTimeDisplay()}
                    onChange={handleTimeChange}
                    className="pl-8 h-8 w-[120px]"
                  />
                  <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                <Select value={amPm} onValueChange={handleAmPmChange}>
                  <SelectTrigger className="w-[70px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              `
              }
            </div>
          </div>
          `
              : ""
          }

          ${
            componentProps.showRange
              ? `
          <div className="flex flex-col space-y-1">
            ${
              dateRange
                ? `
            {dateRange?.from ? (
              <>
                <p className="text-sm">
                  <strong>From:</strong> {format(dateRange.from, "PPP")}
                </p>
                <p className="text-sm">
                  <strong>To:</strong> {dateRange.to ? format(dateRange.to, "PPP") : "Not selected"}
                </p>
              </>
            ) : (
              <>
                <p className="text-sm">
                  <strong>From:</strong> April 16th, 2025
                </p>
                <p className="text-sm">
                  <strong>To:</strong> May 13th, 2025
                </p>
              </>
            )}
            `
                : `
            {date ? (
              <p className="text-sm">
                <strong>Selected:</strong> {format(date, "PPP")}
              </p>
            ) : (
              <p className="text-sm">
                <strong>Selected:</strong> No date selected
              </p>
            )}
            `
            }
          </div>
          `
              : ""
          }
        </div>

        <div className="flex items-center space-x-2">
          ${
            componentProps.showSecondaryButton
              ? `
          <Button variant="${componentProps.secondaryButtonVariant || "outline"}" size="sm" onClick={() => setDate(new Date())}>
            Today
          </Button>
          `
              : ""
          }

          ${
            componentProps.showButton
              ? `
          <Button
            variant="${componentProps.buttonVariant || "default"}"
            size="sm"
            onClick={() => {
              ${
                multiple
                  ? `alert(dates.length > 0 ? \`Selected: \${dates.map(d => format(d, "PPP")).join(", ")}\` : "No dates selected")`
                  : `alert(date ? \`Selected: \${format(date, "PPP")}\` : "No date selected")`
              }
            }}
            disabled={${multiple ? "!dates || dates.length === 0" : "!date"}}
          >
            ${calendarType === "pricing" ? "Book Now" : "Confirm"}
          </Button>
          `
              : ""
          }
        </div>
      </div>
    </div>
  </div>
  `
      : ""
  }
</div>`

        // Generate state declarations based on calendar configuration
        let stateDeclarations = ""

        // Always declare month state first
        stateDeclarations = "const [month, setMonth] = React.useState<Date>(new Date())"

        if (dateRange) {
          stateDeclarations += "\n  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined)"
        } else if (multiple) {
          stateDeclarations += "\n  const [dates, setDates] = React.useState<Date[]>([])"
        } else {
          stateDeclarations += "\n  const [date, setDate] = React.useState<Date | undefined>(new Date())"
        }

        if (navigationType === "monthYearSelect") {
          stateDeclarations += `
// Generate years for select
const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i)
// Generate months for select
const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
]`
        } else if (navigationType === "yearlySelectNav") {
          stateDeclarations += `
// Generate years for select
const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i)`
        }

        if (showFooter && componentProps.showInput) {
          if (componentProps.inputType === "date") {
            stateDeclarations += `
  const [inputValue, setInputValue] = React.useState("")
  
  React.useEffect(() => {
    if (date) {
      setInputValue(format(date, "MM/dd/yyyy"))
    }
  }, [date])
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    try {
      const parsedDate = new Date(value)
      if (!isNaN(parsedDate.getTime())) {
        setDate(parsedDate)
      }
    } catch (error) {
      console.error("Invalid date format")
    }
  }`
          } else if (componentProps.inputType === "time") {
            stateDeclarations += `
  const [time, setTime] = React.useState<string>("12:00:00")
  const [amPm, setAmPm] = React.useState<"AM" | "PM">("PM")
  
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTime(value)
  }
  
  const handleAmPmChange = (value: string) => {
    setAmPm(value as "AM" | "PM")
  }
  
  const formatTimeDisplay = () => {
    if (!time) return ""
    try {
      const timeParts = time.split(":").map(Number)
      const hours = timeParts[0] || 0
      const minutes = timeParts[1] || 0
      const seconds = timeParts[2] || 0
      
      let displayHours = hours % 12
      if (displayHours === 0) displayHours = 12
      
      return \`\${displayHours.toString().padStart(2, "0")}:\${minutes.toString().padStart(2, "0")}:\${seconds.toString().padStart(2, "0")}\`
    } catch (error) {
      return time
    }
  }`
          }
        }

        jsx = `${calendarJSX}`

        break
      }
      case "Uploader": {
        hasUseClient.add(true)
        imports.add('import { useState, useRef, useCallback } from "react"')
        imports.add('import { Button } from "@/components/ui/button"')
        imports.add('import { Card } from "@/components/ui/card"')
        imports.add('import { cn } from "@/lib/utils"')
        imports.add('import Image from "next/image"')

        // Importar Label solo si showLabel no es false
        if (componentProps.showLabel !== false) {
          imports.add('import { Label } from "@/components/ui/label"')
          shadcnComponents.add("label")
        }

        shadcnComponents.add("button")
        shadcnComponents.add("card")

        // Conditional imports for icons
        const iconImports = []
        if (componentProps.showUploadIcon !== false) {
          iconImports.push("CloudUpload")
        }
        if (componentProps.helpIcon) {
          iconImports.push("HelpCircle")
        }
        iconImports.push("Trash2")

        if (iconImports.length > 0) {
          imports.add(`import { ${iconImports.join(", ")} } from 'lucide-react'`)
        }

        const titleText =
          componentProps.titleText ||
          (componentProps.multiple ? "Choose files or drag & drop them here" : "Choose a file or drag & drop it here")
        const instructions = componentProps.instructions || "JPEG and PNG formats, up to 20MB"
        const buttonText = componentProps.buttonText || (componentProps.multiple ? "Browse Files" : "Browse File")
        const size = componentProps.size || "default"

        const sizeClassName = {
          sm: "h-40",
          default: "h-52",
          lg: "h-64",
        }[size]

        jsx = `const [dragActive, setDragActive] = useState(false);
const [files, setFiles] = useState<File[]>([]);
const inputRef = useRef<HTMLInputElement>(null);

const handleDrag = useCallback((e: React.DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  if (e.type === "dragenter" || e.type === "dragover") {
    setDragActive(true);
  } else if (e.type === "dragleave") {
    setDragActive(false);
  }
}, []);

const addFiles = useCallback(
  (newFiles: FileList | File[]) => {
    const filesArray = Array.from(newFiles);
    ${componentProps.multiple ? "setFiles((prevFiles) => [...prevFiles, ...filesArray]);" : "setFiles([filesArray[0]]);"}
  },
  [],
);

const handleDrop = useCallback(
  (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  },
  [addFiles],
);

const handleChange = useCallback(
  (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files);
    }
  },
  [addFiles],
);

const onButtonClick = useCallback(() => {
  inputRef.current?.click();
}, []);

const handleDelete = useCallback((fileToDelete: File) => {
  setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToDelete));
  if (!${componentProps.multiple} && inputRef.current) {
    inputRef.current.value = ""
  }
}, []);

return (
  <div className="space-y-1 max-w-lg">
    ${
      componentProps.showLabel !== false
        ? `<div className="flex items-center gap-2">
      <Label className={cn("font-medium", ${componentProps.required} && "after:content-['*'] after:ml-0.5 after:text-red-500")}>
        ${componentProps.label || "Upload File"}
        ${componentProps.optional ? `<span className="text-muted-foreground ml-1">(Optional)</span>` : ""}
      </Label>
      ${componentProps.helpIcon ? '<HelpCircle className="h-4 w-4 text-muted-foreground" />' : ""}
    </div>`
        : ""
    }
    <div
      className={cn(
        "relative flex flex-col items-center justify-center border border-dashed rounded-lg transition-colors",
        dragActive ? "border-primary" : "border-[#E4E4E7]",
        "bg-muted/5 hover:bg-muted/10",
        "${sizeClassName}",
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
        ${componentProps.required ? "required" : ""}
        ${componentProps.disabled ? "disabled" : ""}
        ${componentProps.multiple ? "multiple" : ""}
        accept="image/jpeg,image/png"
      />
      <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
        ${componentProps.showUploadIcon !== false ? '<CloudUpload className="h-10 w-10 text-muted-foreground mb-3" />' : ""}
        <p className="mb-2 text-sm text-muted-foreground">
          <span className="font-semibold">${titleText}</span>
        </p>
        <p className="text-xs text-muted-foreground">${instructions}</p>
        <Button type="button" variant="outline" className="mt-4" onClick={onButtonClick} ${componentProps.disabled ? "disabled" : ""}>
          ${buttonText}
        </Button>
      </div>
    </div>

    <div className="space-y-2">
      {files.map((file, index) => (
        <Card key={index} className="p-3 flex items-center justify-between border shadow-none">
          <div className="flex items-center space-x-3">
            {file.type.startsWith("image/") ? (
              <Image
                src={URL.createObjectURL(file) || "/placeholder.svg"}
                alt="Preview"
                width={40}
                height={40}
                className="object-cover rounded-lg"
              />
            ) : (
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-xs font-medium">{file.name.split(".").pop()?.toUpperCase()}</span>
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-medium">{file.name}</span>
              <span className="text-xs text-muted-foreground">
                {(file.size / 1024).toFixed(0)} KB
                <span className="text-green-500 ml-2">• Completed</span>
              </span>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => handleDelete(file)} className="group">
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete file</span>
          </Button>
        </Card>
      ))}
    </div>
    ${componentProps.description ? `<p className="text-sm text-muted-foreground mt-1">${componentProps.description}</p>` : ""}
  </div>
);`
        break
      }
      case "Input OTP":
        hasUseClient.add(true)
        imports.add('import * as React from "react"')
        imports.add('import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"')
        if (componentProps.showLabel !== false) {
          imports.add('import { Label } from "@/components/ui/label"')
        }
        imports.add('import { cn } from "@/lib/utils"')
        shadcnComponents.add("input-otp")
        if (componentProps.showLabel !== false) {
          shadcnComponents.add("label")
        }

        if (componentProps.helpIcon) {
          imports.add("import { HelpCircle } from 'lucide-react'")
        }

        const length = componentProps.length || 6
        const groupLength = componentProps.groupLength || 3
        const blockDivider = componentProps.blockDivider || false

        jsx = `const [value, setValue] = React.useState("")

return (
  <div className="space-y-2">
    ${
      componentProps.showLabel !== false
        ? `<div className="flex items-center gap-2">
      <Label className={cn("font-medium", ${componentProps.required ? `"after:content-['*'] after:ml-0.5 after:text-red-500"` : ""})}>
        ${componentProps.label || "One-Time Password"}
        ${componentProps.optional ? '<span className="text-muted-foreground ml-1">(Optional)</span>' : ""}
      </Label>
      ${componentProps.helpIcon ? '<HelpCircle className="h-4 w-4 text-muted-foreground" />' : ""}
    </div>`
        : ""
    }
    <InputOTP
      value={value}
      onChange={setValue}
      maxLength={${length}}
      render={({ slots }) => (
        <InputOTPGroup className="gap-2">
          {slots.map((slot, index) => (
            <React.Fragment key={index}>
              <InputOTPSlot
                {...slot}
                className={cn(
                  "rounded-md border",
                  ${componentProps.size === "sm" ? '"h-8 w-8 text-sm"' : ""},
                  ${componentProps.size === "lg" ? '"h-12 w-12 text-lg"' : ""}
                )}
              />
              ${
                blockDivider
                  ? `{index > 0 && index % ${groupLength} === 0 && (
                <div key={\`separator-\${index}\`} className="flex items-center">
                  <span className="text-2xl text-muted-foreground">-</span>
                </div>
              )}`
                  : ""
              }
            </React.Fragment>
          ))}
        </InputOTPGroup>
      )}
    />
    ${componentProps.description ? `<p className="text-sm text-muted-foreground mt-1">${componentProps.description}</p>` : ""}
  </div>
)`
        break
      case "Password":
        hasUseClient.add(true)
        imports.add('import * as React from "react"')
        imports.add(
          `import { Eye, EyeOff, Check, X, Lock${componentProps.helpIcon ? ", HelpCircle" : ""} } from 'lucide-react'`,
        )
        imports.add('import { cn } from "@/lib/utils"')
        imports.add('import { Label } from "@/components/ui/label"')
        imports.add('import { Input } from "@/components/ui/input"')
        imports.add('import { Button } from "@/components/ui/button"')
        imports.add('import { Progress } from "@/components/ui/progress"')
        shadcnComponents.add("label")
        shadcnComponents.add("input")
        shadcnComponents.add("button")
        shadcnComponents.add("progress")

        const validationRules = [
          {
            id: "length",
            label: "At least 8 characters",
            validate: (value: string) => value.length >= 8,
          },
          {
            id: "number",
            label: "At least 1 number",
            validate: (value: string) => /\d/.test(value),
          },
          {
            id: "lowercase",
            label: "At least 1 lowercase letter",
            validate: (value: string) => /[a-z]/.test(value),
          },
          {
            id: "uppercase",
            label: "At least 1 uppercase letter",
            validate: (value: string) => /[A-Z]/.test(value),
          },
        ]

        jsx = `const [showPassword, setShowPassword] = React.useState(false)
const [value, setValue] = React.useState("")

const getPasswordStrength = () => {
  const meetsRequirements = validationRules.filter((rule) => rule.validate(value))
  return (meetsRequirements.length / validationRules.length) * 100
}

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword)
}

return (
  <div className="space-y-1">
    ${
      componentProps.showLabel !== false
        ? `<div className="flex items-center gap-2">
      <Label className={cn("font-medium", ${componentProps.required ? "\"after:content-['*'] after:ml-0.5 after:text-red-500\"" : ""})}>
        ${componentProps.label || "Password"}
        ${componentProps.optional ? '<span className="text-muted-foreground ml-1">(Optional)</span>' : ""}
      </Label>
      ${componentProps.helpIcon ? '<HelpCircle className="h-4 w-4 text-muted-foreground" />' : ""}
    </div>`
        : ""
    }
    <div className="space-y-3">
      <div className="relative">
        ${componentProps.leadIcon ? '<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />' : ""}
        <Input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={cn(
            ${componentProps.leadIcon ? '"pl-10",' : ""}
            ${componentProps.viewPassword !== false ? '"pr-10",' : ""}
            ${componentProps.size === "sm" ? '"h-8 text-sm",' : ""}
            ${componentProps.size === "lg" ? '"h-12 text-lg",' : ""}
          )}
          placeholder="${componentProps.placeholder || "Enter password"}"
          ${componentProps.required ? "required" : ""}
          ${componentProps.disabled ? "disabled" : ""}
        />
        ${
          componentProps.viewPassword !== false
            ? `<Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={togglePasswordVisibility}
          ${componentProps.disabled ? "disabled" : ""}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
        </Button>`
            : ""
        }
      </div>
      <div>
        <Progress value={value ? getPasswordStrength() : 0} className="h-1" />
        <div className="space-y-2 mt-3">
          <p className="text-sm font-medium">Password requirements:</p>
          <div className="space-y-2">
            {validationRules.map((rule) => {
              const isValid = rule.validate(value)
              return (
                <div key={rule.id} className="flex items-center gap-2 text-sm">
                  {isValid ? (
                    <Check className="h-4 w-4 text-[#059669]" />
                  ) : (
                    <X className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className={cn("text-muted-foreground", isValid && "text-[#059669]")}>{rule.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  </div>
)`
        break
      case "Text":
        jsx = `<div className="space-y-2">
  <h2 className="text-2xl font-semibold text-gray-900">Title</h2>
  <p className="text-sm text-gray-500">Description goes here</p>
</div>`
        break
      case "Accordion": {
        hasUseClient.add(true)
        imports.add(
          'import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"',
        )
        imports.add('import { cn } from "@/lib/utils"')
        imports.add('import * as React from "react"')

        // Verificar si algún item tiene showImage activado
        const hasAnyItemWithImage = componentProps.items && componentProps.items.some((item) => item.showImage === true)

        // Solo importar Image e ImageIcon si hay al menos un item con showImage
        if (hasAnyItemWithImage) {
          imports.add('import Image from "next/image"')
          imports.add("import { ImageIcon } from 'lucide-react'")
        }

        const iconImports = componentProps.showTitleIcon ? ["Clock"] : []
        const childComponents = allComponentsToSearch.filter((c) => c.parentId === component.id)

        if (childComponents.length > 0) {
          imports.add('import { Button } from "@/components/ui/button"')
          shadcnComponents.add("button")
        }

        if (iconImports.length > 0) {
          imports.add(`import { ${iconImports.join(", ")} } from 'lucide-react'`)
        }

        shadcnComponents.add("accordion")

        const userItems = componentProps.items || [
          { title: "Is it accessible?", content: "Yes. It adheres to the WAI-ARIA design pattern." },
          {
            title: "Is it styled?",
            content: "Yes. It comes with default styles that matches the other components' aesthetic.",
          },
          { title: "Is it animated?", content: "Yes. It's animated by default, but you can disable it if you prefer." },
        ]

        // Crear el array de items sin propiedades de imagen cuando showImage es false
        const itemsArray = userItems.map((item, index) => {
          // Objeto base que siempre se incluye
          const baseItem = {
            value: `item-${index + 1}`,
            question: item.title || `Item ${index + 1}`,
            answer: item.content || "Content goes here",
            ...(item.subheader && item.subheader.trim() !== "" ? { subheader: item.subheader } : {}),
            showImage: item.showImage || false,
          }

          // Solo agregar propiedades de imagen si showImage está activado
          if (item.showImage) {
            return {
              ...baseItem,
              imageUrl: item.imageUrl || "",
              imageAlt: item.imageAlt || "",
              imageWidth: item.imageWidth || 300,
              imageHeight: item.imageHeight || 200,
              imagePosition: item.imagePosition || "below",
              imageAlignment: item.imageAlignment || "center",
              imageFillWidth: item.imageFillWidth || false,
            }
          }

          return baseItem
        })

        // Organizar los componentes hijos por elemento del acordeón
        const childComponentsByItem = {}
        childComponents.forEach((child) => {
          const itemIndex = child.itemIndex !== undefined ? child.itemIndex : 0
          if (!childComponentsByItem[itemIndex]) childComponentsByItem[itemIndex] = []
          childComponentsByItem[itemIndex].push(child)
        })

        // Generar código para los componentes hijos
        let childComponentsCode = ""
        Object.entries(childComponentsByItem).forEach(([itemIndex, components]) => {
          if (components.length > 0) {
            childComponentsCode += `
if (item.value === "item-${Number.parseInt(itemIndex) + 1}") {
  return (
    <div className="space-y-4">
      ${hasAnyItemWithImage ? '{item.showImage && item.imagePosition === "above" && renderImage(item, "above")}' : ""}
      <div className="text-zinc-600 dark:text-zinc-300">{item.answer}</div>
      ${hasAnyItemWithImage ? '{item.showImage && (item.imagePosition === "below" || !item.imagePosition) && renderImage(item, "below")}' : ""}
      <div className="space-y-4 w-full">
        ${components.map((child) => generateComponentJSX(child, allComponentsToSearch)).join("\n        ")}
      </div>
    </div>
  );
}`
          }
        })

        const getAccordionContentClasses = () => {
          const classes = []
          if (componentProps.style === "tabs" || componentProps.style === "table") {
            classes.push('"px-4"')
          } else {
            classes.push('"px-1"')
          }

          if (componentProps.style === "default" && componentProps.showTitleIcon) {
            classes.push('item.subheader ? "pl-[48px] pr-1" : "pl-[32px] pr-1"')
          } else if (componentProps.style === "tabs" && componentProps.showTitleIcon) {
            classes.push('item.subheader ? "pl-[64px]" : "pl-12"')
          } else if (componentProps.style === "table" && componentProps.showTitleIcon) {
            classes.push('item.subheader ? "pl-[64px]" : "pl-12"')
          }

          return classes
        }

        const contentClasses = getAccordionContentClasses()
        const contentClassesString =
          contentClasses.length > 0 ? `className={cn(${contentClasses.join(", ")})}` : 'className="px-1"'

        const getAlignmentClass = hasAnyItemWithImage
          ? `
const getAlignmentClass = (alignment?: string) => {
  switch (alignment) {
    case "left": return "justify-start";
    case "right": return "justify-end";
    case "center":
    default: return "justify-center";
  }
};`
          : ""

        const getImageRenderCode = hasAnyItemWithImage
          ? `
const renderImage = (item: any, position: string) => {
  if (!item.showImage || item.imagePosition !== position) return null;
  
  return (
    <div className={cn("flex mb-4", item.imageFillWidth ? "w-full" : getAlignmentClass(item.imageAlignment))}>
      <div className={cn("relative overflow-hidden rounded-md border border-border", item.imageFillWidth && "w-full")}>
        {item.imageUrl ? (
          <Image
            src={item.imageUrl || "/placeholder.svg"}
            alt={item.imageAlt || \`Image for \${item.question}\`}
            width={item.imageWidth || 300}
            height={item.imageHeight || 200}
            className={cn("object-cover", item.imageFillWidth && "w-full h-auto")}
            style={{
              height: item.imageHeight ? \`\${item.imageHeight}px\` : "200px",
            }}
          />
        ) : (
          <div
            className="flex flex-col items-center justify-center bg-muted text-muted-foreground"
            style={{
              width: item.imageFillWidth ? "100%" : item.imageWidth || 300,
              height: item.imageHeight ? \`\${item.imageHeight}px\` : "200px",
            }}
          >
            <ImageIcon className="h-10 w-10 mb-2 opacity-50" />
            <span className="text-xs">Image placeholder</span>
          </div>
        )}
      </div>
    </div>
  );
};`
          : ""

        jsx = `const accordionItems = ${JSON.stringify(itemsArray, null, 2)
          .replace(/"question":/g, "question:")
          .replace(/"answer":/g, "answer:")
          .replace(/"value":/g, "value:")
          .replace(/"subheader":/g, "subheader:")
          .replace(/"showImage":/g, "showImage:")
          .replace(/"imageUrl":/g, "imageUrl:")
          .replace(/"imageAlt":/g, "imageAlt:")
          .replace(/"imageWidth":/g, "imageWidth:")
          .replace(/"imageHeight":/g, "imageHeight:")
          .replace(/"imagePosition":/g, "imagePosition:")
          .replace(/"imageAlignment":/g, "imageAlignment:")
          .replace(/"imageFillWidth":/g, "imageFillWidth:")
          .replace(/"/g, '"')};
${getAlignmentClass}
${getImageRenderCode}

export default function AccordionDemo() {
const [activeItem, setActiveItem] = React.useState<string | null>(null);

return (
<div className="w-full max-w-md mx-auto">
  <Accordion 
    type="${componentProps.type || "single"}" 
    collapsible={${componentProps.collapsible !== false}} 
    className={cn("w-full",
      ${componentProps.style === "tabs" ? '"space-y-2"' : ""}
      ${componentProps.style === "table" ? '"border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden"' : ""}
    )}
    onValueChange={setActiveItem}
  >
    {accordionItems.map((item) => (
      <AccordionItem 
        key={item.value} 
        value={item.value} 
        className={cn(
          ${componentProps.style === "tabs" ? '"border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-950"' : ""}
          ${componentProps.style === "table" ? '"border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 last:border-0"' : ""}
        )}>
        <AccordionTrigger 
          className={cn("flex",
            ${componentProps.iconPosition === "right" ? '"flex-row-reverse justify-end"' : ""}
            ${componentProps.disableHover ? '"hover:no-underline"' : ""}
            ${componentProps.style === "tabs" || componentProps.style === "table" ? '"px-4"' : ""}
          )}>
          <div className={cn("text-left flex items-center gap-2", ${componentProps.iconPosition === "right" ? '"flex-row-reverse"' : ""})}>
            ${
              componentProps.showTitleIcon
                ? `<div className={cn("text-zinc-500 dark:text-zinc-400",
                item.subheader ? "w-10 h-10 border border-zinc-200 dark:border-zinc-800 rounded-full flex items-center justify-center" : "w-6 h-6 flex items-center justify-center"
              )}>
                <Clock className="h-4 w-4" />
              </div>`
                : ""
            }
            <div>
              <div className="dark:text-zinc-100">{item.question}</div>
              {item.subheader && <div className="text-sm text-zinc-800 dark:text-zinc-300 font-normal">{item.subheader}</div>}
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent ${contentClassesString}>
          {(() => {
            ${childComponents.length > 0 ? childComponentsCode : ""}
            return (
              <div className="space-y-4">
                ${hasAnyItemWithImage ? '{item.showImage && item.imagePosition === "above" && renderImage(item, "above")}' : ""}
                <div className="text-zinc-600 dark:text-zinc-300">{item.answer}</div>
                ${hasAnyItemWithImage ? '{item.showImage && (item.imagePosition === "below" || !item.imagePosition) && renderImage(item, "below")}' : ""}
              </div>
            );
          })()}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
</div>
);
}`
        break
      }
      case "Alert": {
        imports.add('import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"')
        imports.add('import { cn } from "@/lib/utils"')

        // Determine which icons to import based on configuration
        const iconsToImport = new Set<string>()

        // Always import the icon based on variant
        switch (componentProps.variant) {
          case "error":
          case "destructive":
            iconsToImport.add("AlertCircle")
            break
          case "warning":
            iconsToImport.add("AlertTriangle")
            break
          case "success":
            iconsToImport.add("CheckCircle")
            break
          default:
            iconsToImport.add("Info")
        }

        // Add X icon if showing close button
        if (componentProps.showCloseButton) {
          iconsToImport.add("X")
        }

        if (iconsToImport.size > 0) {
          imports.add(`import { ${Array.from(iconsToImport).join(", ")} } from 'lucide-react'`)
        }

        // Add Button import if needed
        if (componentProps.showActionButton || componentProps.showCloseButton) {
          imports.add('import { Button } from "@/components/ui/button"')
          shadcnComponents.add("button")
        }

        shadcnComponents.add("alert")

        // Get icon component based on variant
        const getIconComponent = () => {
          switch (componentProps.variant) {
            case "error":
            case "destructive":
              return "AlertCircle"
            case "warning":
              return "AlertTriangle"
            case "success":
              return "CheckCircle"
            default:
              return "Info"
          }
        }

        const iconComponent = getIconComponent()

        // Get icon color based on variant and emphasis
        const getIconColor = () => {
          if (componentProps.emphasis === "high") {
            return "#FFFFFF" // White for high emphasis
          }

          // Colors for low and medium emphasis
          switch (componentProps.variant) {
            case "default":
              return "#000000" // Black
            case "accent":
              return "#3B82F6" // Blue-500
            case "destructive":
            case "error":
              return "#B91C1C" // Red-700
            case "warning":
              return "#B45309" // Yellow-700
            case "success":
              return "#15803D" // Green-700
            case "ghost":
            case "neutral":
              return "#374151" // Gray-700
            default:
              return "#000000" // Default black
          }
        }

        // Define variant classes with border colors for different emphasis levels
        const variantClasses = {
          default: {
            low: "bg-white text-black dark:bg-gray-950 dark:text-white border border-[#ECECED] dark:border-gray-800 shadow-[0px_1px_1px_0.05px_#18181B14]",
            medium: "bg-transparent text-black dark:text-white border border-gray-200 dark:border-gray-700",
            high: "bg-black text-white dark:bg-white dark:text-black",
          },
          accent: {
            low: "bg-white text-black dark:bg-gray-950 dark:text-white border border-[#ECECED] dark:border-gray-800 shadow-[0px_1px_1px_0.05px_#18181B14]",
            medium: "bg-blue-500/10 text-blue-500 border border-blue-200 dark:border-blue-800",
            high: "bg-blue-500 text-white",
          },
          destructive: {
            low: "bg-white text-black dark:bg-gray-950 dark:text-white border border-[#ECECED] dark:border-gray-800 shadow-[0px_1px_1px_0.05px_#18181B14]",
            medium:
              "bg-red-500/10 text-red-700 dark:text-red-300 hover:bg-red-500/20 border border-red-200 dark:border-red-800",
            high: "bg-red-500 text-white hover:bg-red-600",
          },
          ghost: {
            low: "bg-white text-black dark:bg-gray-950 dark:text-white border border-[#ECECED] dark:border-gray-800 shadow-[0px_1px_1px_0.05px_#18181B14]",
            medium:
              "bg-gray-500/10 text-gray-700 dark:text-gray-300 hover:bg-gray-500/20 border border-gray-200 dark:border-gray-700",
            high: "bg-gray-500 text-white hover:bg-gray-600",
          },
          error: {
            low: "bg-white text-black dark:bg-gray-950 dark:text-white border border-[#ECECED] dark:border-gray-800 shadow-[0px_1px_1px_0.05px_#18181B14]",
            medium:
              "bg-red-500/10 text-red-700 dark:text-red-300 hover:bg-red-500/20 border border-red-200 dark:border-red-800",
            high: "bg-red-500 text-white hover:bg-red-600",
          },
          warning: {
            low: "bg-white text-black dark:bg-gray-950 dark:text-white border border-[#ECECED] dark:border-gray-800 shadow-[0px_1px_1px_0.05px_#18181B14]",
            medium:
              "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-500/20 border border-yellow-200 dark:border-yellow-800",
            high: "bg-yellow-600 text-white hover:bg-yellow-700",
          },
          success: {
            low: "bg-white text-black dark:bg-gray-950 dark:text-white border border-[#ECECED] dark:border-gray-800 shadow-[0px_1px_1px_0.05px_#18181B14]",
            medium:
              "bg-green-500/10 text-green-700 dark:text-green-300 hover:bg-green-500/20 border border-green-200 dark:border-green-800",
            high: "bg-green-500 text-white hover:bg-green-600",
          },
          neutral: {
            low: "bg-white text-black dark:bg-gray-950 dark:text-white border border-[#ECECED] dark:border-gray-800 shadow-[0px_1px_1px_0.05px_#18181B14]",
            medium:
              "bg-gray-500/10 text-gray-700 dark:text-gray-300 hover:bg-gray-500/20 border border-gray-200 dark:border-gray-700",
            high: "bg-gray-800 text-white hover:bg-gray-900",
          },
        }

        const title = componentProps.title || "Alert Title"
        const description = componentProps.description || "Alert Description"
        const variant = componentProps.variant || "default"
        const emphasis = componentProps.emphasis || "medium"
        const showIcon = componentProps.showIcon !== false
        const showCloseButton = componentProps.showCloseButton || false
        const showActionButton = componentProps.showActionButton || false
        const actionButtonText = componentProps.actionButtonText || "Action"
        const showDescription = componentProps.showDescription || false
        const buttonPosition = showDescription ? "side" : "below"
        const buttonVariant = componentProps.buttonVariant || "outline"
        const showSecondaryButton = componentProps.showSecondaryButton || false
        const secondaryButtonText = componentProps.secondaryButtonText || "Secondary"

        // Get description color class based on emphasis
        const descriptionColorClass = emphasis === "low" ? "text-[#71717A]" : ""

        // Determine if we should use the single-line centered layout
        const isSingleLine = !showDescription || !description

        jsx = `
<div className="w-[360px] mx-auto">
  <Alert className={cn("relative p-3 rounded-md", ${JSON.stringify(variantClasses[variant][emphasis])})}>
    <div className={cn("flex", ${isSingleLine ? '"items-center"' : ""})}>
      ${
        showIcon
          ? `
      <div className="flex-shrink-0 mr-2">
        <${iconComponent}
          className="h-5 w-5"
          color="${getIconColor()}"
          fill="${getIconColor()}"
          fillOpacity={0.1}
          style={{ color: "${getIconColor()}" }}
        />
      </div>`
          : ""
      }
      <div className="flex-grow">
        <div className="flex flex-col">
          <AlertTitle className="font-medium text-sm leading-5 tracking-[-0.05px] mb-0">${title}</AlertTitle>
          ${showDescription ? `<AlertDescription className={cn("mt-1", "${descriptionColorClass}")}>${description}</AlertDescription>` : ""}
          ${
            showActionButton && buttonPosition === "side"
              ? `
          <div className="mt-3 flex gap-2">
            <Button
              variant="${buttonVariant}"
              size="sm"
              className={cn(
                "h-8",
                ${buttonVariant === "default" ? '"bg-primary text-primary-foreground hover:bg-primary/90",' : ""}
                ${buttonVariant === "outline" ? '"border-gray-200 dark:border-gray-700",' : ""}
                ${variant === "default" && buttonVariant === "outline" ? '"text-black dark:text-white"' : '""'}
              )}
            >
              ${actionButtonText}
            </Button>
            ${
              showSecondaryButton
                ? `
            <Button variant="ghost" size="sm" className="h-8">
              ${secondaryButtonText}
            </Button>`
                : ""
            }
          </div>`
              : ""
          }
        </div>
      </div>
      
      <div className={cn("flex gap-2 ml-auto", ${isSingleLine ? '"items-center"' : '"items-start"'})}>
        ${
          showActionButton && buttonPosition === "below"
            ? `
        <Button
          variant="${buttonVariant}"
          size="sm"
          className={cn(
            "h-8",
            ${buttonVariant === "default" ? '"bg-primary text-primary-foreground hover:bg-primary/90",' : ""}
            ${buttonVariant === "outline" ? '"border-gray-200 dark:border-gray-700",' : ""}
            ${variant === "default" && buttonVariant === "outline" ? '"text-black dark:text-white"' : '""'}
          )}
        >
          ${actionButtonText}
        </Button>`
            : ""
        }
        
        ${
          showCloseButton
            ? `
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 p-0 hover:bg-transparent text-current"
        >
          <X className="h-4 w-4" />
        </Button>`
            : ""
        }
      </div>
    </div>
  </Alert>
</div>
`
        break
      }

      case "Alert Dialog": {
        imports.add(
          'import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"',
        )
        imports.add('import { Button } from "@/components/ui/button"')
        shadcnComponents.add("alert-dialog")
        shadcnComponents.add("button")

        jsx = `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">${componentProps.triggerText || "Show Dialog"}</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>${componentProps.title || "Are you absolutely sure?"}</AlertDialogTitle>
      <AlertDialogDescription>
        ${componentProps.description || "This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>${componentProps.cancelText || "Cancel"}</AlertDialogCancel>
      <AlertDialogAction>${componentProps.actionText || "Continue"}</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`
        break
      }
      case "Breadcrumb": {
        imports.add(`
          import {
            Breadcrumb,
            BreadcrumbEllipsis,
            BreadcrumbItem,
            BreadcrumbLink,
            BreadcrumbList,
            BreadcrumbPage,
            BreadcrumbSeparator,
          } from "@/components/ui/breadcrumb"
        `)

        // Only add dropdown imports if there's an ellipsis item
        if (componentProps.items?.some((item) => item.type === "ellipsis")) {
          imports.add(`
            import {
              DropdownMenu,
              DropdownMenuContent,
              DropdownMenuItem,
              DropdownMenuTrigger,
            } from "@/components/ui/dropdown-menu"
          `)
          shadcnComponents.add("dropdown-menu")
        }

        shadcnComponents.add("breadcrumb")

        // Generate JSX for each breadcrumb item
        const itemsJSX = componentProps.items
          ?.map((item, index, array) => {
            let itemJSX = ""

            // Start BreadcrumbItem
            itemJSX += `<BreadcrumbItem>`

            // Generate content based on item type
            switch (item.type) {
              case "link":
                itemJSX += `
                <BreadcrumbLink href="${item.href || "#"}">${item.label}</BreadcrumbLink>
              `
                break

              case "page":
                itemJSX += `
                <BreadcrumbPage>${item.label}</BreadcrumbPage>
              `
                break

              case "ellipsis":
                itemJSX += `
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    ${item.dropdownItems
                      ?.map(
                        (dropdownItem) => `
                      <DropdownMenuItem>
                        ${dropdownItem.label}
                      </DropdownMenuItem>
                    `,
                      )
                      .join("")}
                  </DropdownMenuContent>
                </DropdownMenu>
              `
                break
            }

            // End BreadcrumbItem
            itemJSX += `</BreadcrumbItem>`

            // Add separator if not last item
            if (index < array.length - 1) {
              itemJSX += `<BreadcrumbSeparator />`
            }

            return itemJSX
          })
          .join("\n")

        jsx = `
          <Breadcrumb>
            <BreadcrumbList>
              ${itemsJSX}
            </BreadcrumbList>
          </Breadcrumb>
        `
        break
      }
      case "Avatar": {
        imports.add('import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"')
        shadcnComponents.add("avatar")

        jsx = `<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`
        break
      }
      case "Badge": {
        imports.add('import { Badge } from "@/components/ui/badge"')
        shadcnComponents.add("badge")

        const badgeProps = []
        if (componentProps.variant !== "default") {
          badgeProps.push(`variant="${componentProps.variant}"`)
        }
        const propsString = badgeProps.length > 0 ? ` ${badgeProps.join(" ")}` : ""

        jsx = `<Badge${propsString}>${componentProps.text || "Badge"}</Badge>`
        break
      }
      case "Container": {
        hasUseClient.add(true)
        imports.add('import * as React from "react"')
        imports.add('import { cn } from "@/lib/utils"')
        // Only add Button and PlusCircle imports if there are child components and showAddButton is not false
        const childComponents = allComponentsToSearch.filter((c) => c.parentId === component.id)
        if (childComponents.length > 0 && componentProps.showAddButton !== false) {
          imports.add('import { Button } from "@/components/ui/button"')
          imports.add("import { PlusCircle } from 'lucide-react'")
          shadcnComponents.add("button")
        }

        // Get child components

        // Extract properties with default values
        const {
          showHeader = true,
          showFooter = false,
          headerTitle = "Container Title",
          headerDescription = "This container groups related components together",
          footerContent = "Container Footer",
          variant = "default",
          padding = "medium",
          borderRadius = "medium",
          backgroundColor = "default",
          borderColor = "default",
          width = "full",
        } = componentProps

        // Define styles for different variants
        const variantStyles = {
          default: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
          outline: "border border-gray-200 dark:border-gray-700 bg-transparent",
          ghost: "bg-transparent",
          shadow: "bg-white dark:bg-gray-800 shadow-md",
          custom: "",
        }

        const paddingStyles = {
          none: "p-0",
          small: "p-2",
          medium: "p-4",
          large: "p-6",
        }

        const contentPaddingStyles = {
          none: "p-0",
          small: "p-2",
          medium: "p-4",
          large: "p-6",
        }

        const borderRadiusStyles = {
          none: "rounded-none",
          small: "rounded-sm",
          medium: "rounded-md",
          large: "rounded-lg",
          full: "rounded-full",
        }

        const backgroundColorStyles = {
          default: "bg-white dark:bg-gray-800",
          primary: "bg-primary",
          secondary: "bg-secondary",
          accent: "bg-accent",
          muted: "bg-muted",
          transparent: "bg-transparent",
        }

        const borderColorStyles = {
          default: "border-gray-200 dark:border-gray-700",
          primary: "border-primary",
          secondary: "border-secondary",
          accent: "border-accent",
          muted: "border-muted",
          none: "border-transparent",
        }

        const widthStyles = {
          auto: "w-auto",
          full: "w-[460px]",
          sm: "w-64",
          md: "w-80",
          lg: "w-96",
          xl: "w-[32rem]",
        }

        // Generate JSX for child components
        let childrenJSX = ""
        if (childComponents.length > 0) {
          childrenJSX = childComponents
            .map((childComponent) => {
              return `<div className="mb-4">
          ${generateComponentJSX(childComponent, allComponentsToSearch)}
        </div>`
            })
            .join("\n")
        }

        // Build JSX for the container
        jsx = `<div className={cn("mx-auto", "${widthStyles[width]}")}>
  <div className={cn("${borderRadiusStyles[borderRadius]}", 
    ${
      variant !== "custom"
        ? `"${variantStyles[variant]}"`
        : `cn("border", "${backgroundColorStyles[backgroundColor]}", "${borderColorStyles[borderColor]}")`
    }
  )}>
    ${
      showHeader
        ? `<div className={cn("border-b", "${borderColorStyles[borderColor]}", "${paddingStyles[padding]}")}>
      <h3 className="text-lg font-medium text-foreground">${headerTitle}</h3>
      ${headerDescription ? `<p className="mt-1 text-sm text-muted-foreground">${headerDescription}</p>` : ""}
    </div>`
        : ""
    }

    <div className="${contentPaddingStyles[padding]}">
    ${
      childComponents.length > 0
        ? `<div className="space-y-4 w-full">
          ${childrenJSX}
        </div>`
        : ""
    }
  </div>

    ${
      showFooter
        ? `<div className={cn("border-t", "${borderColorStyles[borderColor]}", "${paddingStyles[padding]}")}>
      <p className="text-sm text-muted-foreground">${footerContent}</p>`
        : ""
    }
  </div>
</div>`
        break
      }
      default:
        jsx = `<div>$component.typeDemo</div>`
    }
    return jsx
  }

  // Generar código basado en el número de componentes
  if (components.length === 1) {
    const component = components[0]
    const componentJSX = generateComponentJSX(component, allComponents)

    // Manejo especial para Accordion
    if (component.type === "Accordion") {
      componentCode = componentJSX
    }
    // Manejo especial para Calendar
    else if (component.type === "Calendar") {
      const calendarType = component.props?.calendarType || "default"
      const navigationType = component.props?.navigationType || "default"
      const mode = component.props?.mode || "single"
      const dateRange = component.props?.dateRange || false
      const multiple = component.props?.multiple || false

      // Generar las declaraciones de estado según el tipo de calendario
      let stateDeclarations = ""

      // Always declare month state first
      stateDeclarations = "const [month, setMonth] = React.useState<Date>(new Date())"

      if (calendarType === "range" || dateRange) {
        stateDeclarations += "\n  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined)"
      } else if (calendarType === "multiple" || multiple) {
        stateDeclarations += "\n  const [dates, setDates] = React.useState<Date[]>([])"
      } else {
        stateDeclarations += "\n  const [date, setDate] = React.useState<Date | undefined>(new Date())"
      }

      // Always include months and years constants for monthYearSelect navigation
      if (navigationType === "monthYearSelect") {
        stateDeclarations += `
  // Generate years for select
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i)
  // Generate months for select
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ]`
      } else if (navigationType === "yearlySelectNav") {
        stateDeclarations += `
  // Generate years for select
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i)`
      }

      // Añadir funciones auxiliares según el tipo de calendario
      if (calendarType === "dateInput") {
        stateDeclarations += `
    
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    try {
      const parsedDate = new Date(value)
      if (!isNaN(parsedDate.getTime())) {
        setDate(parsedDate)
      }
    } catch (error) {
      console.error("Invalid date format")
    }
  }`
      } else if (calendarType === "timeInput") {
        stateDeclarations += `
    
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    try {
      const parsedDate = new Date(value)
      if (!isNaN(parsedDate.getTime())) {
        setDate(parsedDate)
      }
    } catch (error) {
      console.error("Invalid date format")
    }
  }
  
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value)
  }`
      } else if (calendarType === "appointmentPicker") {
        stateDeclarations += `
    
  const handleAppointmentSelect = (time: string) => {
    setTime(time)
  }`
      } else if (calendarType === "pricing") {
        stateDeclarations += `
    
  const getDayPrice = (day: Date) => {
    const dateKey = format(day, "yyyy-MM-dd")
    return pricingData[dateKey]
  }`
      }

      componentCode = `export default function ${component.type}Demo() {
  ${stateDeclarations}
  
  return (
    ${componentJSX}
  )
}`
    } else {
      componentCode = `export default function ${component.type}Demo() {
  return (
    ${componentJSX}
  )
}`
    }
  } else if (components.length > 1) {
    const jsxBlocks = components.map((comp) => generateComponentJSX(comp, components)).join("\n      ")
    componentCode = `export default function Demo() {
  return (
    <div>
      ${jsxBlocks}
    </div>
  )
}`
  }

  // Asegurar que "use client" sea el primer import si es necesario
  const finalImports = new Set<string>()
  if (hasUseClient.size > 0) {
    finalImports.add('"use client"')
  }
  imports.forEach((imp) => {
    if (imp !== '"use client"') {
      finalImports.add(imp)
    }
  })

  return { imports: finalImports, componentCode, shadcnComponents }
}

export function generateInstallCommands(shadcnComponents: Set<string>): string {
  if (shadcnComponents.size === 0) {
    return "No additional components need to be installed"
  }

  const componentCommands = Array.from(shadcnComponents).map((component) => `npx shadcn@latest add ${component}`)

  // Combinar comandos con saltos de línea para mejor legibilidad
  return `npm install @radix-ui/react-icons lucide-react
${componentCommands.join("\n")}`
}
