"use client"

import { Button } from "@/components/ui/button"
import { Plus, Book, Folder, HelpCircle, Moon, Sun } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { FeedbackModal } from "./FeedbackModal"
import { useTheme } from "next-themes"

interface SidebarProps {
  initialSelectedIcon: "plus" | "book" | "folder" | "help"
}

export function Sidebar({ initialSelectedIcon }: SidebarProps) {
  const [selectedIcon, setSelectedIcon] = useState(initialSelectedIcon)
  const pathname = usePathname()
  const router = useRouter()
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
  const { setTheme, theme } = useTheme()

  useEffect(() => {
    if (pathname.startsWith("/playground")) {
      setSelectedIcon("plus")
    } else if (pathname.startsWith("/components")) {
      setSelectedIcon("book")
    } else if (pathname.startsWith("/repositorio")) {
      setSelectedIcon("folder")
    }
  }, [pathname])

  const handleIconClick = (iconName: string) => {
    if (iconName !== "help") {
      setSelectedIcon(iconName as any)
    }

    switch (iconName) {
      case "plus":
        router.push("/playground")
        break
      case "book":
        router.push("/components")
        break
      case "folder":
        router.push("/repositorio")
        break
      case "help":
        setIsFeedbackModalOpen(true)
        break
    }
  }

  return (
    <>
      <div className="border-r border-border w-full flex flex-col">
        <div className="flex flex-col items-center py-4 space-y-2">
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
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="mt-auto mb-4 hover:bg-accent"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <FeedbackModal isOpen={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)} />
    </>
  )
}
