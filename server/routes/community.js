const express = require("express");
const router = express.Router();
const db = require("../connection/db");
require("dotenv").config();

router.post("/create-forum", (req, res) => {
  const { title, description } = req.body;

  const currentDate = new Date();

  const query =
    "INSERT INTO forum (title, description,created_date) VALUES (?, ?,?)";
  db.query(query, [title, description, currentDate], (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.status(200).json({ message: "Forum Created Successfully" });
  });
});

router.get("/get-forum", (req, res) => {
  const query = "SELECT * FROM forum";

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.status(200).json({ data: results });
  });
});
router.post("/send-discussion", (req, res) => {
  const { forum_id, id, isAnonymous, message } = req.body;

  const currentDate = new Date();
  console.log(isAnonymous);
  const query =
    "INSERT INTO discussion (forum_id, patient_id, isAnonymous, message, msg_datetime) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [forum_id, id, isAnonymous, message, currentDate],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.status(200).json({ message: "Send Chat Successfully" });
    }
  );
});

router.get("/get-discussion/:id", (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT * 
    FROM discussion 
    JOIN patient ON patient.patient_id = discussion.patient_id 
    WHERE forum_id = ?
  `;

  db.query(query, [id], (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Database query failed", details: error.message });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No discussions found for the provided forum ID" });
    }

    res.status(200).json({ data: results });
  });
});

module.exports = router;
