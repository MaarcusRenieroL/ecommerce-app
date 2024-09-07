import { Button } from "@/components/ui/button.tsx";

export const HeroSection = () => {
  return (
    <section className="w-full py-7 md:py-14 lg:py-20 xl:py-48 bg-black flex items-cneter justify-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
              Summer Sale: Up to 50% Off
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
              Discover amazing deals on all your favorite products. Limited time
              offer!
            </p>
          </div>
          <div className="space-x-4">
            <Button>Shop Now</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

