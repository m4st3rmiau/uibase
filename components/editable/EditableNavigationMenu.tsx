"use client"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

interface MenuItem {
  title: string
  href?: string
  description?: string
  items?: MenuItem[]
}

interface EditableNavigationMenuProps {
  props: {
    items: MenuItem[]
  }
}

export function EditableNavigationMenu({ props }: EditableNavigationMenuProps) {
  const { items } = props

  const renderMenuItems = (menuItems: MenuItem[]) => {
    return menuItems.map((item, index) => (
      <NavigationMenuItem key={index}>
        {item.items ? (
          <>
            <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {item.items.map((subItem, subIndex) => (
                  <li key={subIndex} className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href={subItem.href}
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">{subItem.title}</div>
                        <p className="text-sm leading-tight text-muted-foreground">{subItem.description}</p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </>
        ) : (
          <NavigationMenuLink href={item.href}>{item.title}</NavigationMenuLink>
        )}
      </NavigationMenuItem>
    ))
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>{renderMenuItems(items)}</NavigationMenuList>
    </NavigationMenu>
  )
}
