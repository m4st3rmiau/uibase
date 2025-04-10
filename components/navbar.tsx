"use client"
import { LogOut, User, Github, Twitter, Coffee, Menu } from "lucide-react"
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

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    window.dispatchEvent(new Event("logout"))
  }

  const MobileMenu = () => (
    <SheetContent side="left" className="w-[300px] sm:w-[400px]">
      <nav className="flex flex-col gap-4">
        {!user && (
          <Link href="/" className="block px-2 py-1 text-lg text-left" onClick={() => setOpen(false)}>
            Home
          </Link>
        )}
        <Link href="/playground" className="block px-2 py-1 text-lg text-left" onClick={() => setOpen(false)}>
          Playground
        </Link>
        <Link href="/components" className="block px-2 py-1 text-lg text-left" onClick={() => setOpen(false)}>
          Components
        </Link>
        <Link href="/repositorio" className="block px-2 py-1 text-lg text-left" onClick={() => setOpen(false)}>
          Repositorio
        </Link>
      </nav>
      <div className="flex flex-col gap-4 mt-4">
        <Link href="https://github.com/m4st3rmiau" target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            className="w-full justify-center rounded-full bg-transparent"
            onClick={() => setOpen(false)}
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </Link>
        <Link href="https://x.com/Maoo_lop" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="w-full justify-center rounded-full" onClick={() => setOpen(false)}>
            <Twitter className="mr-2 h-4 w-4" />
            Twitter
          </Button>
        </Link>
        <Link href="https://buymeacoffee.com/m4st3reditg" target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            className="w-full justify-center rounded-full bg-yellow-400 hover:bg-yellow-500"
            onClick={() => setOpen(false)}
          >
            <Coffee className="mr-2 h-4 w-4" />
            Buy Me a Coffee
          </Button>
        </Link>
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

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background z-50 border-b border-border">
      <div className="flex h-16 items-center px-6 justify-between max-w-screen-2xl mx-auto">
        <Link href={user ? "/playground" : "/"}>
          <Image src="/logo.png" alt="uibase Logo" width={110} height={0} />
        </Link>
        {!isMobile && (
          <nav className="flex-1 flex justify-center">
            <nav className="flex items-center space-x-6 text-sm">
              {!user && (
                <Link
                  href="/"
                  className={`transition-colors hover:text-primary ${
                    pathname === "/" ? "font-medium" : "font-normal text-muted-foreground"
                  }`}
                >
                  Home
                </Link>
              )}
              <Link
                href="/playground"
                className={`transition-colors hover:text-primary ${
                  pathname === "/playground" ? "font-medium" : "font-normal text-muted-foreground"
                }`}
              >
                Playground
              </Link>
              <Link
                href="/components"
                className={`transition-colors hover:text-primary ${
                  pathname === "/components" ? "font-medium" : "font-normal text-muted-foreground"
                }`}
              >
                Components
              </Link>
              <Link
                href="/repositorio"
                className={`transition-colors hover:text-primary ${
                  pathname === "/repositorio" ? "font-medium" : "font-normal text-muted-foreground"
                }`}
              >
                Repositorio
              </Link>
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
              <div className="flex items-center gap-2">
                <Link href="https://github.com/m4st3rmiau" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="rounded-full bg-background hover:bg-accent">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link href="https://x.com/Maoo_lop" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="rounded-full bg-background hover:bg-accent">
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                </Link>
                <Link href="https://buymeacoffee.com/m4st3reditg" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-yellow-400 hover:bg-yellow-500 text-black dark:text-black"
                  >
                    <Coffee className="h-5 w-5" />
                    <span className="sr-only">Buy Me a Coffee</span>
                  </Button>
                </Link>
              </div>
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
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
