import { Hero } from "@/app/(marketing)/components/Hero"
import { Features } from "@/app/(marketing)/components/Features"
import { Footer } from "@/app/(marketing)/components/Footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Features />
      <Footer />
    </div>
  )
}
