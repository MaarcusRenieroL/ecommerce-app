import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Wallet, Building, CreditCardIcon } from "lucide-react";

export const AddNewPaymentModal = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add New Payment</Button>
        </DialogTrigger>
        <DialogContent className="max-w-7xl">
          <DialogHeader>
            <DialogTitle>Add new payment</DialogTitle>
            <DialogDescription>
              Fill out the form to add a new payment
            </DialogDescription>
          </DialogHeader>
          <PaymentForm />
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
      <DrawerContent className="p-6">
        <DrawerHeader className="text-left">
          <DrawerTitle>Add new payment</DrawerTitle>
          <DrawerDescription>
            Fill out the form to add a new payment
          </DrawerDescription>
        </DrawerHeader>
        <PaymentForm />
        <DrawerFooter className="pt-2 w-full">
          <DrawerClose asChild className="w-full">
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

function PaymentForm() {
  const [selectedTab, setSelectedTab] = useState("card");
  const [selectedCard, setSelectedCard] = useState("visa");
  const [selectedWallet, setSelectedWallet] = useState("paypal");
  const [selectedGateway, setSelectedGateway] = useState("stripe");

  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab} className="p-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="card" className="flex items-center justify-center">
          <CreditCard className="w-4 h-4 mr-2" />
          Card
        </TabsTrigger>
        <TabsTrigger
          value="wallet"
          className="flex items-center justify-center"
        >
          <Wallet className="w-4 h-4 mr-2" />
          Wallet
        </TabsTrigger>
        <TabsTrigger
          value="netbanking"
          className="flex items-center justify-center"
        >
          <Building className="w-4 h-4 mr-2" />
          Netbanking
        </TabsTrigger>
        <TabsTrigger
          value="gateway"
          className="flex items-center justify-center"
        >
          <CreditCardIcon className="w-4 h-4 mr-2" />
          Gateway
        </TabsTrigger>
      </TabsList>
      <TabsContent value="card">
        <form className="space-y-4 mt-4">
          <RadioGroup
            value={selectedCard}
            onValueChange={setSelectedCard}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="visa" id="visa" />
              <Label htmlFor="visa">Visa</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mastercard" id="mastercard" />
              <Label htmlFor="mastercard">Mastercard</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="amex" id="amex" />
              <Label htmlFor="amex">American Express</Label>
            </div>
          </RadioGroup>
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expMonth">Expiry Month</Label>
              <Select>
                <SelectTrigger id="expMonth">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <SelectItem
                      key={month}
                      value={month.toString().padStart(2, "0")}
                    >
                      {month.toString().padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expYear">Expiry Year</Label>
              <Select>
                <SelectTrigger id="expYear">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from(
                    { length: 10 },
                    (_, i) => new Date().getFullYear() + i,
                  ).map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="123" />
            </div>
          </div>
          <Button className="w-full">Save</Button>
        </form>
      </TabsContent>
      <TabsContent value="wallet">
        <form className="space-y-4 mt-4">
          <RadioGroup
            value={selectedWallet}
            onValueChange={setSelectedWallet}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal">PayPal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="applepay" id="applepay" />
              <Label htmlFor="applepay">Apple Pay</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="googlepay" id="googlepay" />
              <Label htmlFor="googlepay">Google Pay</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="samsungpay" id="samsungpay" />
              <Label htmlFor="samsungpay">Samsung Pay</Label>
            </div>
          </RadioGroup>
          <div className="space-y-2">
            <Label htmlFor="walletEmail">Email Address</Label>
            <Input
              id="walletEmail"
              type="email"
              placeholder="you@example.com"
            />
          </div>
          <Button className="w-full">Save</Button>
        </form>
      </TabsContent>
      <TabsContent value="netbanking">
        <form className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="bankSelect">Select Your Bank</Label>
            <Select>
              <SelectTrigger id="bankSelect">
                <SelectValue placeholder="Choose a bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sbi">State Bank of India</SelectItem>
                <SelectItem value="hdfc">HDFC Bank</SelectItem>
                <SelectItem value="icici">ICICI Bank</SelectItem>
                <SelectItem value="axis">Axis Bank</SelectItem>
                <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full">Save</Button>
        </form>
      </TabsContent>
      <TabsContent value="gateway">
        <form className="space-y-4 mt-4">
          <RadioGroup
            value={selectedGateway}
            onValueChange={setSelectedGateway}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="stripe" id="stripe" />
              <Label htmlFor="stripe">Stripe</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="razorpay" id="razorpay" />
              <Label htmlFor="razorpay">Razorpay</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paypal" id="paypal-gateway" />
              <Label htmlFor="paypal-gateway">PayPal</Label>
            </div>
          </RadioGroup>
          <div className="space-y-2">
            <Label htmlFor="gatewayEmail">Email Address</Label>
            <Input
              id="gatewayEmail"
              type="email"
              placeholder="you@example.com"
            />
          </div>
          <Button className="w-full">Save</Button>
        </form>
      </TabsContent>
    </Tabs>
  );
}
