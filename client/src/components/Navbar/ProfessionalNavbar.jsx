import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { logout } from "../../api/login";
import { capitalizeFirstLetter } from "../utils/capitalizeLetter";
import {
	FaBell,
	FaEnvelope,
	FaEnvelopeOpen,
	FaBars,
	FaPowerOff,
} from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";

function ProfessionalNavbar() {
	const navigate = useNavigate();
	const location = useLocation();
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isDropdownOpen, setDropdownOpen] = useState(false);
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

	const toggleDropdown = () => {
		setDropdownOpen(!isDropdownOpen);
	};

	return (
		<nav className="bg-white shadow fixed w-full top-0 flex items-center justify-between p-2">
			<div className="flex items-center">
				<img src="/logon.png" className="h-16 w-16 mx-3" alt="Logo" />
				<Link to="/professional/dashboard" className="font-bold text-xl">
					MentalHelp PH | {capitalizeFirstLetter(lastpath)}
				</Link>
			</div>
			<button
				className="block lg:hidden text-gray-500 focus:outline-none"
				onClick={toggleMobileMenu}>
				<FaBars className="w-6 h-6" />
			</button>

			<div
				className={`${
					isMobileMenuOpen ? "block" : "hidden"
				} lg:flex space-x-8 pr-20 font-bold`}>
				<ul className="flex space-x-8 items-center">
					<li>
						<Link
							to="/professional/messages"
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
							to="/professional/notification"
							className="text-gray-700 hover:text-green-500">
							<FaBell className="text-2xl" />
						</Link>
					</li>
					<li className="relative">
						<button
							className="text-gray-700 focus:outline-none"
							onClick={toggleDropdown}>
							<FaBars className="text-2xl pt-1" />
						</button>
						{isDropdownOpen && (
							<ul className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
								<li className="border-b">
									<Link
										to="/professional/profile"
										className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
										onClick={toggleDropdown}>
										<div className="flex flex-row gap-3">
											<IoPersonSharp className="text-2xl" />
											Profile
										</div>
									</Link>
								</li>
								<li className="border-b">
									<Link
										to="/professional/settings"
										className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
										onClick={toggleDropdown}>
										<div className="flex flex-row gap-3">
											<IoMdSettings className="text-2xl" />
											Settings
										</div>
									</Link>
								</li>
								<li>
									<button
										onClick={handleLogout}
										className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
										<div className="flex flex-row gap-3">
											<FaPowerOff className="text-2xl" />
											Logout
										</div>
									</button>
								</li>
							</ul>
						)}
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default ProfessionalNavbar;
