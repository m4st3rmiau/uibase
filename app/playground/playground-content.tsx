"use client"

import { useState, useCallback, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Copy, PlusCircle, ChevronRight, Code } from "lucide-react"
import { componentConfig } from "@/config/componentConfig"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { COMPONENTS } from "./component-list"
import { toast } from "sonner"
import { generateComponentCode, generateInstallCommands } from "@/utils/generateComponentCode"
import CodeViewer from "@/components/CodeViewer"
import { LoginModal } from "@/components/LoginModal"
import { supabase } from "@/lib/supabase"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ButtonConfigPanel } from "@/components/config-panels/ButtonConfigPanel"
import { InputConfigPanel } from "@/components/config-panels/InputConfigPanel"
import { ToggleControlsConfigPanel } from "@/components/config-panels/ToggleControlsConfigPanel"
import { SelectConfigPanel } from "@/components/config-panels/SelectConfigPanel"
import { PasswordConfigPanel } from "@/components/config-panels/PasswordConfigPanel"
import { InputOTPConfigPanel } from "@/components/config-panels/InputOTPConfigPanel"
import { UploaderConfigPanel } from "@/components/config-panels/UploaderConfigPanel"
import { DatePickerConfigPanel } from "@/components/config-panels/DatePickerConfigPanel"
import { SliderConfigPanel } from "@/components/config-panels/SliderConfigPanel"
import { TextareaConfigPanel } from "@/components/config-panels/TextareaConfigPanel"
import { Sidebar } from "@/components/sidebar"
import { InstallationSteps } from "./installation-steps"
import { AccordionConfigPanel } from "@/components/config-panels/AccordionConfigPanel"
import { AlertConfigPanel } from "@/components/config-panels/AlertConfigPanel"
import { AlertDialogConfigPanel } from "@/components/config-panels/AlertDialogConfigPanel"
import { AspectRatioConfigPanel } from "@/components/config-panels/AspectRatioConfigPanel"
import { AvatarConfigPanel } from "@/components/config-panels/AvatarConfigPanel"
import { BadgeConfigPanel } from "@/components/config-panels/BadgeConfigPanel"
import { BreadcrumbConfigPanel } from "@/components/config-panels/BreadcrumbConfigPanel"
import { CalendarConfigPanel } from "@/components/config-panels/CalendarConfigPanel"
import { CardConfigPanel } from "@/components/config-panels/CardConfigPanel"
import { CarouselConfigPanel } from "@/components/config-panels/CarouselConfigPanel"
import { CollapsibleConfigPanel } from "@/components/config-panels/CollapsibleConfigPanel"
import { ComboboxConfigPanel } from "@/components/config-panels/ComboboxConfigPanel"
import { CommandConfigPanel } from "@/components/config-panels/CommandConfigPanel"
import { ContextMenuConfigPanel } from "@/components/config-panels/ContextMenuConfigPanel"
import { DataTableConfigPanel } from "@/components/config-panels/DataTableConfigPanel"
import { DialogConfigPanel } from "@/components/config-panels/DialogConfigPanel"
import { DrawerConfigPanel } from "@/components/config-panels/DrawerConfigPanel"
import { DropdownMenuConfigPanel } from "@/components/config-panels/DropdownMenuConfigPanel"
import { FormConfigPanel } from "@/components/config-panels/FormConfigPanel"
import { HoverCardConfigPanel } from "@/components/config-panels/HoverCardConfigPanel"
import { NavigationMenuConfigPanel } from "@/components/config-panels/NavigationMenuConfigPanel"
import { PaginationConfigPanel } from "@/components/config-panels/PaginationConfigPanel"
import { PopoverConfigPanel } from "@/components/config-panels/PopoverConfigPanel"
import { ProgressConfigPanel } from "@/components/config-panels/ProgressConfigPanel"
import { ScrollAreaConfigPanel } from "@/components/config-panels/ScrollAreaConfigPanel"
import { SeparatorConfigPanel } from "@/components/config-panels/SeparatorConfigPanel"
import { SheetConfigPanel } from "@/components/config-panels/SheetConfigPanel"
import { SkeletonConfigPanel } from "@/components/config-panels/SkeletonConfigPanel"
import { TabsConfigPanel } from "@/components/config-panels/TabsConfigPanel"
import { TooltipConfigPanel } from "@/components/config-panels/TooltipConfigPanel"
import { ToggleConfigPanel } from "@/components/config-panels/ToggleConfigPanel"
import { ToastConfigPanel } from "@/components/config-panels/ToastConfigPanel"
import { ToggleGroupConfigPanel } from "@/components/config-panels/ToggleGroupConfigPanel"
import { StylesPanel } from "./styles-panel"
import type { ThemeRadius } from "@/lib/themes"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { DraggableComponent } from "@/components/DraggableComponent"
import { PreviewArea } from "@/components/PreviewArea"
import type { Typography } from "@/lib/themes"
import { PreviewComponent } from "@/components/PreviewComponent"
import { ComponentSelectionDialog } from "@/components/ComponentSelectionDialog"
import { ContainerConfigPanel } from "@/components/config-panels/ContainerConfigPanel"
import { themes } from "@/constants/themes"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Component {
  id: string
  type: string
  props: Record<string, any>
  position?: { x: number; y: number }
  parentId?: string
  itemIndex?: number
}

