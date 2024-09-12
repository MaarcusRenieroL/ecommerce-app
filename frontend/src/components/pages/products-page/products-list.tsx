import { FC, useState } from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Pagination,
  PaginationItem,
  PaginationContent,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Heart, ShoppingCart } from "lucide-react";

import { Product } from "@/lib/types.ts";

type Props = {
  products: Array<Product>;
};

export const ProductsList: FC<Props> = ({ products }) => {
  const rowsPerPage = 9;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.slice(startIndex, endIndex).map((product) => {
          console.log(startIndex, endIndex);
          return (
            <Card key={product.id}>
              <img
                src={"/assets/placeholder.svg"}
                alt={product.productName}
                className="w-full h-48 object-cover rounded-md mb-4 dark:brightness-[0.2] dark:grayscale"
              />
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.productName}</h3>
                <p className="font-bold">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter>
                <div className="hidden lg:flex items-center gap-5 w-full">
                  <Button className="w-full">Add to Cart</Button>
                  <Button variant="outline" className="w-full">
                    Add to Wishlist
                  </Button>
                </div>
                <div className="lg:hidden flex items-center justify-end gap-5">
                  <Button size="icon">
                    <span>
                      <ShoppingCart className="h-4 w-4" />
                    </span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <Pagination className="mt-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                startIndex === 0 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => {
                setStartIndex(startIndex - rowsPerPage);
                setEndIndex(endIndex - rowsPerPage);
              }}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              className={
                endIndex > products.length
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
              onClick={() => {
                setStartIndex(startIndex + rowsPerPage);
                setEndIndex(endIndex + rowsPerPage);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
