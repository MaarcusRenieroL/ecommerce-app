import { DataTable } from "@/components/data-table";
import { VendorNavbar } from "@/components/navigation/vendor-navbar";

export const VendorProductsPage = () => {

  return (
    <div>
      <VendorNavbar />
      <main className="p-10">
        <div>
          <div className="flex items-center justify-between w-full gap-5">
            <h1 className="text-2xl font-bold">Products Page</h1>
          </div>
          <hr className="mt-5"/>
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
