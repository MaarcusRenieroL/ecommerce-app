import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  opts: Intl.NumberFormatOptions = {},
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: opts.currency ?? "USD",
    notation: opts.notation ?? "compact",
    ...opts,
  }).format(Number(price));
}

export const isLoggedIn = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/auth/check", {
      method: "GET",
      credentials: "include"
    });
    
    return response.ok;
  } catch (error: unknown) {
    console.log("Error: " + error)
    return false;
  }
}