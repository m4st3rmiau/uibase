"use client"

import React from "react"
import { format, addDays, isToday, isSameDay } from "date-fns"
import { ChevronLeft, ChevronRight, Clock, CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

export interface EditableCalendarProps {
  className?: string
  props?: any
}

export function EditableCalendar({ props = {}, className }: EditableCalendarProps) {
  // Extraer propiedades del objeto props o usar valores predeterminados
  const {
    calendarType = "default",
    dateRange = false,
    multiple = false,
    disabled = false,
    initialFocus = false,
    numberOfMonths = 1,
    defaultMonth,
    fromDate,
    toDate,
    captionLayout = "buttons",
    startOfWeek = 0,
    locale,
    showOutsideDays = true,
    fixedWeeks = false,
    ISOWeek = false,
    navigationType = "default",
    showDivider = false,
    disablePastDates = false,
    showDots = false,
    showFooter = false,
    showDividerFooter = false,
    showRange = false,
    showButton = false,
    buttonPosition = "right",
    buttonVariant = "default",
    showSecondaryButton = false,
    secondaryButtonVariant = "outline",
    showInput = false,
    inputType = "date",
    inputWidth = "medium",
    showAppointmentData = false,
    showPriceDetails = false,
    presetsRange = false,
    showSelectedDates = false,
  } = props

  // Estados para el calendario
  const today = new Date()
  const [date, setDate] = React.useState<Date | undefined>(today)
  const [month, setMonth] = React.useState<Date>(defaultMonth ? new Date(defaultMonth) : today)
  const [dateRangeValue, setDateRangeValue] = React.useState<{ from: Date; to: Date | undefined }>({
    from: today,
    to: addDays(today, 7),
  })
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([today])
  const [selectedPreset, setSelectedPreset] = React.useState<string>("today")
  const [selectedTime, setSelectedTime] = React.useState<string>("10:00")

  // Determinar el modo del calendario
  // Para appointment picker, siempre usar modo single
  // Para withPresets, siempre usar modo range
  const calendarMode =
    calendarType === "appointmentPicker"
      ? "single"
      : calendarType === "withPresets"
        ? "range"
        : multiple
          ? "multiple"
          : dateRange
            ? "range"
            : "single"

  // Función para manejar la selección de fechas según el modo
  const handleSelect = (value: any) => {
    if (calendarType === "appointmentPicker") {
      // Para appointment picker, siempre tratar como single date
      setDate(value)
    } else if (calendarType === "withPresets") {
      // Para withPresets, siempre tratar como date range
      setDateRangeValue(value || { from: today, to: undefined })
    } else if (multiple) {
      setSelectedDates(value || [])
    } else if (dateRange) {
      setDateRangeValue(value || { from: today, to: undefined })
    } else {
      setDate(value)
    }
  }

  // Datos de ejemplo para los puntos del calendario
  const dotDates = React.useMemo(() => {
    return [
      new Date(today.getFullYear(), today.getMonth(), 5),
      new Date(today.getFullYear(), today.getMonth(), 12),
      new Date(today.getFullYear(), today.getMonth(), 19),
      new Date(today.getFullYear(), today.getMonth(), 26),
    ]
  }, [today])

  // Datos de ejemplo para precios
  const prices = React.useMemo(() => {
    const result: Record<string, number> = {}
    for (let i = 0; i < 60; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      result[format(date, "yyyy-MM-dd")] = Math.floor(Math.random() * 100) + 50
    }
    return result
  }, [today])

  // Presets para el calendario con presets
  const presets = [
    { label: "Today", value: "today", dates: { from: today, to: today } },
    {
      label: "Yesterday",
      value: "yesterday",
      dates: { from: addDays(today, -1), to: addDays(today, -1) },
    },
    {
      label: "Last 7 days",
      value: "last7days",
      dates: { from: addDays(today, -6), to: today },
    },
    {
      label: "Last 30 days",
      value: "last30days",
      dates: { from: addDays(today, -29), to: today },
    },
  ]

  // Datos de ejemplo para citas (más opciones para demostrar el scroll)
  const appointments = [
    { time: "08:00", available: true },
    { time: "08:30", available: false },
    { time: "09:00", available: true },
    { time: "09:30", available: true },
    { time: "10:00", available: true },
    { time: "10:30", available: false },
    { time: "11:00", available: false },
    { time: "11:30", available: true },
    { time: "12:00", available: true },
    { time: "12:30", available: false },
    { time: "13:00", available: false },
    { time: "13:30", available: true },
    { time: "14:00", available: true },
    { time: "14:30", available: true },
    { time: "15:00", available: true },
    { time: "15:30", available: false },
    { time: "16:00", available: false },
    { time: "16:30", available: true },
    { time: "17:00", available: true },
    { time: "17:30", available: false },
    { time: "18:00", available: true },
  ]

  // Función para verificar si una fecha tiene un punto
  const hasDot = (date: Date) => {
    if (!showDots) return false
    return dotDates.some(
      (dotDate) =>
        dotDate.getDate() === date.getDate() &&
        dotDate.getMonth() === date.getMonth() &&
        dotDate.getFullYear() === date.getFullYear(),
    )
  }

  // Función para obtener el precio de una fecha
  const getPrice = (date: Date) => {
    if (calendarType !== "pricing") return null
    const dateKey = format(date, "yyyy-MM-dd")
    return prices[dateKey]
  }

  // Función para verificar si una fecha es hoy y debe ser resaltada
  const shouldHighlightToday = (day: Date) => {
    // Si es hoy y no hay otra fecha seleccionada, o si hoy es la fecha seleccionada
    if (!isToday(day)) return false

    if (multiple && calendarType === "default") {
      // En modo múltiple, verificar si hoy está en las fechas seleccionadas
      return selectedDates.length === 0 || selectedDates.some((d) => isSameDay(d, today))
    } else if ((dateRange || calendarType === "withPresets") && calendarType !== "appointmentPicker") {
      // En modo rango, verificar si hoy está en el rango seleccionado
      const { from, to } = dateRangeValue
      return !from && !to
    } else {
      // En modo único, verificar si hoy es la fecha seleccionada o no hay fecha seleccionada
      return !date || isSameDay(date, today)
    }
  }

  // Función para renderizar la navegación personalizada
  const renderNavigation = () => {
    if (navigationType === "default") return null

    return (
      <div
        className={cn(
          "flex items-center px-4 pt-3",
          navigationType === "rightNav" ? "justify-end space-x-1" : "justify-between",
        )}
      >
        {navigationType !== "rightNav" && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => {
              const newMonth = new Date(month)
              newMonth.setMonth(month.getMonth() - 1)
              setMonth(newMonth)
            }}
            disabled={disabled}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}

        {navigationType === "monthYearSelect" ? (
          <div className="flex items-center space-x-1">
            <Select
              value={month.getMonth().toString()}
              onValueChange={(value) => {
                const newMonth = new Date(month)
                newMonth.setMonth(Number.parseInt(value))
                setMonth(newMonth)
              }}
            >
              <SelectTrigger className="h-8 w-[110px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem key={i} value={i.toString()}>
                    {format(new Date(2000, i, 1), "MMMM")}
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
              <SelectTrigger className="h-8 w-[90px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = new Date().getFullYear() - 5 + i
                  return (
                    <SelectItem key={i} value={year.toString()}>
                      {year}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
        ) : navigationType === "yearlySelectNav" ? (
          <div className="flex items-center space-x-1">
            <div className="text-sm font-medium">{format(month, "MMMM")}</div>
            <Select
              value={month.getFullYear().toString()}
              onValueChange={(value) => {
                const newMonth = new Date(month)
                newMonth.setFullYear(Number.parseInt(value))
                setMonth(newMonth)
              }}
            >
              <SelectTrigger className="h-8 w-[90px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = new Date().getFullYear() - 5 + i
                  return (
                    <SelectItem key={i} value={year.toString()}>
                      {year}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="text-sm font-medium">{format(month, "MMMM yyyy")}</div>
        )}

        {navigationType === "rightNav" ? (
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => {
                const newMonth = new Date(month)
                newMonth.setMonth(month.getMonth() - 1)
                setMonth(newMonth)
              }}
              disabled={disabled}
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
              disabled={disabled}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => {
              const newMonth = new Date(month)
              newMonth.setMonth(month.getMonth() + 1)
              setMonth(newMonth)
            }}
            disabled={disabled}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    )
  }

  // Renderizar presets para el calendario con presets
  const renderPresets = () => {
    if (calendarType !== "withPresets") return null

    return (
      <div className="border-r p-3 space-y-2 w-[160px]">
        {presets.map((preset) => (
          <Button
            key={preset.value}
            variant="ghost"
            size="sm"
            className={cn(
              "w-full justify-start",
              selectedPreset === preset.value
                ? "bg-primary/5 text-primary hover:text-primary hover:bg-primary/10"
                : "text-foreground hover:bg-muted",
            )}
            onClick={() => {
              setSelectedPreset(preset.value)
              // For withPresets, always use date range
              setDateRangeValue(preset.dates as { from: Date; to: Date })
            }}
          >
            {preset.label}
          </Button>
        ))}
      </div>
    )
  }

  // Renderizar opciones de horas para el calendario de citas
  const renderAppointmentTimes = () => {
    if (calendarType !== "appointmentPicker" || !showAppointmentData) return null

    return (
      <div className="border-l p-3 space-y-3 min-w-[150px]">
        <div className="text-sm font-medium">Available Times</div>
        <ScrollArea className="h-[250px] pr-2">
          <div className="flex flex-col space-y-2">
            {appointments.map((appointment, index) => (
              <Button
                key={index}
                variant={appointment.time === selectedTime ? "default" : "outline"}
                size="sm"
                className={cn("w-full justify-start", !appointment.available && "opacity-50 cursor-not-allowed")}
                disabled={!appointment.available}
                onClick={() => setSelectedTime(appointment.time)}
              >
                <Clock className="mr-2 h-3 w-3" />
                {appointment.time}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    )
  }

  // Renderizar fechas seleccionadas para el modo múltiple
  const renderSelectedDates = () => {
    if (!multiple || !showSelectedDates || calendarType !== "default") return null

    return (
      <div className="border-l p-3 space-y-3 min-w-[150px]">
        <div className="text-sm font-medium">Selected Days ({selectedDates.length})</div>
        <ScrollArea className="h-[250px] pr-2">
          <div className="flex flex-col space-y-2">
            {selectedDates.map((selectedDate, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  const newDates = selectedDates.filter((date) => !isSameDay(date, selectedDate))
                  setSelectedDates(newDates)
                }}
              >
                {format(selectedDate, "MMM d, yyyy")}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    )
  }

  // Renderizar el calendario principal
  const renderCalendar = () => {
    return (
      <div className="flex-1">
        {renderNavigation()}
        <div className="flex">
          {Array.from({ length: numberOfMonths }, (_, i) => {
            const monthDate = new Date(month)
            monthDate.setMonth(month.getMonth() + i)

            return (
              <React.Fragment key={i}>
                {i > 0 && showDivider && <Separator orientation="vertical" className="h-auto" />}
                <Calendar
                  mode={calendarMode as any}
                  selected={
                    calendarType === "appointmentPicker"
                      ? date
                      : calendarType === "withPresets"
                        ? dateRangeValue
                        : multiple
                          ? selectedDates
                          : dateRange
                            ? dateRangeValue
                            : date
                  }
                  onSelect={handleSelect}
                  month={monthDate}
                  onMonthChange={i === 0 ? setMonth : undefined}
                  disabled={disabled}
                  initialFocus={initialFocus}
                  fromDate={disablePastDates ? today : fromDate}
                  toDate={toDate}
                  captionLayout={navigationType !== "default" ? "hidden" : captionLayout}
                  weekStartsOn={startOfWeek}
                  locale={locale}
                  showOutsideDays={showOutsideDays}
                  fixedWeeks={fixedWeeks}
                  ISOWeek={ISOWeek}
                  className="border-0"
                  modifiers={{
                    dots: (date) => hasDot(date),
                    prices: (date) => getPrice(date) !== null,
                    today: (date) => isToday(date) && shouldHighlightToday(date),
                  }}
                  modifiersClassNames={{
                    dots: "relative before:absolute before:bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-1 before:h-1 before:bg-primary before:rounded-full",
                    prices: "relative",
                    today:
                      "bg-primary text-primary-foreground font-bold hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  }}
                  defaultMonth={today}
                />
              </React.Fragment>
            )
          })}
        </div>
      </div>
    )
  }

  // Renderizar el calendario completo según el tipo
  const isAppointmentPicker = calendarType === "appointmentPicker" && showAppointmentData
  const isWithPresets = calendarType === "withPresets"
  const isMultipleDates = multiple && showSelectedDates && calendarType === "default"

  return (
    <div className={cn("w-fit mx-auto border rounded-md overflow-hidden", className)}>
      <div className={cn("flex", (isWithPresets || isAppointmentPicker || isMultipleDates) && "flex-row")}>
        {renderPresets()}
        {renderCalendar()}
        {renderAppointmentTimes()}
        {renderSelectedDates()}
      </div>
      {showFooter && (
        <>
          {showDividerFooter && <Separator />}
          <div className="p-3 space-y-4">
            {/* Mostrar información seleccionada */}
            {isAppointmentPicker && date && selectedTime && (
              <div className="text-sm">
                <span className="font-medium">Selected appointment:</span> {format(date, "PPP")} at {selectedTime}
              </div>
            )}

            {/* Mostrar rango de fechas seleccionado */}
            {showRange &&
              (dateRange || calendarType === "withPresets") &&
              dateRangeValue.from &&
              calendarType !== "appointmentPicker" && (
                <div className="text-sm">
                  <span className="font-medium">Selected range:</span> {format(dateRangeValue.from, "PPP")} -{" "}
                  {dateRangeValue.to ? format(dateRangeValue.to, "PPP") : "Select end date"}
                </div>
              )}

            {/* Mostrar detalles de precio */}
            {calendarType === "pricing" && showPriceDetails && dateRangeValue.from && dateRangeValue.to && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Base price</span>
                  <span>$199</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxes & fees</span>
                  <span>$24</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>$223</span>
                </div>
              </div>
            )}

            {/* Mostrar campo de entrada */}
            {showInput && (
              <div className="flex items-center space-x-2">
                {inputType === "date" ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          inputWidth === "small" && "w-[200px]",
                          inputWidth === "medium" && "w-[250px]",
                          inputWidth === "large" && "w-[300px]",
                          inputWidth === "full" && "w-full",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className={cn(
                      inputWidth === "small" && "w-[200px]",
                      inputWidth === "medium" && "w-[250px]",
                      inputWidth === "large" && "w-[300px]",
                      inputWidth === "full" && "w-full",
                    )}
                  />
                )}
              </div>
            )}

            {/* Mostrar botones */}
            {showButton && (
              <div
                className={cn(
                  "flex",
                  buttonPosition === "right" ? "justify-end" : "justify-start",
                  showSecondaryButton && "space-x-2",
                )}
              >
                {showSecondaryButton && (
                  <Button variant={secondaryButtonVariant as any} size="sm">
                    Cancel
                  </Button>
                )}
                <Button variant={buttonVariant as any} size="sm">
                  {isAppointmentPicker ? "Book Appointment" : "Confirm"}
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
