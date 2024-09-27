import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react";
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
import { updateCategory } from "@/lib/spring-boot-api"
import { useToast } from "@/components/ui/use-toast.tsx"
import { useState, FC } from "react";

type Props = {
	category: any
}

export const UpdateCategoryModal: FC<Props> = ({ category }) => {
	const [open, setOpen] = useState(false)
	const isDesktop = useMediaQuery("(min-width: 768px)")
	
	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button size="icon">
						<Edit className="h-4 w-4" />
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Update Category</DialogTitle>
						<DialogDescription>
							Fill the form to update category
						</DialogDescription>
					</DialogHeader>
					<UpdateCategoryForm category={category} />
				</DialogContent>
			</Dialog>
		)
	}
	
	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button size="icon">
					<Edit className="h-4 w-4" />
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Update Category</DrawerTitle>
					<DrawerDescription>
						Fill the form to update category
					</DrawerDescription>
				</DrawerHeader>
				<UpdateCategoryForm category={category} />
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}

function UpdateCategoryForm({ category }: Props) {
	
	const { toast } = useToast();
	
	const form = useForm<z.infer<typeof addNewCategorySchema>>({
		resolver: zodResolver(addNewCategorySchema),
		defaultValues: {
			name: category.name,
		}
	});
	
	const onSubmit = async (data: z.infer<typeof addNewCategorySchema>) => {
		console.log(data);
		try {
			const response = await updateCategory(category.id, data);
			
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
