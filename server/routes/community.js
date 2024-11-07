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
  console.log("Incoming isAnonymous value:", isAnonymous);
  const currentDate = new Date();
  const anon = isAnonymous === true || isAnonymous === "true" ? 1 : 0;
  const query =
    "INSERT INTO discussion (forum_id, patient_id, isAnonymous, message, msg_datetime) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [forum_id, id, anon, message, currentDate],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      console.log(anon + " " + isAnonymous);
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
    ORDER BY msg_datetime ASC
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

router.get("/get-title/:id", (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT title 
    FROM forum 
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
        .json({ message: "No forum title found for the provided forum ID" });
    }
    console.log(results);
    res.status(200).json({ data: results });
  });
});

//get-forum-information

router.get("/get-forum-information/:id", (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT * 
    FROM forum 
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
        .json({ message: "No forum title found for the provided forum ID" });
    }
    console.log(results);
    res.status(200).json({ data: results });
  });
});

router.put("/set-forum-information", (req, res) => {
  const { id, title, description } = req.body;
  console.log(id + " " + title + " " + description);
  const query =
    "UPDATE forum SET title = ? , description = ?   WHERE forum_id = ? ";

  db.query(query, [title, description, id], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Unable to update forum" });
    }
    console.log("Forum Update Successful");
    res.status(200).json({ message: "Forum updated successful" });
  });
});


router.delete("/delete-forum/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM forum WHERE forum_id = ?";

  db.query(query, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Unable to delete forum" });
    }
    if (results.affectedRows > 0) {
      res.status(200).json({ message: "Forum deleted successfully" });
    } else {
      res.status(404).json({ message: "Forum not found" });
    }
  });
});

module.exports = router;
