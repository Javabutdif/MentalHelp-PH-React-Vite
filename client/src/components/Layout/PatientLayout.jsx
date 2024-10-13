import React from "react";
import PatientNavbar from "../Navbar/PatientNavbar";
import { Outlet } from "react-router-dom";

const PatientLayout = () => {
	return (
		<>
			<PatientNavbar />

			<main className="overflow-hidden">
				<Outlet />
			</main>
		</>
	);
};

export default PatientLayout;
