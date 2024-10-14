import React, { useState, useEffect } from "react";
import { patient_register } from "../../api/register";
import {
	retrieveSpecificPatient,
	editPatient,
	sendOtp,
} from "../../api/patients";
import RegistrationConfirmationModal from "./RegistrationConfirmationModal";
import Otp from "./Otp";
import { showToast } from "../utils/alertHelper";
import LoadingScreen from "../../Loader/LoadingScreen";

const PatientRegister = ({ onCancel, type, id }) => {
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [showOtp, setShowOtp] = useState(false);
	const [otp, setOtp] = useState("");
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		userEmail: "",
		userPassword: "",
		userConfirmPassword: "",
		userGender: "",
		userBirthDate: "",
		userAddress: "",
		userStatus: "Single",
		userContact: "",
		bio: "",
	});

	useEffect(() => {
		if (type === "Edit" && id) {
			const fetchPatient = async () => {
				try {
					const response = await retrieveSpecificPatient(id);

					setFormData({
						id: response[0].patient_id,
						firstName: response[0].firstname,
						lastName: response[0].lastname,
						userEmail: response[0].email,
						userGender: response[0].gender,
						userAddress: response[0].addresses,
						userStatus: response[0].patient_status || "Single",
						userContact: response[0].contact_number,
						bio: response[0].bio,
					});
				} catch (error) {
					console.error("Error fetching patient data: ", error);
				}
			};
			fetchPatient();
		}
	}, [type, id]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleOtp = async () => {
		setLoading(true);
		console.log(formData);
		const data = await sendOtp(formData);
		console.log(data);
		if (data !== undefined) {
			setOtp(data);
			setShowOtp(true);
			setLoading(false);
		} else {
			handleCloseOtp();
			setLoading(false);
		}
	};
	const handleCloseOtp = () => {
		setShowOtp(false);
	};

	const handleRoute = async () => {
		hideDetails();
		if (type === "Edit" && id) {
			await handleSubmit();
		} else {
			await handleOtp();
		}
	};

	const handleSubmit = async () => {
		setLoading(true);
		if (type === "Register") {
			await patient_register(formData);
			setLoading(false);

			hideDetails();
		} else if (type === "Edit") {
			await editPatient(formData);
			setLoading(false);
			hideDetails();
		}

		setFormData({
			firstName: "",
			lastName: "",
			userEmail: "",
			userPassword: "",
			userConfirmPassword: "",
			userGender: "",
			userBirthDate: "",
			userAddress: "",
			userStatus: "Single",
			userContact: "",
			bio: "",
		});
		onCancel();

		setLoading(false);
	};

	const showDetails = () => {
		setShowModal(true);
	};
	const hideDetails = () => {
		setShowModal(false);
	};

	const handleOtpValidation = async (userOtp) => {
		console.log(userOtp);
		console.log(otp);
		if (String(userOtp) === String(otp)) {
			await handleSubmit();
		} else {
			showToast("error", "Incorrect OTP. Please try again.");
		}
	};

	return (
		<>
			<div
				className={`fixed inset-0 z-50`}
				aria-labelledby="modal-title"
				role="dialog"
				aria-modal="true">
				<div className="flex items-center justify-center min-h-screen">
					<div className="bg-gray-500 bg-opacity-75 fixed inset-0"></div>
					<div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto">
						<div className="modal-header flex justify-between p-4 border-b">
							<h5 className="text-lg font-bold text-green-600" id="modal-title">
								{type === "Register" ? "Patient Sign Up" : "Edit Patient"}
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
									{type === "Edit" && (
										<>
											<div className="form-group my-2">
												<label htmlFor="bio" className="block">
													Bio
												</label>
												<input
													type="text"
													className="form-control w-full rounded-lg px-4 py-2 border border-gray-300"
													id="bio"
													placeholder="Enter Bio"
													name="bio"
													value={formData.bio}
													onChange={handleInputChange}
												/>
											</div>
										</>
									)}

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

									{type === "Register" && (
										<>
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
										</>
									)}

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
									{type === "Register" && (
										<>
											<div className="form-group my-2">
												<label htmlFor="birth" className="block">
													Birth Date
												</label>
												<input
													type="date"
													className="form-control w-full rounded-lg px-4 py-2 border border-gray-300"
													id="birth"
													placeholder="Enter your birthdate..."
													name="userBirthDate"
													value={formData.userBirthDate}
													onChange={handleInputChange}
												/>
											</div>
										</>
									)}

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
											<option value="Prefer not to say">
												Prefer not to say
											</option>
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
									type="button"
									onClick={showDetails}
									className="bg-green-600 text-white rounded-full py-2 px-8 mr-2 hover:bg-green-700">
									{type === "Register" ? "Register" : "Save Changes"}
								</button>
								<button
									type="button"
									onClick={onCancel}
									className="bg-gray-400 text-white rounded-full py-2 px-6 hover:bg-gray-500">
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
				{showOtp && (
					<Otp
						onSubmit={handleOtpValidation}
						onClose={handleCloseOtp}
						data={otp}
					/>
				)}
				{showModal && (
					<RegistrationConfirmationModal
						formData={formData}
						onCancel={hideDetails}
						showModal={showModal}
						type={type}
						onSubmit={handleRoute}
					/>
				)}
			</div>
		</>
	);
};

export default PatientRegister;
