import { React, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Server_Connection from "../connection/Server_Connection";
import axios from "axios";
import LoadingScreen from "../Loader/LoadingScreen";

const PrivateRouteAdmin = ({ element: Component }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuthentication = async () => {
			try {
				const response = await axios.get(
					`${Server_Connection()}/api/protected-route`,
					{
						withCredentials: true,
					}
				);

				if (response.data.key && response.data.data.role === "Admin") {
					console.log(response.data.data.role);
					setIsAuthenticated(true);
					console.log(response.data.data);
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
		return <LoadingScreen />;
	}

	return isAuthenticated ? <Component /> : <Navigate to="/" replace />;
};

export default PrivateRouteAdmin;
