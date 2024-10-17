import React, { useState } from "react";
import { getInformationData } from "../../authentication/authentication";
import { updateProfessionalPreferences } from "../../api/professionals";

const ProfessionalPreferences = () => {
	const user = getInformationData();
	const [formData, setFormData] = useState({
		startAge: "",
		endAge: "",
		issues: {
			depression: false,
			anxiety: false,
			stress: false,
		},
		id: user.id,
	});

	const handleSubmit = async () => {
		console.log(formData);
		await updateProfessionalPreferences(formData);
	};

	const { startAge, endAge, issues } = formData;

	const setStartAge = (value) => {
		setFormData((prevData) => ({
			...prevData,
			startAge: value,
		}));
	};

	const setEndAge = (value) => {
		setFormData((prevData) => ({
			...prevData,
			endAge: value,
		}));
	};

	const handleCheckboxChange = (e) => {
		const { name, checked } = e.target;
		setFormData((prevData) => ({
			...prevData,
			issues: {
				...prevData.issues,
				[name]: checked,
			},
		}));
	};

	return (
		<>
			<div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
				<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
					<h2 className="text-xl font-semibold mb-4">Select Age Range</h2>

					<div className="flex flex-col gap-3 justify-between mb-4">
						<label className="block">
							<span className="text-gray-700">Start Age</span>
							<input
								type="number"
								min="0"
								value={startAge}
								onChange={(e) => setStartAge(e.target.value)}
								className="mt-1 block w-full px-3 py-2 bg-gray-200 rounded-md"
								placeholder="Enter start age"
							/>
						</label>
						<label className="block">
							<span className="text-gray-700">End Age</span>
							<input
								type="number"
								min="0"
								value={endAge}
								onChange={(e) => setEndAge(e.target.value)}
								className="mt-1 block w-full px-3 py-2 bg-gray-200 rounded-md"
								placeholder="Enter end age"
							/>
						</label>
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
							onClick={handleSubmit}
							className="px-4 py-2 bg-green-500 text-white rounded-md">
							Proceed
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfessionalPreferences;
