import React, { useState } from "react";
import MatchLoading from "../../Loader/MatchLoading";

function MatchType({ onClose }) {
	const [selectedType, setSelectedType] = useState("");
	const [issues, setIssues] = useState({
		depression: false,
		anxiety: false,
		stress: false,
	});
	const [loading, setLoading] = useState(false);

	const handleTypeSelection = (type) => {
		setSelectedType(type);
	};

	const handleCheckboxChange = (e) => {
		const { name, checked } = e.target;
		setIssues((prevState) => ({ ...prevState, [name]: checked }));
	};

	const handleSubmit = () => {
		// Logic to handle submission goes here
		console.log("Selected Type:", selectedType);
		console.log("Mental Health Issues:", issues);
		setLoading(true);
		//onClose(); // Close the modal after submission
	};

	const cancelSearch = () => {
		setLoading(false);
	};

	return (
		<>
			{loading ? (
				<>
					<div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
						<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center ">
							<MatchLoading />
							<p className="text-green-700 text-2xl pb-5">
								Finding Suitable Professionals...
							</p>
							<button
								className="text-red-500 hover:bg-red-500 border-2 border-red-500 px-4 mt-4 hover:text-white p-2 rounded-full"
								onClick={cancelSearch}>
								Cancel
							</button>
						</div>
					</div>
				</>
			) : (
				<>
					{" "}
					<div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
						<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
							<h2 className="text-xl font-semibold mb-4">Choose Type</h2>

							
							<div className="flex flex-col gap-3 justify-between mb-4">
								<button
									onClick={() => handleTypeSelection("Psychiatrist")}
									className={`px-4 py-2 rounded-md  ${
										selectedType === "Psychiatrist"
											? "bg-green-500 text-white"
											: "bg-gray-200 hover:bg-green-200"
									}`}>
									Psychiatrist
								</button>
								<button
									onClick={() => handleTypeSelection("Psychologist")}
									className={`px-4 py-2 rounded-md  ${
										selectedType === "Psychologist"
											? "bg-green-500 text-white"
											: "bg-gray-200 hover:bg-green-200"
									}`}>
									Psychologist
								</button>
							</div>

							<h3 className="font-semibold mb-2">Mental Health Issues</h3>
							<div className="space-y-2 mb-4">
								<label className="flex items-center">
									<input
										type="checkbox"
										name="depression"
										checked={issues.depression}
										onChange={handleCheckboxChange}
										className="mr-2"
									/>
									Depression
								</label>
								<label className="flex items-center">
									<input
										type="checkbox"
										name="anxiety"
										checked={issues.anxiety}
										onChange={handleCheckboxChange}
										className="mr-2"
									/>
									Anxiety
								</label>
								<label className="flex items-center">
									<input
										type="checkbox"
										name="stress"
										checked={issues.stress}
										onChange={handleCheckboxChange}
										className="mr-2"
									/>
									Stress
								</label>
							</div>

							<div className="flex justify-end space-x-2">
								<button
									onClick={onClose}
									className="px-4 py-2 bg-gray-300 rounded-md ">
									Cancel
								</button>
								<button
									onClick={handleSubmit}
									className="px-4 py-2 bg-green-500 text-white rounded-md">
									Proceed
								</button>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default MatchType;