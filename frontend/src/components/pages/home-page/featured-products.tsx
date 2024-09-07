import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";

export const FeaturedProducts = () => {
  return (
    <section className="w-full py-7 md:py-14 lg:py-20 bg-gray-100 flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-20">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <Card key={i}>
              <img
                alt="Product image"
                className="aspect-square object-cover w-full rounded-lg dark:brightness-[0.2] dark:grayscale"
                height="200"
                src="/assets/placeholder.svg"
                width="200"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mt-2">Product Name</h3>
                <p className="text-sm text-gray-500">
                  Short description of the product
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <span className="text-lg font-bold">$99.99</span>
                <Button size="sm">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
