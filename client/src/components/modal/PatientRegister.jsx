import React, { useState } from "react";

const PatientRegister = ({ onCancel }) => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		userEmail: "",
		userPassword: "",
		userConfirmPassword: "",
		userGender: "",
		userAge: "",
		userAddress: "",
		userStatus: "Single",
		userContact: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form submitted: ", formData);

		setFormData({
			firstName: "",
			lastName: "",
			userEmail: "",
			userPassword: "",
			userConfirmPassword: "",
			userGender: "",
			userAge: "",
			userAddress: "",
			userStatus: "Single",
			userContact: "",
		});
		onCancel();
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
							Patient Sign Up
						</h5>
						<button
							type="button"
							onClick={onCancel}
							className="text-gray-400 hover:text-gray-600">
							&times;
						</button>
					</div>
					<form onSubmit={handleSubmit}>
						<div className="modal-body p-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
								<div className="form-group my-2">
									<label htmlFor="first_name" className="block">
										First Name
									</label>
									<input
										type="text"
										className="form-control w-full rounded-lg px-4 py-2 border border-gray-300"
										id="first_name"
										placeholder="Enter First name"
										name="firstName"
										value={formData.firstName}
										onChange={handleInputChange}
									/>
								</div>

								<div className="form-group my-2">
									<label htmlFor="last_name" className="block">
										Last Name
									</label>
									<input
										type="text"
										className="form-control w-full rounded-lg px-4 py-2 border border-gray-300"
										id="last_name"
										placeholder="Enter Last name"
										name="lastName"
										value={formData.lastName}
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
										name="userEmail"
										value={formData.userEmail}
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
										name="userPassword"
										value={formData.userPassword}
										onChange={handleInputChange}
									/>
								</div>

								<div className="form-group my-2">
									<label htmlFor="confirm_password" className="block">
										Confirm Password
									</label>
									<input
										type="password"
										className="form-control w-full rounded-lg px-4 py-2 border border-gray-300"
										id="confirm_password"
										placeholder="Confirm Password"
										name="userConfirmPassword"
										value={formData.userConfirmPassword}
										onChange={handleInputChange}
									/>
								</div>

								<div className="form-group my-2">
									<label htmlFor="gender" className="block">
										Gender
									</label>
									<input
										type="text"
										className="form-control w-full rounded-lg px-4 py-2 border border-gray-300"
										id="gender"
										placeholder="Enter your gender..."
										name="userGender"
										value={formData.userGender}
										onChange={handleInputChange}
									/>
								</div>

								<div className="form-group my-2">
									<label htmlFor="age" className="block">
										Age
									</label>
									<input
										type="number"
										className="form-control w-full rounded-lg px-4 py-2 border border-gray-300"
										id="age"
										placeholder="Enter your age..."
										name="userAge"
										value={formData.userAge}
										onChange={handleInputChange}
									/>
								</div>

								<div className="form-group my-2">
									<label htmlFor="address" className="block">
										Address
									</label>
									<input
										type="text"
										className="form-control w-full rounded-lg px-4 py-2 border border-gray-300"
										id="address"
										placeholder="Enter your address..."
										name="userAddress"
										value={formData.userAddress}
										onChange={handleInputChange}
									/>
								</div>

								<div className="form-group my-2">
									<label htmlFor="status" className="block">
										Status
									</label>
									<select
										className="form-control w-full rounded-lg px-4 py-2 border border-gray-300"
										name="userStatus"
										value={formData.userStatus}
										onChange={handleInputChange}>
										<option value="Single">Single</option>
										<option value="Married">Married</option>
										<option value="Prefer not to say">Prefer not to say</option>
									</select>
								</div>

								<div className="form-group my-2">
									<label htmlFor="contact" className="block">
										Contact Number
									</label>
									<input
										type="text"
										className="form-control w-full rounded-lg px-4 py-2 border border-gray-300"
										id="contact"
										placeholder="Enter your contact number..."
										name="userContact"
										value={formData.userContact}
										onChange={handleInputChange}
									/>
								</div>
							</div>
						</div>

						<div className="modal-footer p-2 border-t flex justify-end">
							<button
								type="submit"
								className="bg-green-600 text-white rounded-full py-2 px-8 mr-2 hover:bg-green-700">
								Register
							</button>
							<button
								type="button"
								onClick={onCancel}
								className="bg-white text-red-600 rounded-full py-2 px-8 hover:bg-red-700 hover:text-white">
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default PatientRegister;
