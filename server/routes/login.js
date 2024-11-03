const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const db = require("../connection/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const token_key = process.env.JWT_SECRET;
const authenticateToken = require("../middleware/authenticateToken");

const passwordMatch = async (data, password) => {
  return await bcrypt.compare(password, data);
};

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const adminQuery = "SELECT * FROM admin WHERE admin_email = ?";
    const adminResults = await queryDatabase(adminQuery, [email]);

    console.log(adminResults);
    if (adminResults.length > 0) {
      const admin = adminResults[0];
      if (await passwordMatch(admin.admin_password, password)) {
        console.log("This is correct");
        return loginSuccess(res, {
          adminName: admin.admin_name,
          adminEmail: admin.admin_email,
          role: "Admin",
        });
      } else {
        return res.status(401).json({ message: "Invalid email or password." });
      }
    }

    const patientQuery =
      "SELECT * FROM patient WHERE email = ? AND account_status = 'Active'";
    const patientResults = await queryDatabase(patientQuery, [email]);

    if (patientResults.length > 0) {
      const patient = patientResults[0];
      if (await passwordMatch(patient.passwords, password)) {
        return loginSuccess(res, {
          id: patient.patient_id,
          name: `${patient.firstname} ${patient.lastname}`,
          bio: patient.bio,
          photo: patient.photo,
          address: patient.addresses,
          gender: patient.gender,
          age: patient.age,
          status: patient.patient_status,
          contact: patient.contact_number,
          email: patient.email,
          role: "Patient",
        });
      } else {
        return res.status(401).json({ message: "Invalid email or password." });
      }
    } else {
      const deletedPatientQuery =
        "SELECT * FROM patient WHERE email = ? AND account_status = 'Delete'";
      const deletedPatientResults = await queryDatabase(deletedPatientQuery, [
        email,
      ]);
      if (deletedPatientResults.length > 0) {
        return res.status(403).json({ message: "Account has been deleted." });
      }
    }

    const professionalQuery =
      "SELECT * FROM mental_health_professionals WHERE email = ? AND professional_status = 'Accepted'";
    const professionalResults = await queryDatabase(professionalQuery, [email]);

    if (professionalResults.length > 0) {
      const professional = professionalResults[0];
      if (await passwordMatch(professional.passwords, password)) {
        return loginSuccess(res, {
          id: professional.professional_id,
          name: `${professional.firstname} ${professional.lastname}`,
          bio: professional.bio,
          address: professional.professional_address,
          photo: professional.photo,
          type: professional.type,
          license: professional.license,
          experience: professional.experience,
          status: professional.professional_status,
          contact: professional.contact_number,
          role: "Professional",
        });
      } else {
        return res.status(401).json({ message: "Invalid email or password." });
      }
    } else {
      const pendingProfessionalQuery =
        "SELECT * FROM mental_health_professionals WHERE email = ? AND professional_status = 'Pending'";
      const pendingProfessionalResults = await queryDatabase(
        pendingProfessionalQuery,
        [email]
      );
      if (pendingProfessionalResults.length > 0) {
        return res
          .status(403)
          .json({ message: "Your account is still under review." });
      }
    }

    return res.status(404).json({ message: "Account not found." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

async function queryDatabase(query, params) {
  return new Promise((resolve, reject) => {
    db.query(query, params, (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
}

function loginSuccess(res, data) {
  const token = jwt.sign({ data }, token_key, { expiresIn: "1h" });

  return res
    .status(200)
    .json({ message: `${data.role} Login Successful`, token, role: data.role });
}

router.get("/protected-route", authenticateToken, (req, res) => {
  return res.json({
    message: "Access granted",
    data: req.data,
    role: req.data.role,
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });

  res.json({ message: "Logout successful" });
});

module.exports = router;
