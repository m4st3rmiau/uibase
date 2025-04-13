"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Plus, Book, Folder, HelpCircle, Moon, Sun, User, LogOut, Github, Twitter, Coffee } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { FeedbackModal } from "./FeedbackModal"
import { useTheme } from "next-themes"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LoginModal } from "./LoginModal"
import { supabase } from "@/lib/supabase"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface SidebarProps {
  initialSelectedIcon: "plus" | "book" | "folder" | "help"
}

export function Sidebar({ initialSelectedIcon }: SidebarProps) {
  const [selectedIcon, setSelectedIcon] = useState(initialSelectedIcon)
  const pathname = usePathname()
  const router = useRouter()
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { setTheme, theme } = useTheme()
  const [user, setUser] = useState<any | null>(() => {
    // Try to get user from localStorage first to prevent flickering
    const storedUser = typeof window !== "undefined" ? localStorage.getItem("sb-user") : null
    return storedUser ? JSON.parse(storedUser) : null
  })

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        localStorage.setItem("sb-user", JSON.stringify(user))
      }
      setUser(user)
    }
    fetchUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        localStorage.setItem("sb-user", JSON.stringify(session?.user || null))
        setUser(session?.user || null)
      } else if (event === "SIGNED_OUT") {
        localStorage.removeItem("sb-user")
        setUser(null)
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const handleIconClick = (iconName: string) => {
    if (iconName !== "help") {
      setSelectedIcon(iconName as any)
    }

    switch (iconName) {
      case "plus":
        router.push("/playground")
        break
      case "book":
        router.push("/themes")
        break
      case "folder":
        router.push("/repositorio")
        break
      case "help":
        setIsFeedbackModalOpen(true)
        break
    }
  }

  useEffect(() => {
    if (pathname.startsWith("/playground")) {
      setSelectedIcon("plus")
    } else if (pathname.startsWith("/themes")) {
      setSelectedIcon("book")
    } else if (pathname.startsWith("/repositorio")) {
      setSelectedIcon("folder")
    }
  }, [pathname])

  const handleLogoClick = () => {
    if (user) {
      router.push("/playground")
    } else {
      router.push("/")
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    window.dispatchEvent(new Event("logout"))
  }

  return (
    <>
      <div className="border-r border-border w-full flex flex-col">
        <div className="flex flex-col items-center py-4 space-y-2 h-full">
          <div className="mb-4 cursor-pointer" onClick={handleLogoClick}>
            <Image src="/icon_uibase.svg" alt="UI Base" width={40} height={40} />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleIconClick("plus")}
            className={selectedIcon === "plus" ? "bg-accent" : ""}
          >
            <Plus className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleIconClick("book")}
            className={selectedIcon === "book" ? "bg-accent" : ""}
          >
            <Book className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleIconClick("folder")}
            className={selectedIcon === "folder" ? "bg-accent" : ""}
          >
            <Folder className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleIconClick("help")}
            className="hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          <div className="flex-1"></div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:bg-accent"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-accent mb-4 left-4 p-0 h-9 w-9 overflow-hidden"
                >
                  <Avatar className="h-9 w-9 border-2 border-primary/10 transition-all duration-200 hover:border-primary/30">
                    {user.user_metadata?.avatar_url ? (
                      <AvatarImage
                        src={user.user_metadata.avatar_url || "/placeholder.svg"}
                        alt="Avatar"
                        className="object-cover"
                      />
                    ) : (
                      <AvatarFallback>{user.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                    )}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-72 p-0 rounded-xl overflow-hidden shadow-lg border border-border/40"
              >
                <div className="p-2 border-b">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                      {user.user_metadata.avatar_url && (
                        <AvatarImage src={user.user_metadata.avatar_url || "/placeholder.svg"} alt="Avatar" />
                      )}
                      <AvatarFallback>{user.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.user_metadata.full_name || "User"}</span>
                      <span className="text-xs text-muted-foreground truncate max-w-[180px]">{user.email}</span>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <div className="text-xs font-medium text-muted-foreground px-2 py-1.5">Social Links</div>
                  <div className="grid grid-cols-1 gap-1">
                    <SocialLink
                      href="https://github.com/m4st3rmiau"
                      icon={<Github className="h-4 w-4" />}
                      label="GitHub"
                      color="bg-black text-white dark:bg-zinc-800"
                    />
                    <SocialLink
                      href="https://x.com/Maoo_lop"
                      icon={<Twitter className="h-4 w-4" />}
                      label="Twitter"
                      color="bg-blue-500 text-white"
                    />
                    <SocialLink
                      href="https://buymeacoffee.com/m4st3reditg"
                      icon={<Coffee className="h-4 w-4" />}
                      label="Buy Me a Coffee"
                      color="bg-yellow-500 text-black"
                    />
                  </div>
                </div>

                <DropdownMenuSeparator className="my-1" />

                <div className="p-2">
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="flex items-center gap-2 rounded-lg cursor-pointer transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsLoginModalOpen(true)}
              className="hover:bg-accent mb-4 p-0 h-9 w-9 overflow-hidden rounded-full"
            >
              <Avatar className="h-9 w-9 border-2 border-primary/10 transition-all duration-200 hover:border-primary/10">
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          )}
        </div>
      </div>
      <FeedbackModal isOpen={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)} />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  )
}

// Helper component for social links
function SocialLink({
  href,
  icon,
  label,
  color,
}: { href: string; icon: React.ReactNode; label: string; color: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 p-2 rounded-lg transition-colors hover:bg-accent"
    >
      <div className={cn("p-1.5 rounded-md flex items-center justify-center", color)}>{icon}</div>
      <span className="text-sm">{label}</span>
    </Link>
  )
}
