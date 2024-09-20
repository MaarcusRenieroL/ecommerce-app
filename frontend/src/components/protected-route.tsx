import React, { FC, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { isLoggedIn } from "@/lib/utils.ts";

type ProtectedRouteProps = {
	redirectPath?: string;
	requiredRole?: string;
	children?: React.ReactNode;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
																													redirectPath = "/auth/sign-in",
																													requiredRole,
																													children,
																												}) => {
	const [authData, setAuthData] = useState<{
		isAuthenticated: boolean | null;
		role?: string;
	} | null>(null);
	const navigate = useNavigate();
	
	useEffect(() => {
		const checkAuth = async () => {
			try {
				const response = await isLoggedIn();
				
				if (response.status === "UNAUTHORIZED") {
					navigate("/auth/sign-in");
				} else if (response.status === "OK") {
					setAuthData({ isAuthenticated: true, role: response.data.role });
				}
			} catch (error) {
				console.error("Error during authentication check:", error);
				setAuthData({ isAuthenticated: false });
			}
		};
		
		checkAuth();
	}, [navigate]);
	
	if (authData === null) {
		return <div>Loading...</div>;
	}
	
	if (!authData.isAuthenticated) {
		return <Navigate to={redirectPath} replace />;
	}
	
	if (authData.role === "CUSTOMER") {
		return <Navigate to="/" replace />;
	}
	
	if (requiredRole && authData.role !== requiredRole) {
		if (authData.role !== "ADMIN" && authData.role !== "VENDOR") {
			return <Navigate to="/" replace />;
		}
	}
	
	return children ? <>{children}</> : <Outlet />;
};
