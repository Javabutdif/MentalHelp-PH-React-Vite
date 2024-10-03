const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const db = require("../connection/db");
require("dotenv").config();



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

module.exports = router;
