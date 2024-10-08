import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import HomePage from "@/pages/home-page.tsx";
import { ProductsPage } from "@/pages/products-page.tsx";
import { CategoriesPage } from "@/pages/categories-page.tsx";
import { DealsPage } from "@/pages/deals-page.tsx";
import { ProductPage } from "@/pages/product-page.tsx";
import { CartPage } from "@/pages/cart-page.tsx";
import { CheckoutPage } from "@/pages/checkout-page.tsx";

import { SignInPage } from "@/pages/auth/sign-in-page.tsx";
import { SignUpPage } from "@/pages/auth/sign-up-page.tsx";
import { ResetPasswordPage } from "@/pages/auth/reset-password-page.tsx";
import { VerifyEmailPage } from "@/pages/auth/verify-email-page.tsx";
import { BusinessSignUpPage } from "@/pages/auth/business-sign-up-page.tsx";

import { YourAccountPage } from "@/pages/personalized-content/your-account-page.tsx";
import { YourOrdersPage } from "@/pages/personalized-content/your-orders-page.tsx";
import { LoginAndSecurityPage } from "@/pages/personalized-content/login-and-security-page.tsx";
import { YourAddressesPage } from "./pages/personalized-content/your-addresses-page";
import { PaymentOptions } from "./pages/personalized-content/payment-options";
import { AlertsAndNotificationsPage } from "./pages/personalized-content/alerts-and-notifications-page";
import { ManageYourDataPage } from "./pages/personalized-content/manage-your-data-page";

import { VendorDashboardPage } from "./pages/vendor/dashboard-page";
import { VendorProductsPage } from "./pages/vendor/products-page";
import { VendorCategoriesPage } from "./pages/vendor/categories-page";
import { VendorSizesPage } from "./pages/vendor/sizes-page";
import { VendorOrdersPage } from "./pages/vendor/orders-page";
import { VendorSettingsPage } from "./pages/vendor/settings-page";

import { ThemeProvider } from "./components/theme-provider";
import { ProtectedRoute } from "@/components/protected-route.tsx";
import { useState, useEffect } from "react";
import { getCategoriesByVendorId } from "@/lib/spring-boot-api.ts";
import { isLoggedIn } from "@/lib/utils.ts";
import { getVendorId } from "@/lib/spring-boot-api.ts";

export default function App() {
	const [categories, setCategories] = useState([]);
	
	useEffect(() => {
		const fetchData = async () => {
			const user = await isLoggedIn();
			const vendorId = await getVendorId(user.data.id);
			const categoriesByVendor = await getCategoriesByVendorId(vendorId.data);
			
			setCategories(categoriesByVendor.data);
		};
		
		fetchData();
	}, []);

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Router>
				<Routes>
					<Route path="/" element={<HomePage/>}/>
					<Route path="/products" element={<ProductsPage/>}/>
					<Route path="/categories" element={<CategoriesPage/>}/>
					<Route path="/deals" element={<DealsPage/>}/>
					<Route path="/products/:id" element={<ProductPage/>}/>
					<Route element={<ProtectedRoute requiredRole="CUSTOMER" />}>
						<Route path="/cart" element={<CartPage/>}/>
						<Route path="/checkout" element={<CheckoutPage/>}/>
						<Route path="/account" element={<YourAccountPage/>}/>
						<Route path="/account/your-orders" element={<YourOrdersPage/>}/>
						<Route
							path="/account/login-and-security"
							element={<LoginAndSecurityPage/>}
						/>
						<Route path="/account/your-address" element={<YourAddressesPage/>}/>
						<Route path="/account/payment-options" element={<PaymentOptions/>}/>
						<Route
							path="/account/alerts-and-notifications"
							element={<AlertsAndNotificationsPage/>}
						/>
						<Route
							path="/account/request-your-data"
							element={<ManageYourDataPage/>}
						/>
					</Route>
						
					<Route element={<ProtectedRoute requiredRole="VENDOR"/>}>
						<Route path="/vendor/dashboard" element={<VendorDashboardPage/>}/>
						<Route path="/vendor/products" element={<VendorProductsPage/>}/>
						<Route path="/vendor/categories" element={<VendorCategoriesPage categories={categories} />}/>
						<Route path="/vendor/sizes" element={<VendorSizesPage/>}/>
						<Route path="/vendor/orders" element={<VendorOrdersPage/>}/>
						<Route path="/vendor/settings" element={<VendorSettingsPage/>}/>
					</Route>
					
					
					<Route path="/auth/sign-in" element={<SignInPage/>}/>
					<Route path="/auth/sign-up" element={<SignUpPage/>}/>
					<Route path="/auth/reset-password" element={<ResetPasswordPage/>}/>
					<Route path="/auth/verify-email" element={<VerifyEmailPage/>}/>
					<Route
						path="/auth/business/sign-up"
						element={<BusinessSignUpPage/>}
					/>
				
				</Routes>
			
			</Router>
		</ThemeProvider>
	);
}