const handleAddComponent = (type: string, isMobile: boolean, parentId?: string, itemIndex?: number) => {
  const newComponent = {
    id: `${type}-${Date.now()}`,
    type,
    props: componentConfig[type as keyof typeof componentConfig]?.defaultProps || {},
    parentId,
    itemIndex,
  }
  return newComponent
}

const handleComponentPropChange = (prevComponent: Component, updatedProps: Record<string, any>) => {
  return { ...prevComponent, props: updatedProps }
}

export function PlaygroundContent() {
  const [activeComponent, setActiveComponent] = useState<Component | null>(null)
  const [activeTab, setActiveTab] = useState("preview")
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const repositoryId = searchParams.get("repository")
  const isMobile = useMediaQuery("(max-width: 640px)")
  const [user, setUser] = useState<any>(null)
  const [activeComponentTab, setActiveComponentTab] = useState("components")
  const [theme, setTheme] = useState("zinc")
  const [radius, setRadius] = useState<ThemeRadius>("0.5")
  const [typography, setTypography] = useState<Typography>("inter")
  const [components, setComponents] = useState<Component[]>([])
  const [isComponentDialogOpen, setIsComponentDialogOpen] = useState(false)
  const [pendingParentId, setPendingParentId] = useState<string | null>(null)
  const [pendingItemIndex, setPendingItemIndex] = useState<number | undefined>(undefined)
  const [repositories, setRepositories] = useState<Array<{ id: string; name: string }>>([])
  const [selectedRepositoryId, setSelectedRepositoryId] = useState<string | null>(null)

  const generateCode = useCallback(
    (activeComponent: Component | null) => {
      if (!activeComponent) return ""
      try {
        // Si el componente tiene un parentId, encontrar el componente padre
        let componentToRender = activeComponent
        if (activeComponent.parentId) {
          const parentComponent = components.find((comp) => comp.id === activeComponent.parentId)
          if (parentComponent) {
            componentToRender = parentComponent
          }
        }

        // Generar el código usando todos los componentes disponibles
        // Esto permite que la función generateComponentCode tenga acceso a todos los componentes
        // para poder encontrar los componentes hijos
        const { imports, componentCode } = generateComponentCode([componentToRender], components)
        return `${Array.from(imports).join("\n")}\n${componentCode}`
      } catch (error) {
        console.error("Error generating code:", error)
        toast.error("Failed to generate code. Please try again.")
        return ""
      }
    },
    [components],
  )

  const getInstallCommands = useCallback(
    (activeComponent: Component | null) => {
      if (!activeComponent) return "No components selected"
      try {
        // If the component has a parentId, find the parent component instead
        let componentToRender = activeComponent
        if (activeComponent.parentId) {
          const parentComponent = components.find((comp) => comp.id === activeComponent.parentId)
          if (parentComponent) {
            componentToRender = parentComponent
          }
        }

        const { shadcnComponents } = generateComponentCode([componentToRender])
        if (shadcnComponents.size === 0) {
          return "No additional components need to be installed"
        }
        return generateInstallCommands(shadcnComponents)
      } catch (error) {
        console.error("Error generating install commands:", error)
        return "Failed to generate install commands. Please try again."
      }
    },
    [components],
  )

  const getInstallationSteps = useCallback(
    (activeComponent: Component | null) => [
      {
        title: "Create Next.js Project",
        description: "Start by creating a new Next.js project:",
        code: "npx create-next-app@latest my-app",
        language: "bash",
      },
      {
        title: "Install shadcn/ui CLI",
        description: "Install and initialize shadcn/ui in your project:",
        code: "npx shadcn@latest init",
        language: "bash",
      },
      {
        title: "Install Dependencies",
        description: "Install the required dependencies for the components:",
        code: activeComponent ? getInstallCommands(activeComponent) : "No components added yet",
        language: "bash",
      },
      {
        title: "Import Components",
        description:
          "Import and use the components in your React application. Each component is fully typed and self-contained. See example below.",
        code: `import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}`,
        language: "tsx",
      },
      {
        title: "Start Development",
        description: "Start the development server:",
        code: "npm run dev",
        language: "bash",
      },
    ],
    [getInstallCommands],
  )

  const addComponent = useCallback(
    (type: string) => {
      const newComponent = handleAddComponent(type, isMobile)
      setComponents((prev) => [...prev, newComponent])
      setActiveComponent(newComponent)

      if (isMobile) {
        toast.success(`${type} added`, {
          description: "Swipe to the Builder tab to edit your component.",
          duration: 3000,
        })
      }
    },
    [isMobile],
  )

  const updateComponentProps = useCallback((updatedProps: Record<string, any>) => {
    setActiveComponent((prev) => {
      if (!prev) return null
      const updated = { ...prev, props: { ...prev.props, ...updatedProps } }
      setComponents((prevComponents) => prevComponents.map((comp) => (comp.id === updated.id ? updated : comp)))
      return updated
    })
  }, [])

  const handleDrop = useCallback(
    (item: any) => {
      const newComponent = handleAddComponent(item.type, false)
      setComponents((prevComponents) => [...prevComponents, newComponent])
      setActiveComponent(newComponent)

      // Asegurarse de que el tema se aplique inmediatamente
      const previewContainer = document.querySelector(".preview-area")
      if (previewContainer) {
        const themeElements = previewContainer.querySelectorAll('[class*="theme-"]')
        themeElements.forEach((element) => {
          if (element instanceof HTMLElement) {
            element.classList.add(`theme-${theme}`)
            element.style.setProperty("--radius", `${radius}rem`)

            // Aplicar variables CSS del tema seleccionado
            const selectedTheme = themes[theme as keyof typeof themes]
            if (selectedTheme && selectedTheme.cssVars) {
              Object.entries(selectedTheme.cssVars).forEach(([key, value]) => {
                element.style.setProperty(key, value as string)
              })
            }
          }
        })
      }
    },
    [theme, radius, themes],
  )

  const handleSelectComponent = useCallback((component: Component | null) => {
    setActiveComponent(component)
  }, [])

  const handleDeleteComponent = useCallback(
    (componentId: string) => {
      // Get all descendant components (nested components)
      const getDescendantIds = (id: string): string[] => {
        const directChildren = components.filter((c) => c.parentId === id)
        const childrenIds = directChildren.map((c) => c.id)
        const descendantIds = childrenIds.flatMap((childId) => getDescendantIds(childId))
        return [...childrenIds, ...descendantIds]
      }

      const descendantIds = getDescendantIds(componentId)
      const idsToRemove = [componentId, ...descendantIds]

      setComponents((prevComponents) => prevComponents.filter((comp) => !idsToRemove.includes(comp.id)))

      if (activeComponent && idsToRemove.includes(activeComponent.id)) {
        setActiveComponent(null)
      }
    },
    [activeComponent, components],
  )

  const ComponentListScrollArea = useMemo(
    () => (
      <ScrollArea className="h-[calc(100vh-4rem)] bg-background">
        <div className="p-4">
          <Tabs value={activeComponentTab} onValueChange={setActiveComponentTab} className="w-full">
            <TabsContent value="components" className="mt-0">
              {COMPONENTS.map((component) => (
                <DraggableComponent
                  key={component.name}
                  name={component.name}
                  type={component.name}
                  onDrop={handleDrop}
                  className="border border-zinc-100 shadow-none mb-2 p-2 rounded"
                />
              ))}
            </TabsContent>
            <TabsContent value="modules" className="mt-0">
              <div className="space-y-4">
                <div className="text-sm font-medium text-muted-foreground mb-2">Featured Modules</div>
                {[
                  { name: "Authentication", description: "User sign-up and login flow" },
                  { name: "Dashboard", description: "Admin dashboard layout with sidebar" },
                  { name: "E-commerce", description: "Product listing and cart functionality" },
                  { name: "Blog", description: "Blog post listing and single post view" },
                ].map((module, index) => (
                  <Card
                    key={index}
                    className="p-4 hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer border border-border"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">{module.name}</h3>
                        <p className="text-sm text-muted-foreground">{module.description}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </Card>
                ))}
                <Button
                  className="w-full border-border dark:border-border hover:bg-accent hover:text-accent-foreground"
                  variant="outline"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Custom Module
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="styles" className="mt-0">
              <div>
                <StylesPanel onThemeChange={setTheme} onRadiusChange={setRadius} onTypographyChange={setTypography} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    ),
    [activeComponentTab, handleDrop, setTheme, setRadius, setTypography],
  )

  const addNestedComponent = useCallback((parentId: string, itemIndex?: number) => {
    setPendingParentId(parentId)
    setPendingItemIndex(itemIndex)
    setIsComponentDialogOpen(true)
  }, [])

  const handleSelectNestedComponent = useCallback(
    (componentType: string) => {
      if (pendingParentId) {
        const newComponent = handleAddComponent(componentType, isMobile, pendingParentId, pendingItemIndex)
        setComponents((prev) => [...prev, newComponent])
        setActiveComponent(newComponent)
        setPendingParentId(null)
        setPendingItemIndex(undefined)
      }
    },
    [pendingParentId, pendingItemIndex, isMobile],
  )

  const ConfigPanel = useMemo(() => {
    if (!activeComponent) return null

    switch (activeComponent.type) {
      case "Button":
        return <ButtonConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Input":
        return <InputConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Checkbox":
      case "Radio Group":
      case "Switch":
        return (
          <ToggleControlsConfigPanel
            props={activeComponent.props}
            onChange={updateComponentProps}
            type={activeComponent.type}
          />
        )
      case "Select":
        return <SelectConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Textarea":
        return <TextareaConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Password":
        return <PasswordConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Input OTP":
        return <InputOTPConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Uploader":
        return <UploaderConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Date Picker":
        return <DatePickerConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Slider":
        return <SliderConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Accordion":
        return (
          <AccordionConfigPanel
            props={activeComponent.props}
            onChange={updateComponentProps}
            onAddNestedComponent={(itemIndex) => addNestedComponent(activeComponent.id, itemIndex)}
          />
        )
      case "Card":
        return (
          <CardConfigPanel
            props={activeComponent.props}
            onChange={updateComponentProps}
            onAddNestedComponent={() => addNestedComponent(activeComponent.id)}
          />
        )
      case "Alert":
        return <AlertConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Alert Dialog":
        return <AlertDialogConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Aspect Ratio":
        return <AspectRatioConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Avatar":
        return <AvatarConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Badge":
        return <BadgeConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Breadcrumb":
        return <BreadcrumbConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Calendar":
        return <CalendarConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Carousel":
        return <CarouselConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Collapsible":
        return <CollapsibleConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Combobox":
        return <ComboboxConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Command":
        return <CommandConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Context Menu":
        return <ContextMenuConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Data Table":
        return <DataTableConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Dialog":
        return (
          <DialogConfigPanel
            props={activeComponent.props}
            onChange={updateComponentProps}
            onAddNestedComponent={() => addNestedComponent(activeComponent.id)}
          />
        )
      case "Drawer":
        return <DrawerConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Dropdown Menu":
        return <DropdownMenuConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Form":
        return <FormConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Hover Card":
        return <HoverCardConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Navigation Menu":
        return <NavigationMenuConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Pagination":
        return <PaginationConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Popover":
        return <PopoverConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Progress":
        return <ProgressConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Scroll Area":
        return <ScrollAreaConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Separator":
        return <SeparatorConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Sheet":
        return <SheetConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Skeleton":
        return <SkeletonConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Tabs":
        return <TabsConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Tooltip":
        return <TooltipConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Toggle":
        return <ToggleConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Toast":
        return <ToastConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Toggle Group":
        return <ToggleGroupConfigPanel props={activeComponent.props} onChange={updateComponentProps} />
      case "Container":
        return (
          <ContainerConfigPanel
            props={activeComponent.props}
            onChange={updateComponentProps}
            onAddNestedComponent={() => addNestedComponent(activeComponent.id)}
          />
        )
      default:
        return null
    }
  }, [activeComponent, updateComponentProps, addNestedComponent])

  const PreviewScrollArea = useMemo(
    () => (
      <div className="h-[calc(100vh-3rem)]">
        <div className="h-[calc(100vh-3rem)] relative">
          <PreviewArea
            onDrop={handleDrop}
            components={components}
            onSelectComponent={handleSelectComponent}
            selectedComponent={activeComponent}
            theme={theme}
            radius={radius}
            typography={typography}
            onDeleteComponent={handleDeleteComponent}
            configPanel={ConfigPanel}
            onAddNestedComponent={addNestedComponent}
          />
        </div>
      </div>
    ),
    [
      components,
      activeComponent,
      theme,
      radius,
      typography,
      handleDrop,
      handleSelectComponent,
      handleDeleteComponent,
      ConfigPanel,
      addNestedComponent,
    ],
  )

  const renderComponent = useCallback(
    (component: Component) => {
      const nestedComponents = components.filter((c) => c.parentId === component.id)

      return (
        /* Asegúrate de que esta parte del código pase los props de tema */
        <PreviewComponent
          component={component}
          theme={theme}
          radius={radius}
          mode="light"
          typography={typography}
          onAddNestedComponent={(parentId, itemIndex) => {
            // This would open a component selection dialog
            // For now, we'll just add a Button component
            addNestedComponent(parentId, itemIndex)
          }}
          nestedComponents={components}
          onSelectComponent={handleSelectComponent}
        />
      )
    },
    [components, theme, radius, typography, addNestedComponent, handleSelectComponent],
  )

  const loginModal = useMemo(
    () => (
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={() => {
          setIsAuthenticated(true)
          setIsLoginModalOpen(false)
        }}
      />
    ),
    [isLoginModalOpen],
  )

  useEffect(() => {
    const handleLogout = () => {
      const newComponent = {
        id: `Button-${Date.now()}`,
        type: "Button",
        props: componentConfig.Button.defaultProps,
      }
      setActiveComponent(newComponent)
      setComponents([newComponent])
      if (typeof window !== "undefined") {
        localStorage.removeItem("builderComponents")
        localStorage.removeItem("activeComponentId")
      }
    }

    window.addEventListener("logout", handleLogout)

    return () => {
      window.removeEventListener("logout", handleLogout)
    }
  }, [])

  const handleCopyCode = useCallback(() => {
    if (!activeComponent) {
      toast.error("No component selected")
      return
    }

    const code = generateCode(activeComponent)
    navigator.clipboard.writeText(code).then(
      () => {
        toast.success("Code copied to clipboard")
      },
      (err) => {
        console.error("Could not copy text: ", err)
        toast.error("Failed to copy code. Please try again.")
      },
    )
  }, [activeComponent, generateCode])

  useEffect(() => {
    // Guardar todos los componentes en localStorage cada vez que cambian
    if (typeof window !== "undefined" && components.length > 0) {
      console.log("Guardando componentes en localStorage:", components)
      localStorage.setItem("builderComponents", JSON.stringify(components))

      // También guardar el componente activo por separado
      if (activeComponent) {
        localStorage.setItem("activeComponentId", activeComponent.id)
      }
    }
  }, [components, activeComponent])

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        // Cargar componentes guardados
        const savedComponentsString = localStorage.getItem("builderComponents")
        console.log("Componentes guardados en localStorage:", savedComponentsString)

        if (savedComponentsString) {
          const savedComponents = JSON.parse(savedComponentsString)
          console.log("Componentes parseados:", savedComponents)

          if (Array.isArray(savedComponents) && savedComponents.length > 0) {
            setComponents(savedComponents)

            // Restaurar el componente activo
            const activeComponentId = localStorage.getItem("activeComponentId")
            if (activeComponentId) {
              const foundComponent = savedComponents.find((comp) => comp.id === activeComponentId)
              if (foundComponent) {
                setActiveComponent(foundComponent)
              } else {
                // Si no se encuentra el componente activo, usar el primero
                setActiveComponent(savedComponents[0])
              }
            } else {
              // Si no hay ID guardado, usar el primer componente
              setActiveComponent(savedComponents[0])
            }
          }
        }
      } catch (error) {
        console.error("Error al cargar componentes desde localStorage:", error)
      }
    }
  }, [])

  useEffect(() => {
    const checkAuthAndLoadComponents = async () => {
      setLoading(true)
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setIsAuthenticated(!!session)

        if (session) {
          // Verificar si ya hay componentes en localStorage antes de cargar desde Supabase
          const hasLocalComponents = localStorage.getItem("builderComponents") !== null

          if (!hasLocalComponents) {
            const { data, error } = await supabase.from("user_components").select("components").single()
            if (error) throw error
            if (data && data.components && data.components.length > 0) {
              setActiveComponent(data.components[0])
              setComponents(data.components)
            }
          }
        }
      } catch (error) {
        console.error("Error checking auth or loading components:", error)
        toast.error("Error loading components")
      } finally {
        setLoading(false)
      }
    }

    checkAuthAndLoadComponents()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setIsAuthenticated(true)
      } else if (event === "SIGNED_OUT") {
        setIsAuthenticated(false)
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    const saveComponents = async () => {
      if (isAuthenticated && activeComponent && user?.id) {
        try {
          const { error } = await supabase.from("user_components").upsert({ user_id: user.id, components: components })
          if (error) throw error
        } catch (error) {
          console.error("Error saving components:", error)
          toast.error("Failed to save components")
        }
      }
    }

    saveComponents()
  }, [activeComponent, components, isAuthenticated, user?.id])

  const handleSaveComponent = async () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true)
      return
    }

    if (!activeComponent) {
      toast.error("No component to save")
      return
    }

    // Get repository ID from URL query parameter or selected repository
    const targetRepositoryId = repositoryId || selectedRepositoryId

    if (!targetRepositoryId) {
      toast.error("No repository selected")
      return
    }

    try {
      const { data: user_data } = await supabase.auth.getUser()
      if (user_data.user?.id) {
        // Get existing components of the same type to determine the next number
        const { data: existingComponents, error: fetchError } = await supabase
          .from("repository_components")
          .select("*")
          .eq("repository_id", targetRepositoryId)
          .eq("user_id", user_data.user.id)

        if (fetchError) throw fetchError

        // Determine if we need to save the parent component instead
        let rootComponentId = activeComponent.id

        // If the active component has a parent, find the root parent
        if (activeComponent.parentId) {
          let currentParentId = activeComponent.parentId
          let parentComponent

          // Keep looking up the hierarchy until we find the topmost parent
          while (currentParentId) {
            parentComponent = components.find((comp) => comp.id === currentParentId)
            if (parentComponent && parentComponent.parentId) {
              currentParentId = parentComponent.parentId
            } else {
              rootComponentId = currentParentId
              break
            }
          }
        }

        // Find the root component
        const rootComponent = components.find((comp) => comp.id === rootComponentId)
        if (!rootComponent) {
          throw new Error("Root component not found")
        }

        // Find all components in this hierarchy (root and all descendants)
        const findAllDescendants = (parentId) => {
          const directChildren = components.filter((comp) => comp.parentId === parentId)
          let allDescendants = [...directChildren]

          for (const child of directChildren) {
            const childDescendants = findAllDescendants(child.id)
            allDescendants = [...allDescendants, ...childDescendants]
          }

          return allDescendants
        }

        // Get all descendants of the root component
        const descendants = findAllDescendants(rootComponentId)

        // Create a complete component array with the root and all its descendants
        const componentsToSave = [rootComponent, ...descendants]

        // Count components of the same type
        const sameTypeComponents =
          existingComponents?.filter((comp) => comp.component.type === rootComponent.type) || []

        // Generate automatic name
        const componentName = `${rootComponent.type}${sameTypeComponents.length + 1}`

        // Save the complete component structure to the specific repository
        const { error } = await supabase.from("repository_components").insert({
          repository_id: targetRepositoryId,
          user_id: user_data.user.id,
          component: rootComponent,
          components_data: componentsToSave, // Guardar todos los componentes como un array plano
          name: componentName,
        })

        if (error) throw error

        toast.success("Component saved successfully")
        // Stay on the playground page
      }
    } catch (error) {
      console.error("Error saving component:", error)
      toast.error("Failed to save component: " + (error.message || "Unknown error"))
    }
  }

  const fetchRepositories = useCallback(async () => {
    try {
      const { data: user_data } = await supabase.auth.getUser()
      if (user_data.user?.id) {
        const { data, error } = await supabase.from("repositories").select("id, name").eq("user_id", user_data.user.id)

        if (error) throw error

        if (data && data.length > 0) {
          setRepositories(data)
          if (!selectedRepositoryId && !repositoryId) {
            setSelectedRepositoryId(data[0].id)
          }
        }
      }
    } catch (error) {
      console.error("Error fetching repositories:", error)
    }
  }, [repositoryId, selectedRepositoryId])

  useEffect(() => {
    if (isAuthenticated) {
      fetchRepositories()
    }
  }, [isAuthenticated, fetchRepositories])

  // Add keyboard event listener for delete key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" && activeComponent) {
        handleDeleteComponent(activeComponent.id)
        toast.success(`${activeComponent.type} component deleted`, {
          description: "You can add another component from the components panel.",
        })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeComponent, handleDeleteComponent])

  const handleBackToRepository = () => {
    if (repositoryId) {
      router.push(`/repositorio/${repositoryId}`)
    } else {
      router.push("/repositorio")
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="fixed inset-0 bg-background">
        <div className="grid h-full" style={{ gridTemplateColumns: "4rem 320px 1fr" }}>
          {/* Sidebar */}
          <Sidebar initialSelectedIcon="plus" />

          {/* Components Column */}
          <div className="border-r border-border bg-background">
            <div className="h-14 border-b border-border flex items-center px-4 justify-between">
              <div className="flex items-center gap-4">
                <Tabs value={activeComponentTab} onValueChange={setActiveComponentTab} className="w-full">
                  <TabsList className="bg-transparent p-0 h-auto">
                    <TabsTrigger
                      value="components"
                      className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-0 mr-4"
                    >
                      Components
                    </TabsTrigger>
                    <TabsTrigger
                      value="modules"
                      className="bg-transparent data-[state=active]:shadow-none rounded-none px-0 mr-4"
                    >
                      Modules
                    </TabsTrigger>
                    <TabsTrigger
                      value="styles"
                      className="bg-transparent data-[state=active]:shadow-none rounded-none px-0"
                    >
                      Styles
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            {ComponentListScrollArea}
          </div>

          {/* Preview Column */}
          <div className="bg-background overflow-hidden flex flex-col w-full">
            <div className="h-14 border-b border-border flex items-center px-4 justify-between bg-background">
              <div className="flex items-center gap-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="bg-transparent p-0 h-auto">
                    <TabsTrigger
                      value="preview"
                      className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-0 mr-4"
                    >
                      Preview
                    </TabsTrigger>
                    <TabsTrigger
                      value="code"
                      className="bg-transparent data-[state=active]:shadow-none rounded-none px-0 mr-4"
                    >
                      Code
                    </TabsTrigger>
                    <TabsTrigger
                      value="install"
                      className="bg-transparent data-[state=active]:shadow-none rounded-none px-0"
                    >
                      Install
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="flex items-center gap-2">
                {isAuthenticated && (
                  <Select value={repositoryId || selectedRepositoryId || ""} onValueChange={setSelectedRepositoryId}>
                    <SelectTrigger className="w-[120px] h-8">
                      <SelectValue placeholder="Select repository" />
                    </SelectTrigger>
                    <SelectContent>
                      {repositories.map((repo) => (
                        <SelectItem key={repo.id} value={repo.id}>
                          {repo.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                <Button variant="outline" size="sm" className="h-8" onClick={handleCopyCode}>
                  <Copy className="h-4 w-4" />
                  Copy code
                </Button>

                <Button size="sm" onClick={handleSaveComponent} className="h-8">
                  Save component
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-auto preview-area">
              {activeTab === "preview" && PreviewScrollArea}
              {activeTab === "code" && (
                <div className="h-[calc(100vh-3rem)] bg-[#101012] overflow-auto">
                  <div>
                    {activeComponent ? (
                      <div className="overflow-visible">
                        <CodeViewer code={generateCode(activeComponent)} language="jsx" />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-[calc(100vh-3rem)] text-center text-white">
                        <Code className="h-8 w-8 text-zinc-400 mb-4" />
                        <h3 className="font-medium mb-2 text-white">No component selected</h3>
                        <p className="text-sm text-zinc-400 max-w-md">
                          Add a component from the components panel to see its code here. You can then copy and use this
                          code in your project.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {activeTab === "install" && (
                <ScrollArea className="h-[calc(100vh-3rem)]">
                  <div className="p-4">
                    <div className="max-w-3xl mx-auto py-8">
                      <InstallationSteps steps={getInstallationSteps(activeComponent)} />
                    </div>
                  </div>
                </ScrollArea>
              )}
            </div>
          </div>
        </div>

        {loginModal}
      </div>
      <ComponentSelectionDialog
        isOpen={isComponentDialogOpen}
        onClose={() => setIsComponentDialogOpen(false)}
        onSelectComponent={handleSelectNestedComponent}
      />
    </DndProvider>
  )
}
