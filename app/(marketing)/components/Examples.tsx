import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Examples() {
  const examples = [
    {
      title: "Dashboard",
      description: "A comprehensive admin dashboard with analytics, charts, and data tables.",
      image: "/placeholder.svg?height=200&width=300",
      link: "/playground",
    },
    {
      title: "E-commerce",
      description: "Complete e-commerce interface with product listings, cart, and checkout flow.",
      image: "/placeholder.svg?height=200&width=300",
      link: "/playground",
    },
    {
      title: "Blog",
      description: "Modern blog layout with articles, categories, and comment sections.",
      image: "/placeholder.svg?height=200&width=300",
      link: "/playground",
    },
    {
      title: "Authentication",
      description: "Secure login, registration, and profile management interfaces.",
      image: "/placeholder.svg?height=200&width=300",
      link: "/playground",
    },
    {
      title: "Landing Page",
      description: "Conversion-focused landing page templates for products and services.",
      image: "/placeholder.svg?height=200&width=300",
      link: "/playground",
    },
    {
      title: "Forms",
      description: "Advanced form layouts with validation, multi-step processes, and more.",
      image: "/placeholder.svg?height=200&width=300",
      link: "/playground",
    },
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Examples</h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            Explore our collection of pre-built UI examples that you can customize and integrate into your projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examples.map((example, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <img
                  src={example.image || "/placeholder.svg"}
                  alt={example.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{example.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 mb-4">{example.description}</p>
                <Link href={example.link}>
                  <Button variant="ghost" className="p-0 h-auto font-medium text-primary hover:text-primary/80">
                    View Example <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/playground">View All Examples</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
