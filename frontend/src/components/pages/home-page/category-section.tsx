import { Card, CardContent } from "@/components/ui/card.tsx";

export const CategorySection = () => {
  return (
    <section className="w-full py-7 md:py-14 lg:py-20 flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {["Electronics", "Fashion", "Home & Garden", "Sports"].map(
            (category) => (
              <Card key={category} className="group cursor-pointer">
                <img
                  alt={`${category} category`}
                  className="aspect-square object-cover w-full rounded-lg group-hover:opacity-75 transition-opacity"
                  src="/assets/placeholder.svg"
                  height="200"
                  width="200"
                />
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mt-2 text-center">
                    {category}
                  </h3>
                </CardContent>
              </Card>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

