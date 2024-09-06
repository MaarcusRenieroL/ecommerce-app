import { Navbar } from "@/components/navigation/navbar.tsx";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Bell, Database, DollarSign, Locate, Lock, ShoppingCart } from "lucide-react";

export const YourAccountPage = () => {
	
	const links = [
		{ id: 1, title: "Your Orders", description: "Track return or buy things again", href: "/your-orders", icon: ShoppingCart },
		{ id: 2, title: "Login and Security", description: "Edit login, name and mobile number", href: "/login-and-security", icon: Lock },
		{ id: 3, title: "Your Address", description: "Edit addresses for orders and gift", href: "/your-address", icon: Locate },
		{ id: 4, title: "Payment Options", description: "Edit or add payment options", href: "/payment-options", icon: DollarSign },
		{ id: 5, title: "Alerts and Notifications", description: "Edit email alerts, messages and ads", href: "/alerts-and-notifications", icon: Bell },
		{ id: 6, title: "Manage Your Data", description: "Request your data, manage apps and services", href: "/request-your-data", icon: Database },
	]
	
	return (
		<div style={{ height: "100vh" }}>
			<Navbar />
			<main className="flex-1 container mx-auto px-4 py-8">
				<div>
					<h1 className="text-2xl font-bold">Your Account</h1>
					<hr className="mt-5"/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
					{links.map((link) => (
						<a href={`/account/${link.href}`}>
							<Card>
								<CardHeader>
									<div className="flex items-center gap-5">
										<link.icon />
										<div className="space-y-3">
											<CardTitle>{link.title}</CardTitle>
											<CardDescription>{link.description}</CardDescription>
										</div>
									</div>
								</CardHeader>
							</Card>
						</a>
					))}
				</div>
			</main>
		</div>
	)
}