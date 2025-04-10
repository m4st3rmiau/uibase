"use client"

import { EditableButton } from "@/components/editable/EditableButton"
import { EditableInput } from "@/components/editable/EditableInput"
import { EditableCheckbox } from "@/components/editable/EditableCheckbox"
import { EditableRadioGroup } from "@/components/editable/EditableRadioGroup"
import { EditableSelect } from "@/components/editable/EditableSelect"
import { EditableTextarea } from "@/components/editable/EditableTextarea"
import { EditableSwitch } from "@/components/editable/EditableSwitch"
import { EditableSlider } from "@/components/editable/EditableSlider"
import { EditableDatePicker } from "@/components/editable/EditableDatePicker"
import { EditableFileUpload } from "@/components/editable/EditableFileUpload"
import { EditableInputOTP } from "@/components/editable/EditableInputOTP"
import { EditablePassword } from "@/components/editable/EditablePassword"
import { EditableAccordion } from "@/components/editable/EditableAccordion"
import { EditableAlert } from "@/components/editable/EditableAlert"
import { EditableAlertDialog } from "@/components/editable/EditableAlertDialog"
import { EditableAvatar } from "@/components/editable/EditableAvatar"
import { EditableBadge } from "@/components/editable/EditableBadge"
import { EditableBreadcrumb } from "@/components/editable/EditableBreadcrumb"
import { EditableCalendar } from "@/components/editable/EditableCalendar"
import { EditableCard } from "@/components/editable/EditableCard"
import { EditableCarousel } from "@/components/editable/EditableCarousel"
import { EditableCollapsible } from "@/components/editable/EditableCollapsible"
import { EditableCombobox } from "@/components/editable/EditableCombobox"
import { EditableCommand } from "@/components/editable/EditableCommand"
import { EditableContextMenu } from "@/components/editable/EditableContextMenu"
import { EditableDataTable } from "@/components/editable/EditableDataTable"
import { EditableDialog } from "@/components/editable/EditableDialog"
import { EditableDrawer } from "@/components/editable/EditableDrawer"
import { EditableDropdownMenu } from "@/components/editable/EditableDropdownMenu"
import { EditableForm } from "@/components/editable/EditableForm"
import { EditableHoverCard } from "@/components/editable/EditableHoverCard"
import { EditableNavigationMenu } from "@/components/editable/EditableNavigationMenu"
import { EditablePagination } from "@/components/editable/EditablePagination"
import { EditablePopover } from "@/components/editable/EditablePopover"
import { EditableProgress } from "@/components/editable/EditableProgress"
import { EditableScrollArea } from "@/components/editable/EditableScrollArea"
import { EditableSeparator } from "@/components/editable/EditableSeparator"
import { EditableSheet } from "@/components/editable/EditableSheet"
import { EditableSkeleton } from "@/components/editable/EditableSkeleton"
import { EditableTabs } from "@/components/editable/EditableTabs"
import { EditableTooltip } from "@/components/editable/EditableTooltip"
import { EditableToggle } from "@/components/editable/EditableToggle"
import { EditableToast } from "@/components/editable/EditableToast"
import { EditableToggleGroup } from "@/components/editable/EditableToggleGroup"
import { EditableChart } from "@/components/editable/EditableChart"
import type { Component } from "@/types/component"
import React from "react"
import { themes } from "@/constants/themes"

interface PreviewComponentProps {
  component: Component
  theme?: string
  radius?: string
  mode?: "light" | "dark"
  typography?: string
  onAddNestedComponent?: (parentId: string, itemIndex?: number) => void
  nestedComponents?: Component[]
  onSelectComponent?: (component: Component) => void
}

