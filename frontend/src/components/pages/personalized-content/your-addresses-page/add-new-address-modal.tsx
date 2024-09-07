import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ScrollArea } from "@/components/ui/scroll-area";

export const AddNewAddressModal = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add New Address</Button>
        </DialogTrigger>
        <DialogContent className="max-w-7xl">
          <DialogHeader>
            <DialogTitle>Add new address</DialogTitle>
            <DialogDescription>
              Fill out the form to add a new address
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Add New Address</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add new address</DrawerTitle>
          <DrawerDescription>
            Fill out the form to add a new address
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-96 p-10">
          <ProfileForm />
        </ScrollArea>
        <DrawerFooter className="pt-2">
          <Button>Save</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

function ProfileForm() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4">
      <div className="w-full space-y-2">
        <Label className="text-right">Full Name</Label>
        <Input />
      </div>
      <div className="w-full space-y-2">
        <Label className="text-right">Phone Number</Label>
        <Input />
      </div>
      <div className="w-full space-y-2">
        <Label className="text-right">Alternate Phone Number</Label>
        <Input />
      </div>
      <div className="w-full space-y-2">
        <Label className="text-right">Address Line 1</Label>
        <Input />
      </div>
      <div className="w-full space-y-2">
        <Label className="text-right">Address Line 2</Label>
        <Input />
      </div>
      <div className="w-full space-y-2">
        <Label className="text-right">Address Line 3</Label>
        <Input />
      </div>
      <div className="w-full space-y-2">
        <Label className="text-right">Landmark</Label>
        <Input />
      </div>
      <div className="w-full space-y-2">
        <Label className="text-right">Town / City</Label>
        <Input />
      </div>
      <div className="w-full space-y-2">
        <Label className="text-right">State</Label>
        <Input />
      </div>
      <div className="w-full space-y-2">
        <Label className="text-right">Pincode</Label>
        <Input />
      </div>
      <div className="w-full space-y-2 md:col-span-2 lg:col-span-3">
        <Label className="text-right">Instructions</Label>
        <Textarea />
      </div>
    </div>
  );
}
