"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"
import { COMPONENTS } from "@/app/playground/component-list"
import { cn } from "@/lib/utils"

interface ComponentSelectionDialogProps {
  isOpen: boolean
  onClose: () => void
  onSelectComponent: (componentType: string) => void
}

export function ComponentSelectionDialog({ isOpen, onClose, onSelectComponent }: ComponentSelectionDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredComponents = COMPONENTS.filter(
    (component) => !component.disabled && component.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select a component</DialogTitle>
        </DialogHeader>
        <div className="relative mb-4">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <ScrollArea className="h-[300px] pr-4">
          <div className="grid grid-cols-2 gap-2">
            {filteredComponents.map((component) => (
              <div
                key={component.name}
                className={cn(
                  "flex items-center p-2 rounded-md cursor-pointer hover:bg-accent",
                  "border border-border",
                )}
                onClick={() => {
                  onSelectComponent(component.name)
                  onClose()
                }}
              >
                <span className="text-sm">{component.name}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
