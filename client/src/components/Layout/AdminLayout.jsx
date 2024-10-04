import React from "react";
import AdminNavbar from "../Navbar/AdminNavbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
	return (
		<>
			<AdminNavbar />

			<main className="overflow-hidden">
				<Outlet />
			</main>
		</>
	);
};

export default AdminLayout;
