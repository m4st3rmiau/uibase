import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DemoShareDocument() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <h3 className="font-semibold text-lg">Share this document</h3>
          <p className="text-sm text-muted-foreground">Anyone with the link can view this document.</p>
          <div className="flex items-center space-x-2">
            <Input value="http://example.com/link/to/document" readOnly />
            <Button variant="secondary" className="shrink-0">
              Copy Link
            </Button>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium">People with access</h4>
            <div className="grid gap-4">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/abstract-geometric-shapes.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                  </div>
                </div>
                <Select defaultValue="edit">
                  <SelectTrigger className="w-[110px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="edit">Can edit</SelectItem>
                    <SelectItem value="view">Can view</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/abstract-geometric-shapes.png" />
                    <AvatarFallback>SD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Sofia Davis</p>
                    <p className="text-xs text-muted-foreground">sofia.davis@example.com</p>
                  </div>
                </div>
                <Select defaultValue="view">
                  <SelectTrigger className="w-[110px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="edit">Can edit</SelectItem>
                    <SelectItem value="view">Can view</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
