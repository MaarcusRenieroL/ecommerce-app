import { Card, CardContent } from "@/components/ui/card.tsx";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/lib/spring-boot-api.ts";
import { Category } from "@/lib/types.ts";

export const CategorySection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await getAllCategories();

        setCategories(response.data);
      } catch (error: unknown) {
        console.error(error);
      }
    };

    getCategories();
  }, []);
  return (
    <section className="w-full py-7 md:py-14 lg:py-20 flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories && categories.slice(0, 4).map((category: Category) => (
            <Card key={category.id} className="group cursor-pointer">
              <img
                alt={category.categoryName}
                className="aspect-square object-cover w-full rounded-lg group-hover:opacity-75 transition-opacity"
                src="/assets/placeholder.svg"
                height="200"
                width="200"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mt-2 text-center">
                  {category.categoryName}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
