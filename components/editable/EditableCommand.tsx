"use client"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"

interface EditableCommandProps {
  props: {
    placeholder?: string
    emptyMessage?: string
    items: { group: string; items: { value: string; label: string }[] }[]
  }
}

export function EditableCommand({ props }: EditableCommandProps) {
  const { placeholder, emptyMessage, items } = props

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder={placeholder || "Type a command or search..."} />
      <CommandList>
        <CommandEmpty>{emptyMessage || "No results found."}</CommandEmpty>
        {items.map((group, index) => (
          <CommandGroup key={index} heading={group.group}>
            {group.items.map((item, itemIndex) => (
              <CommandItem key={itemIndex} value={item.value}>
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </Command>
  )
}