export function PreviewComponent({
  component,
  theme = "zinc",
  radius = "0.5",
  mode = "light",
  typography = "inter",
  onAddNestedComponent,
  nestedComponents = [],
  onSelectComponent,
}: PreviewComponentProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (containerRef.current) {
      // Aplicar variables CSS del tema seleccionado
      const selectedTheme = themes[theme as keyof typeof themes]
      if (selectedTheme) {
        // Limpiar variables CSS anteriores
        const cssVarKeys = Object.keys(selectedTheme.cssVars)
        cssVarKeys.forEach((key) => {
          containerRef.current?.style.setProperty(key, selectedTheme.cssVars[key])
        })

        // Asegurarnos de que la clase del tema esté aplicada
        containerRef.current.className = `theme-${theme} ${mode}`
      }

      // Aplicar radio
      containerRef.current.style.setProperty("--radius", `${radius}rem`)

      // Aplicar tipografía
      containerRef.current.style.setProperty("--font-sans", typography)
    }
  }, [theme, radius, mode, typography])

  const renderNestedComponents = (parentId: string, itemIndex?: number) => {
    const children = nestedComponents.filter((c) => c.parentId === parentId)

    if (children.length === 0) return null

    return children.map((child) => (
      <div
        key={child.id}
        onClick={(e) => {
          e.stopPropagation()
          if (onSelectComponent) onSelectComponent(child)
        }}
      >
        <PreviewComponent
          component={child}
          theme={theme}
          radius={radius}
          mode={mode}
          typography={typography}
          onAddNestedComponent={onAddNestedComponent}
          nestedComponents={nestedComponents}
          onSelectComponent={onSelectComponent}
        />
      </div>
    ))
  }

  return (
    <div ref={containerRef}>
      {(() => {
        switch (component.type) {
          case "Button":
            return <EditableButton props={component.props} />
          case "Input":
            return <EditableInput props={component.props} />
          case "Checkbox":
            return <EditableCheckbox props={component.props} />
          case "Radio Group":
            return <EditableRadioGroup props={component.props} />
          case "Select":
            return <EditableSelect props={component.props} />
          case "Textarea":
            return <EditableTextarea props={component.props} />
          case "Switch":
            return <EditableSwitch props={component.props} />
          case "Slider":
            return <EditableSlider props={component.props} />
          case "Date Picker":
            return <EditableDatePicker props={component.props} />
          case "Uploader":
            return <EditableFileUpload props={component.props} />
          case "Input OTP":
            return <EditableInputOTP props={component.props} />
          case "Password":
            return <EditablePassword props={component.props} />
          case "Accordion":
            // Encontrar los componentes hijos para cada item del acordeón
            const accordionItemsWithChildren =
              component.props.items?.map((item, index) => {
                // Buscar componentes hijos para este item específico
                const itemChildren = nestedComponents?.filter(
                  (child) => child.parentId === component.id && child.itemIndex === index,
                )

                // Si hay componentes hijos, agregarlos al item
                if (itemChildren && itemChildren.length > 0) {
                  return {
                    ...item,
                    components: itemChildren,
                  }
                }

                return item
              }) || []

            // Asegurarse de que los componentes hijos se pasen correctamente
            return (
              <EditableAccordion
                props={{
                  ...component.props,
                  items: accordionItemsWithChildren,
                }}
                onAddComponent={
                  onAddNestedComponent ? (itemIndex) => onAddNestedComponent(component.id, itemIndex) : undefined
                }
                nestedComponents={accordionItemsWithChildren.map((_, index) => {
                  const itemChildren = nestedComponents?.filter(
                    (child) => child.parentId === component.id && child.itemIndex === index,
                  )

                  if (itemChildren && itemChildren.length > 0) {
                    return (
                      <div key={index} className="space-y-2">
                        {itemChildren.map((child) => (
                          <div
                            key={child.id}
                            onClick={(e) => {
                              e.stopPropagation()
                              onSelectComponent?.(child)
                            }}
                            className="relative"
                          >
                            <PreviewComponent
                              component={child}
                              theme={theme}
                              radius={radius}
                              mode={mode}
                              typography={typography}
                              onAddNestedComponent={onAddNestedComponent}
                              nestedComponents={nestedComponents}
                              onSelectComponent={onSelectComponent}
                            />
                          </div>
                        ))}
                      </div>
                    )
                  }

                  return null
                })}
              />
            )
          case "Alert":
            return <EditableAlert props={component.props} />
          case "Alert Dialog":
            return <EditableAlertDialog props={component.props} />
          case "Avatar":
            return <EditableAvatar props={component.props} />
          case "Badge":
            return <EditableBadge props={component.props} />
          case "Breadcrumb":
            return <EditableBreadcrumb props={component.props} />
          case "Calendar":
            return <EditableCalendar props={component.props} />
          case "Card":
            return (
              <EditableCard
                props={component.props}
                onAddComponent={() => onAddNestedComponent && onAddNestedComponent(component.id)}
              >
                {renderNestedComponents(component.id)}
              </EditableCard>
            )
          case "Carousel":
            return <EditableCarousel props={component.props} />
          case "Collapsible":
            return <EditableCollapsible props={component.props} />
          case "Combobox":
            return <EditableCombobox props={component.props} />
          case "Command":
            return <EditableCommand props={component.props} />
          case "Context Menu":
            return <EditableContextMenu props={component.props} />
          case "Data Table":
            return <EditableDataTable props={component.props} />
          case "Dialog":
            return (
              <EditableDialog
                props={component.props}
                onAddComponent={() => onAddNestedComponent && onAddNestedComponent(component.id)}
                isPreview={true}
              >
                {renderNestedComponents(component.id)}
              </EditableDialog>
            )
          case "Drawer":
            return <EditableDrawer props={component.props} />
          case "Dropdown Menu":
            return <EditableDropdownMenu props={component.props} />
          case "Form":
            return <EditableForm props={component.props} />
          case "Hover Card":
            return <EditableHoverCard props={component.props} />
          case "Navigation Menu":
            return <EditableNavigationMenu props={component.props} />
          case "Pagination":
            return <EditablePagination props={component.props} />
          case "Popover":
            return <EditablePopover props={component.props} />
          case "Progress":
            return <EditableProgress props={component.props} />
          case "Scroll Area":
            return <EditableScrollArea props={component.props} />
          case "Separator":
            return <EditableSeparator props={component.props} />
          case "Sheet":
            return <EditableSheet props={component.props} />
          case "Skeleton":
            return <EditableSkeleton props={component.props} />
          case "Tabs":
            return <EditableTabs props={component.props} />
          case "Tooltip":
            return <EditableTooltip props={component.props} />
          case "Toggle":
            return <EditableToggle props={component.props} />
          case "Toast":
            return <EditableToast props={component.props} />
          case "Toggle Group":
            return <EditableToggleGroup props={component.props} />
          case "Chart":
            return <EditableChart props={component.props} />
          default:
            return <div>Unknown component type: {component.type}</div>
        }
      })()}
    </div>
  )
}
