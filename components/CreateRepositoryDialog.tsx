"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

interface CreateRepositoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onRepositoryCreated?: () => void
}

export function CreateRepositoryDialog({ open, onOpenChange, onRepositoryCreated }: CreateRepositoryDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error("Repository name is required")
      return
    }

    setIsLoading(true)

    try {
      const { data: userData } = await supabase.auth.getUser()

      if (!userData.user) {
        toast.error("You must be logged in to create a repository")
        return
      }

      const { data, error } = await supabase
        .from("repositories")
        .insert({
          name,
          description,
          user_id: userData.user.id,
        })
        .select()

      if (error) throw error

      toast.success("Repository created successfully")
      onOpenChange(false)
      setName("")
      setDescription("")

      if (onRepositoryCreated) {
        onRepositoryCreated()
      }
    } catch (error: any) {
      console.error("Error creating repository:", error)
      toast.error(error.message || "Failed to create repository")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Repository</DialogTitle>
            <DialogDescription>Create a new repository to store and organize your components.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="My Repository"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Optional description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Repository"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
