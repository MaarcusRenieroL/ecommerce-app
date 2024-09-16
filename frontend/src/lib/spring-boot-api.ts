import { User, Product } from "@/lib/types.ts";
import { z } from "zod";
import { signInSchema } from "@/lib/zod-schema.ts";

const BASE_URL = "http://localhost:8080/api";

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/all`);

    return await response.json();
  } catch (error) {
    console.log("Error fetching products");
    console.log(error);
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/products/get/${id}`);

    return await response.json();
  } catch (error) {
    console.log("Error fetching products");
    console.log(error);
  }
};

export const getProductsByCategory = async (categoryName: string) => {
  const response = await getAllProducts();

  return response.data.filter(
    (product: Product) => product.category.categoryName === categoryName,
  );
};

export const getAllCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories/all`);

    return await response.json();
  } catch (error) {
    console.log("Error fetching categories");
    console.log(error);
  }
};

export const addUser = async (data: User) => {
  try {
    const response = await fetch(`${BASE_URL}/users/add`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });

    console.log(response);
  } catch (error) {
    console.log("Error adding user");
    console.log(error);
  }
};

export const signInUser = async (data: z.infer<typeof signInSchema>) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/sign-in`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error("Error authenticating user:", error);
    return null;
  }
};
