import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/sonner"
import { Providers } from "./providers"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { Inter } from "next/font/google"
import { supabase } from "@/lib/supabase"
import type React from "react" // Added import for React

import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "BuilderUI",
  description: "Create, customize, and export beautiful UI components with ease.",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col antialiased`}>
        <ErrorBoundary>
          <Providers>
            <div className="min-h-screen flex flex-col antialiased">
              <Navbar initialSession={session} />
              <main className="flex-1 pt-16">{children}</main>
              <Toaster />
            </div>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}


import './globals.css'