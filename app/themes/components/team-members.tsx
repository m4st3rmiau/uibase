import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function DemoTeamMembers() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Team Members</h3>
            <Button variant="outline" size="sm">
              Add Member
            </Button>
          </div>
          <div className="divide-y">
            {[
              {
                name: "Sofia Davis",
                email: "sofia.davis@example.com",
                avatar: "/colorful-abstract-shapes.png",
                initials: "SD",
                role: "Admin",
              },
              {
                name: "Jackson Lee",
                email: "jackson.lee@example.com",
                avatar: "/colorful-abstract-shapes.png",
                initials: "JL",
                role: "Member",
              },
              {
                name: "Olivia Martin",
                email: "olivia.martin@example.com",
                avatar: "/abstract-geometric-shapes.png",
                initials: "OM",
                role: "Member",
              },
            ].map((person) => (
              <div key={person.email} className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                    <AvatarFallback>{person.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{person.name}</p>
                    <p className="text-xs text-muted-foreground">{person.email}</p>
                  </div>
                </div>
                <Badge variant={person.role === "Admin" ? "default" : "outline"}>{person.role}</Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
