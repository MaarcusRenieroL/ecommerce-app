import { useState } from "react";

import {Navbar} from "@/components/navigation/navbar.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {cn} from "@/lib/utils.ts";

export const LoginAndSecurityPage = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	return (<div>
		<Navbar/>
		<main className="p-10">
			<div>
				<h1 className="text-2xl font-bold">Login and Security</h1>
				<hr className="mt-5"/>
			</div>
			<div className="mt-5 w-full gap-5">
				<div className="md:col-span-2 lg:col-span-3 space-y-5">
					<div className="absolute z-50 w-full flex items-center justify-center">Login</div>
					<Card className={`relative overflow-hidden rounded-lg ${!isAuthenticated ? "blur-sm" : ""}`}>
						<CardContent className="p-6">
							{isAuthenticated ? (
								<div>
									<h3 className="text-2xl font-bold">Welcome back!</h3>
									<p className="mt-2 text-muted-foreground">You are now authenticated and can access all features.</p>
								</div>
							) : (
								<div>
									<h3 className="text-2xl font-bold">Please authenticate</h3>
									<p className="mt-2 text-muted-foreground">You need to authenticate to access this content.</p>
									<Button className="mt-4" onClick={() => setIsAuthenticated(true)}>
										Authenticate
									</Button>
								</div>
							)}
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle className="text-xl">Display Name</CardTitle>
							<CardDescription>
								Please enter your full name, or a display name you are comfortable
								with.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div
								className={cn("flex items-center justify-between w-full gap-5 relative overflow-hidden rounded-lg", !isAuthenticated ? "blur-sm" : "")}>
								<div className="w-full space-y-3">
									<Label>First Name</Label>
									<Input
										type="text"
										placeholder="Enter first name"
									/>
								</div>
								<div className="w-full space-y-3">
									<Label>Last Name</Label>
									<Input
										type="text"
										placeholder="Enter last name"
									/>
								</div>
							</div>
							<div className="absolute">
								
								<Button>Please sign in again to update your information</Button>
							</div>
						</CardContent>
						<CardFooter className="border-t px-6 py-2 bg-secondary justify-between">
							<div className="text-sm">Please use 32 characters at maximum.</div>
							<div className="ml-auto">
								<Button size="sm">Save</Button>
							</div>
						</CardFooter>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle className="text-xl">Password</CardTitle>
							<CardDescription>
								Please enter your current password and a new password.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-5">
							<div className="space-y-3 w-full">
								<Label>Password</Label>
								<Input
									type="password"
									placeholder="Enter old password"
								/>
							</div>
							<div className="space-y-3 w-full">
								<Label>New Password</Label>
								<Input
									type="password"
									placeholder="Enter new password"
								/>
							</div>
							<div className="space-y-3 w-full">
								<Label>Confirm New Password</Label>
								<Input
									type="password"
									placeholder="Re-enter new password"
								/>
							</div>
						</CardContent>
						<CardFooter className="border-t px-6 py-2 bg-secondary justify-between">
							<div className="text-sm">
								Please use a password with at least 6 characters.
							</div>
							<div className="ml-auto">
								<Button size="sm">Save</Button>
							</div>
						</CardFooter>
					</Card>
					<Card className="border-red-200 w-full">
						<CardHeader>
							<CardTitle className="text-xl">Delete Account</CardTitle>
							<CardDescription>
								Permanently remove your Personal Account and all of its contents from
								the Blog Vacancy platform. This action is not reversible, so please
								continue with caution.
							</CardDescription>
						</CardHeader>
						<CardFooter
							className="border-t border-red-200 px-6 py-2 bg-red-100/50 flex items-center justify-end w-full">
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button size="sm" variant="destructive">
										Delete Personal Account
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>Delete task</AlertDialogTitle>
										<AlertDialogDescription>
											Are you sure you want to delete your account?
											<br/>
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction>
											Continue
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</CardFooter>
					</Card>
				</div>
			</div>
		</main>
	</div>)
}