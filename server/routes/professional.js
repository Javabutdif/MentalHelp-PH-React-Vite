const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const db = require("../connection/db");
require("dotenv").config();
const { sendMail } = require("../mail/mailContents");
const multer = require("multer");
const path = require("path");

//Upload File
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "profile/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadProfile = multer({ storage: profileStorage });

router.post(
  "/upload-profile",
  uploadProfile.single("profilePicture"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
      }

      res.status(200).json({
        message: "Profile picture uploaded successfully.",
        file: req.file,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  }
);

router.post("/professional-otp", async (req, res) => {
  const { firstname, lastname, email } = req.body;

  try {
    let { emailInfo, otp } = await sendMail(email, firstname, lastname);

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

router.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;

  const filePath = path.join(__dirname, "..", "uploads", filename);

  res.download(filePath, (err) => {
    if (err) {
      console.error("Error downloading file:", err);
      return res.status(500).send("Could not download the file.");
    }
  });
});
router.post(
  "/professional-register",
  upload.array("documents"),
  async (req, res) => {
    const {
      firstname,
      lastname,
      contact,
      email,
      password,
      profession,
      experience,
      license,
    } = req.body;

    const documentPaths = req.files.map((file) => file.path);
    const documentPathsString = documentPaths.join(",");

    const hashedPassword = await bcrypt.hash(password, 10);

    const query =
      "INSERT INTO mental_health_professionals (email, firstname, lastname, passwords, type, license, experience, professional_status, contact_number, documents) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(
      query,
      [
        email,
        firstname,
        lastname,
        hashedPassword,
        profession,
        license,
        experience,
        "Pending",
        contact,
        documentPathsString, // Insert document paths string into the database
      ],
      (error, results) => {
        if (error) {
          return res.status(500).json({ error });
        }
        res.status(200).json({
          message:
            "Professional registered successfully. Verification of your account will take a few days.",
        });
      }
    );
  }
);
router.get("/get-specific-professional/:id", async (req, res) => {
  const { id } = req.params;

  const query =
    "SELECT mental_health_professionals.professional_id, mental_health_professionals.firstname, mental_health_professionals.lastname, mental_health_professionals.email, mental_health_professionals.license, mental_health_professionals.experience, mental_health_professionals.type, mental_health_professionals.professional_status,mental_health_professionals.bio, mental_health_professionals.contact_number , mental_health_professionals.photo FROM mental_health_professionals WHERE professional_id = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Unable to retrieve professional" });
    }

    res.status(200).json({ data: results });
  });
});
// id: response[0].professional_id,
// firstname: response[0].firstname,
// lastname: response[0].lastname,
// email: response[0].email,
// license: response[0].license,
// experience: response[0].experience,
// profession: response[0].type,
// contact: response[0].contact_number,

router.post("/update-professional", async (req, res) => {
  const {
    id,
    firstname,
    lastname,
    email,
    license,
    experience,
    profession,
    contact,
    bio,
  } = req.body;

  const query =
    "UPDATE mental_health_professionals SET firstname = ? , lastname = ? , email = ? , license = ? , experience = ? , type =  ? , contact_number = ? , bio = ? WHERE professional_id = ? ";

  db.query(
    query,
    [
      firstname,
      lastname,
      email,
      license,
      experience,
      profession,
      contact,
      bio,
      id,
    ],
    (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Unable to update professional" });
      }

      res.status(200).json({ message: "Professional updated successful" });
    }
  );
});

router.get("/check-professional-preferences/:id", async (req, res) => {
  const { id } = req.params;

  const query = `
		SELECT 
			professional_id, 
			start_age, 
			end_age, 
			mental_issue, 
			gender 
		FROM mental_health_professional_preference 
		WHERE professional_id = ?
	`;

  db.query(query, [id], (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Unable to retrieve professional preferences" });
    }

    if (results.length > 0) {
      return res.status(200).json({ data: results[0] });
    } else {
      return res
        .status(404)
        .json({ message: "No preferences found for this professional" });
    }
  });
});

router.post("/update-professional-preferences", async (req, res) => {
  const { id, startAge, endAge, issues } = req.body;

  console.log(issues);

  let result = Object.keys(issues)
    .filter((key) => issues[key])
    .join(", ");
  console.log(id + " " + startAge + " " + endAge + " " + result);
  const query =
    "INSERT INTO mental_health_professional_preference (professional_id, start_age, end_age, mental_issue) VALUES (?, ?, ?, ?)";

  db.query(query, [id, startAge, endAge, result], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Unable to set preferences" });
    }

    if (results.affectedRows > 0) {
      return res
        .status(200)
        .json({ message: "Preferences updated successfully" });
    } else {
      return res
        .status(404)
        .json({ message: "No preferences found for this professional" });
    }
  });
});

