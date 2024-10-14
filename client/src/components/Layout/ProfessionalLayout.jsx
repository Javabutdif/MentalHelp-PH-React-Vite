import React from "react";
import ProfessionalNavbar from "../Navbar/ProfessionalNavbar";
import { Outlet } from "react-router-dom";

const ProfessionalLayout = () => {
	return (
		<>
			<ProfessionalNavbar />

			<main className="overflow-hidden">
				<Outlet />
			</main>
		</>
	);
};

export default ProfessionalLayout;
