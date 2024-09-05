import { Navbar } from "@/components/navigation/navbar.tsx";
import { HeroSection } from "@/components/pages/home-page/hero-section.tsx";
import { FeaturedProducts } from "@/components/pages/home-page/featured-products.tsx";
import { CategorySection } from "@/components/pages/home-page/category-section.tsx";
import { SpecialOffersSection } from "@/components/pages/home-page/special-offers-section.tsx";

export default function HomePage() {
	return (
		<div>
			<Navbar/>
			<main className="flex-1">
				<HeroSection />
				<FeaturedProducts />
				<CategorySection />
				<SpecialOffersSection />
			</main>
		</div>
	)
}