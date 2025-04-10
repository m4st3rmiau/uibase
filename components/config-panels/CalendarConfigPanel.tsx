"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"

interface CalendarConfigPanelProps {
  props: Record<string, any>
  onChange: (updatedProps: Record<string, any>) => void
}

export function CalendarConfigPanel({ props, onChange }: CalendarConfigPanelProps) {
  const [showMultiMonthOptions, setShowMultiMonthOptions] = useState(false)

  useEffect(() => {
    setShowMultiMonthOptions((props.numberOfMonths || 1) > 1)
  }, [props.numberOfMonths])

  const handleChange = (key: string, value: any) => {
    // Special handling for calendarType
    if (key === "calendarType" && value === "appointmentPicker") {
      // When switching to appointmentPicker, automatically enable showFooter and showAppointmentData
      onChange({
        ...props,
        [key]: value,
        showFooter: true,
        showAppointmentData: true,
      })
    } else if (key === "calendarType" && value === "withPresets") {
      // When switching to withPresets, always enable dateRange and set presetsRange
      onChange({
        ...props,
        [key]: value,
        dateRange: true,
        multiple: false,
        presetsRange: true,
      })
    } else if (key === "calendarType" && value === "pricing") {
      // When switching to pricing calendar, set appropriate defaults
      onChange({
        ...props,
        [key]: value,
        numberOfMonths: 2,
        showDivider: true,
        navigationType: "default",
        showFooter: true,
        showPriceDetails: true,
      })
    } else if (key === "dateRange" && props.calendarType === "withPresets") {
      // When changing dateRange for withPresets, also update presetsRange
      onChange({
        ...props,
        [key]: value,
        presetsRange: value,
        multiple: value ? false : props.multiple,
      })
    } else {
      onChange({ ...props, [key]: value })
    }
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border shadow-none space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">Types</Label>
          <Select
            value={props.calendarType || "default"}
            onValueChange={(value) => handleChange("calendarType", value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="appointmentPicker">Appointment picker</SelectItem>
              <SelectItem value="withPresets">Calendar with presets</SelectItem>
              <SelectItem value="pricing">Pricing calendar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {props.calendarType === "withPresets" && (
          <div className="flex items-center justify-between">
            <Label>Range</Label>
            <Switch
              checked={props.presetsRange || false}
              onCheckedChange={(checked) => handleChange("presetsRange", checked)}
            />
          </div>
        )}

        {props.calendarType !== "pricing" && (
          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Number of Months</Label>
            <Input
              type="number"
              value={props.numberOfMonths || 1}
              onChange={(e) => handleChange("numberOfMonths", Number.parseInt(e.target.value, 10))}
              className="w-[200px]"
              min={1}
              max={12}
            />
          </div>
        )}

        {showMultiMonthOptions && props.calendarType !== "pricing" && (
          <div className="flex items-center justify-between">
            <Label>Show Divider</Label>
            <Switch
              checked={props.showDivider || false}
              onCheckedChange={(checked) => handleChange("showDivider", checked)}
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">Start of Week</Label>
          <Select value={props.startOfWeek || 0} onValueChange={(value) => handleChange("startOfWeek", value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={0}>Sunday</SelectItem>
              <SelectItem value={1}>Monday</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">Navigation</Label>
          <Select
            value={props.navigationType || "default"}
            onValueChange={(value) => handleChange("navigationType", value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="rightNav">Right Navigation</SelectItem>
              <SelectItem value="monthYearSelect">Monthly/Yearly</SelectItem>
              <SelectItem value="yearlySelectNav">Yearly Select</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {props.calendarType !== "appointmentPicker" &&
          props.calendarType !== "pricing" &&
          props.calendarType !== "withPresets" && (
            <div className="flex items-center justify-between">
              <Label className="text-sm font-normal">Action</Label>
              <Select
                value={props.multiple ? "multiple" : props.dateRange ? "range" : "single"}
                onValueChange={(value) => {
                  if (value === "multiple") {
                    onChange({ ...props, multiple: true, dateRange: false, showSelectedDates: true })
                  } else if (value === "range") {
                    onChange({ ...props, dateRange: true, multiple: false })
                  } else {
                    onChange({ ...props, dateRange: false, multiple: false })
                  }
                }}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single Date</SelectItem>
                  <SelectItem value="range">Date Range</SelectItem>
                  <SelectItem value="multiple">Multiple Dates</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

        {props.multiple && props.calendarType !== "pricing" && (
          <div className="flex items-center justify-between">
            <Label>Show Selected Dates</Label>
            <Switch
              checked={props.showSelectedDates || false}
              onCheckedChange={(checked) => handleChange("showSelectedDates", checked)}
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <Label>Disable Past Dates</Label>
          <Switch
            checked={props.disablePastDates || false}
            onCheckedChange={(checked) => handleChange("disablePastDates", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Show Dots</Label>
          <Switch checked={props.showDots || false} onCheckedChange={(checked) => handleChange("showDots", checked)} />
        </div>

        <div className="flex items-center justify-between">
          <Label>Disabled</Label>
          <Switch checked={props.disabled || false} onCheckedChange={(checked) => handleChange("disabled", checked)} />
        </div>

        {/* Footer options */}
        <div className="flex items-center justify-between">
          <Label>Show Footer</Label>
          <Switch
            checked={props.showFooter || false}
            onCheckedChange={(checked) => handleChange("showFooter", checked)}
          />
        </div>

        {props.showFooter && (
          <>
            <div className="flex items-center justify-between">
              <Label>Show Divider Footer</Label>
              <Switch
                checked={props.showDividerFooter || false}
                onCheckedChange={(checked) => handleChange("showDividerFooter", checked)}
              />
            </div>

            {(props.calendarType === "appointmentPicker" || props.calendarType === "pricing" || props.dateRange) && (
              <div className="flex items-center justify-between">
                <Label>
                  {props.calendarType === "appointmentPicker"
                    ? "Show Data"
                    : props.calendarType === "pricing"
                      ? "Show Price Details"
                      : "Show Range"}
                </Label>
                <Switch
                  checked={
                    props.calendarType === "appointmentPicker"
                      ? props.showAppointmentData || false
                      : props.calendarType === "pricing"
                        ? props.showPriceDetails || false
                        : props.showRange || false
                  }
                  onCheckedChange={(checked) =>
                    props.calendarType === "appointmentPicker"
                      ? handleChange("showAppointmentData", checked)
                      : props.calendarType === "pricing"
                        ? handleChange("showPriceDetails", checked)
                        : handleChange("showRange", checked)
                  }
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <Label>Show Button</Label>
              <Switch
                checked={props.showButton || false}
                onCheckedChange={(checked) => handleChange("showButton", checked)}
              />
            </div>

            {props.showButton && (
              <>
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-normal">Button Position</Label>
                  <Select
                    value={props.buttonPosition || "right"}
                    onValueChange={(value) => handleChange("buttonPosition", value)}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-normal">Button Variant</Label>
                  <Select
                    value={props.buttonVariant || "default"}
                    onValueChange={(value) => handleChange("buttonVariant", value)}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="destructive">Destructive</SelectItem>
                      <SelectItem value="outline">Outline</SelectItem>
                      <SelectItem value="secondary">Secondary</SelectItem>
                      <SelectItem value="ghost">Ghost</SelectItem>
                      <SelectItem value="link">Link</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Show Secondary Button</Label>
                  <Switch
                    checked={props.showSecondaryButton || false}
                    onCheckedChange={(checked) => handleChange("showSecondaryButton", checked)}
                  />
                </div>

                {props.showSecondaryButton && (
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-normal">Secondary Button Variant</Label>
                    <Select
                      value={props.secondaryButtonVariant || "outline"}
                      onValueChange={(value) => handleChange("secondaryButtonVariant", value)}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="destructive">Destructive</SelectItem>
                        <SelectItem value="outline">Outline</SelectItem>
                        <SelectItem value="secondary">Secondary</SelectItem>
                        <SelectItem value="ghost">Ghost</SelectItem>
                        <SelectItem value="link">Link</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </>
            )}

            <div className="flex items-center justify-between">
              <Label>Show Input</Label>
              <Switch
                checked={props.showInput || false}
                onCheckedChange={(checked) => handleChange("showInput", checked)}
              />
            </div>

            {props.showInput && (
              <>
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-normal">Input Type</Label>
                  <Select value={props.inputType || "date"} onValueChange={(value) => handleChange("inputType", value)}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="time">Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-normal">Input Width</Label>
                  <Select
                    value={props.inputWidth || "medium"}
                    onValueChange={(value) => handleChange("inputWidth", value)}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="full">Full</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </>
        )}
      </Card>
    </div>
  )
}
