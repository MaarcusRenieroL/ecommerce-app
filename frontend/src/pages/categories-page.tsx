import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navigation/navbar.tsx";

export const CategoriesPage = () => {
	
	const categories = [
		{ id: 1, name: "Electronics", image: "/assets/placeholder.svg", description: "Latest gadgets and tech innovations" },
		{ id: 2, name: "Clothing", image: "/assets/placeholder.svg", description: "Trendy fashion for all seasons" },
		{ id: 3, name: "Home & Garden", image: "/assets/placeholder.svg", description: "Everything for your living space" },
		{ id: 4, name: "Sports & Outdoors", image: "/assets/placeholder.svg", description: "Gear up for your active lifestyle" },
		{ id: 5, name: "Beauty & Personal Care", image: "/assets/placeholder.svg", description: "Look and feel your best" },
		{ id: 6, name: "Books & Stationery", image: "/assets/placeholder.svg", description: "For readers and writers alike" },
		{ id: 7, name: "Toys & Games", image: "/assets/placeholder.svg", description: "Fun for all ages" },
		{ id: 8, name: "Automotive", image: "/assets/placeholder.svg", description: "Keep your ride in top shape" },
	]
	
	return (
		<div>
			<Navbar />
			<main className="flex-grow container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-8">Shop by Category</h1>
				
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{categories.map((category) => (
						<Card key={category.id} className="overflow-hidden">
							<CardContent className="p-0">
								<img
									src={category.image}
									alt={category.name}
									className="w-full h-48 object-cover"
								/>
								<div className="p-4">
									<h2 className="text-xl font-semibold mb-2">{category.name}</h2>
									<p className="text-gray-600 mb-4">{category.description}</p>
									<a href={`/category/${category.name.toLowerCase().replace(' & ', '-')}`}>
										<Button>
											Explore {category.name}
										</Button>
									</a>
							</div>
						</CardContent>
						</Card>
						))}
				</div>
			</main>
		</div>
	)
}