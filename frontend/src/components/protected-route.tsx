import React, { FC, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
	redirectPath?: string;
	children?: React.ReactNode;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
																													redirectPath = "/auth/sign-in",
																													children,
																												}) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
	const navigate = useNavigate();
	
	
	useEffect(() => {
		const checkAuth = async () => {
			try {
				const response = await fetch("http://localhost:8080/api/auth/check", {
					method: "GET",
					credentials: "include"
				})
				
				if (response.status === 401) {
					navigate("/auth/sign-in");
				}
				if (response.status === 200) {
					setIsAuthenticated(true);
				}
			} catch (error) {
				console.error("Error during authentication check:", error);
				setIsAuthenticated(false);
			}
		};
		
		checkAuth();
	}, [navigate]);
	
	if (isAuthenticated === null) {
		return <div>Loading...</div>; // Optionally add a loading state
	}
	
	if (!isAuthenticated) {
		return <Navigate to={redirectPath} replace />;
	}
	
	return children ? <>{children}</> : <Outlet />;
};
