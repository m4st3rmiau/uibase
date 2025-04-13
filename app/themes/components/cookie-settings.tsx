import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function DemoCookieSettings() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <h3 className="font-semibold text-lg">Cookie Settings</h3>
          <p className="text-sm text-muted-foreground">
            Manage your cookie settings. You can enable or disable different types of cookies below.
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="necessary" className="flex flex-col space-y-1">
                <span>Strictly Necessary</span>
                <span className="font-normal text-xs text-muted-foreground">
                  These cookies are essential for the website to function properly.
                </span>
              </Label>
              <Switch id="necessary" defaultChecked disabled />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="functional" className="flex flex-col space-y-1">
                <span>Functional Cookies</span>
                <span className="font-normal text-xs text-muted-foreground">
                  These cookies enable personalized features and functionality.
                </span>
              </Label>
              <Switch id="functional" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="performance" className="flex flex-col space-y-1">
                <span>Performance Cookies</span>
                <span className="font-normal text-xs text-muted-foreground">
                  These cookies help us improve our website by collecting anonymous information.
                </span>
              </Label>
              <Switch id="performance" />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="marketing" className="flex flex-col space-y-1">
                <span>Marketing Cookies</span>
                <span className="font-normal text-xs text-muted-foreground">
                  These cookies are used to track visitors across websites to display relevant advertisements.
                </span>
              </Label>
              <Switch id="marketing" />
            </div>
          </div>
          <div className="flex justify-between pt-4">
            <Button variant="outline">Decline All</Button>
            <Button>Accept All</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
