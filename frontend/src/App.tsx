import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "@/pages/home-page.tsx";
import {ProductsPage} from "@/pages/products-page.tsx";

export default function App() {
  return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/products" element={<ProductsPage />} />
			</Routes>
		</Router>
  );
}

