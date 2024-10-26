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

module.exports = router;
