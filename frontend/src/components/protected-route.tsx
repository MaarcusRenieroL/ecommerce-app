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
	const [authData, setAuthData] = useState<{ isAuthenticated: boolean | null; role?: string } | null>(null);
	const navigate = useNavigate();
	
	useEffect(() => {
		const checkAuth = async () => {
			try {
				const response = await isLoggedIn();
				
				if (response.status === "UNAUTHORIZED") {
					navigate("/auth/sign-in");
				} else if (response.status === "OK") {
					console.log(response.role)
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
		return <div>Loading...</div>; // Optionally add a loading state
	}
	
	if (!authData.isAuthenticated) {
		console.log("im here in the authdata is authenticated")
		return <Navigate to={redirectPath} replace />;
	}
	
	if (requiredRole && authData.role !== requiredRole) {
		console.log("im here in the role check")
		console.log(authData.role);
		console.log(requiredRole)
		return <Navigate to={"/"} replace />;
	}
	
	return children ? <>{children}</> : <Outlet />;
};
