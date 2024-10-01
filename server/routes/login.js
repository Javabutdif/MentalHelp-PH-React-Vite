const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const db = require("../connection/db");
require("dotenv").config();

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	db.query(
		"SELECT * FROM admin WHERE admin_email = ?",
		[email],
		(error, results) => {
			console.log(error);
			if (error) {
				return res.status(500).json({ error });
			}

			if (results.length === 0) {
				return res.status(401).json({ message: "Invalid email or password." });
			}

			const admin = results[0];

			if (admin.admin_password !== password) {
				return res.status(401).json({ message: "Invalid email or password." });
			}

			res.json({ message: "Login successful", admin });
		}
	);
});

module.exports = router;
