import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";

export const OrderCard = () => {
  return (
    <Card className="h-full">
      <CardHeader className="bg-gray-100">
        <CardTitle>Order Number #1</CardTitle>
        <CardDescription>Arriving tomorrow by 10pm</CardDescription>
      </CardHeader>
      <CardContent className="w-full border-t">
        <div className="flex justify-between w-full mt-5">
          <div className="space-y-3">
            <div className="flex items-center w-full gap-5">
              <img
                src="/assets/placeholder.svg"
                alt="image"
                className="w-24 h-24 rounded-xl"
              />
              <span>Product 1</span>
            </div>
            <div className="flex items-center w-full gap-5">
              <img
                src="/assets/placeholder.svg"
                alt="image"
                className="w-24 h-24 rounded-xl"
              />
              <span>Product 1</span>
            </div>
          </div>
          <div className="flex flex-col items-start space-y-5">
            <Button className="w-full">Track Package</Button>
            <Button variant="outline" className="w-full">
              Cancel this delivery
            </Button>
            <Button variant="outline" className="w-full">
              Leave seller feedback
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t w-full">
        <div className="mt-5 flex items-center w-full justify-between text-sm">
          <div>
            <h1 className="font-bold uppercase text-md">Order placed on</h1>
            <p>6 September 2024</p>
          </div>
          <div>
            <h1 className="font-bold uppercase text-md">Total</h1>
            <p>1234</p>
          </div>
          <div>
            <h1 className="font-bold uppercase text-md">Ship To</h1>
            <p>ABC</p>
          </div>
          <Button>Archive Order</Button>
        </div>
      </CardFooter>
    </Card>
  );
};
