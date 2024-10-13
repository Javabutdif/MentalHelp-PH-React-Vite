import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { logout } from "../../api/login";
import { capitalizeFirstLetter } from "../utils/capitalizeLetter";
import { FaBell, FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";

function PatientNavbar() {
	const navigate = useNavigate();
	const location = useLocation();
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const path = location.pathname.split("/");
	const lastpath = path[path.length - 1];

	const handleLogout = async () => {
		await logout();
		navigate("/login");
	};

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<nav className="bg-white shadow fixed w-full top-0 flex items-center justify-between p-2">
			<div className="flex items-center">
				<img src="/logon.png" className="h-16 w-16 mx-3" alt="Logo" />
				<Link to="/admin/dashboard" className="font-bold text-xl">
					MentalHelp PH | {capitalizeFirstLetter(lastpath)}
				</Link>
			</div>
			<button
				className="block lg:hidden text-gray-500 focus:outline-none"
				onClick={toggleMobileMenu}>
				<svg
					className="w-6 h-6"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20">
					<path d="M3 5h14M3 10h14M3 15h14" />
				</svg>
			</button>

			<div
				className={`${
					isMobileMenuOpen ? "block" : "hidden"
				} lg:flex space-x-8 pr-20 font-bold`}>
				<ul className="flex space-x-8 items-center">
					<li>
						<Link
							to="/patient/messages"
							className="text-gray-700 hover:text-green-500"
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}>
							{isHovered ? (
								<FaEnvelopeOpen className="text-2xl" />
							) : (
								<FaEnvelope className="text-2xl" />
							)}
						</Link>
					</li>
					<li>
						<Link
							to="/patient/notification"
							className="text-gray-700 hover:text-green-500">
							<FaBell className="text-2xl" />
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

export default PatientNavbar;
