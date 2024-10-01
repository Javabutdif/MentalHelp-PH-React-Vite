import React from "react";

function Navbar() {
	return (
		<nav className="bg-white shadow fixed w-full top-0 flex items-center justify-between p-4">
			<div className="flex items-center">
				{/* Use a relative path for the image from the public folder */}
				<img src="/logon.png" className="h-16 w-16 mx-3" alt="Logo" />
				<a className="font-bold text-xl" href="index.php">
					MentalHelp PH
				</a>
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
						<a className="text-gray-700 hover:text-blue-500" href="#">
							Community
						</a>
					</li>
					<li>
						<a className="text-gray-700 hover:text-blue-500" href="about.php">
							About Us
						</a>
					</li>
					<li>
						<a className="text-gray-700 hover:text-blue-500" href="#">
							Contact Us
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
