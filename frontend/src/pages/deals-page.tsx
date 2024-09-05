import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import {Navbar} from "@/components/navigation/navbar.tsx";

export const DealsPage = () => {
	
	const deals = [
		{ id: 1, name: "Smart TV 55\"", originalPrice: 799.99, salePrice: 599.99, discount: 25, rating: 4.5, image: "/assets/placeholder.svg" },
		{ id: 2, name: "Wireless Earbuds", originalPrice: 149.99, salePrice: 99.99, discount: 33, rating: 4.7, image: "/assets/placeholder.svg" },
		{ id: 3, name: "Robot Vacuum Cleaner", originalPrice: 299.99, salePrice: 199.99, discount: 33, rating: 4.3, image: "/assets/placeholder.svg" },
		{ id: 4, name: "Electric Toothbrush", originalPrice: 89.99, salePrice: 59.99, discount: 33, rating: 4.6, image: "/assets/placeholder.svg" },
		{ id: 5, name: "Fitness Tracker", originalPrice: 129.99, salePrice: 79.99, discount: 38, rating: 4.4, image: "/assets/placeholder.svg" },
		{ id: 6, name: "Blender", originalPrice: 79.99, salePrice: 49.99, discount: 37, rating: 4.2, image: "/assets/placeholder.svg" },
	]
	
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-grow container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-8">Hot Deals</h1>
				
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{deals.map((deal) => (
						<Card key={deal.id}>
							<div className="relative">
								<img
									src={deal.image}
									alt={deal.name}
									className="w-full h-48 object-cover rounded-md mb-4"
								/>
								<span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
                    {deal.discount}% OFF
                  </span>
							</div>
							<CardContent className="p-4">
								<h3 className="font-semibold mb-2">{deal.name}</h3>
								<div className="flex items-center mb-2">
									{Array(5).fill(null).map((_, i) => (
										<Star
											key={i}
											className={`h-4 w-4 ${
												i < Math.floor(deal.rating)
													? 'text-yellow-400 fill-yellow-400'
													: 'text-gray-300 fill-gray-300'
											}`}
										/>
									))}
									<span className="ml-2 text-sm text-gray-600">{deal.rating}</span>
								</div>
								<div className="flex justify-between items-center mb-4">
									<div>
										<span className="font-bold text-lg">${deal.salePrice.toFixed(2)}</span>
										<span className="ml-2 text-sm text-gray-500 line-through">${deal.originalPrice.toFixed(2)}</span>
									</div>
									<span
										className="text-green-600 font-semibold">Save ${(deal.originalPrice - deal.salePrice).toFixed(2)}</span>
								</div>
								<Button className="w-full">Add to Cart</Button>
							</CardContent>
						</Card>
					))}
				</div>
				
				{/* View More Deals Button */}
				<div className="mt-8 text-center">
					<Button size="lg">View More Deals</Button>
				</div>
			</main>
		</div>
	)
}