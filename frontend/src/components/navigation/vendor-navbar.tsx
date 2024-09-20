import { useEffect, useState } from "react";

import { Menu, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet.tsx";
import { useLocation } from "react-router-dom";
import { clsx } from "clsx";
import { AccountNav } from "@/components/navigation/account-nav.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
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
	
	const initialCartItems = [
		{
			id: 1,
			name: "Premium Wireless Headphones",
			price: 199.99,
			quantity: 1,
			image: "/assets/placeholder.svg",
		},
		{
			id: 2,
			name: "Smartphone Model X",
			price: 699.99,
			quantity: 1,
			image: "/assets/placeholder.svg",
		},
		{
			id: 3,
			name: "Laptop Pro 15",
			price: 1299.99,
			quantity: 1,
			image: "/assets/placeholder.svg",
		},
	];
	
	const [ cartItems, setCartItems ] = useState(initialCartItems);
	
	const updateQuantity = (id: number, newQuantity: number) => {
		setCartItems(
			cartItems.map((item) =>
				item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item,
			),
		);
	};
	
	const removeItem = (id: number) => {
		setCartItems(cartItems.filter((item) => item.id !== id));
	};
	
	const subtotal = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const shipping = 10; // Placeholder shipping cost
	const total = subtotal + shipping;
	
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
						<a href={link.href} key={index++}>
							{link.name}
						</a>
					))}
				
				</div>
				{role === "CUSTOMER" && <div className="w-full flex items-center justify-center">
            <Input placeholder="Search products" className="w-1/2"/>
        </div>}
				<div className="flex items-center space-x-5">
					{!authenticated && <a href="/auth/sign-in">
              <Button>Sign In / Sign Up</Button>
          </a>}
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="outline" size="icon">
								<ShoppingCart className="h-4 w-4"/>
							</Button>
						</SheetTrigger>
						<SheetContent
							side="right"
							className="h-full flex flex-col items-start justify-between w-full"
						>
							<SheetHeader>
								<SheetTitle className="space-x-3 flex items-center mb-10">
									<ShoppingCart className="h-4 w-4"/>
									<h1>Cart</h1>
								</SheetTitle>
							</SheetHeader>
							<div className="w-full">
								{cartItems.length === 0 ? (
									<div className="text-center py-8">
										<p className="text-xl mb-4">Your cart is empty</p>
										<Button asChild>
											<a href="/">Continue Shopping</a>
										</Button>
									</div>
								) : (
									<div className="flex flex-col items-center justify-between">
										<ScrollArea className="h-[65vh] w-full">
											{cartItems.map((item) => (
												<Card key={item.id} className="mb-4 w-full">
													<img
														src={item.image}
														alt={item.name}
														className="w-full h-32 object-cover rounded mr-4"
													/>
													<CardContent className="p-4">
														<div className="flex flex-col items-center">
															<div className="flex-grow">
																<h3 className="font-semibold">{item.name}</h3>
																<p className="text-sm text-gray-500">
																	${item.price.toFixed(2)}
																</p>
															</div>
															<div className="flex items-center justify-between w-full mt-5">
																<div className="flex items-center">
																	<Button
																		variant="outline"
																		size="icon"
																		onClick={() =>
																			updateQuantity(item.id, item.quantity - 1)
																		}
																	>
																		<Minus className="h-4 w-4"/>
																	</Button>
																	<span className="mx-2 w-8 text-center">
                                    {item.quantity}
                                  </span>
																	<Button
																		variant="outline"
																		size="icon"
																		onClick={() =>
																			updateQuantity(item.id, item.quantity + 1)
																		}
																	>
																		<Plus className="h-4 w-4"/>
																	</Button>
																</div>
																<Button
																	variant="ghost"
																	size="icon"
																	className="ml-4"
																	onClick={() => removeItem(item.id)}
																>
																	<Trash2 className="h-4 w-4"/>
																</Button>
															</div>
														</div>
													</CardContent>
												</Card>
											))}
										</ScrollArea>
									</div>
								)}
							</div>
							<SheetFooter className="w-full flex !flex-col items-start space-y-5">
								<div className="border-t mt-5 w-full">
									<div className="flex justify-between font-semibold mt-5">
										<span>Total</span>
										<span>${total.toFixed(2)}</span>
									</div>
								</div>
								<Button className="w-full">Proceed to Cart</Button>
							</SheetFooter>
						</SheetContent>
					</Sheet>
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
									<a href={link.href} key={index++} className={clsx(
										"flex justify-start items-center gap-3 hover:bg-secondary border-transparent border py-2 px-4 rounded-md hover:border-border hover:border transition-all duration-200 ease-in-out",
										location.pathname === `/vendor/${link.href}` &&
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
				{role === "CUSTOMER" && <Input placeholder="Search products" className="w-full md:block hidden"/>}
				
				<div className="flex items-center space-x-5">
					{!authenticated && <a href="/auth/sign-in">
              <Button>Sign In</Button>
          </a>}
					{role === "CUSTOMER" && <Sheet>
              <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                      <ShoppingCart className="h-4 w-4"/>
                  </Button>
              </SheetTrigger>
              <SheetContent
                  side="right"
                  className="h-full flex flex-col items-start justify-between w-full"
              >
                  <SheetHeader>
                      <SheetTitle className="space-x-3 flex items-center mb-10">
                          <ShoppingCart className="h-4 w-4"/>
                          <h1>Cart</h1>
                      </SheetTitle>
                  </SheetHeader>
                  <div className="w-full">
										{cartItems.length === 0 ? (
											<div className="text-center py-8">
												<p className="text-xl mb-4">Your cart is empty</p>
												<Button asChild>
													<a href="/">Continue Shopping</a>
												</Button>
											</div>
										) : (
											<div className="flex flex-col items-center justify-between">
												<ScrollArea className="h-[65vh] w-full">
													{cartItems.map((item) => (
														<Card key={item.id} className="mb-4 w-full">
															<img
																src={item.image}
																alt={item.name}
																className="w-full h-32 object-cover rounded mr-4"
															/>
															<CardContent className="p-4">
																<div className="flex flex-col">
																	<div className="flex-grow">
																		<h3 className="font-semibold">{item.name}</h3>
																		<p className="text-sm text-gray-500">
																			${item.price.toFixed(2)}
																		</p>
																	</div>
																	<div className="flex items-center justify-between w-full mt-5">
																		<div className="flex items-center">
																			<Button
																				variant="outline"
																				size="icon"
																				onClick={() =>
																					updateQuantity(item.id, item.quantity - 1)
																				}
																			>
																				<Minus className="h-4 w-4"/>
																			</Button>
																			<span className="mx-2 w-8 text-center">
                                    {item.quantity}
                                  </span>
																			<Button
																				variant="outline"
																				size="icon"
																				onClick={() =>
																					updateQuantity(item.id, item.quantity + 1)
																				}
																			>
																				<Plus className="h-4 w-4"/>
																			</Button>
																		</div>
																		<Button
																			variant="ghost"
																			size="icon"
																			className="ml-4"
																			onClick={() => removeItem(item.id)}
																		>
																			<Trash2 className="h-4 w-4"/>
																		</Button>
																	</div>
																</div>
															</CardContent>
														</Card>
													))}
												</ScrollArea>
											</div>
										)}
                  </div>
                  <SheetFooter className="w-full flex !flex-col items-start space-y-5">
                      <div className="border-t mt-5 w-full">
                          <div className="flex justify-between font-semibold mt-5">
                              <span>Total</span>
                              <span>${total.toFixed(2)}</span>
                          </div>
                      </div>
                      <Button className="w-full">Proceed to Cart</Button>
                  </SheetFooter>
              </SheetContent>
          </Sheet>}
					{authenticated && <AccountNav role={role} hasBusiness={hasBusiness}/>}
				</div>
			</header>
		</>
	);
};
