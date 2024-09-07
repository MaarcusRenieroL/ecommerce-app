import { Navbar } from "@/components/navigation/navbar.tsx";
import { OrderCard } from "@/components/pages/personalized-content/orders-page/order-card.tsx";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { ProductCard } from "@/components/pages/personalized-content/orders-page/product-card.tsx";

export const YourOrdersPage = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Navbar />
      <main className="flex-1 container mx-auto p-10">
        <div>
          <h1 className="font-bold text-2xl">Your Orders</h1>
          <hr className="mt-5" />
        </div>
        <Tabs defaultValue="your-orders" className="mt-5 w-full">
          <TabsList className="w-full">
            <TabsTrigger value="your-orders" className="w-full">
              Your Orders
            </TabsTrigger>
            <TabsTrigger value="buy-again" className="w-full">
              Buy Again
            </TabsTrigger>
            <TabsTrigger value="not-shipped-yet" className="w-full">
              Not Shipped Yet
            </TabsTrigger>
            <TabsTrigger value="cancelled-orders" className="w-full">
              Cancelled Orders
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="your-orders"
            className="mt-5 flex flex-col space-y-5"
          >
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
          </TabsContent>
          <TabsContent value="buy-again" className="mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </TabsContent>
          <TabsContent value="not-shipped-yet" className="mt-5">
            <OrderCard />
          </TabsContent>
          <TabsContent
            value="cancelled-orders"
            className="mt-5 space-y-5 flex flex-col"
          >
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

