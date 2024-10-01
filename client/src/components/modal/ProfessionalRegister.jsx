import React, { useState } from "react";

function ProfessionalRegister({ onCancel }) {
	const [formData, setFormData] = useState({
		firstname: "",
		lastname: "",
		contact: "",
		email: "",
		password: "",
		confirmPassword: "",
		profession: "Psychologist",
		experience: "",
		license: "",
		documents: null,
	});

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		setFormData({
			...formData,
			[name]: files ? files[0] : value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
			<div className="bg-white rounded-lg shadow-lg max-w-2xl w-full ">
				<div className="p-4 border-b flex justify-between items-center">
					<h5 className="text-2xl font-bold text-green-600">
						Professionals Sign Up
					</h5>
					<button
						type="button"
						className="text-gray-600 hover:text-gray-800"
						onClick={onCancel}>
						&times;
					</button>
				</div>
				<form
					onSubmit={handleSubmit}
					className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
					<div>
						<label htmlFor="firstname" className="block text-sm font-medium">
							First Name
						</label>
						<input
							type="text"
							id="firstname"
							name="firstname"
							className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
							placeholder="Enter First Name"
							value={formData.firstname}
							onChange={handleChange}
						/>
					</div>
					<div>
						<label htmlFor="lastname" className="block text-sm font-medium">
							Last Name
						</label>
						<input
							type="text"
							id="lastname"
							name="lastname"
							className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
							placeholder="Enter Last Name"
							value={formData.lastname}
							onChange={handleChange}
						/>
					</div>
					<div>
						<label htmlFor="contact" className="block text-sm font-medium">
							Contact Number
						</label>
						<input
							type="number"
							id="contact"
							name="contact"
							className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
							placeholder="Enter Contact Number"
							value={formData.contact}
							onChange={handleChange}
						/>
					</div>
					<div>
						<label htmlFor="email" className="block text-sm font-medium">
							Email Address
						</label>
						<input
							type="email"
							id="email"
							name="email"
							className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
							placeholder="Enter Email"
							value={formData.email}
							onChange={handleChange}
						/>
					</div>
					<div>
						<label htmlFor="password" className="block text-sm font-medium">
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
							placeholder="Enter Password"
							value={formData.password}
							onChange={handleChange}
						/>
					</div>
					<div>
						<label
							htmlFor="confirmPassword"
							className="block text-sm font-medium">
							Confirm Password
						</label>
						<input
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
							placeholder="Confirm Password"
							value={formData.confirmPassword}
							onChange={handleChange}
						/>
					</div>
					<div>
						<label htmlFor="profession" className="block text-sm font-medium">
							Profession Type
						</label>
						<select
							id="profession"
							name="profession"
							className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
							value={formData.profession}
							onChange={handleChange}>
							<option value="Psychologist">Psychologist</option>
							<option value="Psychiatrist">Psychiatrist</option>
						</select>
					</div>
					<div>
						<label htmlFor="experience" className="block text-sm font-medium">
							Years of Experience
						</label>
						<input
							type="number"
							id="experience"
							name="experience"
							className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
							placeholder="Enter Years of Experience"
							value={formData.experience}
							onChange={handleChange}
						/>
					</div>
					<div>
						<label htmlFor="license" className="block text-sm font-medium">
							License Number
						</label>
						<input
							type="number"
							id="license"
							name="license"
							className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
							placeholder="Enter License Number"
							value={formData.license}
							onChange={handleChange}
						/>
					</div>
					<div className="sm:col-span-2">
						<label htmlFor="documents" className="block text-sm font-medium">
							Documents
						</label>
						<input
							type="file"
							id="documents"
							name="documents"
							className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
							onChange={handleChange}
						/>
					</div>
					<div className="sm:col-span-2 flex justify-end space-x-2 mt-4">
						<button
							type="submit"
							className="bg-green-600 rounded-full  text-white px-4 py-2  hover:bg-green-700">
							Register
						</button>
						<button
							type="button"
							className="border-2 rounded-full  text-red-600 px-4 py-2  hover:bg-red-600 hover:text-white"
							onClick={onCancel}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ProfessionalRegister;
