"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface EditableCarouselProps {
  props: {
    items: { content: string; imageUrl?: string; header?: string }[]
    showControls?: boolean
    autoPlay?: boolean
    loop?: boolean
    draggable?: boolean
    orientation?: "horizontal" | "vertical"
    showAPI?: boolean
  }
}

export function EditableCarousel({ props }: EditableCarouselProps) {
  const {
    items,
    showControls = true,
    autoPlay = false,
    loop = false,
    draggable = false,
    orientation = "horizontal",
    showAPI = false,
  } = props

  return (
    <div className="relative">
      <Carousel
        className={cn(
          "w-full max-w-xs",
          draggable && "cursor-grab active:cursor-grabbing",
          orientation === "vertical" && "h-[300px]",
        )}
        autoPlay={autoPlay}
        loop={loop}
        orientation={orientation}
      >
        <CarouselContent className={orientation === "vertical" ? "-mt-1 h-[300px]" : "-ml-1"}>
          {items.map((item, index) => (
            <CarouselItem key={index} className={orientation === "vertical" ? "pt-1 md:pt-1.5" : "pl-1 md:pl-1.5"}>
              <Card>
                {item.header && (
                  <CardHeader>
                    <CardTitle>{item.header}</CardTitle>
                  </CardHeader>
                )}
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.header || `Slide ${index + 1}`}
                      width={200}
                      height={200}
                      className="object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-3xl font-semibold">{item.content}</span>
                  )}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {showControls && (
          <>
            <CarouselPrevious className="left-1" />
            <CarouselNext className="right-1" />
          </>
        )}
      </Carousel>
      {showAPI && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-background/80 px-2 py-1 rounded text-sm">
          Slide {1} of {items.length}
        </div>
      )}
    </div>
  )
}
