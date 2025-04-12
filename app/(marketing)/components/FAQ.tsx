import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  const faqs = [
    {
      question: "What is BuilderUI?",
      answer:
        "BuilderUI is a component library and UI building platform that helps developers and designers create beautiful interfaces quickly. It provides pre-built components, customization tools, and code generation to streamline the UI development process.",
    },
    {
      question: "Is BuilderUI free to use?",
      answer:
        "Yes, BuilderUI offers a free tier that includes access to core components and basic customization features. We also offer premium plans with additional components, advanced features, and priority support.",
    },
    {
      question: "Do I need to know React to use BuilderUI?",
      answer:
        "While familiarity with React is helpful, it's not required. Our visual editor allows you to customize components without writing code, and we provide documentation to help you integrate the generated code into your projects.",
    },
    {
      question: "Can I use BuilderUI with my existing project?",
      answer:
        "BuilderUI components can be integrated into existing React projects. We provide clear documentation on how to install and use our components with various frameworks and build systems.",
    },
    {
      question: "Does BuilderUI support dark mode?",
      answer:
        "Yes, all BuilderUI components are designed with both light and dark mode in mind. You can preview components in both modes and the generated code includes the necessary styling for both themes.",
    },
    {
      question: "How do I get support if I have questions?",
      answer:
        "We offer multiple support channels including documentation, community forums, and email support. Premium users also get access to priority support and direct assistance from our team.",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            Find answers to common questions about BuilderUI and how it can help with your projects.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-medium py-4">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-zinc-600 dark:text-zinc-300 pb-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-zinc-500 dark:text-zinc-400 mb-4">Still have questions? We're here to help.</p>
          <a href="mailto:support@builderui.com" className="text-primary hover:text-primary/80 font-medium">
            Contact Support
          </a>
        </div>
      </div>
    </section>
  )
}
