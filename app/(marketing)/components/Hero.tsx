import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Play } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section className="py-16 mt-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="outline" className="mx-auto mb-6 px-4 py-2 rounded-full shadow-sm text-sm font-medium">
            Weekly Updates 🎉
          </Badge>
          <h1 className="text-5xl md:text-[56px] font-bold mb-4 tracking-[-0.04em]">
            Beautiful UI components built with Shadcn and Next.js
          </h1>
          <p className="text-base text-zinc-500 md:text-lg mb-8 max-w-[700px]">
            Extensive collection of copy-and-paste components for quickly building app UIs. It's free and ready to drop
            into your projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="rounded-full" variant="default">
              <Link href="/playground">
                <div className="flex items-center gap-2">
                  <Play className=" h-4 w-4" />
                  Playground
                </div>
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/components">Components</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-16 max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-zinc-950 p-8 rounded-none border border-zinc-100 dark:border-zinc-900 shadow-none flex flex-col items-center justify-center"
            >
              <img src="/placeholder.svg?height=100&width=100" alt="Component" className="mb-4" />
              <p className="text-center text-sm">Component</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
