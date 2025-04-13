"use client"

import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import * as React from "react"

export function DemoDatePicker() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <h3 className="font-semibold text-lg">Schedule Meeting</h3>
          <p className="text-sm text-muted-foreground">Select a date and time for your meeting.</p>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"].map((time) => (
                <Button key={time} variant="outline" className="text-xs">
                  {time}
                </Button>
              ))}
            </div>
            <Button className="w-full">Schedule</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
