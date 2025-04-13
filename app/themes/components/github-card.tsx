import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function DemoGithub() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40&query=6" />
              <AvatarFallback>GH</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">shadcn/ui</h3>
              <p className="text-sm text-muted-foreground">
                Beautifully designed components built with Radix UI and Tailwind CSS.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 4.5a2.25 2.25 0 0 0-2.25 2.25c0 .597.237 1.166.659 1.59L12 9.75l1.59-1.41a2.25 2.25 0 1 0-3.182-3.182" />
                <path d="M14.25 8.25 12 10.5l-2.25-2.25" />
                <path d="M12 10.5v4.75" />
                <path d="M12 15.75h2.25" />
                <path d="M16.5 19.5a1.5 1.5 0 0 1-3 0V18a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75v1.5a1.5 1.5 0 0 1-3 0V9.375c0-.621.504-1.125 1.125-1.125h7.5c.621 0 1.125.504 1.125 1.125V19.5Z" />
              </svg>
              <span className="text-sm text-muted-foreground">TypeScript</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="text-sm text-muted-foreground">10.2k stars</span>
            </div>
            <Badge variant="secondary" className="ml-auto">
              Public
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button className="w-full">View Repository</Button>
            <Button variant="outline" size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              <span className="sr-only">Add</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
