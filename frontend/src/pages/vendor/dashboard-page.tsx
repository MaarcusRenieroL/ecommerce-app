import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { DateRangePicker } from "@/components/ui/date-range-picker";

import { cn } from "@/lib/utils";
import { OverviewCard } from "@/components/pages/admin/dashboard/overview-card";
import { Activity, CreditCard, DollarSign, ShoppingCart } from "lucide-react";
import { SalesChart } from "@/components/pages/admin/dashboard/sales-chart";
import { Navbar } from "@/components/navigation/navbar.tsx";

export const VendorDashboardPage = () => {
  return (
    <div>
      <Navbar />
      <main className="p-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between w-full text-left">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <DateRangePicker />
        </div>
        <hr className="mt-5" />
        <div className="space-y-6 p-1 mt-5">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <OverviewCard
              title="Total Revenue"
              value="0"
              description="Total revenue for your store"
              Icon={DollarSign}
            />
            <OverviewCard
              title="Sales"
              value="0"
              description="Total sales for your store"
              Icon={CreditCard}
            />
            <OverviewCard
              title="Orders"
              value="0"
              description="Total orders for your store"
              Icon={ShoppingCart}
            />
            <OverviewCard
              title="Customers"
              value="0"
              description="Total customers for your store"
              Icon={Activity}
            />
          </div>
          <div className="flex flex-col gap-4 2xl:flex-row">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Sales</CardTitle>
                <CardDescription>
                  Total sales in the last {10} days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SalesChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Customers</CardTitle>
                <CardDescription>
                  Customers who have purchased in the last {10} days
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
                    <Avatar className="size-9">
                      <AvatarFallback>AR</AvatarFallback>
                    </Avatar>
                    <div className="w-full space-y-1 text-sm">
                      <p className="font-medium leading-none">name</p>
                      <p className="break-all leading-none text-muted-foreground">
                        test@gmail.com
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-medium leading-none">100</p>
                </div>
              </CardContent>
              <CardFooter>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        className={cn(
                          "transition-opacity",
                          "pointer-events-none opacity-50",
                        )}
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext
                        className={cn(
                          "transition-opacity",
                          "pointer-events-none opacity-50",
                        )}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
