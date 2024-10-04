const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const db = require("../connection/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const token_key = process.env.JWT_SECRET;
const authenticateToken = require("../middleware/authenticateToken");

const passwordMatch = async (data, password) => {
	return await bcrypt.compare(password, data);
};

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	db.query(
		"SELECT * FROM admin WHERE admin_email = ?",
		[email],
		async (error, results) => {
			if (error) {
				console.error(error);
				return res.status(500).json({ error: "Internal Server Error" });
			}

			if (results.length > 0) {
				const admin = results[0];

				const isPasswordValid = await passwordMatch(
					admin.admin_password,
					password
				);
				if (!isPasswordValid) {
					return res
						.status(401)
						.json({ message: "Invalid email or password." });
				}

				const data = {
					adminName: admin.admin_name,
					adminEmail: admin.admin_email,
					role: "Admin",
				};
				console.log(data);
				const token = jwt.sign({ data }, token_key, {
					expiresIn: "1h",
				});

				res.cookie("token", token, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
					maxAge: 3600000,
					sameSite: "None",
				});
				return res.json({ message: "Admin Login successful", data: data });
			} else {
				//Patient Login
				db.query(
					"SELECT * FROM patient WHERE email = ?",
					[email],
					async (error, result) => {
						if (error) {
							console.error(error);
							return res.status(500).json({ error: "Internal Server Error" });
						}

						if (result.length > 0) {
							const patient = result[0];

							const isPasswordValid = await passwordMatch(
								patient.passwords,
								password
							);
							if (isPasswordValid) {
								const data = {
									name: patient.firstname + " " + patient.lastname,
									bio: patient.bio,
									photo: patient.photo,
									address: patient.addresses,
									gender: patient.gender,
									age: patient.age,
									status: patient.patient_status,
									contact: patient.contact_number,
									role: "Patient",
								};
								console.log(data);
								const token = jwt.sign({ data }, token_key, {
									expiresIn: "1h",
								});

								res.cookie("token", token, {
									httpOnly: true,
									secure: process.env.NODE_ENV === "production",
									maxAge: 3600000,
									sameSite: "None",
								});
								return res.status(200).json({
									message: "Patient Login Successful",
									data: data,
								});
							} else {
								return res
									.status(401)
									.json({ message: "Invalid email or password." });
							}
						} else {
							//Professional Login
							db.query(
								"SELECT * FROM mental_health_professionals WHERE email = ?",
								[email],
								async (error, result1) => {
									if (error) {
										console.error(error);
										return res
											.status(500)
											.json({ error: "Internal Server Error" });
									}

									if (result1.length > 0) {
										const professionals = result1[0];

										const isPasswordValid = await passwordMatch(
											professionals.passwords,
											password
										);

										if (isPasswordValid) {
											const data = {
												id: professionals.professional_id,
												name:
													professionals.firstname +
													" " +
													professionals.lastname,
												bio: professionals.bio,
												photo: professionals.photo,
												type: professionals.type,
												license: professionals.license,
												experience: professionals.experience,
												status: professionals.professional_status,
												contact: professionals.contact_number,
												role: "Professionals",
											};
											console.log(data);
											const token = jwt.sign({ data }, token_key, {
												expiresIn: "1h",
											});

											res.cookie("token", token, {
												httpOnly: true,
												secure: process.env.NODE_ENV === "production",
												maxAge: 3600000,
												sameSite: "None",
											});
											return res.status(200).json({
												message: "Professional Login Successful",
												data: data,
											});
										} else {
											return res
												.status(401)
												.json({ message: "Invalid email or password." });
										}
									}
								}
							);
						}
					}
				);
			}
		}
	);
});

router.get("/protected-route", authenticateToken, (req, res) => {
	return res.json({
		message: "Access granted",
		data: req.data,
		key: true,
	});
});

router.post("/logout", (req, res) => {
	res.clearCookie("token", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "None",
	});

	res.json({ message: "Logout successful" });
});

module.exports = router;
