const BASE_URL = "http://localhost:8080/api";

export const getAllProducts = async () => {
	try {
		const response = await fetch(`${BASE_URL}/products/all`);
		
		return response.json();
	} catch (error: unknown) {
		console.log("Error fetching products");
		// @ts-ignore
		console.log(error.message);
	}
};

export const getAllCategories = async () => {
	try {
		const response = await fetch(`${BASE_URL}/categories/all`);
		
		return response.json();
	} catch (error: unknown) {
		console.log("Error fetching categories");
		// @ts-ignore
		console.log(error.message);
	}
}