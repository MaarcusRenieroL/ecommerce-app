import { Table } from "@tanstack/react-table";

export type User =  {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  phoneNumber: string;
  role?: string;
}

export type Product = {
  id: number;
  productName: string;
  description: string;
  price: number;
  quantityInStock: number;
  productImages: Array<Image>;
  category: Category;
  size: Size;
  color: Color;
};

export type Color = {
  id: number;
  name: string;
  value: string;
}

export type Size = {
  id: number;
  name: string;
  value: string;
}

export type Category = {
  id: number;
  categoryName: string;
}

export type Image = {
  id: number;
  url: string;
}

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
