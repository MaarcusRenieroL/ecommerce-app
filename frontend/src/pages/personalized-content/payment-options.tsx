import { Navbar } from "@/components/navigation/navbar";
import { AddNewPaymentModal } from "@/components/pages/personalized-content/payment-options/add-new-payment";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const PaymentOptions = () => {
  return (
    <div>
      <Navbar />
      <main className="p-10">
        <div>
          <div className="w-full flex items-center justify-between">
            <h1 className="text-2xl font-bold">Payment Options</h1>
            <AddNewPaymentModal />
          </div>
          <hr className="mt-5" />
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.of(1, 2, 3, 4, 5).map((index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>Method</CardTitle>
                <CardDescription>Name</CardDescription>
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
