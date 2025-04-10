"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { CreditCard, Apple } from "lucide-react"
import { Github, ChromeIcon as Google } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import type { Component } from "@/types/component"

interface EditableCardProps {
  props: {
    cardType: "default" | "payment" | "account" | "shared" | "cookie-settings" | "team" | "report"
    title?: string
    description?: string
    showHeader?: boolean
    showFooter?: boolean
    width?: string
    rounded?: "none" | "sm" | "md" | "lg" | "xl"
    bordered?: boolean
    elevated?: boolean
    // Cookie settings specific props
    cookieOptions?: {
      title: string
      description: string
      enabled: boolean
    }[]
    // Default card props
    buttonLayout?: "side-by-side" | "stacked" | "spaced"
    buttonVariant?: "default" | "secondary" | "outline" | "ghost"
    // Payment card props
    showPaymentIcons?: boolean
    showCVC?: boolean
    // Team card props
    teamMembers?: {
      name: string
      email: string
      role: string
    }[]
    // Report card props
    areas?: string[]
    severityLevels?: string[]
    // Nested components
    components?: Component[]
  }
  children?: React.ReactNode
  onAddComponent?: () => void
}

export function EditableCard({ props, children, onAddComponent }: EditableCardProps) {
  const {
    cardType,
    title,
    description,
    showHeader = true,
    showFooter = true,
    width = "w-[350px]",
    rounded = "md",
    bordered = true,
    elevated = false,
    buttonLayout = "side-by-side",
    buttonVariant = "outline",
    showPaymentIcons = true,
    showCVC = true,
    cookieOptions,
    teamMembers,
    areas = ["Billing", "Security", "Account", "Technical", "Other"],
    severityLevels = ["Severity 1", "Severity 2", "Severity 3", "Severity 4"],
  } = props

  const roundedClass = {
    none: "rounded-none",
    sm: "rounded-lg",
    md: "rounded-xl",
    lg: "rounded-2xl",
    xl: "rounded-[24px]",
  }

  const getDefaultTitle = () => {
    switch (cardType) {
      case "payment":
        return "Payment Method"
      case "account":
        return "Create an account"
      case "shared":
        return "Share this document"
      case "cookie-settings":
        return "Cookie Settings"
      case "team":
        return "Team Members"
      case "report":
        return "Report an issue"
      default:
        return "Create project"
    }
  }

  const getDefaultDescription = () => {
    switch (cardType) {
      case "payment":
        return "Add a new payment method to your account"
      case "account":
        return "Enter your email below to create your account"
      case "shared":
        return "Anyone with the link can view this document."
      case "cookie-settings":
        return "Manage your cookie settings here."
      case "team":
        return "Invite your team members to collaborate."
      case "report":
        return "What area are you having problems with?"
      default:
        return "Deploy your new project in one-click."
    }
  }

  // Payment Card
  if (cardType === "payment") {
    return (
      <Card className={cn(width, roundedClass[rounded], bordered && "border", elevated && "shadow-lg")}>
        {showHeader && (
          <CardHeader>
            <CardTitle>{title || getDefaultTitle()}</CardTitle>
            <CardDescription>{description || getDefaultDescription()}</CardDescription>
          </CardHeader>
        )}
        <CardContent className="space-y-6">
          {showPaymentIcons && (
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                <CreditCard className="mb-3 h-6 w-6" />
                <span>Card</span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                <svg
                  className="mb-3 h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                </svg>
                <span>PayPal</span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                <Apple className="mb-3 h-6 w-6" />
                <span>Apple</span>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="First Last" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Enter your city" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="number">Card number</Label>
              <Input id="number" placeholder="1234 1234 1234 1234" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="month">Expires</Label>
                <Select>
                  <SelectTrigger id="month">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                      <SelectItem key={month} value={month.toString()}>
                        {month.toString().padStart(2, "0")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="year">Year</Label>
                <Select>
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {showCVC && (
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="CVC" />
                </div>
              )}
            </div>
          </div>
          {/* Render nested components if they exist */}
          {children && <div className="mt-4">{children}</div>}

          {/* Add Component button */}
          {onAddComponent && (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onAddComponent()
                }}
                className="w-full border-dashed"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Component
              </Button>
            </div>
          )}
        </CardContent>
        {showFooter && (
          <CardFooter>
            <Button className="w-full">Continue</Button>
          </CardFooter>
        )}
      </Card>
    )
  }

  // Account Card
  if (cardType === "account") {
    return (
      <Card className={cn(width, roundedClass[rounded], bordered && "border", elevated && "shadow-lg")}>
        {showHeader && (
          <CardHeader>
            <CardTitle>{title || getDefaultTitle()}</CardTitle>
            <CardDescription>{description || getDefaultDescription()}</CardDescription>
          </CardHeader>
        )}
        <CardContent>
          <div className="flex justify-between gap-4">
            <Button variant="outline" className="flex-1">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline" className="flex-1">
              <Google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          <div className="text-center mt-4">OR CONTINUE WITH</div>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
          </div>
          {/* Render nested components if they exist */}
          {children && <div className="mt-4">{children}</div>}

          {/* Add Component button */}
          {onAddComponent && (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onAddComponent()
                }}
                className="w-full border-dashed"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Component
              </Button>
            </div>
          )}
        </CardContent>
        {showFooter && (
          <CardFooter>
            <Button className="w-full bg-black dark:bg-white dark:text-black">Create account</Button>
          </CardFooter>
        )}
      </Card>
    )
  }

  // Shared Card
  if (cardType === "shared") {
    return (
      <Card className={cn(width, roundedClass[rounded], bordered && "border", elevated && "shadow-lg")}>
        {showHeader && (
          <CardHeader>
            <CardTitle>{title || "Share this document"}</CardTitle>
            <CardDescription>{description || "Anyone with the link can view this document."}</CardDescription>
          </CardHeader>
        )}
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Input readOnly value="http://example.com/link/to/document" className="flex-1 bg-muted/50" />
            <Button variant="default" className="shrink-0">
              Copy Link
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">People with access</h3>
            <div className="space-y-4">
              {[
                { name: "Olivia Martin", email: "m@example.com", access: "Can edit" },
                { name: "Isabella Nguyen", email: "b@example.com", access: "Can view" },
                { name: "Sofia Davis", email: "p@example.com", access: "Can view" },
              ].map((person, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?text=${person.name[0]}`} />
                      <AvatarFallback>{person.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">{person.name}</p>
                      <p className="text-sm text-muted-foreground">{person.email}</p>
                    </div>
                  </div>
                  <Select defaultValue={person.access.toLowerCase().replace(" ", "-")}>
                    <SelectTrigger className="w-[110px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="can-edit">Can edit</SelectItem>
                      <SelectItem value="can-view">Can view</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>
          {/* Render nested components if they exist */}
          {children && <div className="mt-4">{children}</div>}

          {/* Add Component button */}
          {onAddComponent && (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onAddComponent()
                }}
                className="w-full border-dashed"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Component
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  // Cookie Settings Card
  if (cardType === "cookie-settings") {
    const defaultCookieOptions = [
      {
        title: "Strictly Necessary",
        description: "These cookies are essential in order to use the website and use its features.",
        enabled: true,
      },
      {
        title: "Functional Cookies",
        description: "These cookies allow the website to provide personalized functionality.",
        enabled: false,
      },
      {
        title: "Performance Cookies",
        description: "These cookies help to improve the performance of the website.",
        enabled: false,
      },
    ]

    const cookieOptions = props.cookieOptions || defaultCookieOptions

    return (
      <Card className={cn(width, roundedClass[rounded], bordered && "border", elevated && "shadow-lg")}>
        {showHeader && (
          <CardHeader>
            <CardTitle>{title || "Cookie Settings"}</CardTitle>
            <CardDescription>{description || "Manage your cookie settings here."}</CardDescription>
          </CardHeader>
        )}
        <CardContent className="grid gap-6">
          {cookieOptions.map((option, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex-1 space-y-1">
                <div className="text-base font-medium">{option.title}</div>
                <div className="text-sm text-muted-foreground">{option.description}</div>
              </div>
              <Switch defaultChecked={option.enabled} />
            </div>
          ))}
          {/* Render nested components if they exist */}
          {children && <div className="mt-4">{children}</div>}

          {/* Add Component button */}
          {onAddComponent && (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onAddComponent()
                }}
                className="w-full border-dashed"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Component
              </Button>
            </div>
          )}
        </CardContent>
        {showFooter && (
          <CardFooter>
            <Button variant="outline" className="w-full">
              Save preferences
            </Button>
          </CardFooter>
        )}
      </Card>
    )
  }

  // Team Card
  if (cardType === "team") {
    const defaultTeamMembers = [
      { name: "Sofia Davis", email: "m@example.com", role: "Owner" },
      { name: "Jackson Lee", email: "p@example.com", role: "Member" },
      { name: "Isabella Nguyen", email: "i@example.com", role: "Member" },
    ]
    const teamMembers = props.teamMembers || defaultTeamMembers

    return (
      <Card className={cn(width, roundedClass[rounded], bordered && "border", elevated && "shadow-lg")}>
        {showHeader && (
          <CardHeader>
            <CardTitle>{title || getDefaultTitle()}</CardTitle>
            <CardDescription>{description || getDefaultDescription()}</CardDescription>
          </CardHeader>
        )}
        <CardContent className="space-y-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?text=${member.name.charAt(0)}`} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                </div>
              </div>
              <Select defaultValue={member.role.toLowerCase()}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
          {/* Render nested components if they exist */}
          {children && <div className="mt-4">{children}</div>}

          {/* Add Component button */}
          {onAddComponent && (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onAddComponent()
                }}
                className="w-full border-dashed"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Component
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  // Report Card
  if (cardType === "report") {
    return (
      <Card className={cn(width, roundedClass[rounded], bordered && "border", elevated && "shadow-lg")}>
        {showHeader && (
          <CardHeader>
            <CardTitle>{title || getDefaultTitle()}</CardTitle>
            <CardDescription>{description || getDefaultDescription()}</CardDescription>
          </CardHeader>
        )}
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Area</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  {areas.map((area) => (
                    <SelectItem key={area} value={area.toLowerCase()}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Security Level</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  {severityLevels.map((level) => (
                    <SelectItem key={level} value={level.toLowerCase()}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Subject</Label>
            <Input placeholder="I need help with..." />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea placeholder="Please include all information relevant to your issue." className="min-h-[150px]" />
          </div>
          {/* Render nested components if they exist */}
          {children && <div className="mt-4">{children}</div>}

          {/* Add Component button */}
          {onAddComponent && (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onAddComponent()
                }}
                className="w-full border-dashed"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Component
              </Button>
            </div>
          )}
        </CardContent>
        {showFooter && (
          <CardFooter className="flex justify-between space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button>Submit</Button>
          </CardFooter>
        )}
      </Card>
    )
  }

  // Default Card
  return (
    <Card className={cn(width, roundedClass[rounded], bordered && "border", "shadow", elevated && "shadow-lg")}>
      {showHeader && (
        <CardHeader>
          <CardTitle>{title || getDefaultTitle()}</CardTitle>
          <CardDescription>{description || getDefaultDescription()}</CardDescription>
        </CardHeader>
      )}
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter your name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="framework">Framework</Label>
          <Select>
            <SelectTrigger id="framework">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="next">Next.js</SelectItem>
              <SelectItem value="sveltekit">SvelteKit</SelectItem>
              <SelectItem value="astro">Astro</SelectItem>
              <SelectItem value="nuxt">Nuxt.js</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Render nested components if they exist */}
        {children && <div className="mt-4">{children}</div>}

        {/* Add Component button */}
        {onAddComponent && (
          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onAddComponent()
              }}
              className="w-full border-dashed"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Component
            </Button>
          </div>
        )}
      </CardContent>
      {showFooter && (
        <CardFooter
          className={cn(
            "flex",
            buttonLayout === "side-by-side" && "justify-end space-x-2",
            buttonLayout === "stacked" && "flex-col-reverse space-y-2 space-y-reverse",
            buttonLayout === "spaced" && "justify-between",
          )}
        >
          {buttonLayout !== "none" && (
            <>
              <Button variant={buttonVariant} className={buttonLayout === "stacked" ? "w-full" : ""}>
                Cancel
              </Button>
              <Button variant="default" className={buttonLayout === "stacked" ? "w-full" : ""}>
                Submit
              </Button>
            </>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
