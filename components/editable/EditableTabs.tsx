"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EditableTabsProps {
  props: {
    items: { title: string; content: string }[]
    defaultValue?: string
  }
}

export function EditableTabs({ props }: EditableTabsProps) {
  const { items, defaultValue } = props
  const [activeTab, setActiveTab] = useState(defaultValue || items[0]?.title)

  return (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        {items.map((item, index) => (
          <TabsTrigger key={index} value={item.title}>
            {item.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item, index) => (
        <TabsContent key={index} value={item.title}>
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
