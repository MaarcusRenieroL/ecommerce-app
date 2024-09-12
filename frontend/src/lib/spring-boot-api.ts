import {User} from "@/lib/types.ts";

const BASE_URL = "http://localhost:8080/api";

export const getAllProducts = async () => {
	try {
		const response = await fetch(`${BASE_URL}/products/all`);
		
		return response.json();
	} catch (error) {
		console.log("Error fetching products");
		console.log(error);
	}
};

export const getAllCategories = async () => {
	try {
		const response = await fetch(`${BASE_URL}/categories/all`);
		
		return response.json();
	} catch (error) {
		console.log("Error fetching categories");
		console.log(error);
	}
}

export const addUser = async (data: User) => {
	try {
		return await fetch(`${BASE_URL}/users/add`, {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		});
	} catch (error) {
		console.log("Error adding user");
		console.log(error);
	}
}