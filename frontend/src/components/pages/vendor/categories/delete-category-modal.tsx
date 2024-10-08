import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react";
import {
	Dialog, DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { deleteCategorySchema } from "@/lib/zod-schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { deleteCategory } from "@/lib/spring-boot-api"
import { useToast } from "@/components/ui/use-toast.tsx"
import { useState, FC } from "react";
import { useNavigate } from "react-router-dom"

type Props = {
	category: any
}

export const DeleteCategoryModal: FC<Props> = ({ category }) => {
	const [open, setOpen] = useState(false)
	const isDesktop = useMediaQuery("(min-width: 768px)")
	
	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button size="icon" variant="destructive">
						<Trash className="h-4 w-4" />
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Delete Category</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete this category from the database? (id: {category.id}))
						</DialogDescription>
					</DialogHeader>
					<DeleteCategoryForm category={category} />
				</DialogContent>
			</Dialog>
		)
	}
	
	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button size="icon" variant="destructive">
					<Trash className="h-4 w-4" />
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Delete Category</DrawerTitle>
					<DrawerDescription>
						Are you sure you want to delete this category from the database? (id: {category.id}))
					</DrawerDescription>
				</DrawerHeader>
				<DeleteCategoryForm category={category} />
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}

function DeleteCategoryForm({ category }: Props) {
	const isDesktop = useMediaQuery("(min-width: 768px)")
	const navigate = useNavigate();
	
	const { toast } = useToast();
	
	const form = useForm<z.infer<typeof deleteCategorySchema>>({
		resolver: zodResolver(deleteCategorySchema),
		defaultValues: {
			id: category.id
		}
	});
	
	const onSubmit = async (data: z.infer<typeof deleteCategorySchema>) => {
		try {
			
			console.log(data);
			
			const response = await deleteCategory(data);
			
			console.log(response)

			if (response.status === "OK") {
				toast({
					title: "Success",
					description: response.message
				})
				
				navigate(0);
			}
		} catch (error) {
			console.log(error);
			toast({
				title: "Error",
				description: "Something went wrong"
			})
		}
	}
	
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div>
					<FormField render={({ field }) => (
						<FormItem className="hidden">
							<FormLabel>Category Id</FormLabel>
							<FormControl>
								<Input type="text" placeholder="Enter a category name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)} name="id" control={form.control} />
				</div>
				<div className="w-full mt-5">
					<Button className="w-full" variant="destructive">Delete Category</Button>
					{isDesktop && (
						<DialogClose className="w-full mt-5">
							Cancel
						</DialogClose>
					)}
				</div>
			</form>
		</Form>
	)
}
