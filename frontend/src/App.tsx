import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import HomePage from "@/pages/home-page.tsx";
import { ProductsPage } from "@/pages/products-page.tsx";
import { CategoriesPage } from "@/pages/categories-page.tsx";
import { DealsPage } from "@/pages/deals-page.tsx";
import { ProductPage } from "@/pages/product-page.tsx";
import { CartPage } from "@/pages/cart-page.tsx";
import { CheckoutPage } from "@/pages/checkout-page.tsx";
import { SignInPage } from "@/pages/auth/sign-in-page.tsx";
import { SignUpPage } from "@/pages/auth/sign-up-page.tsx";
import {ResetPasswordPage} from "@/pages/auth/reset-password-page.tsx";

export default function App() {
  return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/products" element={<ProductsPage />} />
				<Route path="/categories" element={<CategoriesPage />} />
				<Route path="/deals" element={<DealsPage />} />
				<Route path="/product" element={<ProductPage />} />
				<Route path="/cart" element={<CartPage />} />
				<Route path="/checkout" element={<CheckoutPage />} />
				
				<Route path="/auth/sign-in" element={<SignInPage />} />
				<Route path="/auth/sign-up" element={<SignUpPage />} />
				<Route path="/auth/reset-password" element={<ResetPasswordPage />} />
			</Routes>
		</Router>
  );
}

