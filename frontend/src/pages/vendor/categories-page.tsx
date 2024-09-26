import { VendorNavbar } from "@/components/navigation/vendor-navbar.tsx";
import { AddNewCategoryModal } from "@/components/pages/vendor/categories/add-new-category-modal.tsx";
import { FC } from "react";
import { CategoriesTableShell } from "@/components/data-table/shells/categories-table-shell.tsx";

type Props = {
  categories: {
    id: string;
    name: string;
  }[];
}

export const VendorCategoriesPage: FC<Props> = ({ categories }) => {
  console.log(categories)
  return (
    <div>
      <VendorNavbar />
      <main className="p-10">
        <div>
          <div className="flex items-center justify-between w-full">
            <h1 className="text-2xl font-bold">Categories</h1>
            <AddNewCategoryModal />
          </div>
          <hr className="mt-5"/>
        </div>
        <div className="mt-5">
          <CategoriesTableShell data={categories} />
        </div>
      </main>
    </div>
  );
};
