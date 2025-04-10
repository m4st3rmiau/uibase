"use client"

import * as React from "react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/components/ui/context-menu"

interface EditableContextMenuProps {
  props: {
    triggerText: string
    items: {
      label: string
      action?: string
      items?: { label: string; action?: string }[]
    }[]
  }
}

export function EditableContextMenu({ props }: EditableContextMenuProps) {
  const { triggerText, items } = props

  const renderItems = (items: EditableContextMenuProps["props"]["items"]) => {
    return items.map((item, index) => (
      <React.Fragment key={index}>
        {item.items ? (
          <ContextMenuSub>
            <ContextMenuSubTrigger>{item.label}</ContextMenuSubTrigger>
            <ContextMenuSubContent>{renderItems(item.items)}</ContextMenuSubContent>
          </ContextMenuSub>
        ) : (
          <ContextMenuItem onClick={() => console.log(item.action || item.label)}>{item.label}</ContextMenuItem>
        )}
        {index < items.length - 1 && <ContextMenuSeparator />}
      </React.Fragment>
    ))
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        {triggerText}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">{renderItems(items)}</ContextMenuContent>
    </ContextMenu>
  )
}
