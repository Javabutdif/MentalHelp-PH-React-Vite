import { React, useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Server_Connection from "../connection/Server_Connection";
import axios from "axios";
import LoadingScreen from "../Loader/LoadingScreen";
import { setInformationData } from "../authentication/authentication";

const PrivateRouteAdmin = ({ element: Component }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);
	const token = sessionStorage.getItem("Token");

	useEffect(() => {
		const checkAuthentication = async () => {
			try {
				const response = await axios.get(
					`${Server_Connection()}/api/protected-route`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.data.role === "Admin") {
					setInformationData(response.data.data, response.data.role);
					setIsAuthenticated(true);
				} else {
					setIsAuthenticated(false);
				}
			} catch (error) {
				console.error("Not authorized:");
				setIsAuthenticated(false);
			} finally {
				setLoading(false);
			}
		};

		checkAuthentication();
	}, []);

	if (loading) {
		return (
			<div className="relative min-h-screen flex justify-center items-center bg-gray-100 px-4">
				<LoadingScreen />
			</div>
		);
	}

	return isAuthenticated ? <Component /> : <Navigate to="/" replace />;
};

export default PrivateRouteAdmin;
