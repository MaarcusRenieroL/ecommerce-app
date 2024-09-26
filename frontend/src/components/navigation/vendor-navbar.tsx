import { useEffect, useState } from "react";

import { Menu, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet.tsx";
import { useLocation } from "react-router-dom";
import { clsx } from "clsx";
import { AccountNav } from "@/components/navigation/account-nav.tsx";
import { isLoggedIn } from "@/lib/utils.ts";

export const VendorNavbar = () => {
	const location = useLocation();
	const [ authenticated, setAuthenticated ] = useState(false);
	const [ hasBusiness, setHasBusiness ] = useState(false);
	const [ role, setRole ] = useState("");
	
	const vendorLinks = [
		{ name: "Dashboard", href: "/dashboard" },
		{ name: "Products", href: "/products" },
		{ name: "Categories", href: "/categories" },
		{ name: "Deals", href: "/deals" },
		{ name: "Sizes", href: "/sizes" },
		{ name: "Orders", href: "/orders" },
		{ name: "Settings", href: "/settings" },
	]
	
	useEffect(() => {
		const checkAuthentication = async () => {
			const response = await isLoggedIn();
			setAuthenticated(response.status === "OK")
			setRole(response.data.role);
			setHasBusiness(response.data.hasBusiness)
			return;
		}
		
		checkAuthentication();
	}, []);
	
	return (
		<>
			<header
				className="w-full lg:flex hidden items-center justify-between px-6 py-4 border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
				<div className="flex items-center space-x-6">
					<a href="/">
            <span className="flex space-x-3 items-center">
              <ShoppingCart/>
              <h1 className="font-bold">ShopEase</h1>
            </span>
					</a>
					
					{vendorLinks.map((link, index) => (
						<a href={`/vendor${link.href}`} key={index++}>
							{link.name}
						</a>
					))}
				
				</div>
				<div className="flex items-center space-x-5">
					{!authenticated && <a href="/auth/sign-in">
              <Button>Sign In / Sign Up</Button>
          </a>}
					{authenticated && <AccountNav role={role} hasBusiness={hasBusiness}/>}
				</div>
			</header>
			<header
				className="flex lg:hidden items-center justify-between px-6 py-4 border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 gap-5">
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="outline" size="icon">
							<Menu className="h-4 w-4"/>
						</Button>
					</SheetTrigger>
					<SheetContent side="left">
						<SheetHeader>
							<SheetTitle className="space-x-3 flex items-center mb-10">
								<ShoppingCart className="h-4 w-4"/>
								<h1>ShopEase</h1>
							</SheetTitle>
							<div className="flex flex-col space-y-5">
								{vendorLinks.map((link, index) => (
									<a href={`/vendor${link.href}`} key={index++} className={clsx(
										"flex justify-start items-center gap-3 hover:bg-secondary border-transparent border py-2 px-4 rounded-md hover:border-border hover:border transition-all duration-200 ease-in-out",
										location.pathname === `/vendor${link.href}` &&
										"text-primary font-semibold border-border bg-secondary",
									)}>
										{link.name}
									</a>
								))}
							</div>
						</SheetHeader>
					</SheetContent>
				</Sheet>
				<span className="flex space-x-3 items-center">
            <ShoppingCart/>
            <h1 className="font-bold">ShopEase</h1>
          </span>
				<div className="flex items-center space-x-5">
					{!authenticated && <a href="/auth/sign-in">
              <Button>Sign In</Button>
          </a>}
					{authenticated && <AccountNav role={role} hasBusiness={hasBusiness}/>}
				</div>
			</header>
		</>
	);
};
