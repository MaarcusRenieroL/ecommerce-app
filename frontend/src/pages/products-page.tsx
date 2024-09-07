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

export const ProductsPage = () => {
  const products = [
    {
      id: 1,
      name: "Laptop Pro X1",
      price: 999.99,
      rating: 4.5,
      image: "/assets/placeholder.svg",
    },
    {
      id: 2,
      name: "UltraBook Slim",
      price: 799.99,
      rating: 4.2,
      image: "/assets/placeholder.svg",
    },
    {
      id: 3,
      name: "PowerBook Elite",
      price: 1299.99,
      rating: 4.8,
      image: "/assets/placeholder.svg",
    },
    {
      id: 4,
      name: "Budget Laptop",
      price: 499.99,
      rating: 3.9,
      image: "/assets/placeholder.svg",
    },
    {
      id: 5,
      name: "Student Notebook",
      price: 599.99,
      rating: 4.0,
      image: "/assets/placeholder.svg",
    },
    {
      id: 6,
      name: "Gaming Laptop Pro",
      price: 1499.99,
      rating: 4.7,
      image: "/assets/placeholder.svg",
    },
    {
      id: 7,
      name: "Executive Laptop Z",
      price: 1099.99,
      rating: 4.4,
      image: "/assets/placeholder.svg",
    },
    {
      id: 8,
      name: "TravelBook Air",
      price: 699.99,
      rating: 4.3,
      image: "/assets/placeholder.svg",
    },
    {
      id: 9,
      name: "Graphic Design Pro",
      price: 1699.99,
      rating: 4.9,
      image: "/assets/placeholder.svg",
    },
    {
      id: 10,
      name: "Business Laptop X5",
      price: 849.99,
      rating: 4.1,
      image: "/assets/placeholder.svg",
    },
    {
      id: 11,
      name: "Coding Laptop Ultimate",
      price: 1199.99,
      rating: 4.6,
      image: "/assets/placeholder.svg",
    },
    {
      id: 12,
      name: "WorkStation Beast",
      price: 1899.99,
      rating: 4.9,
      image: "/assets/placeholder.svg",
    },
    {
      id: 13,
      name: "Portable Chromebook",
      price: 349.99,
      rating: 3.8,
      image: "/assets/placeholder.svg",
    },
    {
      id: 14,
      name: "Multimedia Pro",
      price: 1399.99,
      rating: 4.7,
      image: "/assets/placeholder.svg",
    },
    {
      id: 15,
      name: "Developer Notebook Max",
      price: 949.99,
      rating: 4.4,
      image: "/assets/placeholder.svg",
    },
    {
      id: 16,
      name: "Gaming Laptop Ultimate",
      price: 1699.99,
      rating: 4.8,
      image: "/assets/placeholder.svg",
    },
    {
      id: 17,
      name: "Travel Laptop Compact",
      price: 649.99,
      rating: 4.2,
      image: "/assets/placeholder.svg",
    },
    {
      id: 18,
      name: "Designer Laptop Studio",
      price: 1599.99,
      rating: 4.9,
      image: "/assets/placeholder.svg",
    },
    {
      id: 19,
      name: "Student Chromebook",
      price: 399.99,
      rating: 3.7,
      image: "/assets/placeholder.svg",
    },
    {
      id: 20,
      name: "OfficeBook Essential",
      price: 529.99,
      rating: 4.0,
      image: "/assets/placeholder.svg",
    },
  ];

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

