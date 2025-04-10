"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { Sidebar } from "@/components/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Folder, Component, ChevronRight, MoreVertical, Trash, Palette, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { themes, radiusOptions, typographyOptions, type ThemeRadius, type Typography } from "@/lib/themes"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import CodeViewer from "@/components/CodeViewer"

interface Repository {
  id: string
  name: string
  description: string
  created_at: string
  user_id: string
  theme?: string
}

interface SavedComponent {
  id: string
  component: any
  repository_id: string
  created_at: string
  name?: string
}

interface ComponentTypeGroup {
  type: string
  count: number
  thumbnail?: SavedComponent
}

export default function RepositoryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [repository, setRepository] = useState<Repository | null>(null)
  const [components, setComponents] = useState<SavedComponent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [componentTypes, setComponentTypes] = useState<ComponentTypeGroup[]>([])
  const [deleteType, setDeleteType] = useState<string | null>(null)
  const [currentTheme, setCurrentTheme] = useState<string>("zinc")
  const [radius, setRadius] = useState<ThemeRadius>("0.5")
  const [typography, setTypography] = useState<Typography>("inter")
  const [isCodeDialogOpen, setIsCodeDialogOpen] = useState(false)
  const [editingTypeId, setEditingTypeId] = useState<string | null>(null)

  const fetchRepositoryAndComponents = async () => {
    setIsLoading(true)
    try {
      const repositoryId = params.id as string

      // Fetch repository details
      const { data: repoData, error: repoError } = await supabase
        .from("repositories")
        .select("*")
        .eq("id", repositoryId)
        .single()

      if (repoError) {
        // If error contains "relation does not exist", show a specific message
        if (repoError.message.includes("relation") && repoError.message.includes("does not exist")) {
          toast.error("Database tables not set up. Please run the setup script.")
          console.error("Database tables not set up:", repoError.message)
          return
        }
        throw repoError
      }

      setRepository(repoData)

      // Load repository theme settings or use defaults
      const savedTheme = localStorage.getItem(`repo-theme-${repositoryId}`) || "zinc"
      const savedRadius = localStorage.getItem(`repo-radius-${repositoryId}`) || "0.5"
      const savedTypography = localStorage.getItem(`repo-typography-${repositoryId}`) || "inter"

      setCurrentTheme(savedTheme)
      setRadius(savedRadius as ThemeRadius)
      setTypography(savedTypography as Typography)

      // Fetch components in this repository
      const { data: componentsData, error: componentsError } = await supabase
        .from("repository_components")
        .select("*")
        .eq("repository_id", repositoryId)
        .order("created_at", { ascending: false })

      if (componentsError) {
        // If error contains "relation does not exist", show a specific message
        if (componentsError.message.includes("relation") && componentsError.message.includes("does not exist")) {
          toast.error("Database tables not set up. Please run the setup script.")
          console.error("Database tables not set up:", componentsError.message)
          return
        }
        throw componentsError
      }

      setComponents(componentsData || [])

      // Group components by type
      const typeGroups: ComponentTypeGroup[] = []
      const typeMap: Record<string, SavedComponent[]> = {}

      componentsData?.forEach((comp) => {
        const type = comp.component.type
        if (!typeMap[type]) {
          typeMap[type] = []
        }
        typeMap[type].push(comp)
      })

      // Create the type groups with counts
      Object.entries(typeMap).forEach(([type, comps]) => {
        typeGroups.push({
          type,
          count: comps.length,
          thumbnail: comps[0], // Use the first component as thumbnail
        })
      })

      setComponentTypes(typeGroups)
    } catch (error: any) {
      console.error("Error fetching repository details:", error)
      toast.error(error.message || "Failed to load repository details")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchRepositoryAndComponents()
    }
  }, [params.id])

  const handleGoToPlayground = () => {
    // Pass the current theme settings to the playground
    router.push(`/playground?repository=${params.id}&theme=${currentTheme}&radius=${radius}&typography=${typography}`)
  }

  const handleViewComponentType = (type: string, e: React.MouseEvent) => {
    // Don't navigate if clicking on the dropdown
    if ((e.target as HTMLElement).closest(".dropdown-trigger")) {
      return
    }
    router.push(
      `/repositorio/${params.id}/components/${type}?theme=${currentTheme}&radius=${radius}&typography=${typography}`,
    )
  }

  const handleDeleteComponentType = async () => {
    if (!deleteType) return

    try {
      // Get all components of this type
      const componentsToDelete = components.filter((comp) => comp.component.type === deleteType)

      if (componentsToDelete.length === 0) {
        setDeleteType(null)
        return
      }

      // Delete all components of this type
      const { error } = await supabase
        .from("repository_components")
        .delete()
        .in(
          "id",
          componentsToDelete.map((comp) => comp.id),
        )

      if (error) throw error

      toast.success(`All ${deleteType} components deleted successfully`)
      fetchRepositoryAndComponents()
    } catch (error: any) {
      console.error("Error deleting components:", error)
      toast.error(error.message || "Failed to delete components")
    } finally {
      setDeleteType(null)
    }
  }

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme)
    // Save theme preference for this repository
    if (params.id) {
      localStorage.setItem(`repo-theme-${params.id}`, theme)
    }
  }

  const handleRadiusChange = (radius: ThemeRadius) => {
    setRadius(radius)
    // Save radius preference for this repository
    if (params.id) {
      localStorage.setItem(`repo-radius-${params.id}`, radius)
    }
  }

  const handleTypographyChange = (typography: Typography) => {
    setTypography(typography)
    // Save typography preference for this repository
    if (params.id) {
      localStorage.setItem(`repo-typography-${params.id}`, typography)
    }
  }

  const handleEditTypeName = async (typeId: string, newName: string) => {
    try {
      // Get all components of this type
      const componentsToUpdate = components.filter((comp) => comp.component.type === typeId)

      if (componentsToUpdate.length === 0) return

      // Update all components of this type to have the new type
      for (const comp of componentsToUpdate) {
        const updatedComponent = {
          ...comp.component,
          type: newName,
        }

        const { error } = await supabase
          .from("repository_components")
          .update({ component: updatedComponent })
          .eq("id", comp.id)

        if (error) throw error
      }

      toast.success(`Component type renamed to ${newName}`)
      fetchRepositoryAndComponents()
    } catch (error: any) {
      console.error("Error updating component type name:", error)
      toast.error(error.message || "Failed to update component type name")
    }
  }

  const handleViewThemeCode = () => {
    setIsCodeDialogOpen(true)
  }

  // Generate theme code for viewing with both light and dark mode
  const getThemeCode = () => {
    // Theme CSS variables based on the selected theme
    const themeVars = {
      zinc: {
        light: `    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: ${radius}rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;`,
        dark: `    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;`,
      },
      red: {
        light: `    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 0 72.2% 50.6%;
    --primary-foreground: 0 85.7% 97.3%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 72.2% 50.6%;
    --radius: ${radius}rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;`,
        dark: `    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 72.2% 50.6%;
    --primary-foreground: 0 85.7% 97.3%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 72.2% 50.6%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;`,
      },
      rose: {
        light: `    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 346.8 77.2% 49.8%;
    --primary-foreground: 355.7 100% 97.3%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 346.8 77.2% 49.8%;
    --radius: ${radius}rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;`,
        dark: `    --background: 20 14.3% 4.1%;
    --foreground: 0 0% 95%;
    --card: 24 9.8% 10%;
    --card-foreground: 0 0% 95%;
    --popover: 0 0% 9%;
    --popover-foreground: 0 0% 95%;
    --primary: 346.8 77.2% 49.8%;
    --primary-foreground: 355.7 100% 97.3%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 15%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 12 6.5% 15.1%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 346.8 77.2% 49.8%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;`,
      },
      orange: {
        light: `    --background: 0 0% 100%;
    --foreground: 20 14.3% 4.1%;
    --card: 0 0% 100%;
    --card-foreground: 20 14.3% 4.1%;
    --popover: 0 0% 100%;
    --popover-foreground: 20 14.3% 4.1%;
    --primary: 24.6 95% 53.1%;
    --primary-foreground: 60 9.1% 97.8%;
    --secondary: 60 4.8% 95.9%;
    --secondary-foreground: 24 9.8% 10%;
    --muted: 60 4.8% 95.9%;
    --muted-foreground: 25 5.3% 44.7%;
    --accent: 60 4.8% 95.9%;
    --accent-foreground: 24 9.8% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 60 9.1% 97.8%;
    --border: 20 5.9% 90%;
    --input: 20 5.9% 90%;
    --ring: 24.6 95% 53.1%;
    --radius: ${radius}rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;`,
        dark: `    --background: 20 14.3% 4.1%;
    --foreground: 60 9.1% 97.8%;
    --card: 20 14.3% 4.1%;
    --card-foreground: 60 9.1% 97.8%;
    --popover: 20 14.3% 4.1%;
    --popover-foreground: 60 9.1% 97.8%;
    --primary: 20.5 90.2% 48.2%;
    --primary-foreground: 60 9.1% 97.8%;
    --secondary: 12 6.5% 15.1%;
    --secondary-foreground: 60 9.1% 97.8%;
    --muted: 12 6.5% 15.1%;
    --muted-foreground: 24 5.4% 63.9%;
    --accent: 12 6.5% 15.1%;
    --accent-foreground: 60 9.1% 97.8%;
    --destructive: 0 72.2% 50.6%;
    --destructive-foreground: 60 9.1% 97.8%;
    --border: 12 6.5% 15.1%;
    --input: 12 6.5% 15.1%;
    --ring: 20.5 90.2% 48.2%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;`,
      },
      green: {
        light: `    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 142.1 76.2% 36.3%;
    --primary-foreground: 355.7 100% 97.3%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 142.1 76.2% 36.3%;
    --radius: ${radius}rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;`,
        dark: `    --background: 20 14.3% 4.1%;
    --foreground: 0 0% 95%;
    --card: 24 9.8% 10%;
    --card-foreground: 0 0% 95%;
    --popover: 0 0% 9%;
    --popover-foreground: 0 0% 95%;
    --primary: 142.1 70.6% 45.3%;
    --primary-foreground: 144.9 80.4% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 15%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 12 6.5% 15.1%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 142.4 71.8% 29.2%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;`,
      },
      blue: {
        light: `    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: ${radius}rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;`,
        dark: `    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;`,
      },
      yellow: {
        light: `    --background: 0 0% 100%;
    --foreground: 20 14.3% 4.1%;
    --card: 0 0% 100%;
    --card-foreground: 20 14.3% 4.1%;
    --popover: 0 0% 100%;
    --popover-foreground: 20 14.3% 4.1%;
    --primary: 47.9 95.8% 53.1%;
    --primary-foreground: 26 83.3% 14.1%;
    --secondary: 60 4.8% 95.9%;
    --secondary-foreground: 24 9.8% 10%;
    --muted: 60 4.8% 95.9%;
    --muted-foreground: 25 5.3% 44.7%;
    --accent: 60 4.8% 95.9%;
    --accent-foreground: 24 9.8% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 60 9.1% 97.8%;
    --border: 20 5.9% 90%;
    --input: 20 5.9% 90%;
    --ring: 47.9 95.8% 53.1%;
    --radius: ${radius}rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;`,
        dark: `    --background: 20 14.3% 4.1%;
    --foreground: 60 9.1% 97.8%;
    --card: 20 14.3% 4.1%;
    --card-foreground: 60 9.1% 97.8%;
    --popover: 20 14.3% 4.1%;
    --popover-foreground: 60 9.1% 97.8%;
    --primary: 47.9 95.8% 53.1%;
    --primary-foreground: 26 83.3% 14.1%;
    --secondary: 12 6.5% 15.1%;
    --secondary-foreground: 60 9.1% 97.8%;
    --muted: 12 6.5% 15.1%;
    --muted-foreground: 24 5.4% 63.9%;
    --accent: 12 6.5% 15.1%;
    --accent-foreground: 60 9.1% 97.8%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 60 9.1% 97.8%;
    --border: 12 6.5% 15.1%;
    --input: 12 6.5% 15.1%;
    --ring: 35.5 91.7% 32.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;`,
      },
      violet: {
        light: `    --background: 0 0% 100%;
    --foreground: 224 71.4% 4.1%;
    --card: 0 0% 100%;
    --card-foreground: 224 71.4% 4.1%;
    --popover: 0 0% 100%;
    --popover-foreground: 224 71.4% 4.1%;
    --primary: 262.1 83.3% 57.8%;
    --primary-foreground: 210 20% 98%;
    --secondary: 220 14.3% 95.9%;
    --secondary-foreground: 220.9 39.3% 11%;
    --muted: 220 14.3% 95.9%;
    --muted-foreground: 220 8.9% 46.1%;
    --accent: 220 14.3% 95.9%;
    --accent-foreground: 220.9 39.3% 11%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 20% 98%;
    --border: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: 262.1 83.3% 57.8%;
    --radius: ${radius}rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;`,
        dark: `    --background: 224 71.4% 4.1%;
    --foreground: 210 20% 98%;
    --card: 224 71.4% 4.1%;
    --card-foreground: 210 20% 98%;
    --popover: 224 71.4% 4.1%;
    --popover-foreground: 210 20% 98%;
    --primary: 263.4 70% 50.4%;
    --primary-foreground: 210 20% 98%;
    --secondary: 215 27.9% 16.9%;
    --secondary-foreground: 210 20% 98%;
    --muted: 215 27.9% 16.9%;
    --muted-foreground: 217.9 10.6% 64.9%;
    --accent: 215 27.9% 16.9%;
    --accent-foreground: 210 20% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 20% 98%;
    --border: 215 27.9% 16.9%;
    --input: 215 27.9% 16.9%;
    --ring: 263.4 70% 50.4%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;`,
      },
    }

    return `@layer base {
  :root {
${themeVars[currentTheme as keyof typeof themeVars]?.light || themeVars.blue.light}
  }

  .dark {
${themeVars[currentTheme as keyof typeof themeVars]?.dark || themeVars.blue.dark}
  }
}`
  }

  return (
    <div className="fixed inset-0 top-16 bg-background border-t border-zinc-100">
      <div className="grid h-full" style={{ gridTemplateColumns: "4rem 1fr" }}>
        {/* Sidebar */}
        <Sidebar initialSelectedIcon="folder" />

        {/* Main Content */}
        <div className="overflow-hidden">
          <div className="h-14 border-b border-border flex items-center px-4 justify-between">
            <div className="flex items-center">
              <nav className="flex items-center space-x-1 text-sm">
                <Button
                  variant="link"
                  className="p-0 h-auto font-medium text-muted-foreground"
                  onClick={() => router.push("/repositorio")}
                >
                  Repositories
                </Button>
                <span className="text-muted-foreground mx-1">/</span>
                <span className="font-medium">{isLoading ? "Loading..." : repository?.name}</span>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              {/* Theme Selector Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor:
                          themes[currentTheme as keyof typeof themes]?.activeColor || "hsl(240 5.9% 10%)",
                      }}
                    />
                    <Palette className="h-4 w-4 ml-1" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    {/* Color */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Color</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {Object.entries(themes).map(([key, theme]) => (
                          <Button
                            key={key}
                            variant="outline"
                            className={cn(
                              "justify-center gap-2 h-auto p-2",
                              currentTheme === key && "border-2 border-primary",
                            )}
                            onClick={() => handleThemeChange(key)}
                          >
                            <span className="h-4 w-4 rounded-full" style={{ backgroundColor: theme.activeColor }} />
                            {theme.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Radius */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Radius</Label>
                      <div className="grid grid-cols-5 gap-2">
                        {radiusOptions.map((r) => (
                          <Button
                            key={r.value}
                            variant="outline"
                            className={cn("h-auto p-2", radius === r.value && "border-2 border-primary")}
                            onClick={() => handleRadiusChange(r.value)}
                          >
                            {r.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Typography */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Typography</Label>
                      <Select value={typography} onValueChange={handleTypographyChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select font" />
                        </SelectTrigger>
                        <SelectContent>
                          {typographyOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* View Code Button */}
                    <Button variant="outline" className="w-full mt-4" onClick={handleViewThemeCode}>
                      <Code className="h-4 w-4" />
                      View Code
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              {/* New Component Button */}
              <Button size="sm" onClick={handleGoToPlayground}>
                <Plus className="h-4 w-4" />
                New Component
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="p-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
                  <p>Loading components...</p>
                </div>
              ) : componentTypes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {componentTypes.map((typeGroup) => (
                    <Card
                      key={typeGroup.type}
                      className="overflow-hidden cursor-pointer hover:border-primary/50 transition-colors relative"
                      onClick={(e) => handleViewComponentType(typeGroup.type, e)}
                    >
                      <div className="absolute top-2 right-2 z-10">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 dropdown-trigger"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation()
                                setDeleteType(typeGroup.type)
                              }}
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Delete All {typeGroup.type}s
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle
                            className="text-lg"
                            contentEditable
                            suppressContentEditableWarning
                            onFocus={() => setEditingTypeId(typeGroup.type)}
                            onBlur={(e) => {
                              const newName = e.currentTarget.textContent?.trim()
                              if (newName && newName !== typeGroup.type && editingTypeId === typeGroup.type) {
                                handleEditTypeName(typeGroup.type, newName)
                              }
                              setEditingTypeId(null)
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault()
                                e.currentTarget.blur()
                              }
                            }}
                            style={{ outline: "none" }}
                          >
                            {typeGroup.type}
                          </CardTitle>
                        </div>
                        <CardDescription className="text-sm">
                          {typeGroup.count === 1 ? "1 component" : `${typeGroup.count} components`}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <div className="bg-accent/20 rounded-md p-4 h-24 flex items-center justify-center">
                          <Component className="h-12 w-12 text-muted-foreground opacity-50" />
                        </div>
                      </CardContent>
                      <CardFooter className="p-2 flex justify-end border-t">
                        <div className="flex items-center text-sm text-muted-foreground">
                          View components
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)]">
                  <Folder className="h-[32px] w-[32px] text-muted-foreground mb-4" />
                  <h2 className="text-base font-semibold mb-2">No components in this repository</h2>
                  <p className="text-sm text-muted-foreground mb-4">Start building your component library</p>
                  <Button onClick={handleGoToPlayground}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Component
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Theme Code Dialog */}
      <Dialog open={isCodeDialogOpen} onOpenChange={setIsCodeDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Theme Code</DialogTitle>
          </DialogHeader>
          <div className="bg-[#101012] rounded-md overflow-hidden">
            <CodeViewer code={getThemeCode()} language="javascript" />
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteType} onOpenChange={(open) => !open && setDeleteType(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all {deleteType} components in this repository. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteComponentType}
              className="bg-destructive text-destructive-foreground"
            >
              Delete All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
