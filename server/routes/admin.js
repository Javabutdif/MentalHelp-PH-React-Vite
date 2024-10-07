const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const db = require("../connection/db");
require("dotenv").config();


//Admin Register
router.post("/admin-register", async (req, res) => {
	const { adminName, adminEmail, adminPassword } = req.body;
	const hashedPassword = await bcrypt.hash(adminPassword, 10);

	const query =
		"INSERT INTO admin (admin_name, admin_email,admin_password) VALUES (?, ?,?)";
	db.query(query, [adminName, adminEmail, hashedPassword], (error, results) => {
		if (error) {
			return res.status(500).json({ error });
		}
		res.status(200).json({ message: "Admin Successfully Registered" });
	});
});

//Dashboard Patient
router.get("/get-count-patients", async (req, res) => {
	const query = "SELECT COUNT(patient_id) AS patientCount FROM patient";

	db.query(query, (error, results) => {
		if (error) {
			return res
				.status(500)
				.json({ message: "Unable to retrieve patient count" });
		}

		const count = results[0]?.patientCount || 0;
		res.status(200).json({ data: count });
	});
});

//Dashboard Professional
router.get("/get-count-active-professional", async (req, res) => {
	const query =
		" SELECT count(professional_id) AS id FROM mental_health_professionals WHERE professional_status = 'Accepted'";
	db.query(query, (error, results) => {
		if (error) {
			return res
				.status(500)
				.json({ message: "Unable to retrieve professionals count" });
		}

		const count = results[0]?.id || 0;
		res.status(200).json({ data: count });
	});
});

//Dashboard Professional
router.get("/get-count-pending-professional", async (req, res) => {
	const query =
		" SELECT count(professional_id) AS id FROM mental_health_professionals WHERE professional_status = 'Pending'";
	db.query(query, (error, results) => {
		if (error) {
			return res
				.status(500)
				.json({ message: "Unable to retrieve professionals count" });
		}

		const count = results[0]?.id || 0;
		res.status(200).json({ data: count });
	});
});

//Get All Patient Data
router.get("/get-all-patient", async (req, res) => {
	const query =
		"SELECT patient.patient_id, patient.firstname, patient.lastname, patient.email, patient.addresses, patient.gender, patient.age, patient.patient_status, patient.contact_number FROM patient WHERE account_status = 'Active'";
	db.query(query, (error, results) => {
		if (error) {
			return res.status(500).json({ message: "Unable to retrieve patients" });
		}

		res.status(200).json({ data: results });
	});
});
//Get All Active Professinal Data
router.get("/get-all-active-professional", async (req, res) => {
	const query =
		"SELECT mental_health_professionals.professional_id, mental_health_professionals.firstname, mental_health_professionals.lastname, mental_health_professionals.email, mental_health_professionals.type, mental_health_professionals.experience, mental_health_professionals.license,mental_health_professionals.professional_status, mental_health_professionals.contact_number FROM mental_health_professionals WHERE professional_status = 'Accepted'";
	db.query(query, (error, results) => {
		if (error) {
			return res
				.status(500)
				.json({ message: "Unable to retrieve active professionals" });
		}

		res.status(200).json({ data: results });
	});
});

//Get All Pending Professional Data
router.get("/get-all-pending-professional", async (req, res) => {
	const query =
		"SELECT mental_health_professionals.professional_id, mental_health_professionals.firstname, mental_health_professionals.lastname, mental_health_professionals.email, mental_health_professionals.type, mental_health_professionals.experience, mental_health_professionals.license,mental_health_professionals.professional_status, mental_health_professionals.contact_number FROM mental_health_professionals WHERE professional_status = 'Pending'";

	db.query(query, (error, results) => {
		if (error) {
			return res
				.status(500)
				.json({ message: "Unable to retrieve pending professionals" });
		}

		res.status(200).json({ data: results });
	});
});


module.exports = router;
