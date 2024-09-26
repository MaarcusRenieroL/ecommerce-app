import * as React from "react"

import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
	Dialog,
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
import { addNewCategorySchema } from "@/lib/zod-schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { addNewCategory, getVendorId } from "@/lib/spring-boot-api"
import { useToast } from "@/components/ui/use-toast.tsx"
import { isLoggedIn } from "@/lib/utils.ts";

export const AddNewCategoryModal = () => {
	const [open, setOpen] = React.useState(false)
	const isDesktop = useMediaQuery("(min-width: 768px)")
	
	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button>Add New Category</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Add New Category</DialogTitle>
						<DialogDescription>
							Fill the form to add a new category
						</DialogDescription>
					</DialogHeader>
					<AddNewCategoryForm />
				</DialogContent>
			</Dialog>
		)
	}
	
	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button>Add new Category</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Add new Category</DrawerTitle>
					<DrawerDescription>
						Fill the form to add a new category
					</DrawerDescription>
				</DrawerHeader>
				<AddNewCategoryForm />
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}

function AddNewCategoryForm() {

	const { toast } = useToast();

	const form = useForm<z.infer<typeof addNewCategorySchema>>({
		resolver: zodResolver(addNewCategorySchema),
		defaultValues: {
			name: "",
		}
	});
	
	const onSubmit = async (data: z.infer<typeof addNewCategorySchema>) => {
		console.log(data);
		try {
			const user = await isLoggedIn();
			const vendor = await getVendorId(user.data.id)
			
			const refinedData = {
				category: data,
				vendorId: vendor.data,
			}
			
			const response = await addNewCategory(refinedData);
			
			if (response.status === "CREATED") {
				toast({
					title: "Success",
					description: response.message
				})
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
						<FormItem>
							<FormLabel>Category Name</FormLabel>
							<FormControl>
								<Input type="text" placeholder="Enter a category name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)} name="name" control={form.control} />
				</div>
				<div className="flex items-center justify-end w-full mt-5">
					<Button>Save Changes</Button>
				</div>
			</form>
		</Form>
	)
}
