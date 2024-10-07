import React, { useState } from "react";

function Otp({ onSubmit, onClose }) {
	const [otp, setOtp] = useState("");

	const handleChange = (e) => {
		setOtp(e.target.value);
	};

	const handleSubmit = () => {
		if (otp.length === 6) {
			onSubmit(otp);
		} else {
			alert("Please enter a valid 6-digit OTP");
		}
	};

	return (
		<div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
			<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-xl font-semibold mb-4 text-center">Enter OTP</h2>
				<p className="mb-4 text-center text-gray-600">
					A One-Time Pin (OTP) has been sent to your email. Please enter it
					below.
				</p>
				<input
					type="text"
					value={otp}
					onChange={handleChange}
					placeholder="Enter OTP"
					className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center"
					maxLength={6}
				/>
				<div className="flex justify-between items-center">
					<button
						className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
						onClick={handleSubmit}>
						Submit
					</button>
					<button
						className="text-gray-500 hover:text-gray-700 transition"
						onClick={onClose}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}

export default Otp;
