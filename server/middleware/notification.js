const db = require("../connection/db");
require("dotenv").config();

const notification = async (title, patient_id, message) => {
	try {
		const notifDate = new Date();
		const query = `
            INSERT INTO notification (notification_title, patient_id, message, notification_date) 
            VALUES (?,?, ?,  ?)
        `;

		const result = await db.query(query, [
			title,
			patient_id,

			message,
			notifDate.toLocaleString(),
		]);

		if (result.affectedRows > 0) {
			console.log("Notification added!");
		} else {
			console.log("Failed to add notification.");
		}
	} catch (error) {
		console.error("Error inserting notification:", error);
	}
};

const notification_professional = async (title, professional_id, message) => {
	try {
		const notifDate = new Date();
		const query = `
            INSERT INTO notification_professional (notification_title, professional_id, message, notification_date) 
            VALUES (?,?, ?,  ?)
        `;

		const result = await db.query(query, [
			title,
			professional_id,

			message,
			notifDate,
		]);

		if (result.affectedRows > 0) {
			console.log("Notification added!");
		} else {
			console.log("Failed to add notification.");
		}
	} catch (error) {
		console.error("Error inserting notification:", error);
	}
};

module.exports = { notification, notification_professional };
