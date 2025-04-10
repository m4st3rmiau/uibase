import { Suspense } from "react"
import { PlaygroundContent } from "./playground-content"

export default function PlaygroundPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <PlaygroundContent />
    </Suspense>
  )
}
