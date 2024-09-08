import { Menu, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet.tsx";
import { useLocation } from "react-router-dom";
import { clsx } from "clsx";
import { AccountNav } from "@/components/navigation/account-nav.tsx";

export const AdminNavbar = () => {
  const location = useLocation();

  return (
    <>
      <header className="w-full lg:flex hidden items-center justify-between px-6 py-4 border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex items-center space-x-6">
          <a href="/">
            <span className="flex space-x-3 items-center">
              <ShoppingCart />
              <h1 className="font-bold">ShopEase</h1>
            </span>
          </a>
          <a href="/dashboard">Dashboard</a>
          <a href="/products">Products</a>
          <a href="/categories">Categories</a>
          <a href="/deals">Deals</a>
          <a href="/sizes">Sizes</a>
          <a href="/orders">Orders</a>
        </div>
        <div className="flex items-center space-x-5">
          <a href="/auth/sign-in">
            <Button>Sign In / Sign Up</Button>
          </a>
          <AccountNav />
        </div>
      </header>
      <header className="flex lg:hidden items-center justify-between px-6 py-4 border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 gap-5">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="space-x-3 flex items-center mb-10">
                <ShoppingCart className="h-4 w-4" />
                <h1>ShopEase</h1>
              </SheetTitle>
              <div className="flex flex-col space-y-5">
                <a
                  href="/"
                  className={clsx(
                    "flex justify-start items-center gap-3 hover:bg-secondary border-transparent border py-2 px-4 rounded-md hover:border-border hover:border transition-all duration-200 ease-in-out",
                    location.pathname === "/" &&
                      "text-primary font-semibold border-border bg-secondary",
                  )}
                >
                  Home
                </a>
                <a
                  href="/products"
                  className={clsx(
                    "flex justify-start items-center gap-3 hover:bg-secondary border-transparent border py-2 px-4 rounded-md hover:border-border hover:border transition-all duration-200 ease-in-out",
                    location.pathname === "/products" &&
                      "text-primary font-semibold border-border bg-secondary",
                  )}
                >
                  Products
                </a>
                <a
                  href="/categories"
                  className={clsx(
                    "flex justify-start items-center gap-3 hover:bg-secondary border-transparent border py-2 px-4 rounded-md hover:border-border hover:border transition-all duration-200 ease-in-out",
                    location.pathname === "/categories" &&
                      "text-primary font-semibold border-border bg-secondary",
                  )}
                >
                  Categories
                </a>
                <a
                  href="/deals"
                  className={clsx(
                    "flex justify-start items-center gap-3 hover:bg-secondary border-transparent border py-2 px-4 rounded-md hover:border-border hover:border transition-all duration-200 ease-in-out",
                    location.pathname === "/deals" &&
                      "text-primary font-semibold border-border bg-secondary",
                  )}
                >
                  Deals
                </a>
                <a
                  href="/sizes"
                  className={clsx(
                    "flex justify-start items-center gap-3 hover:bg-secondary border-transparent border py-2 px-4 rounded-md hover:border-border hover:border transition-all duration-200 ease-in-out",
                    location.pathname === "/sizes" &&
                      "text-primary font-semibold border-border bg-secondary",
                  )}
                >
                  Sizes
                </a>
                <a
                  href="/orders"
                  className={clsx(
                    "flex justify-start items-center gap-3 hover:bg-secondary border-transparent border py-2 px-4 rounded-md hover:border-border hover:border transition-all duration-200 ease-in-out",
                    location.pathname === "/orders" &&
                      "text-primary font-semibold border-border bg-secondary",
                  )}
                >
                  Orders
                </a>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <a href="/">
          <span className="flex space-x-3 items-center">
            <ShoppingCart />
            <h1 className="font-bold">ShopEase</h1>
          </span>
        </a>
        <div className="flex items-center space-x-5">
          <a href="/auth/sign-in">
            <Button>Sign In</Button>
          </a>
        </div>
      </header>
    </>
  );
};