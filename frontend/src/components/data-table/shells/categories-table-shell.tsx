"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import React, { FC } from "react";
import { DataTable } from "@/components/data-table";

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
						<Button size="icon">
							<Edit className="h-4 w-4" />
						</Button>
						<Button variant="destructive" size="icon">
							<Trash className="h-4 w-4" />
						</Button>
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