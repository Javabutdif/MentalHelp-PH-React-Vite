import React from "react";

const DisplayMatch = ({  onRequestMatch, onSearch , data, onClose }) => {
	

	return (
		<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
			<div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
				<div className="text-center">
					<p className="text-xl font-bold">YOU ARE MATCHED WITH</p>
					<div className="flex justify-center my-4">
						<img
							src="https://via.placeholder.com/100"
							alt="Profile"
							className="rounded-full w-24 h-24"
						/>
					</div>
                    <p className="text-xl font-semibold">{ data.firstname + " " +data.lastname}</p>
					<a href="#" className="text-blue-500 hover:underline">
						View Background
					</a>
					<div className="flex justify-center items-center my-2">
						<span className="text-yellow-500">★★★★★</span>
						<span className="ml-2 text-gray-500">4.5 out of 5</span>
					</div>
					<p className="text-gray-700 font-semibold">P 1,580.00 per session</p>

					<div className="flex justify-around mt-6">
						<button
							className="bg-red-500 text-white font-bold py-2 px-6 rounded-full"
							onClick={onSearch}>
							Search
						</button>
						<button
							className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full"
							onClick={onRequestMatch}>
							Request Match
						</button>
					</div>
				</div>

				<button
					className="mt-4 text-gray-500 hover:underline"
					onClick={onClose}>
					Close
				</button>
			</div>
		</div>
	);
};

export default DisplayMatch;
