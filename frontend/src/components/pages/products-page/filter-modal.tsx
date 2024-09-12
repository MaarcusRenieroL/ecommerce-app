import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Filter } from "@/components/pages/products-page/filter.tsx";

export const FilterModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Filters</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription>Choose Filters</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Filter
            name="Category"
            data={[
              { id: 1, name: "Laptops" },
              { id: 2, name: "Mobile Phones" },
              { id: 3, name: "Headphones" },
            ]}
          />
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
