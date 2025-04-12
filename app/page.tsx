import { Hero } from "@/app/(marketing)/components/Hero"
import { Features } from "@/app/(marketing)/components/Features"
import { Examples } from "@/app/(marketing)/components/Examples"
import { HowItWorks } from "@/app/(marketing)/components/HowItWorks"
import { Roadmap } from "@/app/(marketing)/components/Roadmap"
import { FAQ } from "@/app/(marketing)/components/FAQ"
import { Footer } from "@/app/(marketing)/components/Footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <section id="examples" className="scroll-mt-20">
        <Examples />
      </section>
      <section id="features" className="scroll-mt-20">
        <Features />
      </section>
      <section id="how-it-works" className="scroll-mt-20">
        <HowItWorks />
      </section>
      <section id="roadmap" className="scroll-mt-20">
        <Roadmap />
      </section>
      <section id="faq" className="scroll-mt-20">
        <FAQ />
      </section>
      <Footer />
    </div>
  )
}
