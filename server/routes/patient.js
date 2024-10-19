const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const db = require("../connection/db");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { sendMail } = require("../mail/mailContents");

//email,firstname,lastname,passwords,bio,photo,addresses,gender,age,patient_status,contact_number
router.post("/patient-otp", async (req, res) => {
  const { firstName, lastName, userEmail } = req.body;
  console.log(firstName + " " + lastName + " " + userEmail);
  try {
    let { emailInfo, otp } = await sendMail(userEmail, firstName, lastName);
    console.log(emailInfo + " " + otp);
    res.status(200).json({
      message: "OTP sent successfully",
      otp: otp,
      emailInfo: emailInfo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error sending OTP email",
      error,
    });
  }
});

router.post("/patient-register", async (req, res) => {
  const {
    firstName,
    lastName,
    userEmail,
    userPassword,
    userGender,
    userBirthDate,
    userAddress,
    userStatus,
    userContact,
  } = req.body;
  const hashedPassword = await bcrypt.hash(userPassword, 10);
  const currentDate = new Date();
  const birthDate = new Date(userBirthDate);

  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDifference = currentDate.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  const query =
    "INSERT INTO patient (email, firstname,lastname,passwords,addresses,gender,age,patient_status,contact_number , account_status) VALUES (?, ?,?,?,?,?,?,?,?,?)";
  db.query(
    query,
    [
      userEmail,
      firstName,
      lastName,
      hashedPassword,
      userAddress,
      userGender,
      age,
      userStatus,
      userContact,
      "Active",
    ],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.status(200).json({ message: "Patient Successfully Registered" });
    }
  );
});

router.get("/get-specific-patient/:id", async (req, res) => {
  const { id } = req.params;

  const query =
    "SELECT patient.patient_id, patient.firstname, patient.lastname, patient.email, patient.addresses, patient.gender, patient.bio, patient.age, patient.patient_status, patient.contact_number FROM patient WHERE patient_id = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Unable to retrieve patients" });
    }

    res.status(200).json({ data: results });
  });
});

// firstName: response[0].firstname,
// 						lastName: response[0].lastname,
// 						userEmail: response[0].email,
// 						userGender: response[0].gender,
// 						userAddress: response[0].addresses,
// 						userStatus: response[0].status || "Single",
// 						userContact: response[0].contact_number,

router.post("/update-patient", async (req, res) => {
  const {
    id,
    firstName,
    lastName,
    userEmail,
    userGender,
    userAddress,
    userStatus,
    userContact,
    bio,
  } = req.body;

  const query =
    "UPDATE patient SET firstname = ? , lastname = ? , email = ? , gender = ? , addresses = ? , patient_status =  ? , contact_number = ? , bio = ?  WHERE patient_id = ? ";

  db.query(
    query,
    [
      firstName,
      lastName,
      userEmail,
      userGender,
      userAddress,
      userStatus,
      userContact,
      bio,
      id,
    ],
    (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Unable to update patients" });
      }

      res.status(200).json({ message: "Patient updated successful" });
    }
  );
});

router.post("/delete-patient/:id", async (req, res) => {
  const { id } = req.params;
  const query = "UPDATE patient SET account_status = ? WHERE patient_id = ?";
  db.query(query, ["Delete", id], (error, results) => {
    if (error) {
      res.status(500).json({ message: "Unable to delete patients." });
    }
    res.status(200).json({ message: "Patient successfully deleted" });
  });
});

router.post("/recover-patient/:id", async (req, res) => {
  const { id } = req.params;
  const query = "UPDATE patient SET account_status = ? WHERE patient_id = ?";
  db.query(query, ["Active", id], (error, results) => {
    if (error) {
      res.status(500).json({ message: "Unable to recover patients." });
    }
    res.status(200).json({ message: "Patient successfully recovered" });
  });
});

//mental_health_professionals
router.post("/match-professional", async (req, res) => {
  const { profession, issues, age } = req.body;

  const find_professional =
    "SELECT professional_id FROM mental_health_professionals WHERE type = ? AND professional_status = 'Accepted'";

  db.query(find_professional, [profession], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Unable to find professional." });
    }

    if (results.length > 0) {
      const professionalIds = results.map((row) => row.professional_id);

      // Initialize query for searching preferences
      let query =
        "SELECT * FROM mental_health_professional_preference WHERE professional_id IN (?)";

      // Convert issues object to an array of issue strings
      const issueKeys = Object.keys(issues).filter((key) => issues[key]);
      if (issueKeys.length > 0) {
        const issueConditions = issueKeys
          .map((issue) => `mental_issue LIKE ?`)
          .join(" OR ");
        query += ` AND (${issueConditions})`;
      }

      if (age) {
        query += ` AND ? BETWEEN start_age AND end_age`;
      }

      db.query(
        query,
        [professionalIds, ...issueKeys.map((issue) => `%${issue}%`), age],
        (error, preferenceResults) => {
          if (error) {
            return res
              .status(500)
              .json({ message: "Error finding professional preferences." });
          }

          if (preferenceResults.length > 0) {
            const randomProfessional =
              preferenceResults[
                Math.floor(Math.random() * preferenceResults.length)
              ];

            const query1 =
              "SELECT * FROM mental_health_professionals WHERE professional_id = ?";
            db.query(
              query1,
              [randomProfessional.professional_id],
              (error, professionalResult) => {
                if (error) {
                  return res
                    .status(500)
                    .json({ message: "Error finding professional." });
                }
                if (professionalResult.length > 0) {
                  return res.status(200).json({
                    data: professionalResult[0],
                    message: "Search successful",
                  });
                }
              }
            );
          } else {
            return res
              .status(404)
              .json({ message: "No matching professionals found." });
          }
        }
      );
    } else {
      return res
        .status(404)
        .json({ message: "No professionals found with the specified type." });
    }
  });
});
router.post("/request-match", async (req, res) => {
  const { id, issues, age, professional_id } = req.body;

  console.log(id + " " + age + " " + professional_id);
  const query =
    "INSERT INTO patient_details (patient_id, mental_issues, age) VALUES (?, ?, ?)";
  const matchQuery =
    "INSERT INTO matching (patient_id, professional_id, match_date, match_status) VALUES (?, ?, ?, ?)";

  let result = Object.keys(issues)
    .filter((key) => issues[key])
    .join(", ");

  db.query(query, [id, result, age], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Cannot add the patient's details into the database",
      });
    }

    if (result.affectedRows > 0) {
      const date = new Date();

      db.query(
        matchQuery,
        [id, professional_id, date, "Pending"],
        (error, results) => {
          if (error) {
            return res.status(500).json({
              message: "Cannot add the match details into the database",
            });
          }

          if (results.affectedRows > 0) {
            return res.status(200).json({
              message: "Request match successful",
            });
          } else {
            return res.status(500).json({
              message: "Failed to create the match request",
            });
          }
        }
      );
    }
  });
});
router.get("/retrieve-match-status/:id", (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
      matching.match_id, 
      matching.match_date, 
      matching.match_status,
	   mental_health_professionals.type,
      mental_health_professionals.firstname, 
      mental_health_professionals.lastname 
    FROM matching 
    JOIN mental_health_professionals 
      ON mental_health_professionals.professional_id = matching.professional_id 
    WHERE matching.match_status = 'Pending' 
    AND matching.patient_id = ?`;

  db.query(query, [id], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Cannot retrieve the details",
        error: error.message,
      });
    }

    if (result.length > 0) {
      return res.status(200).json({ data: result });
    } else {
      return res.status(404).json({
        message: "No pending matches found for the patient",
      });
    }
  });
});

module.exports = router;
