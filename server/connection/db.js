// db.js
const mysql = require("mysql"); 
require("dotenv").config(); 

const db = mysql.createConnection({
	host: process.env.db_host,
	user: process.env.db_username,
	password: process.env.db_password,
	database: process.env.db_name,
});

db.connect((err) => {
	if (err) {
		console.error("Database connection failed:", err);
		return;
	}
	console.log("Connected to " + process.env.db_name);
});


module.exports = db;
