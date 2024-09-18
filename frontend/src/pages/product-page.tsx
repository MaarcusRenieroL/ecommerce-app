import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/navigation/navbar.tsx";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "@/components/ui/carousel.tsx";
import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { getProductById, getProductsByCategory } from "@/lib/spring-boot-api.ts";
import { Color, Image, Product } from "@/lib/types.ts";

export const ProductPage = () => {
	const [quantity, setQuantity] = useState(1);
	const [data, setData] = useState<Product | null>(null);
	const [relatedProducts, setRelatedProducts] = useState([]);
	const { id } = useParams<{ id: string }>();
	
	// Fetch product data only once when component mounts
	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await getProductById(id as string);
				setData(response.data);
			} catch (error) {
				console.error("Failed to fetch product", error);
			}
		};
		
		fetchProduct();
	}, [id]); // Only run when the `id` changes
	
	// Fetch related products only after `data` (product) is loaded
	useEffect(() => {
		const fetchRelatedProducts = async () => {
			try {
				if (data?.category?.categoryName) {
					const response = await getProductsByCategory(data.category.categoryName);
					setRelatedProducts(response);
				}
			} catch (error) {
				console.error("Failed to fetch related products", error);
			}
		};
		
		// Fetch related products only after the main product data is loaded
		if (data) {
			fetchRelatedProducts();
		}
	}, [data]); // Only run when `data` is available
	
	if (!data) {
		return <div>Loading...</div>;
	}
	
	return (
		<div>
			<Navbar />
			<main className="flex-grow">
				<div className="container mx-auto px-4 py-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div>
							<Carousel className="w-full max-w-xs mx-auto">
								<CarouselContent>
									{data.productImages.map((image: Image, index: number) => (
										<CarouselItem key={index}>
											<img
												src={image.url}
												alt={`${data.productName} - View ${index + 1}`}
												className="w-full h-auto rounded-lg"
											/>
										</CarouselItem>
									))}
								</CarouselContent>
								<CarouselPrevious />
								<CarouselNext />
							</Carousel>
						</div>
						
						{/* Product Details */}
						<div>
							<h1 className="text-3xl font-bold mb-2">{data.productName}</h1>
							<div className="flex items-center mb-4">
								<div className="flex">
									{[1, 2, 3, 4, 5].map((star) => (
										<Star
											key={star}
											className={`h-5 w-5 ${
												star <= Math.round(4.3231)
													? "text-yellow-400 fill-yellow-400"
													: "text-gray-300 fill-gray-300"
											}`}
										/>
									))}
								</div>
								{data.rating && data.reviewCount && (
									<span className="ml-2 text-sm text-gray-600">
                    {data.rating} ({data.reviewCount} reviews)
                  </span>
								)}
							</div>
							<p className="text-2xl font-bold mb-4">${data.price.toFixed(2)}</p>
							<p className="mb-4">{data.productDescription}</p>
							
							{/* Color Selection */}
							<div className="mb-4">
								<h3 className="font-semibold mb-2">Color:</h3>
								<div className="flex space-x-2">
									{data.colors.map((color: Color) => (
										<Button variant="outline" key={color.id}>
											{color.name}
										</Button>
									))}
								</div>
							</div>
							
							{/* Quantity Selector */}
							<div className="flex items-center mb-4">
								<Button
									variant="outline"
									size="icon"
									onClick={() => setQuantity(Math.max(1, quantity - 1))}
								>
									<Minus className="h-4 w-4" />
								</Button>
								<span className="mx-4 font-semibold">{quantity}</span>
								<Button
									variant="outline"
									size="icon"
									onClick={() => setQuantity(quantity + 1)}
								>
									<Plus className="h-4 w-4" />
								</Button>
							</div>
							
							{/* Add to Cart Button */}
							<Button className="w-full mb-4">
								<ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
							</Button>
						</div>
					</div>
					
					{/* Product Tabs */}
					<Tabs defaultValue="features" className="mt-8">
						<TabsList>
							<TabsTrigger value="features">Features</TabsTrigger>
							<TabsTrigger value="reviews">Reviews</TabsTrigger>
						</TabsList>
						<TabsContent value="features">
							<Card>
								<CardContent className="pt-6">
									<ul className="list-disc pl-5 space-y-2">
										{data.features &&
											data.features.map((feature, index) => (
												<li key={index}>{feature}</li>
											))}
									</ul>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value="reviews">
							<Card>
								<CardContent className="pt-6">
									{data.reviews &&
										data.reviews.map((review) => (
											<div
												key={review.id}
												className="mb-4 pb-4 border-b last:border-b-0"
											>
												<div className="flex items-center mb-2">
													<div className="flex">
														{[1, 2, 3, 4, 5].map((star) => (
															<Star
																key={star}
																className={`h-4 w-4 ${
																	star <= review.rating
																		? "text-yellow-400 fill-yellow-400"
																		: "text-gray-300 fill-gray-300"
																}`}
															/>
														))}
													</div>
													<span className="ml-2 font-semibold">
                            {review.author}
                          </span>
												</div>
												<p>{review.comment}</p>
											</div>
										))}
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
					
					{/* Related Products */}
					<section className="mt-12">
						<h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
							{relatedProducts.map((product: Product) => (
								<Card key={product.id}>
									<img
										src={
											product.productImages
												? product.productImages[0].url
												: "/assets/placeholder.svg"
										}
										alt={product.productName}
										className="w-full h-48 object-cover mb-4 rounded"
									/>
									<CardContent className="p-4">
										<h3 className="font-semibold mb-2">{product.productName}</h3>
										<p className="font-bold">${product.price.toFixed(2)}</p>
									</CardContent>
								</Card>
							))}
						</div>
					</section>
				</div>
			</main>
		</div>
	);
};
