import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Paintbrush, Zap, Code } from "lucide-react"

const features = [
  {
    title: "Customizable Components",
    description: "Easily customize components to fit your design needs.",
    icon: Paintbrush,
  },
  {
    title: "Rapid Prototyping",
    description: "Build and iterate on your designs quickly and efficiently.",
    icon: Zap,
  },
  {
    title: "Export Ready Code",
    description: "Generate clean, production-ready code with a single click.",
    icon: Code,
  },
]

export function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose BuilderUI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="h-8 w-8 mb-2" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
