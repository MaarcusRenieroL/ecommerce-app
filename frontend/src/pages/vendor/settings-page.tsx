import { useState } from "react";

import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { VendorNavbar } from "@/components/navigation/vendor-navbar";
import { Separator } from "@/components/ui/separator";

export const VendorSettingsPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      <VendorNavbar />
      <main className="p-10">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <Separator className="mt-5" />
        </div>
        <div className="space-y-5 mt-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Store Name</CardTitle>
              <CardDescription>
                Please enter your store name, or update with a different store
                name you are comfortable with.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between w-full gap-5 relative">
              {isAuthenticated ? null : (
                <div className="absolute top-0 left-0 h-full w-full backdrop-blur-[6px] z-[2] p-6 pt-0" />
              )}
              <div className="absolute h-full flex flex-col space-y-3 items-center justify-center w-full z-[2] top-0 left-0 p-6 pt-0">
                <p>Please login to make changes</p>
                <Button>Click here to login</Button>
              </div>
              <div className="w-full space-y-3">
                <Label>Store Name</Label>
                <Input type="text" placeholder="Enter first name" />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-2 bg-secondary justify-between">
              <div className="text-sm">
                Please use 32 characters at maximum.
              </div>
              <div className="ml-auto">
                <Button size="sm">Save</Button>
              </div>
            </CardFooter>
          </Card>
          <Card className="border-red-200 w-full">
            <CardHeader>
              <CardTitle className="text-xl">Delete Store</CardTitle>
              <CardDescription>
                Permanently remove your store and all of its contents from the
                ShopEase platform. This action is not reversible, so please
                continue with caution.
              </CardDescription>
            </CardHeader>
            <CardContent className="border-b border-red-200 bg-red-100/50 flex items-center justify-end w-full gap-5 relative pt-5 h-32">
              {isAuthenticated ? null : (
                <div className="absolute top-0 left-0 h-full w-full backdrop-blur-[6px] z-[2] p-6 pt-5" />
              )}
              <div className="absolute h-full flex flex-col space-y-3 items-center justify-center w-full z-[2] top-0 left-0 p-6 pt-5">
                <p>Please login to make changes</p>
                <Button>Click here to login</Button>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="destructive">
                    Delete Store
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete store</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete your store
                      <br />
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
