"use client"

import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { toast } from "sonner"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

interface InstallationStep {
  title: string
  description: string
  code: string
  language: string
}

interface InstallationStepsProps {
  steps: InstallationStep[]
}

export function InstallationSteps({ steps }: InstallationStepsProps) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success("Copied to clipboard")
    } catch (err) {
      toast.error("Failed to copy text")
    }
  }

  return (
    <div className="relative pl-[20px] space-y-8 before:absolute before:left-[20px] before:top-[5px] before:h-[calc(100%-10px)] before:w-[2px] before:bg-border w-full pr-12 ml-6">
      {steps.map((step, index) => (
        <div key={index} className="relative pl-8">
          <div className="absolute left-[-20px] flex h-10 w-10 items-center justify-center rounded-full border bg-background text-sm font-medium">
            {index + 1}
          </div>
          <h3 className="font-semibold">{step.title}</h3>
          <p className="text-muted-foreground">{step.description}</p>
          {step.code && (
            <div className="mt-4 relative rounded-lg overflow-hidden">
              <div className="absolute right-2 top-2 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-300"
                  onClick={() => copyToClipboard(step.code)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <SyntaxHighlighter
                language={step.language}
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: "0.5rem",
                  padding: "1rem",
                  paddingTop: "2rem",
                  background: "#101012",
                }}
              >
                {step.code}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
