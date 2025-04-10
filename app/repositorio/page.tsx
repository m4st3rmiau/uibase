"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { Sidebar } from "@/components/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FolderPlus, Plus, ArrowRight, MoreVertical, Copy, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CreateRepositoryDialog } from "@/components/CreateRepositoryDialog"
import { useRouter } from "next/navigation"
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
import { LoginModal } from "@/components/LoginModal"

interface Repository {
  id: string
  name: string
  description: string
  created_at: string
  user_id: string
}

export default function RepositorioPage() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [deleteRepositoryId, setDeleteRepositoryId] = useState<string | null>(null)
  const [isDuplicating, setIsDuplicating] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const fetchRepositories = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data: userData } = await supabase.auth.getUser()
      if (userData.user) {
        setUser(userData.user)

        // Check if repositories table exists by trying to query it
        const { data, error } = await supabase
          .from("repositories")
          .select("*")
          .eq("user_id", userData.user.id)
          .order("created_at", { ascending: false })

        if (error) {
          // If error contains "relation does not exist", show a specific message
          if (error.message.includes("relation") && error.message.includes("does not exist")) {
            toast.error("Database tables not set up. Please run the setup script.")
            console.error("Database tables not set up:", error.message)
          } else {
            throw error
          }
        } else {
          setRepositories(data || [])
        }
      }
    } catch (error: any) {
      console.error("Error fetching repositories:", error)
      toast.error(error.message || "Failed to load repositories")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRepositories()
  }, [fetchRepositories])

  const handleRepositoryClick = (repositoryId: string) => {
    router.push(`/repositorio/${repositoryId}`)
  }

  const handleDeleteRepository = async () => {
    if (!deleteRepositoryId) return

    try {
      // First delete all components in this repository
      const { error: componentsError } = await supabase
        .from("repository_components")
        .delete()
        .eq("repository_id", deleteRepositoryId)

      if (componentsError) throw componentsError

      // Then delete the repository
      const { error } = await supabase.from("repositories").delete().eq("id", deleteRepositoryId)

      if (error) throw error

      toast.success("Repository deleted successfully")
      fetchRepositories()
    } catch (error: any) {
      console.error("Error deleting repository:", error)
      toast.error(error.message || "Failed to delete repository")
    } finally {
      setDeleteRepositoryId(null)
    }
  }

  const handleDuplicateRepository = async (repository: Repository) => {
    if (isDuplicating) return

    setIsDuplicating(true)
    try {
      // Get current user
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) {
        throw new Error("User not authenticated")
      }

      // Create a new repository with the same name and description
      const { data: newRepo, error } = await supabase
        .from("repositories")
        .insert({
          name: `${repository.name} (Copy)`,
          description: repository.description,
          user_id: userData.user.id,
        })
        .select()
        .single()

      if (error) throw error

      // Get all components from the original repository
      const { data: components, error: componentsError } = await supabase
        .from("repository_components")
        .select("*")
        .eq("repository_id", repository.id)

      if (componentsError) throw componentsError

      // If there are components, duplicate them to the new repository
      if (components && components.length > 0) {
        // Prepare components with the current user's ID
        const newComponents = components.map((comp) => ({
          component: comp.component,
          repository_id: newRepo.id,
          name: comp.name,
          user_id: userData.user.id, // Explicitly set the user_id
        }))

        // Insert components in batches to avoid potential size limitations
        const batchSize = 10
        for (let i = 0; i < newComponents.length; i += batchSize) {
          const batch = newComponents.slice(i, i + batchSize)
          const { error: insertError } = await supabase.from("repository_components").insert(batch)

          if (insertError) {
            console.error("Error inserting components batch:", insertError)
            throw insertError
          }
        }
      }

      toast.success("Repository duplicated successfully")
      await fetchRepositories()

      // Navigate to the new repository
      router.push(`/repositorio/${newRepo.id}`)
    } catch (error: any) {
      console.error("Error duplicating repository:", error)
      toast.error(error.message || "Failed to duplicate repository")
    } finally {
      setIsDuplicating(false)
    }
  }

  const handleCreateRepositoryClick = () => {
    if (!user) {
      setIsLoginModalOpen(true)
    } else {
      setIsDialogOpen(true)
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
            <h1 className="text-sm font-medium">Repositories</h1>
            <Button size="sm" onClick={handleCreateRepositoryClick}>
              <Plus className="h-4 w-4" />
              New Repository
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="p-4 space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
                  <p>Loading repositories...</p>
                </div>
              ) : repositories.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {repositories.map((repo) => (
                    <Card key={repo.id} className="cursor-pointer hover:border-primary/50 transition-colors relative">
                      <div className="absolute top-2 right-2 z-10">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDuplicateRepository(repo)
                              }}
                              disabled={isDuplicating}
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              {isDuplicating ? "Duplicating..." : "Duplicate"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation()
                                setDeleteRepositoryId(repo.id)
                              }}
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div onClick={() => handleRepositoryClick(repo.id)}>
                        <CardHeader>
                          <CardTitle>{repo.name}</CardTitle>
                          {repo.description && <CardDescription>{repo.description}</CardDescription>}
                        </CardHeader>
                        <CardContent className="flex justify-between items-center">
                          <div className="text-sm text-muted-foreground">
                            Created {new Date(repo.created_at).toLocaleDateString()}
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)]">
                  <FolderPlus className="h-[32px] w-[32px] text-muted-foreground mb-4" />
                  <h2 className="text-base font-semibold mb-2">No repositories found</h2>
                  <p className="text-sm text-muted-foreground mb-4">Get started by creating a new repository</p>
                  <Button onClick={handleCreateRepositoryClick}>
                    <Plus className="h-4 w-4" />
                    Create Repository
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
      <CreateRepositoryDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onRepositoryCreated={fetchRepositories}
      />
      <AlertDialog open={!!deleteRepositoryId} onOpenChange={(open) => !open && setDeleteRepositoryId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this repository and all its components. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRepository} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={() => {
          setIsLoginModalOpen(false)
          fetchRepositories()
        }}
      />
    </div>
  )
}
