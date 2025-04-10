"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { Sidebar } from "@/components/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Code, MoreVertical, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PreviewComponent } from "@/components/PreviewComponent"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { generateComponentCode } from "@/utils/generateComponentCode"
import CodeViewer from "@/components/CodeViewer"
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

interface SavedComponent {
  id: string
  component: any
  components_data?: any[] // Nuevo campo para almacenar todos los componentes (padre e hijos)
  repository_id: string
  created_at: string
  name?: string
}

export default function ComponentTypePage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [components, setComponents] = useState<SavedComponent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedComponent, setSelectedComponent] = useState<SavedComponent | null>(null)
  const [isCodeDialogOpen, setIsCodeDialogOpen] = useState(false)
  const [generatedCode, setGeneratedCode] = useState("")
  const [deleteComponentId, setDeleteComponentId] = useState<string | null>(null)
  const [editingComponentId, setEditingComponentId] = useState<string | null>(null)
  const [repositoryName, setRepositoryName] = useState<string>("")

  // Get theme settings from URL or localStorage
  const theme = searchParams.get("theme") || localStorage.getItem(`repo-theme-${params.id}`) || "zinc"
  const radius = searchParams.get("radius") || localStorage.getItem(`repo-radius-${params.id}`) || "0.5"
  const typography = searchParams.get("typography") || localStorage.getItem(`repo-typography-${params.id}`) || "inter"

  const fetchRepositoryName = async () => {
    try {
      const repositoryId = params.id as string
      const { data, error } = await supabase.from("repositories").select("name").eq("id", repositoryId).single()

      if (error) throw error
      if (data) {
        setRepositoryName(data.name)
      }
    } catch (error: any) {
      console.error("Error fetching repository name:", error)
    }
  }

  const fetchComponents = async () => {
    setIsLoading(true)
    try {
      const repositoryId = params.id as string
      const componentType = params.type as string

      // Fetch components of this type in this repository
      const { data: componentsData, error: componentsError } = await supabase
        .from("repository_components")
        .select("*")
        .eq("repository_id", repositoryId)
        .order("created_at", { ascending: false })

      if (componentsError) {
        if (componentsError.message.includes("relation") && componentsError.message.includes("does not exist")) {
          toast.error("Database tables not set up. Please run the setup script.")
          console.error("Database tables not set up:", componentsError.message)
          return
        }
        throw componentsError
      }

      // Filter components by type
      const filteredComponents = componentsData?.filter((comp) => comp.component.type === componentType) || []

      setComponents(filteredComponents)
    } catch (error: any) {
      console.error("Error fetching components:", error)
      toast.error(error.message || "Failed to load components")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (params.id && params.type) {
      fetchRepositoryName()
      fetchComponents()
    }
  }, [params.id, params.type])

  const handleGoToPlayground = () => {
    router.push(`/playground?repository=${params.id}&theme=${theme}&radius=${radius}&typography=${typography}`)
  }

  const handleViewCode = (component: SavedComponent, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedComponent(component)
    try {
      // Si tenemos components_data, usamos todos los componentes para generar el código
      const componentsToUse =
        component.components_data && component.components_data.length > 0
          ? component.components_data
          : [component.component]

      // El primer componente es el componente principal
      const mainComponent = componentsToUse[0]

      // Generamos el código usando todos los componentes disponibles
      const { imports, componentCode } = generateComponentCode([mainComponent], componentsToUse)
      setGeneratedCode(`${Array.from(imports).join("\n")}\n${componentCode}`)
      setIsCodeDialogOpen(true)
    } catch (error) {
      console.error("Error generating code:", error)
      toast.error("Failed to generate code")
    }
  }

  const handleBackToRepository = () => {
    router.push(`/repositorio/${params.id}`)
  }

  const handleDeleteComponent = async () => {
    if (!deleteComponentId) return

    try {
      const { error } = await supabase.from("repository_components").delete().eq("id", deleteComponentId)

      if (error) throw error

      toast.success("Component deleted successfully")
      fetchComponents()
    } catch (error: any) {
      console.error("Error deleting component:", error)
      toast.error(error.message || "Failed to delete component")
    } finally {
      setDeleteComponentId(null)
    }
  }

  const handleEditName = async (componentId: string, newName: string) => {
    try {
      const { error } = await supabase.from("repository_components").update({ name: newName }).eq("id", componentId)

      if (error) throw error

      // Update local state
      setComponents(components.map((comp) => (comp.id === componentId ? { ...comp, name: newName } : comp)))

      toast.success("Component name updated")
    } catch (error: any) {
      console.error("Error updating component name:", error)
      toast.error(error.message || "Failed to update component name")
    }
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
                <button
                  onClick={() => router.push("/repositorio")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Repositories
                </button>
                <span className="text-muted-foreground mx-1">/</span>
                <button
                  onClick={handleBackToRepository}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {repositoryName || "Loading..."}
                </button>
                <span className="text-muted-foreground mx-1">/</span>
                <span className="font-medium">{params.type}</span>
              </nav>
            </div>
            <Button size="sm" onClick={handleGoToPlayground}>
              <Plus className="h-4 w-4 mr-2" />
              New {params.type}
            </Button>
          </div>

          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="p-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
                  <p>Loading components...</p>
                </div>
              ) : components.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {components.map((comp, index) => (
                    <Card key={comp.id} className="overflow-hidden relative">
                      <div className="absolute top-2 right-2 z-10">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={(e) => handleViewCode(comp, e)}>
                              <Code className="h-4 w-4 mr-2" />
                              View Code
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => setDeleteComponentId(comp.id)}
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle
                          className="text-sm font-medium"
                          contentEditable
                          suppressContentEditableWarning
                          onFocus={() => setEditingComponentId(comp.id)}
                          onBlur={(e) => {
                            const newName = e.currentTarget.textContent?.trim()
                            if (newName && newName !== comp.name && editingComponentId === comp.id) {
                              handleEditName(comp.id, newName)
                            }
                            setEditingComponentId(null)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              e.currentTarget.blur()
                            }
                          }}
                          style={{ outline: "none" }}
                        >
                          {comp.name || `${params.type}${index + 1}`}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <div className="bg-accent/30 rounded-md p-4 flex items-center justify-center">
                          {/* Usar los componentes anidados si están disponibles */}
                          {comp.components_data && comp.components_data.length > 0 ? (
                            <PreviewComponent
                              component={comp.components_data[0]} // El primer componente es el principal
                              theme={theme}
                              radius={radius}
                              mode="light"
                              typography={typography}
                              nestedComponents={comp.components_data.slice(1)} // El resto son los hijos
                              onSelectComponent={() => {}}
                            />
                          ) : (
                            <PreviewComponent
                              component={comp.component}
                              theme={theme}
                              radius={radius}
                              mode="light"
                              typography={typography}
                              nestedComponents={[]}
                              onSelectComponent={() => {}}
                            />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)]">
                  <h2 className="text-base font-semibold mb-2">No {params.type} components found</h2>
                  <p className="text-sm text-muted-foreground mb-4">Create your first {params.type} component</p>
                  <Button onClick={handleGoToPlayground}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create {params.type}
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Code Dialog */}
      <Dialog open={isCodeDialogOpen} onOpenChange={setIsCodeDialogOpen}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>
              {selectedComponent?.name ||
                (selectedComponent?.component?.type &&
                  `${selectedComponent.component.type}${components.indexOf(selectedComponent) + 1}`)}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto bg-[#101012] rounded-md">
            <CodeViewer code={generatedCode} language="jsx" />
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteComponentId} onOpenChange={(open) => !open && setDeleteComponentId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this component. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteComponent} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
