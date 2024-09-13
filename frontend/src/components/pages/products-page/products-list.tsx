import { FC, useState } from "react";

import {
  Pagination,
  PaginationItem,
  PaginationContent,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

import { Product } from "@/lib/types.ts";
import {ProductCard} from "@/components/pages/products-page/product-card.tsx";

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
        {products.slice(startIndex, endIndex).map((product) => (
            <ProductCard product={product} key={product.id} />
        ))}
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
