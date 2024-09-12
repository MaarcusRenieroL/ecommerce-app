import { Navbar } from "@/components/navigation/navbar.tsx";
import { ProductsList } from "@/components/pages/products-page/products-list.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { FilterModal } from "@/components/pages/products-page/filter-modal.tsx";
import { getAllProducts } from "@/lib/spring-boot-api.ts";
import { useEffect, useState } from "react";

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await getAllProducts();

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            All Products
            <span className="text-sm font-normal text-muted-foreground ml-2">
              ({products.length} products)
            </span>
          </h2>
          <div className="flex items-center space-x-5">
            <Select defaultValue="relevance">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low-high">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="price-high-low">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
            <FilterModal />
          </div>
        </div>
        <ProductsList products={products} />
      </main>
    </div>
  );
};
