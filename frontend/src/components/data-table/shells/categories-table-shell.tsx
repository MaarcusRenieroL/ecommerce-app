"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import React, { FC } from "react";
import { DataTable } from "@/components/data-table";
import { UpdateCategoryModal } from "@/components/pages/vendor/categories/update-category-modal.tsx";
import { DeleteCategoryModal } from "@/components/pages/vendor/categories/delete-category-modal.tsx";

type Props = {
	data: {
		name: string;
	}[];
}

export const CategoriesTableShell: FC<Props> = ({ data }) => {
	const CategoriesColumn = React.useMemo<ColumnDef<{
		name: string
	}>[]>(
		() => [
			{
				id: "select",
				header: ({ table }) => (
					<Checkbox
						checked={table.getIsAllPageRowsSelected()}
						onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
						aria-label="Select all"
						className="translate-y-[2px]"
					/>
				),
				cell: ({ row }) => (
					<Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" className="translate-y-[2px]" />
				),
				enableSorting: false,
				enableHiding: false,
			},
			{
				id: "name",
				header: ({ column }) => (
					<div>
						<DataTableColumnHeader className="flex items-center justify-center" column={column} title="Name" />
					</div>
				),
				cell: ({ row }) => <div className="min-w-max mr-auto text-center">{row.getValue("name")}</div>,
				accessorKey: "name",
				enableSorting: true,
				enableHiding: true,
			},
			{
				id: "actions",
				header: () => <div className="flex min-w-max items-center justify-center">Actions</div>,
				cell: ({ row }) => (
					<div className="min-w-max space-x-5 flex items-center justify-center">
						<UpdateCategoryModal category={row.original} />
						<DeleteCategoryModal category={row.original} />
					</div>
				),
			},
		],
		[data]
	);
	return (
		<DataTable
			data={data ?? []}
			columns={CategoriesColumn}
			filterableColumns={[]}
			searchPlaceholder="Search Posts..."
			messages={{
				filteredDataNotFoundMessage: { title: "No posts Found!", description: "Add some posts to get started!" },
				emptyDataMessage: { title: "No posts Found!", description: "Add some posts to get started!" },
			}}
		/>
	);
};