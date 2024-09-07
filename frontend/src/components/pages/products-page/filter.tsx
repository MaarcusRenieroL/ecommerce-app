import { Button } from "@/components/ui/button.tsx";
import { Filter as FilterType } from "@/lib/types";
import { FC } from "react";

type Props = {
  name: string;
  data: Array<FilterType>;
};

export const Filter: FC<Props> = ({ name, data }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data.map((filter) => (
          <div key={filter.id} className="flex items-center">
            <Button variant="outline">{filter.name}</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

