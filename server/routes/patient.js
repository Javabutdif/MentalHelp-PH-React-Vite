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
		"INSERT INTO patient (email, firstname,lastname,passwords,addresses,gender,age,patient_status,contact_number , account_status) VALUES (?, ?,?,?,?,?,?,?,?,?)";
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
			"Active",
		],
		(error, results) => {
			if (error) {
				return res.status(500).json({ error });
			}
			res.status(200).json({ message: "Patient Successfully Registered" });
		}
	);
});

router.get("/get-specific-patient/:id", async (req, res) => {
	const { id } = req.params;

	const query =
		"SELECT patient.patient_id, patient.firstname, patient.lastname, patient.email, patient.addresses, patient.gender, patient.age, patient.patient_status, patient.contact_number FROM patient WHERE patient_id = ?";
	db.query(query, [id], (error, results) => {
		if (error) {
			return res.status(500).json({ message: "Unable to retrieve patients" });
		}

		res.status(200).json({ data: results });
	});
});

// firstName: response[0].firstname,
// 						lastName: response[0].lastname,
// 						userEmail: response[0].email,
// 						userGender: response[0].gender,
// 						userAddress: response[0].addresses,
// 						userStatus: response[0].status || "Single",
// 						userContact: response[0].contact_number,

router.post("/update-patient", async (req, res) => {
	const {
		id,
		firstName,
		lastName,
		userEmail,
		userGender,
		userAddress,
		userStatus,
		userContact,
	} = req.body;

	const query =
		"UPDATE patient SET firstname = ? , lastname = ? , email = ? , gender = ? , addresses = ? , patient_status =  ? , contact_number = ? WHERE patient_id = ? ";

	db.query(
		query,
		[
			firstName,
			lastName,
			userEmail,
			userGender,
			userAddress,
			userStatus,
			userContact,
			id,
		],
		(error, results) => {
			if (error) {
				return res.status(500).json({ message: "Unable to update patients" });
			}

			res.status(200).json({ message: "Patient updated successful" });
		}
	);
});

router.post("/delete-patient/:id", async (req, res) => {
	const { id } = req.params;
	const query = "UPDATE patient SET account_status = ? WHERE patient_id = ?";
	db.query(query, ["Delete", id], (error, results) => {
		if (error) {
			res.status(500).json({ message: "Unable to delete patients." });
		}
		res.status(200).json({ message: "Patient successfully deleted" });
	});
});



module.exports = router;
