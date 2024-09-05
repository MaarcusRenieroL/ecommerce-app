import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import HomePage from "@/pages/home-page.tsx";
import { ProductsPage } from "@/pages/products-page.tsx";
import { CategoriesPage } from "@/pages/categories-page.tsx";

export default function App() {
  return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/products" element={<ProductsPage />} />
				<Route path="/categories" element={<CategoriesPage />} />
			</Routes>
		</Router>
  );
}

