import { CardContent, Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function DemoNotifications() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <h3 className="font-semibold text-lg">Notifications</h3>
          <p className="text-sm text-muted-foreground">Choose what notifications you want to receive.</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                <span>Email notifications</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Receive emails about your account activity.
                </span>
              </Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="marketing-emails" className="flex flex-col space-y-1">
                <span>Marketing emails</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Receive emails about new products, features, and more.
                </span>
              </Label>
              <Switch id="marketing-emails" />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="social-emails" className="flex flex-col space-y-1">
                <span>Social emails</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Receive emails for friend requests, follows, and more.
                </span>
              </Label>
              <Switch id="social-emails" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="security-emails" className="flex flex-col space-y-1">
                <span>Security emails</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Receive emails about your account activity and security.
                </span>
              </Label>
              <Switch id="security-emails" disabled defaultChecked />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
