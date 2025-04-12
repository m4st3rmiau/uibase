import { CheckCircle } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Choose a Component",
      description: "Browse our extensive library of UI components and select the ones you need for your project.",
    },
    {
      number: "02",
      title: "Customize Design",
      description:
        "Modify colors, spacing, typography, and other properties to match your brand and design requirements.",
    },
    {
      number: "03",
      title: "Add Functionality",
      description:
        "Configure component behavior, interactions, and data handling to create a fully functional interface.",
    },
    {
      number: "04",
      title: "Export Code",
      description: "Generate clean, production-ready code that you can directly integrate into your application.",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            Our intuitive platform makes it easy to build beautiful interfaces in minutes, not hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-primary/5 rounded-lg p-6 h-full">
                <div className="text-4xl font-bold text-primary/20 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-8 h-0.5 bg-zinc-200 dark:bg-zinc-700"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 bg-zinc-50 dark:bg-zinc-900 rounded-xl p-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-zinc-500 dark:text-zinc-400 mb-6">
                Join thousands of developers who are building better UIs faster with our platform.
              </p>
              <ul className="space-y-2">
                {["No credit card required", "Free starter plan", "Easy integration"].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1">
              <img
                src="/placeholder.svg?height=250&width=350"
                alt="Platform Preview"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
