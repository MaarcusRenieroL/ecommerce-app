import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navigation/navbar.tsx";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/lib/spring-boot-api.ts";
import { Category } from "@/lib/types.ts";

export const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await getAllCategories();

        setCategories(response);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);
  return (
    <div>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shop by Category</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category: Category) => (
            <Card key={category.id} className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={"/assets/placeholder.svg"}
                  alt={category.categoryName}
                  className="w-full h-48 object-cover dark:brightness-[0.2] dark:grayscale"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {category.categoryName}
                  </h2>
                  <p className="text-gray-600 mb-4"></p>
                  <a
                    href={`/category/${category.categoryName.toLowerCase().replace(" & ", "-")}`}
                  >
                    <Button>Explore {category.categoryName}</Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};
