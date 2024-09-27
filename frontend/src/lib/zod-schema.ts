"use client";

import { z } from "zod";

export const signUpSchema = z
	.object({
		firstName: z
			.string({
				required_error: "First name is required",
			})
			.min(3, {
				message: "First name must be at least 3 characters long",
			}),
		lastName: z
			.string({
				required_error: "Last name is required",
			})
			.min(3, {
				message: "Last name must be at least 3 characters long",
			}),
		username: z
			.string({
				required_error: "Email is required",
			})
			.email({
				message: "Invalid email",
			}),
		password: z
			.string({
				required_error: "Password is required",
			})
			.min(6, {
				message: "Password must be at least 6 characters long",
			}),
		confirmPassword: z
			.string({
				required_error: "Confirm Password is required",
			})
			.min(6, {
				message: "Confirm Password must be at least 6 characters long",
			}),
		phoneNumber: z
			.string({
				required_error: "Phone number is required",
			})
			.min(10, {
				message: "Phone number must be at least 10 characters long",
			})
			.max(15, {
				message: "Phone number must not be more than 15 characters long",
			}),
		role: z.string(),
		hasBusinessAccount: z.boolean(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: [ "password" ],
	});

export const addressSchema = z.object({
	number: z.string({
		required_error: "House / Building / Apartment number is required",
	}),
	street: z.string({
		required_error: "Street is required",
	}).min(1, {
		message: "Street is required"
	}),
	city: z.string({
		required_error: "Street is required"
	}).min(1, {
		message: "City is required"
	}),
	state: z.string({
		required_error: "Street is required"
	}).min(2, {
		message: "State is required"
	}),
	postalCode: z.string({
		required_error: "Street is required"
	}).min(5, {
		message: "Zip code is required"
	}),
	country: z.string({
		required_error: "Street is required"
	}).min(2, {
		message: "Country is required"
	}),
	instructions: z.string().min(2, {
		message:
			"Instructions is required"
	}).optional(),
	landmark: z.string().min(2, {
		message: "Landmark is required"
	}).optional(),
	default: z.boolean({
		required_error: "Default address is required",
	})
})

export const signInSchema = z.object({
	email: z
		.string({
			required_error: "Email is required",
		})
		.email({
			message: "Invalid email",
		}),
	password: z
		.string({
			required_error: "Password is required",
		})
		.min(6, {
			message: "Password must be at least 6 characters long",
		}),
});

export const vendorSchema = z.object({
	name: z.string().min(1, { message: "Business name is required" }),
	description: z
		.string()
		.min(1, { message: "Business description is required" }),
	email: z.string().email({ message: "Invalid email address" }),
	phone: z
		.string()
		.min(10, { message: "Phone number must be at least 10 digits" }),
	websiteUrl: z.string().url({ message: "Invalid website URL" }).optional(),
	logoUrl: z.string().url({ message: "Invalid logo URL" }).optional(),
});

export const addNewCategorySchema = z.object({
	name: z.string({
		required_error: "Category name is required"
	}).min(3, {
		message: "Category name must be at least 3 characters long"
	})
})

export const deleteCategorySchema = z.object({
	id: z.string()
})