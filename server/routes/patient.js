const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const db = require("../connection/db");
require("dotenv").config();

//email,firstname,lastname,passwords,bio,photo,addresses,gender,age,patient_status,contact_number

router.post("/patient-register", async (req, res) => {
	const {
		firstName,
		lastName,
		userEmail,
		userPassword,
		userGender,
		userBirthDate,
		userAddress,
		userStatus,
		userContact,
	} = req.body;
	const hashedPassword = await bcrypt.hash(userPassword, 10);
	const currentDate = new Date();
	const birthDate = new Date(userBirthDate);

	let age = currentDate.getFullYear() - birthDate.getFullYear();
	const monthDifference = currentDate.getMonth() - birthDate.getMonth();

	if (
		monthDifference < 0 ||
		(monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
	) {
		age--;
	}

	const query =
		"INSERT INTO patient (email, firstname,lastname,passwords,addresses,gender,age,patient_status,contact_number) VALUES (?, ?,?,?,?,?,?,?,?)";
	db.query(
		query,
		[
			userEmail,
			firstName,
			lastName,
			hashedPassword,
			userAddress,
			userGender,
			age,
			userStatus,
			userContact,
		],
		(error, results) => {
			if (error) {
				return res.status(500).json({ error });
			}
			res.status(200).json({ message: "Patient Successfully Registered" });
		}
	);
});



module.exports = router;
