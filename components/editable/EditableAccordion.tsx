"use client"

import type React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Clock, ImageIcon } from "lucide-react"
import { PlusCircle } from "lucide-react"
import Image from "next/image"

type Component = any

interface EditableAccordionProps {
  props: {
    items: {
      title: string
      subheader?: string
      content: string
      showButton?: boolean
      buttonText?: string
      buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
      components?: Component[]
      showImage?: boolean
      imageUrl?: string
      imageAlt?: string
      imageWidth?: number
      imageHeight?: number
      imagePosition?: "above" | "below"
      imageAlignment?: "left" | "center" | "right"
      imageFillWidth?: boolean
    }[]
    type?: "single" | "multiple"
    style?: "default" | "tabs" | "table"
    collapsible?: boolean
    iconPosition?: "left" | "right"
    disableHover?: boolean
    showTitleIcon?: boolean
  }
  children?: React.ReactNode
  onAddComponent?: (itemIndex: number) => void
  nestedComponents?: React.ReactNode[]
}

export function EditableAccordion({ props, children, onAddComponent, nestedComponents }: EditableAccordionProps) {
  const {
    items,
    type = "single",
    style = "default",
    collapsible = false,
    iconPosition = "left",
    disableHover = false,
    showTitleIcon = false,
  } = props

  const getAlignmentClass = (alignment?: string) => {
    switch (alignment) {
      case "left":
        return "justify-start"
      case "right":
        return "justify-end"
      case "center":
      default:
        return "justify-center"
    }
  }

  return (
    <div className="w-[420px] mx-auto">
      <Accordion
        type={type}
        collapsible={collapsible ? "true" : undefined}
        className={cn(
          "w-full",
          style === "tabs" && "space-y-2",
          style === "table" && "border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden",
        )}
      >
        {items.map((item, index) => (
          <AccordionItem
            value={`item-${index + 1}`}
            key={index}
            className={cn(
              style === "tabs" && "border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-950",
              style === "table" &&
                "border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 last:border-0",
            )}
          >
            <AccordionTrigger
              className={cn(
                "flex",
                iconPosition === "right" && "flex-row-reverse justify-end",
                disableHover && "hover:no-underline",
                (style === "tabs" || style === "table") && "px-4",
              )}
            >
              <div className={cn("text-left flex items-center gap-2", iconPosition === "right" && "flex-row-reverse")}>
                {showTitleIcon && (
                  <div
                    className={cn(
                      "text-zinc-500 dark:text-zinc-400",
                      item.subheader
                        ? "w-10 h-10 border border-zinc-200 dark:border-zinc-800 rounded-full flex items-center justify-center"
                        : "w-6 h-6 flex items-center justify-center",
                    )}
                  >
                    {item.showImage ? <ImageIcon className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                  </div>
                )}
                <div>
                  <div className="dark:text-zinc-100">{item.title}</div>
                  {item.subheader && (
                    <div className="text-sm text-zinc-800 dark:text-zinc-300 font-normal">{item.subheader}</div>
                  )}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent
              className={cn(
                style === "default" && "px-1",
                style === "default" && showTitleIcon && (item.subheader ? "pl-12 pr-1" : "pl-[32px] pr-1"),
                (style === "tabs" || style === "table") && "px-4",
                style === "tabs" && showTitleIcon && (item.subheader ? "pl-16 pr-1" : "pl-12 pr-1"),
                style === "table" && showTitleIcon && (item.subheader ? "pl-16 pr-1" : "pl-12 pr-1"),
              )}
            >
              {item.showImage && item.imagePosition === "above" && (
                <div
                  className={cn("flex mb-4", item.imageFillWidth ? "w-full" : getAlignmentClass(item.imageAlignment))}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-md border border-border",
                      item.imageFillWidth && "w-full",
                    )}
                  >
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={item.imageAlt || `Image for ${item.title}`}
                        width={item.imageWidth || 300}
                        height={item.imageHeight || 200}
                        className={cn("object-cover", item.imageFillWidth && "w-full h-auto")}
                        style={{
                          height: item.imageHeight ? `${item.imageHeight}px` : "200px",
                        }}
                      />
                    ) : (
                      <div
                        className="flex flex-col items-center justify-center bg-muted text-muted-foreground"
                        style={{
                          width: item.imageFillWidth ? "100%" : item.imageWidth || 300,
                          height: item.imageHeight ? `${item.imageHeight}px` : "200px",
                        }}
                      >
                        <ImageIcon className="h-10 w-10 mb-2 opacity-50" />
                        <span className="text-xs">Image placeholder</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="text-zinc-600 dark:text-zinc-300">{item.content}</div>

              {item.showImage && (item.imagePosition === "below" || !item.imagePosition) && (
                <div
                  className={cn("flex mt-4", item.imageFillWidth ? "w-full" : getAlignmentClass(item.imageAlignment))}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-md border border-border",
                      item.imageFillWidth && "w-full",
                    )}
                  >
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={item.imageAlt || `Image for ${item.title}`}
                        width={item.imageWidth || 300}
                        height={item.imageHeight || 200}
                        className={cn("object-cover", item.imageFillWidth && "w-full h-auto")}
                        style={{
                          height: item.imageHeight ? `${item.imageHeight}px` : "200px",
                        }}
                      />
                    ) : (
                      <div
                        className="flex flex-col items-center justify-center bg-muted text-muted-foreground"
                        style={{
                          width: item.imageFillWidth ? "100%" : item.imageWidth || 300,
                          height: item.imageHeight ? `${item.imageHeight}px` : "200px",
                        }}
                      >
                        <ImageIcon className="h-10 w-10 mb-2 opacity-50" />
                        <span className="text-xs">Image placeholder</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {item.showButton && (
                <div className="mt-2 flex justify-start">
                  <Button variant={item.buttonVariant || "default"}>{item.buttonText}</Button>
                </div>
              )}

              {nestedComponents && nestedComponents[index] && (
                <div className="mt-4 w-full pr-0 space-y-4">{nestedComponents[index]}</div>
              )}

              {onAddComponent && (
                <div className="mt-4 flex justify-start w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onAddComponent(index)
                    }}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Component
                  </Button>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
