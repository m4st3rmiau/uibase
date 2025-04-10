"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { COMPONENT_INFO } from "@/config/component-info"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { ChevronRight, PlusCircle } from "lucide-react"
import Image from "next/image"

export const COMPONENTS = [
  { name: "Accordion", disabled: false },
  { name: "Alert", disabled: false },
  { name: "Alert Dialog", disabled: false },
  { name: "Avatar", disabled: false },
  { name: "Badge", disabled: false },
  { name: "Breadcrumb", disabled: false },
  { name: "Button", disabled: false },
  { name: "Calendar", disabled: false },
  { name: "Card", disabled: false },
  { name: "Carousel", disabled: false },
  { name: "Checkbox", disabled: false },
  { name: "Collapsible", disabled: false },
  { name: "Combobox", disabled: false },
  { name: "Command", disabled: false },
  { name: "Container", description: "A flexible container to group related components", disabled: false },
  { name: "Context Menu", disabled: false },
  { name: "Data Table", disabled: false },
  { name: "Date Picker", disabled: false },
  { name: "Dialog", disabled: false },
  { name: "Drawer", disabled: false },
  { name: "Dropdown Menu", disabled: false },
  { name: "Form", disabled: false },
  { name: "Hover Card", disabled: false },
  { name: "Input", disabled: false },
  { name: "Input OTP", disabled: false },
  { name: "Menubar", disabled: false },
  { name: "Navigation Menu", disabled: false },
  { name: "Pagination", disabled: false },
  { name: "Password", disabled: false },
  { name: "Popover", disabled: false },
  { name: "Progress", disabled: false },
  { name: "Radio Group", disabled: false },
  { name: "Scroll Area", disabled: false },
  { name: "Select", disabled: false },
  { name: "Separator", disabled: false },
  { name: "Sheet", disabled: false },
  { name: "Skeleton", disabled: false },
  { name: "Slider", disabled: false },
  { name: "Switch", disabled: false },
  { name: "Tabs", disabled: false },
  { name: "Textarea", disabled: false },
  { name: "Toast", disabled: false },
  { name: "Toggle", disabled: false },
  { name: "Toggle Group", disabled: false },
  { name: "Tooltip", disabled: false },
  { name: "Uploader", disabled: false },
]

interface ComponentListProps {
  onAdd: (type: string) => void
  activeComponent: string | null
  activeTab: string
}

export function ComponentList({ onAdd, activeComponent, activeTab }: ComponentListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredComponents = COMPONENTS.filter((component) =>
    component.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (activeTab === "modules") {
    return (
      <div className="space-y-4">
        <div className="text-sm font-medium text-muted-foreground mb-2">Featured Modules</div>
        {[
          { name: "Authentication", description: "User sign-up and login flow" },
          { name: "Dashboard", description: "Admin dashboard layout with sidebar" },
          { name: "E-commerce", description: "Product listing and cart functionality" },
          { name: "Blog", description: "Blog post listing and single post view" },
        ].map((module, index) => (
          <Card key={index} className="p-4 hover:bg-accent transition-colors cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{module.name}</h3>
                <p className="text-sm text-muted-foreground">{module.description}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </Card>
        ))}
        <Button className="w-full" variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Custom Module
        </Button>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="space-y-1">
          {filteredComponents.map((component) => (
            <Tooltip key={component.name}>
              <TooltipTrigger asChild>
                <Card
                  className={cn(
                    "w-full",
                    "flex h-10 items-center bg-transparent px-4 cursor-pointer shadow-none hover:bg-accent/50 transition-colors border-0",
                    component.disabled && "opacity-50 cursor-not-allowed hover:bg-transparent",
                    activeComponent === component.name && "bg-accent/50 border border-border",
                  )}
                  onClick={() => !component.disabled && onAdd(component.name)}
                >
                  <span className="text-sm">{component.name}</span>
                </Card>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={20} className="max-w-[320px] w-[320px]">
                <div className="space-y-4">
                  <Image
                    src={COMPONENT_INFO[component.name]?.image || "/placeholder.svg?height=160&width=320"}
                    alt={`${component.name} preview`}
                    width={320}
                    height={160}
                    className="w-full rounded-lg border mt-2"
                  />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{COMPONENT_INFO[component.name]?.title || component.name}</h4>
                      <span className="rounded-md bg-accent px-2 py-0.5 text-xs font-medium">
                        {COMPONENT_INFO[component.name]?.label || "Component"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground pb-4">
                      {COMPONENT_INFO[component.name]?.description || "No description available."}
                    </p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}
