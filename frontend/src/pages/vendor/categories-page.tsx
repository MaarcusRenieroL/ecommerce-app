import { DataTable } from "@/components/data-table";
import { Navbar } from "@/components/navigation/navbar.tsx";

export const VendorCategoriesPage = () => {
  return (
    <div>
      <Navbar />
      <main className="p-10">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <hr className="mt-5" />
        </div>
        <div className="mt-5">
          <DataTable
            data={[]}
            columns={[]}
            messages={{
              emptyDataMessage: {
                title: "Empty",
                description: "No data found",
              },
              filteredDataNotFoundMessage: {
                title: "Empty",
                description: "No data found when filter is applied",
              },
            }}
          />
        </div>
      </main>
    </div>
  );
};
