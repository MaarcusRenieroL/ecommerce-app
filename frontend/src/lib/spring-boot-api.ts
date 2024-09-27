import { User, Product, CategoryWithId } from "@/lib/types.ts";
import { z } from "zod";
import { vendorSchema, signInSchema } from "@/lib/zod-schema.ts";

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

    return await response.json();
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
      credentials: "include",
    });

    return await response.json();
  } catch (error) {
    console.error("Error authenticating user:", error);
    return null;
  }
};

export const addBusiness = async (data: z.infer<typeof vendorSchema>) => {
  try {
    const check = await fetch(`${BASE_URL}/auth/check`, {
      method: "GET",
      credentials: "include"
    });
    
    const checkData = await check.json();
    const uuid = checkData.data.id;
    
    const refinedData = {
      vendor: data,
      uuid: uuid
    }
    
    const response = await fetch(`${BASE_URL}/vendor/add`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(refinedData),
    });

    return await response.json();
  } catch (error) {
    console.log("Error adding business");
    console.log(error);
  }
};

export const addNewCategory = async (data: CategoryWithId) => {
  try {
    console.log(data)
    const response = await fetch(`${BASE_URL}/categories/add`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data)
    })
    
    return await response.json();
  } catch (error: unknown) {
    console.log("Error adding category");
    console.log(error)
  }
}

export const getVendorId = async (userId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/vendor/users/get/${userId}`);
    
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export const getCategoriesByVendorId = async (vendorId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/categories/get/vendor/${vendorId}`);
    
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export const updateCategory = async (categoryId: string, category: { name: string }) => {
  try {
    const response = await fetch(`${BASE_URL}/categories/update/${categoryId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(category),
    });

    return await response.json();
  } catch (error) {
    console.log("Error updating category");
    console.log(error);
  }
}