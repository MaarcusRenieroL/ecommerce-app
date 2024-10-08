import { Table } from "@tanstack/react-table";

export type User = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  hasBusinessAccount: boolean;
};

export type Product = {
  reviews: {
    id: string;
    author: string;
    comment: string;
    rating: number;
  }[];
  features: string[];
  rating: number;
  reviewCount: number;
  id: string;
  productName: string;
  productDescription: string;
  price: number;
  quantityInStock: number;
  productImages: Array<Image>;
  category: Category;
  sizes: Array<Size>;
  colors: Array<Color>;
};

export type Color = {
  id: number;
  name: string;
  value: string;
};

export type Size = {
  id: number;
  name: string;
  value: string;
};

export type Category = {
  id: string;
  categoryName: string;
};

export type CategoryWithId = {
  category: {
    name: string;
  },
  vendorId: string;
}

export type Image = {
  id: number;
  url: string;
};

export type Filter = {
  id: number;
  name: string;
};

// Data table Types
export type Option = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;
type DotNestedKeys<T> = (
  T extends object
    ? {
        [K in Exclude<
          keyof T,
          symbol
        >]: `${K}${DotPrefix<DotNestedKeys<T[K]>>}`;
      }[Exclude<keyof T, symbol>]
    : ""
) extends infer D
  ? Extract<D, string>
  : never;

export interface DataTableSearchableColumn<TData> {
  id: DotNestedKeys<TData>;
  title: string;
}
export interface DataTableVisibleColumn<TData> {
  id: DotNestedKeys<TData>;
  value: boolean;
}
export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[];
}

interface DataTableButtonProps<TData> {
  table: Table<TData>;
}
export type DataTableDownloadRowsButtonType<TData> = React.ComponentType<
  DataTableButtonProps<TData>
>;
