import React from "react";
import { useLocation, Link } from "react-router-dom";

function Navbar() {
	const location = useLocation();
	return (
		<nav className="bg-white shadow fixed w-full top-0 flex items-center justify-between p-4">
			<div className="flex items-center">
				<img src="/logon.png" className="h-16 w-16 mx-3" alt="Logo" />
				<Link to="/" className="font-bold text-xl">
					MentalHelp PH
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
						<Link to="/community" className="text-gray-700 hover:text-blue-500">
							Community
						</Link>
					</li>
					<li>
						<Link to="/about" className="text-gray-700 hover:text-blue-500">
							About Us
						</Link>
					</li>
					<li>
						<Link to="/contact" className="text-gray-700 hover:text-blue-500">
							Contact Us
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
