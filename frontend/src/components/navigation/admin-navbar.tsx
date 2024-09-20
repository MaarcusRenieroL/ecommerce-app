import { useEffect, useState } from "react";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { AccountNav } from "@/components/navigation/account-nav.tsx";
import { isLoggedIn } from "@/lib/utils.ts";

export const AdminNavbar = () => {
	const [ authenticated, setAuthenticated ] = useState(false);
	const [ role, setRole ] = useState("");

	const adminLinks = [
		{ name: "Dashboard", href: "/dashboard" },
		{ name: "Users", href: "/users" },
		{ name: "Products", href: "/products" },
		{ name: "Categories", href: "/categories" },
		{ name: "Deals", href: "/deals" },
		{ name: "Sizes", href: "/sizes" },
		{ name: "Colors", href: "/colors" },
		{ name: "Orders", href: "/orders" },
		{ name: "Settings", href: "/settings" },
		{ name: "Reports", href: "/reports" },
		{ name: "Audit Logs", href: "/audit-logs" },
	];
	
	
	
	useEffect(() => {
		const checkAuthentication = async () => {
			const response = await isLoggedIn();
			setAuthenticated(response.status === "OK")
			setRole(response.data.role);
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
              <ShoppingCart />
              <h1 className="font-bold">ShopEase</h1>
            </span>
					</a>
					{adminLinks.map((link, index) => (
						<a href={link.href} key={index++}>
							{link.name}
						</a>
					))}
				</div>
				<div className="flex items-center space-x-5">
					{!authenticated && <a href="/auth/sign-in">
              <Button>Sign In / Sign Up</Button>
          </a>}
					{authenticated && <AccountNav role={role} hasBusiness={true} />}
				</div>
			</header>
			<header
				className="flex lg:hidden items-center justify-between px-6 py-4 border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 gap-5">
				<span className="flex space-x-3 items-center">
            <ShoppingCart/>
            <h1 className="font-bold">ShopEase</h1>
          </span>
				<div className="flex items-center space-x-5">
					{!authenticated && <a href="/auth/sign-in">
              <Button>Sign In</Button>
          </a>}
					{authenticated && <AccountNav role={role} hasBusiness={true}/>}
				</div>
			</header>
		</>
	);
};
