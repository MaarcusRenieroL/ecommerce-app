import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useEffect, useState } from "react";
import { getAllProducts } from "@/lib/spring-boot-api.ts";
import { Product } from "@/lib/types.ts";

export const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await getAllProducts();
        
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  return (
    <section className="w-full py-7 md:py-14 lg:py-20 bg-gray-100 dark:bg-background flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-20">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products && products.slice(0, 4).map((product: Product) => {
            return (
              <Card key={product.id}>
                <img
                  alt="Product image"
                  className="aspect-square object-cover w-full rounded-lg dark:brightness-[0.2] dark:grayscale"
                  height="200"
                  src={
                    product.productImages
                      ? (product.productImages[0].url as string)
                      : "/assets/placeholder.svg"
                  }
                  width="200"
                />
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mt-2">
                    {product.productName}
                  </h3>
                  <p className="text-sm text-gray-500">{product.description}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <span className="text-lg font-bold">{`$${product.price.toFixed(2)}`}</span>
                  <Button size="sm">Add to Cart</Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
