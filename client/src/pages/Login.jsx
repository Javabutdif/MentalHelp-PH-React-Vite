import React, { useEffect, useState } from "react";
import { login } from "../api/login";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../Loader/LoadingScreen";

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const response = await login(email, password);
		console.log(response);
		if (response === "Admin") {
			setLoading(false);
			navigate("/admin/dashboard");
		} else {
			setLoading(false);
		}
	};

	return (
		<>
			{loading ? (
				<div className="relative min-h-screen flex justify-center items-center bg-gray-100 px-4">
					<LoadingScreen />
				</div>
			) : (
				<div className="container mx-auto max-w-md mt-12 h-screen shadow-lg py-20 px-6">
					<div className="flex justify-center">
						<div className="w-full">
							<div className="text-center mb-6">
								<img
									src="/logonn.png"
									alt="Logo"
									className="h-32 w-32 mx-auto"
								/>
							</div>
							<h2 className="text-2xl text-center font-semibold mb-6">
								Welcome
							</h2>
							<form onSubmit={handleSubmit}>
								<div className="form-group mb-4">
									<label htmlFor="email" className="block mb-2 font-medium">
										Email address
									</label>
									<input
										type="email"
										id="email"
										className="form-control w-full rounded-lg px-4 py-2 border border-gray-300"
										placeholder="Enter email"
										name="emailLogin"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className="form-group mb-4">
									<label htmlFor="password" className="block mb-2 font-medium">
										Password
									</label>
									<input
										type="password"
										id="password"
										className="form-control w-full rounded-lg px-4 py-2 border border-gray-300"
										placeholder="Password"
										name="passwordLogin"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
								<div className="text-center">
									<button
										type="submit"
										className="bg-green-600 text-white rounded-full py-2 px-8 mt-6 hover:bg-green-700"
										name="submitLogin">
										Login
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Login;
