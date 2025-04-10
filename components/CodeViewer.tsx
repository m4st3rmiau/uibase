"use client"

import { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useTheme } from "next-themes"

interface CodeViewerProps {
  code: string
  language?: string
}

export default function CodeViewer({ code, language = "jsx" }: CodeViewerProps) {
  const [copied, setCopied] = useState(false)
  const { theme } = useTheme()

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="relative overflow-hidden border-none shadow-none p-0 max-h-[70vh]">
      <div className="absolute top-2 right-2 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={copyToClipboard}
          className="h-8 w-8 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-300"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
      <div className="overflow-auto max-h-[70vh]">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          showLineNumbers={true}
          customStyle={{
            margin: 0,
            borderRadius: "0.5rem",
            padding: "1rem",
            paddingTop: "2rem",
            background: "#101012",
            minWidth: "100%",
            width: "max-content",
          }}
          lineNumberStyle={{
            minWidth: "2.5em",
            paddingRight: "1em",
            textAlign: "right",
            userSelect: "none",
            color: "rgba(255, 255, 255, 0.5)",
          }}
          wrapLongLines={true}
          wrapLines={false}
          className="whitespace-pre"
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </Card>
  )
}
