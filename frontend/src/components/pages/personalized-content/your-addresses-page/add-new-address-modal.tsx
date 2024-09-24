import { Button } from "@/components/ui/button";
import {
	Dialog, DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { addressSchema } from "@/lib/zod-schema.ts";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";

export const AddNewAddressModal = () => {
	const [ open, setOpen ] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");
	
	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button>Add New Address</Button>
				</DialogTrigger>
				<DialogContent className="max-w-5xl">
					<DialogHeader>
						<DialogTitle>Add new address</DialogTitle>
						<DialogDescription>
							Fill out the form to add a new address
						</DialogDescription>
					</DialogHeader>
					<ProfileForm/>
				</DialogContent>
			</Dialog>
		);
	}
	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button>Add New Address</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Add new address</DrawerTitle>
					<DrawerDescription>
						Fill out the form to add a new address
					</DrawerDescription>
				</DrawerHeader>
				<ScrollArea className="h-96 p-4">
					<ProfileForm/>
				</ScrollArea>
			</DrawerContent>
		</Drawer>
	);
};

function ProfileForm() {
	const form = useForm<z.infer<typeof addressSchema>>({
		resolver: zodResolver(addressSchema),
		defaultValues: {
			number: "",
			street: "",
			city: "",
			state: "",
			postalCode: "",
			country: "",
			instructions: "",
			landmark: "",
			default: false,
		}
	});
	
	const onSubmit = (data: z.infer<typeof addressSchema>) => {
		console.log(data);
	}
	
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4 p-4">
					<FormField
						render={({ field }) => (
							<FormItem>
								<FormLabel>House / Building / Apartment Number</FormLabel>
								<FormControl>
									<Input {...field} placeholder="" type="text" />
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
						name="number"
						control={form.control}
					/>
					
					<FormField
						render={({ field }) => (
							<FormItem>
								<FormLabel>Street</FormLabel>
								<FormControl>
									<Input {...field} placeholder="" type="text" />
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
						name="street"
						control={form.control}
					/>
					
					<FormField
						render={({ field }) => (
							<FormItem>
								<FormLabel>City</FormLabel>
								<FormControl>
									<Input {...field} placeholder="" type="text" />
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
						name="city"
						control={form.control}
					/>
					
					<FormField
						render={({ field }) => (
							<FormItem>
								<FormLabel>State</FormLabel>
								<FormControl>
									<Input {...field} placeholder="" type="text" />
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
						name="state"
						control={form.control}
					/>
					
					<FormField
						render={({ field }) => (
							<FormItem>
								<FormLabel>Country</FormLabel>
								<FormControl>
									<Input {...field} placeholder="" type="text" />
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
						name="country"
						control={form.control}
					/>
					
					<FormField
						render={({ field }) => (
							<FormItem>
								<FormLabel>Postal Code</FormLabel>
								<FormControl>
									<Input {...field} placeholder="" type="text" />
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
						name="postalCode"
						control={form.control}
					/>
					
					<FormField
						render={({ field }) => (
							<FormItem>
								<FormLabel>Landmark</FormLabel>
								<FormControl>
									<Input {...field} placeholder="" type="text" />
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
						name="landmark"
						control={form.control}
					/>
					
					<FormField
						render={({ field }) => (
							<FormItem className="md:col-span-2 lg:col-span-3">
								<FormLabel>Instructions</FormLabel>
								<FormControl>
									<Textarea {...field} placeholder="" />
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
						name="instructions"
						control={form.control}
					/>
					
				</div>
				
				<div className="flex items-end justify-end w-full gap-5">
					<DialogClose>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button>Save</Button>
				</div>
			</form>
		</Form>
	);
}
