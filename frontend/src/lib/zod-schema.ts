"use client"

import { z } from "zod"

export const signUpSchema = z.object({
	firstName: z.string({
		required_error: "First name is required",
	}).min(3, {
		message: "First name must be at least 3 characters long"
	}),
	lastName: z.string({
		required_error: "Last name is required",
	}).min(3, {
		message: "Last name must be at least 3 characters long"
	}),
	email: z.string({
		required_error: "Email is required",
	}).email({
		message: "Invalid email"
	}),
	password: z.string({
		required_error: "Password is required",
	}).min(6, {
		message: "Password must be at least 6 characters long"
	}),
	confirmPassword: z.string({
		required_error: "Confirm Password is required",
	}).min(6, {
		message: "Confirm Password must be at least 6 characters long"
	}),
	addressLine1: z.string({
		required_error: "Address Line 1 is required",
	}).min(4, {
		message: "Address Line 1 must be at least 3 characters long"
	}),
	addressLine2: z.string().optional(),
	addressLine3: z.string().optional(),
	phoneNumber: z.string({
		required_error: "Phone number is required",
	}).min(10, {
		message: "Phone number must be at least 10 characters long"
	}).max(15, {
		message: "Phone number must not be more than 15 characters long"
	})
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords don't match",
	path: ["password"],
})
