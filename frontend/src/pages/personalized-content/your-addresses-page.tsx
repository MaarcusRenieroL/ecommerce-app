import { Navbar } from "@/components/navigation/navbar";
import { AddNewAddressModal } from "@/components/pages/personalized-content/your-addresses-page/add-new-address-modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const YourAddressesPage = () => {
  return (
    <div>
      <Navbar />
      <main className="flex-1 container mx-auto p-10">
        <div>
          <div className="w-full flex items-center justify-between">
            <h1 className="text-2xl font-bold">Your Addresses</h1>
            <AddNewAddressModal />
          </div>
          <hr className="mt-5" />
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.of(1, 2, 3, 4, 5).map((index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>Name</CardTitle>
                <CardDescription>Add Delivery Instructions</CardDescription>
              </CardHeader>
              <CardContent>Address</CardContent>
              <CardFooter className="w-full flex items-center justify-between gap-5">
                <Button className="w-full">Edit</Button>
                <Button className="w-full" variant="destructive">
                  Remove
                </Button>
                <Button className="w-full" variant="link">
                  Set Default
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};
