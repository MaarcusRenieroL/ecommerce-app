import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

import { ThemeProvider } from "./components/theme-provider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
          <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
          <Route
            path="/auth/business/sign-up"
            element={<BusinessSignUpPage />}
          />

          <Route path="/account" element={<YourAccountPage />} />
          <Route path="/account/your-orders" element={<YourOrdersPage />} />
          <Route
            path="/account/login-and-security"
            element={<LoginAndSecurityPage />}
          />
          <Route path="/account/your-address" element={<YourAddressesPage />} />
          <Route path="/account/payment-options" element={<PaymentOptions />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
