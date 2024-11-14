const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const db = require("../connection/db");
const { sendDeclineMail, sendDeletedMail } = require("../mail/mailContents");
require("dotenv").config();

//Admin Register
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

//Dashboard Patient
router.get("/get-count-patients", async (req, res) => {
  const query = "SELECT COUNT(patient_id) AS patientCount FROM patient";

  db.query(query, (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Unable to retrieve patient count" });
    }

    const count = results[0]?.patientCount || 0;
    res.status(200).json({ data: count });
  });
});

//Dashboard Professional
router.get("/get-count-active-professional", async (req, res) => {
  const query =
    " SELECT count(professional_id) AS id FROM mental_health_professionals WHERE professional_status = 'Accepted'";
  db.query(query, (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Unable to retrieve professionals count" });
    }

    const count = results[0]?.id || 0;
    res.status(200).json({ data: count });
  });
});

//Dashboard Professional
router.get("/get-count-pending-professional", async (req, res) => {
  const query =
    " SELECT count(professional_id) AS id FROM mental_health_professionals WHERE professional_status = 'Pending'";
  db.query(query, (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Unable to retrieve professionals count" });
    }

    const count = results[0]?.id || 0;
    res.status(200).json({ data: count });
  });
});

router.get("/get-count-decline-professional", async (req, res) => {
  const query =
    " SELECT count(professional_id) AS id FROM mental_health_professionals WHERE professional_status = 'Decline'";
  db.query(query, (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Unable to retrieve professionals count" });
    }

    const count = results[0]?.id || 0;
    res.status(200).json({ data: count });
  });
});

//Get All Patient Data
router.get("/get-all-patient", async (req, res) => {
  const query =
    "SELECT patient.patient_id, patient.firstname, patient.lastname, patient.email, patient.addresses, patient.gender, patient.age, patient.patient_status, patient.contact_number , patient.account_status FROM patient ";
  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Unable to retrieve patients" });
    }

    res.status(200).json({ data: results });
  });
});
//Get All Active Professinal Data
router.get("/get-all-active-professional", async (req, res) => {
  const query =
    "SELECT mental_health_professionals.professional_id, mental_health_professionals.firstname, mental_health_professionals.lastname, mental_health_professionals.email, mental_health_professionals.type, mental_health_professionals.experience, mental_health_professionals.license,mental_health_professionals.professional_status, mental_health_professionals.contact_number ,mental_health_professionals.professional_status, mental_health_professionals.documents  FROM mental_health_professionals WHERE professional_status = 'Accepted' OR professional_status = 'Decline' OR professional_status = 'Delete'";
  db.query(query, (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Unable to retrieve active professionals" });
    }

    res.status(200).json({ data: results });
  });
});

//Get All Pending Professional Data
router.get("/get-all-pending-professional", async (req, res) => {
  const query =
    "SELECT mental_health_professionals.professional_id, mental_health_professionals.firstname, mental_health_professionals.lastname, mental_health_professionals.email, mental_health_professionals.type, mental_health_professionals.experience, mental_health_professionals.license,mental_health_professionals.professional_status, mental_health_professionals.contact_number, mental_health_professionals.professional_status, mental_health_professionals.documents FROM mental_health_professionals WHERE professional_status = 'Pending'";

  db.query(query, (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Unable to retrieve pending professionals" });
    }

    res.status(200).json({ data: results });
  });
});

//Accept request
router.post("/accept-professional/:id", async (req, res) => {
  const { id } = req.params;
  const query =
    "UPDATE mental_health_professionals SET professional_status = ? WHERE professional_id = ?";
  db.query(query, ["Accepted", id], (error, result) => {
    if (error) {
      return res.status(500).json({ message: "Database error", error });
    }
    if (result.affectedRows === 0) {
      return res.status(500).json({ message: "Professional not found" });
    } else {
      return res
        .status(200)
        .json({ message: "Professional  accepted successfully" });
    }
  });
});
// Delete Professional
router.post("/delete-professional/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const getProfessional =
      "SELECT * FROM mental_health_professionals WHERE professional_id = ?";
    db.query(getProfessional, [id], async (error, result) => {
      if (error) {
        return res.status(500).json({ message: "Database error", error });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Professional not found" });
      }

      const { email, firstname, lastname } = result[0];

      const updateQuery =
        "UPDATE mental_health_professionals SET professional_status = ? WHERE professional_id = ?";
      db.query(
        updateQuery,
        ["Delete", id],
        async (updateError, updateResult) => {
          if (updateError) {
            return res
              .status(500)
              .json({ message: "Database error", error: updateError });
          }

          if (updateResult.affectedRows === 0) {
            return res.status(404).json({ message: "Professional not found" });
          } else {
            try {
              let emailInfo = await sendDeletedMail(email, firstname, lastname);
              return res
                .status(200)
                .json({ message: "Professional deleted successfully" });
            } catch (mailError) {
              return res
                .status(500)
                .json({ message: "Error sending email", error: mailError });
            }
          }
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
});

//Recover Professional
router.post("/recover-professional/:id", async (req, res) => {
  const { id } = req.params;
  const query =
    "UPDATE mental_health_professionals SET professional_status = ? WHERE professional_id = ?";
  db.query(query, ["Accepted", id], (error, result) => {
    if (error) {
      return res.status(500).json({ message: "Database error", error });
    }
    if (result.affectedRows === 0) {
      return res.status(500).json({ message: "Professional not found" });
    } else {
      return res
        .status(200)
        .json({ message: "Professional  recover successfully" });
    }
  });
});

//Decline Request

router.post("/decline-professional", async (req, res) => {
  const { professional_id, email, firstname, lastname } = req.body;

  try {
    let { emailInfo } = await sendDeclineMail(email, firstname, lastname);

    const query =
      "UPDATE mental_health_professionals SET professional_status = ? WHERE professional_id = ?";
    db.query(query, ["Decline", professional_id], (error, result) => {
      if (error) {
        return res.status(500).json({ message: "Database error", error });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Professional not found" });
      } else {
        return res
          .status(200)
          .json({ message: "Professional declined successfully", emailInfo });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Error sending email", error });
  }
});
router.get("/get-user-activity", (req, res) => {
  const query = "SELECT * FROM user_activity ORDER BY date ASC";
  db.query(query, (error, result) => {
    if (error) {
      return res.status(500).json({ message: "No Data Found!" });
    }
    console.log(result);
    res.status(200).json({ data: result });
  });
});

router.get("/get-professional-activity", (req, res) => {
  const query = "SELECT * FROM professional_activity ORDER BY date ASC";
  db.query(query, (error, result) => {
    if (error) {
      return res.status(500).json({ message: "No Data Found!" });
    }
    console.log(result);
    res.status(200).json({ data: result });
  });
});

module.exports = router;
