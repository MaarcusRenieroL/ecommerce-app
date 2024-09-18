import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

export const ProductCard = () => {
  return (
    <Card>
      <img
        src="/assets/placeholder.svg"
        alt="placeholder-image"
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">Product</h3>
        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`h-4 w-4 ${index < 4.3 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
            />
          ))}
          <span className="ml-2 text-sm text-muted-foreground">(4.3)</span>
        </div>
        <p className="font-bold">$123.34</p>
      </CardContent>
      <CardFooter>
        <div className="hidden lg:flex items-center gap-5 w-full">
          <Button className="w-full">Add to Cart</Button>
        </div>
        <div className="lg:hidden flex items-center justify-end gap-5">
          <Button size="icon">
            <span>
              <ShoppingCart className="h-4 w-4" />
            </span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
