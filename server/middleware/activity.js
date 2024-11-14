const db = require("../connection/db");

const userActivity = async (patient_id) => {
  const currentDate = new Date();

  const formattedDate = currentDate
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const query =
    "INSERT INTO user_activity (patient_id,time_in, date) VALUES (?, ?,?)";
  await db.query(query, [patient_id, formattedDate, currentDate]);
};

const professionalActivity = async (professional_id) => {
  const currentDate = new Date();

  const formattedDate = currentDate
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const query =
    "INSERT INTO professional_activity (professional_id,time_in, date) VALUES (?, ?,?)";
  await db.query(query, [professional_id, formattedDate, currentDate]);
};

module.exports = { userActivity, professionalActivity };
