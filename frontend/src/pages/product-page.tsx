import { useState } from "react";

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

export const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);

  const product = {
    name: "Premium Wireless Headphones",
    price: 199.99,
    rating: 4.5,
    reviewCount: 128,
    description:
      "Experience crystal-clear audio with our Premium Wireless Headphones. Featuring advanced noise-cancellation technology, comfortable over-ear design, and long-lasting battery life, these headphones are perfect for music enthusiasts and professionals alike.",
    features: [
      "Active Noise Cancellation",
      "40-hour battery life",
      "Bluetooth 5.0 connectivity",
      "Comfortable memory foam ear cushions",
      "Built-in microphone for calls",
      "Foldable design for easy storage",
    ],
    images: [
      "/assets/placeholder.svg",
      "/assets/placeholder.svg",
      "/assets/placeholder.svg",
      "/assets/placeholder.svg",
    ],
    colors: ["Black", "Silver", "Blue"],
    reviews: [
      {
        id: 1,
        author: "John D.",
        rating: 5,
        comment:
          "Best headphones I've ever owned. The sound quality is amazing!",
      },
      {
        id: 2,
        author: "Sarah M.",
        rating: 4,
        comment:
          "Very comfortable for long listening sessions. Battery life is impressive.",
      },
      {
        id: 3,
        author: "Mike R.",
        rating: 4,
        comment:
          "Great noise cancellation, but the app could use some improvements.",
      },
    ],
  };

  // Placeholder related products
  const relatedProducts = [
    {
      id: 1,
      name: "Wireless Earbuds",
      price: 89.99,
      image: "/assets/placeholder.svg",
    },
    {
      id: 2,
      name: "Bluetooth Speaker",
      price: 129.99,
      image: "/assets/placeholder.svg",
    },
    {
      id: 3,
      name: "Audio Amplifier",
      price: 249.99,
      image: "/assets/placeholder.svg",
    },
    {
      id: 4,
      name: "Noise-Cancelling Headphones",
      price: 179.99,
      image: "/assets/placeholder.svg",
    },
  ];

  return (
    <div>
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              <Carousel className="w-full max-w-xs mx-auto">
                <CarouselContent>
                  {product.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <img
                        src={image}
                        alt={`${product.name} - View ${index + 1}`}
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
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 fill-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
              <p className="text-2xl font-bold mb-4">
                ${product.price.toFixed(2)}
              </p>
              <p className="mb-4">{product.description}</p>

              {/* Color Selection */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Color:</h3>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <Button key={color} variant="outline" className="w-20">
                      {color}
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
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews">
              <Card>
                <CardContent className="pt-6">
                  {product.reviews.map((review) => (
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
              {relatedProducts.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover mb-4 rounded"
                    />
                    <h3 className="font-semibold mb-2">{product.name}</h3>
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

