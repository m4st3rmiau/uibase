"use client"
import { LogOut, User, Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMediaQuery } from "@/hooks/use-media-query"

export function Navbar({ initialSession }: { initialSession: any | null }) {
  const pathname = usePathname()
  const [user, setUser] = useState<any | null>(initialSession?.user || null)
  const router = useRouter()
  const isMobile = useMediaQuery("(max-width: 640px)")
  const [open, setOpen] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    fetchUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session?.user || null)
      } else if (event === "SIGNED_OUT") {
        setUser(null)
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  // Add scroll spy effect to highlight active section in navbar
  useEffect(() => {
    if (pathname !== "/") return

    const handleScroll = () => {
      const sections = ["examples", "features", "how-it-works", "roadmap", "faq"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [pathname])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    window.dispatchEvent(new Event("logout"))
  }

  const scrollToSection = (sectionId: string) => {
    setOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const MobileMenu = () => (
    <SheetContent side="left" className="w-[300px] sm:w-[400px]">
      <nav className="flex flex-col gap-4">
        <button className="block px-2 py-1 text-lg text-left" onClick={() => scrollToSection("examples")}>
          Examples
        </button>
        <button className="block px-2 py-1 text-lg text-left" onClick={() => scrollToSection("features")}>
          Features
        </button>
        <button className="block px-2 py-1 text-lg text-left" onClick={() => scrollToSection("how-it-works")}>
          How It Works
        </button>
        <button className="block px-2 py-1 text-lg text-left" onClick={() => scrollToSection("roadmap")}>
          Roadmap
        </button>
        <button className="block px-2 py-1 text-lg text-left" onClick={() => scrollToSection("faq")}>
          FAQ
        </button>
        <Link
          href="/playground"
          className="block px-2 py-1 text-lg text-left font-medium"
          onClick={() => setOpen(false)}
        >
          Playground
        </Link>
      </nav>
      <div className="flex flex-col gap-4 mt-4">
        {user ? (
          <Button
            variant="outline"
            className="w-full justify-center rounded-full"
            onClick={() => {
              handleSignOut()
              setOpen(false)
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full justify-center rounded-full"
            onClick={() => {
              router.push("/auth")
              setOpen(false)
            }}
          >
            Log in
          </Button>
        )}
      </div>
    </SheetContent>
  )

  if (pathname === "/playground" || pathname === "/components" || pathname === "/repositorio") {
    return null
  }

  if (!hasMounted) {
    return null
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background z-50 border-b border-border">
      <div className="flex h-16 items-center px-6 justify-between max-w-screen-2xl mx-auto">
        <Link href="/">
          <Image src="/logo.png" alt="uibase Logo" width={110} height={0} />
        </Link>
        {!isMobile && (
          <nav className="flex-1 flex justify-center">
            <nav className="flex items-center space-x-6 text-sm">
              <button
                onClick={() => scrollToSection("examples")}
                className={`transition-colors hover:text-primary ${
                  activeSection === "examples" ? "font-medium" : "font-normal text-muted-foreground"
                }`}
              >
                Examples
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className={`transition-colors hover:text-primary ${
                  activeSection === "features" ? "font-medium" : "font-normal text-muted-foreground"
                }`}
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className={`transition-colors hover:text-primary ${
                  activeSection === "how-it-works" ? "font-medium" : "font-normal text-muted-foreground"
                }`}
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("roadmap")}
                className={`transition-colors hover:text-primary ${
                  activeSection === "roadmap" ? "font-medium" : "font-normal text-muted-foreground"
                }`}
              >
                Roadmap
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className={`transition-colors hover:text-primary ${
                  activeSection === "faq" ? "font-medium" : "font-normal text-muted-foreground"
                }`}
              >
                FAQ
              </button>
            </nav>
          </nav>
        )}
        <div className="flex items-center gap-2">
          {isMobile ? (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild onClick={() => setOpen(true)}>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <MobileMenu />
            </Sheet>
          ) : (
            <>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="h-10 w-10">
                      {user.user_metadata.avatar_url && (
                        <AvatarImage src={user.user_metadata.avatar_url} alt="Avatar" />
                      )}
                      <AvatarFallback>{user.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="text-sm">
                      <User className="mr-2 h-4 w-4" />
                      <span>{user.email}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="outline" className="rounded-full" onClick={() => router.push("/auth")}>
                  Log in
                </Button>
              )}
              <Link href="/playground">
                <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Playground
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
