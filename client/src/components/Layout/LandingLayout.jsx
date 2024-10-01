import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

const LandingLayout = () => {
	return (
		<>
			<Navbar />

			<main className="overflow-hidden">
				<Outlet />
			</main>
		</>
	);
};

export default LandingLayout;
