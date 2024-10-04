import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { logout } from "../../api/login";
import { showToast } from "../utils/alertHelper";

function AdminNavbar() {
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate("/login");
	};

	return (
		<nav className="bg-white shadow fixed w-full top-0 flex items-center justify-between p-2">
			<div className="flex items-center">
				<img src="/logon.png" className="h-16 w-16 mx-3" alt="Logo" />
				<Link to="/admin/dashboard" className="font-bold text-xl">
					MentalHelp PH | Admin
				</Link>
			</div>
			<button className="block lg:hidden text-gray-500 focus:outline-none">
				<svg
					className="w-6 h-6"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20">
					<path d="M3 5h14M3 10h14M3 15h14" />
				</svg>
			</button>
			<div className="hidden lg:flex space-x-8 pr-20 font-bold">
				<ul className="flex space-x-8">
					<li>
						<Link
							to="/admin/dashboard"
							className="text-gray-700 hover:text-green-500">
							Dashboard
						</Link>
					</li>
					<li>
						<Link
							to="/admin/patient"
							className="text-gray-700 hover:text-green-500">
							Patient
						</Link>
					</li>
					<li>
						<Link
							to="/admin/professional"
							className="text-gray-700 hover:text-green-500">
							Professionals
						</Link>
					</li>
					<li>
						<button
							type="button"
							onClick={handleLogout}
							className="text-red-500 hover:text-red-700">
							Logout
						</button>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default AdminNavbar;
