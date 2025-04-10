import React from "react"
import {
  Breadcrumb,
  BreadcrumbItem as UIBreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronRight, File, Folder } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  type: "link" | "page" | "ellipsis"
  label: string
  href?: string
  dropdownItems?: { label: string; href: string }[]
}

interface EditableBreadcrumbProps {
  props: {
    items: BreadcrumbItem[]
    separator?: "slash" | "chevron"
    size?: "sm" | "md" | "lg"
    iconPosition?: "left" | "right"
    showIcon: boolean
  }
}

export function EditableBreadcrumb({ props }: EditableBreadcrumbProps) {
  const { items, separator = "slash", size = "md", iconPosition = "left", showIcon } = props

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "link":
        return <Folder className="h-4 w-4" />
      case "page":
        return <File className="h-4 w-4" />
      case "ellipsis":
        return null
      default:
        return <Folder className="h-4 w-4" />
    }
  }

  return (
    <Breadcrumb>
      <BreadcrumbList className={cn(sizeClasses[size])}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <UIBreadcrumbItem>
              {item.type === "link" && (
                <BreadcrumbLink href={item.href} className="flex items-center gap-1">
                  {showIcon && iconPosition === "left" && getIcon(item.type)}
                  {item.label}
                  {showIcon && iconPosition === "right" && getIcon(item.type)}
                </BreadcrumbLink>
              )}
              {item.type === "page" && (
                <BreadcrumbPage className="flex items-center gap-1">
                  {showIcon && iconPosition === "left" && getIcon(item.type)}
                  {item.label}
                  {showIcon && iconPosition === "right" && getIcon(item.type)}
                </BreadcrumbPage>
              )}
              {item.type === "ellipsis" && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                      <DropdownMenuItem key={dropdownIndex}>{dropdownItem.label}</DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </UIBreadcrumbItem>
            {index < items.length - 1 && (
              <BreadcrumbSeparator>
                {separator === "slash" ? "/" : <ChevronRight className="h-4 w-4" />}
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
