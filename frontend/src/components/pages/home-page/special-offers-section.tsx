import { Card, CardContent } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";

export const SpecialOffersSection = () => {
  return (
		<section className="w-full py-7 md:py-14 lg:py-20 bg-gray-100 flex items-center justify-center">
			<div className="container px-4 md:px-6">
				<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">Special Offers</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card>
						<CardContent className="p-6">
							<h3 className="text-2xl font-bold mb-2">Flash Sale</h3>
							<p className="text-gray-500 mb-4">Get up to 70% off on selected items. Hurry, limited time only!</p>
							<Button>Shop Flash Sale</Button>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-6">
							<h3 className="text-2xl font-bold mb-2">New Arrivals</h3>
							<p className="text-gray-500 mb-4">Check out our latest products and be the first to get them!</p>
							<Button>View New Arrivals</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	)
}