router.post(
  "/upload-picture-professional/:id",
  uploadProfile.single("profileImage"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const profileImage = req.file;

      if (!profileImage) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const filePath = `http://localhost:3000/profile/${profileImage.filename}`;

      const query =
        "UPDATE mental_health_professionals SET photo = ? WHERE professional_id = ?";

      db.query(query, [filePath, id], async (error, result) => {
        if (error) {
          res.status(500).json({
            message: "Error uploading image path into the database",
          });
        }
        if (result.affectedRows > 0) {
          res.status(200).json({
            message: "Profile image uploaded successfully",
          });
        }
      });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ message: "Server error. Could not upload image." });
    }
  }
);

//retrieve-match-status-professional
router.get("/retrieve-match-status-professional/:id", (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
      matching.match_id,
      matching.patient_details_id,
      matching.match_date, 
      matching.match_status,
      patient.firstname, 
      patient.lastname,
      patient.age,
      patient.gender,
      patient_details.mental_issues
    FROM matching 
    JOIN mental_health_professionals 
      ON mental_health_professionals.professional_id = matching.professional_id  
    JOIN patient_details 
      ON patient_details.patient_id = matching.patient_id
    JOIN patient 
      ON patient.patient_id = matching.patient_id
    WHERE matching.match_status = 'Pending' 
    AND matching.professional_id = ?`;

  db.query(query, [id], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Cannot retrieve the details",
        error: error.message,
      });
    }
    console.log(result);
    if (result.length > 0) {
      return res.status(200).json({ data: result });
    } else {
      return res.status(404).json({
        message: "No pending matches found for the patient",
      });
    }
  });
});

//accept-match-request
//cancel-match-request

router.put("/accept-match-request/:id", async (req, res) => {
  const { id } = req.params;

  const query =
    "UPDATE matching SET match_status = 'Accept' WHERE match_id = ? ";

  db.query(query, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Unable to accept the request" });
    }

    if (results.affectedRows > 0) {
      return res.status(200).json({
        message: "The patient's request has been successfully accepted.",
      });
    } else {
      return res
        .status(404)
        .json({ message: "No requests were found to accept." });
    }
  });
});

router.delete("/cancel-match-request/:id", (req, res) => {
  const { id } = req.params;
  const matchQuery = `DELETE FROM matching WHERE patient_details_id = ?`;
  const patientDetailsQuery = `DELETE FROM patient_details WHERE patient_details_id = ?`;

  db.query(matchQuery, [id], (error, matchResult) => {
    if (error) {
      return res.status(500).json({
        message: "Cannot cancel the matching",
        error: error.message,
      });
    }

    if (matchResult.affectedRows > 0) {
      db.query(patientDetailsQuery, [id], (error, detailsResult) => {
        if (error) {
          return res.status(500).json({
            message: "Cancelled match but failed to delete patient details",
            error: error.message,
          });
        }

        if (detailsResult.affectedRows > 0) {
          return res.status(200).json({
            message:
              "Successfully cancelled the request and deleted patient details",
          });
        } else {
          return res.status(404).json({
            message: "Match cancelled, but no patient details found to delete",
          });
        }
      });
    } else {
      return res.status(404).json({
        message: "No pending matches found for the patient",
      });
    }
  });
});

router.get("/get-notification-professional/:id", (req, res) => {
  const { id } = req.params;

  const query =
    "SELECT * FROM notification_professional WHERE professional_id = ? ORDER BY notification_id desc ";

  db.query(query, [id], async (error, result) => {
    if (error) {
      res.status(500).json({ message: "Error retrieving notification" });
    }
    res.status(200).json({ data: result });
  });
});

router.get("/get-professional-preferences/:id", (req, res) => {
  const { id } = req.params;

  const query =
    "SELECT * FROM mental_health_professional_preference WHERE professional_id = ? ";

  db.query(query, [id], async (error, result) => {
    if (error) {
      res.status(500).json({ message: "Error retrieving preferences" });
    }
    res.status(200).json({ data: result });
  });
});

//Professional Edited their Preferences
router.post("/updated-professional-preferences", async (req, res) => {
  const { id, startAge, endAge, issues } = req.body;

  console.log(issues);

  let result = Object.keys(issues)
    .filter((key) => issues[key])
    .join(", ");
  console.log(id + " " + startAge + " " + endAge + " " + result);
  const query =
    "UPDATE mental_health_professional_preference SET start_age = ?, end_age = ?, mental_issue = ? WHERE professional_id = ?";

  db.query(query, [startAge, endAge, result, id], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Unable to set preferences" });
    }

    if (results.affectedRows > 0) {
      return res
        .status(200)
        .json({ message: "Preferences updated successfully" });
    } else {
      return res
        .status(404)
        .json({ message: "No preferences found for this professional" });
    }
  });
});

module.exports = router;
