import { DateRangePicker } from "@/components/ui/date-range-picker";
import TooltipComponent from "@/components/tooltip-component";
import { cn } from "@/lib/utils";
import {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
  DataTableDownloadRowsButtonType,
} from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterableColumns?: DataTableFilterableColumn<TData>[];
  searchableColumns?: DataTableSearchableColumn<TData>[];
  searchPlaceholder?: string;
  DownloadRowAction?: DataTableDownloadRowsButtonType<TData>;
}

export function DataTableToolbar<TData>({
  table,
  filterableColumns = [],
  searchableColumns = [],
  searchPlaceholder = "Search here...",
  DownloadRowAction,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [isRotating, setRotating] = useState(false);
  const hasSearchableColumns = searchableColumns.length > 0;

  const handleRefreshClick = () => {
    setRotating(true);
    setTimeout(() => {
      setRotating(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col-reverse justify-between items-stretch gap-2">
      <div className="flex flex-col-reverse md:flex-row md:items-center justify-between">
        <div className="flex flex-wrap mt-1 md:mt-0 md:flex-row flex-1 md:items-center justify-start gap-1">
          {hasSearchableColumns ? (
            // Render individual inputs for searchable columns
            searchableColumns.map(
              (column) =>
                table.getColumn(column.id ? String(column.id) : "") && (
                  <Input
                    key={String(column.id)}
                    placeholder={`Filter ${column.title}...`}
                    value={
                      (table
                        .getColumn(String(column.id))
                        ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                      table
                        .getColumn(String(column.id))
                        ?.setFilterValue(event.target.value)
                    }
                    className="h-8 grow md:grow-0 w-[150px] lg:w-[250px]"
                  />
                ),
            )
          ) : (
            // Render a single input for global filtering
            <Input
              placeholder={searchPlaceholder}
              value={table.getState().globalFilter}
              onChange={(e) => table.setGlobalFilter(String(e.target.value))}
              className="h-8 grow md:grow-0 w-[150px] lg:w-[250px]"
            />
          )}
          {DownloadRowAction && <DownloadRowAction table={table} />}
          <TooltipComponent message="Refetch Data" delayDuration={250}>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-2 border-dashed"
              onClick={handleRefreshClick}
            >
              <RefreshCw
                color="#000"
                className={cn("", isRotating ? "animate-spin" : "")}
              />
            </Button>
          </TooltipComponent>
          {filterableColumns.length > 0 &&
            filterableColumns.map(
              (column) =>
                table.getColumn(column.id ? String(column.id) : "") && (
                  <DataTableFacetedFilter
                    key={String(column.id)}
                    column={table.getColumn(column.id ? String(column.id) : "")}
                    title={column.title}
                    options={column.options}
                  />
                ),
            )}
        </div>
        <DateRangePicker />
        <DataTableViewOptions table={table} />
      </div>
      {isFiltered && (
        <Button
          variant="destructive"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3 inline-flex self-end w-fit border border-destructive-foreground/50"
        >
          Reset
          <Cross2Icon className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
