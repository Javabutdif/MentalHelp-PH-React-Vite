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
			res.status(200).json({
				message:
					"Professional registered successfully. Verification of your account will take a few days.",
			});

			console.log(error);
		}
	);
});



router.get("/get-specific-professional/:id", async (req, res) => {
	const { id } = req.params;

	const query =
		"SELECT mental_health_professionals.professional_id, mental_health_professionals.firstname, mental_health_professionals.lastname, mental_health_professionals.email, mental_health_professionals.license, mental_health_professionals.experience, mental_health_professionals.type, mental_health_professionals.professional_status,mental_health_professionals.bio, mental_health_professionals.contact_number FROM mental_health_professionals WHERE professional_id = ?";
	db.query(query, [id], (error, results) => {
		if (error) {
			return res
				.status(500)
				.json({ message: "Unable to retrieve professional" });
		}

		res.status(200).json({ data: results });
	});
});
// id: response[0].professional_id,
// firstname: response[0].firstname,
// lastname: response[0].lastname,
// email: response[0].email,
// license: response[0].license,
// experience: response[0].experience,
// profession: response[0].type,
// contact: response[0].contact_number,

router.post("/update-professional", async (req, res) => {
	const {
		id,
		firstname,
		lastname,
		email,
		license,
		experience,
		profession,
		contact,
		bio,
	} = req.body;

	const query =
		"UPDATE mental_health_professionals SET firstname = ? , lastname = ? , email = ? , license = ? , experience = ? , type =  ? , contact_number = ? , bio = ? WHERE professional_id = ? ";

	db.query(
		query,
		[
			firstname,
			lastname,
			email,
			license,
			experience,
			profession,
			contact,
			bio,
			id,
		],
		(error, results) => {
			if (error) {
				return res
					.status(500)
					.json({ message: "Unable to update professional" });
			}

			res.status(200).json({ message: "Professional updated successful" });
		}
	);
});




module.exports = router;
