const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const db = require("../connection/db");
require("dotenv").config();
const sendMail = require("../mail/mailContents");

//professional_id,firstname,lastname,email,contact_number,type,passwords,license,experience,photo,bio,comments,ratings,documents,professional_status

// firstname: "",
// 	lastname: "",
// 	contact: "",
// 	email: "",
// 	password: "",
// 	confirmPassword: "",
// 	profession: "Psychologist",
// 	experience: "",
// 	license: "",
// 	documents: null,

router.post("/professional-otp", async (req, res) => {
	const { firstname, lastname, email } = req.body;

	try {
		let { emailInfo, otp } = await sendMail(email, firstname, lastname);

		res.status(200).json({
			message: "OTP sent successfully",
			otp: otp,
			emailInfo: emailInfo,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error sending OTP email",
			error,
		});
	}
});



router.post("/professional-register", async (req, res) => {
	const {
		firstname,
		lastname,
		contact,
		email,
		password,
		profession,
		experience,
		license,
		documents,
	} = req.body;
	console.log(firstname);
	const hashedPassword = await bcrypt.hash(password, 10);

	const query =
		"INSERT INTO mental_health_professionals (email, firstname,lastname,passwords,type,license,experience,professional_status,contact_number) VALUES (?, ?,?,?,?,?,?,?,?)";
	db.query(
		query,
		[
			email,
			firstname,
			lastname,
			hashedPassword,
			profession,
			license,
			experience,
			"Pending",
			contact,
		],
		(error, results) => {
			if (error) {
				return res.status(500).json({ error });
			}
			res.status(200).json({ message: "Professional Successfully Registered" });

			console.log(error);
		}
	);
});

module.exports = router;
