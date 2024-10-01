const express = require("express");
const mysql = require("mysql");
const app = express();
const port = process.env.db_port || 3000;
const cors = require("cors");
require("dotenv").config();
const login = require("./routes/login");

app.use(express.json());

app.use(
	cors({
		origin: process.env.CORS,
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	})
);

app.get("/api/users", (req, res) => {
	db.query("SELECT * FROM users", (error, results) => {
		if (error) {
			return res.status(500).json({ error });
		}
		res.json(results);
	});
});

// Sample API endpoint to add data
app.post("/api/users", (req, res) => {
	const { name, email } = req.body;
	const query = "INSERT INTO users (name, email) VALUES (?, ?)";
	db.query(query, [name, email], (error, results) => {
		if (error) {
			return res.status(500).json({ error });
		}
		res.status(201).json({ id: results.insertId, name, email });
	});
});

app.use("/api", login);

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
