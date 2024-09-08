import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const CommunicationPreferencesForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Communication Preferences</CardTitle>
        <CardDescription>Manage your communication preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex w-full flex-col gap-4">
          <div className="flex w-full items-center justify-between space-x-2 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Communication emails</Label>
              <p>
                Receive transactional emails, such as order confirmations and
                shipping updates.
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex w-full items-center justify-between space-x-2 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Newsletter emails</Label>
              <p>
                Receive our monthly newsletter with the latest news and updates.
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex w-full items-center justify-between space-x-2 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Marketing emails</Label>
              <p>
                Receive marketing emails, including promotions, discounts, and
                more.
              </p>
            </div>
            <Switch />
          </div>
          <div className="w-full flex items-end justify-end mt-5">
            <Button>
              Save preferences
              <span className="sr-only">Save preferences</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
