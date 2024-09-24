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
    path: ["password"],
  });

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

export const businessSchema = z.object({
  businessName: z.string().min(1, { message: "Business name is required" }),
  businessDescription: z
    .string()
    .min(1, { message: "Business description is required" }),
  businessEmail: z.string().email({ message: "Invalid email address" }),
  businessPhone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  addressLine1: z.string().min(1, { message: "Address line 1 is required" }),
  addressLine2: z.string().optional(),
  addressLine3: z.string().optional(),
  postalCode: z
    .string()
    .min(5, { message: "Postal code must be at least 5 characters" }),
  websiteUrl: z.string().url({ message: "Invalid website URL" }).optional(),
  logoUrl: z.string().url({ message: "Invalid logo URL" }).optional(),
});
