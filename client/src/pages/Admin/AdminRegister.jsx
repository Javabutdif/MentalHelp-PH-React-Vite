import React, { useState } from "react";
import { admin_register } from "../../api/register";
import { useNavigate } from "react-router-dom";

function AdminRegister() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		adminName: "",
		adminEmail: "",
		adminPassword: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Form submitted: ", formData);

		await admin_register(formData);

		setFormData({
			adminName: "",
			adminEmail: "",
			adminPassword: "",
		});
	};

	const hideRegister = () => {
		navigate("/login");
	};

	return (
		<div
			className={`fixed inset-0 z-50 `}
			aria-labelledby="modal-title"
			role="dialog"
			aria-modal="true">
			<div className="flex items-center justify-center min-h-screen">
				<div className="bg-gray-500 bg-opacity-75 fixed inset-0"></div>
				<div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto">
					<div className="modal-header flex justify-between p-4 border-b">
						<h5 className="text-lg font-bold text-green-600" id="modal-title">
							Admin Sign Up
						</h5>
						<button type="button" className="text-gray-400 hover:text-gray-600">
							&times;
						</button>
					</div>
					<form onSubmit={handleSubmit}>
						<div className="modal-body p-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
								<div className="form-group my-2">
									<label htmlFor="first_name" className="block">
										Full Name
									</label>
									<input
										type="text"
										className="form-control w-full rounded-lg px-4 py-2 border border-gray-300"
										id="first_name"
										placeholder="Enter First name"
										name="adminName"
										value={formData.adminName}
										onChange={handleInputChange}
									/>
								</div>

								<div className="form-group my-2">
									<label htmlFor="email" className="block">
										Email Address
									</label>
									<input
										type="email"
										className="form-control w-full rounded-lg px-4 py-2 border border-gray-300"
										id="email"
										placeholder="Enter email"
										name="adminEmail"
										value={formData.adminEmail}
										onChange={handleInputChange}
									/>
								</div>

								<div className="form-group my-2">
									<label htmlFor="password" className="block">
										Password
									</label>
									<input
										type="password"
										className="form-control w-full rounded-lg px-4 py-2 border border-gray-300"
										id="password"
										placeholder="Password"
										name="adminPassword"
										value={formData.adminPassword}
										onChange={handleInputChange}
									/>
								</div>
							</div>
						</div>

						<div className="modal-footer p-2 border-t flex justify-end">
							<button
								type="button"
								onClick={handleSubmit}
								className="bg-green-600 text-white rounded-full py-2 px-8 mr-2 hover:bg-green-700">
								Register
							</button>
							<button
								type="button"
								onClick={hideRegister}
								className="bg-white text-red-600 rounded-full py-2 px-8 hover:bg-red-700 hover:text-white">
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default AdminRegister;
