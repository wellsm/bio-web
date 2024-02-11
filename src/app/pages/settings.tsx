import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SocialMedias } from "@/app/components/social-medias";
import { Profile } from "@/app/components/profile";
import { Configs } from "../components/configs";

export function Settings() {

  return (
    <div className="flex-1 space-y-4 p-4 pt-4 sm:px-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2 xl:col-span-1">
          <Profile/>
        </div>
        <div className="col-span-2 xl:col-span-1 space-y-4">
          <SocialMedias/>
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Manage your preferences here.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <Configs/>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
