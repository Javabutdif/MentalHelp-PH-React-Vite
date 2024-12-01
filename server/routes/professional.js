const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const db = require("../connection/db");
require("dotenv").config();
const { sendMail } = require("../mail/mailContents");
const multer = require("multer");
const path = require("path");
const {
  notification,
  notification_professional,
} = require("../middleware/notification");
const fs = require("fs");

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
      address,
    } = req.body;

    const documentPaths = req.files.map((file) => file.path);
    const documentPathsString = documentPaths.join(",");

    const hashedPassword = await bcrypt.hash(password, 10);

    const query =
      "INSERT INTO mental_health_professionals (email, firstname, lastname, professional_address	, passwords, type, license, experience, professional_status, contact_number, documents) VALUES (?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(
      query,
      [
        email,
        firstname,
        lastname,
        address,
        hashedPassword,
        profession,
        license,
        experience,
        "Pending",
        contact,
        documentPathsString,
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
    "SELECT mental_health_professionals.professional_id, mental_health_professionals.firstname, mental_health_professionals.lastname,mental_health_professionals.professional_address, mental_health_professionals.email, mental_health_professionals.license, mental_health_professionals.experience, mental_health_professionals.type, mental_health_professionals.professional_status,mental_health_professionals.bio, mental_health_professionals.contact_number , mental_health_professionals.photo FROM mental_health_professionals WHERE professional_id = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Unable to retrieve professional" });
    }

    res.status(200).json({ data: results });
  });
});

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
    address,
  } = req.body;

  const query =
    "UPDATE mental_health_professionals SET firstname = ? , lastname = ? ,professional_address = ?, email = ? , license = ? , experience = ? , type =  ? , contact_number = ? , bio = ? WHERE professional_id = ? ";

  db.query(
    query,
    [
      firstname,
      lastname,
      address,
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
  const { id, startAge, endAge, issues, service_fee } = req.body;

  let result = Object.keys(issues)
    .filter((key) => issues[key])
    .join(", ");
  const fee_query =
    "UPDATE mental_health_professionals SET service_fee = ? WHERE professional_id = ?";
  const query =
    "INSERT INTO mental_health_professional_preference (professional_id, start_age, end_age, mental_issue) VALUES (?, ?, ?, ?)";

  db.query(fee_query, [service_fee, id], (error, result) => {
    if (error) {
      res.status(500).json({ message: "Error updating the service fee" });
    }
  });

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
      patient.patient_id,
      patient.firstname, 
      patient.lastname,
      patient.age,
      patient.gender,
      patient_details.mental_issues,
      patient_details.description
    FROM matching 
    JOIN mental_health_professionals 
      ON mental_health_professionals.professional_id = matching.professional_id  
    JOIN patient_details 
      ON patient_details.patient_details_id = matching.patient_details_id
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
  const { reasons } = req.body;
  const getPatientIdQuery =
    "SELECT patient_id FROM matching WHERE patient_details_id = ?";
  const matchQuery = `DELETE FROM matching WHERE patient_details_id = ?`;
  const patientDetailsQuery = `DELETE FROM patient_details WHERE patient_details_id = ?`;

  // Retrieve patient_id before deleting
  db.query(getPatientIdQuery, [id], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        message: "Failed to retrieve patient_id",
        error: error.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "No matching record found for the provided ID",
      });
    }

    const patient_id = result[0].patient_id;

    // Log the notification before performing deletions
    notification("Request Cancelled", patient_id, reasons);

    // Delete the matching record
    db.query(matchQuery, [id], (error, matchResult) => {
      if (error) {
        return res.status(500).json({
          message: "Cannot cancel the matching",
          error: error.message,
        });
      }

      if (matchResult.affectedRows > 0) {
        // Delete the patient details
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
              message:
                "Match cancelled, but no patient details found to delete",
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

  const queryPreferences =
    "SELECT * FROM mental_health_professional_preference WHERE professional_id = ?";
  const queryProfessional =
    "SELECT service_fee FROM mental_health_professionals WHERE professional_id = ?";

  db.query(queryProfessional, [id], (error, professionalResult) => {
    if (error) {
      return res.status(500).json({ message: "Error retrieving service fee" });
    }

    if (professionalResult.length === 0) {
      return res.status(404).json({ message: "Professional not found" });
    }

    const serviceFee = professionalResult[0].service_fee;

    db.query(queryPreferences, [id], (error, preferencesResult) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error retrieving preferences" });
      }

      const data = {
        service_fee: serviceFee,
        preferences: preferencesResult,
      };

      res.status(200).json({ data: data });
    });
  });
});

//Professional Edited their Preferences
router.post("/updated-professional-preferences", async (req, res) => {
  const { id, startAge, endAge, issues, service_fee } = req.body;

  console.log(issues);

  let result = Object.keys(issues)
    .filter((key) => issues[key])
    .join(", ");
  console.log(id + " " + startAge + " " + endAge + " " + result);
  const query =
    "UPDATE mental_health_professional_preference SET start_age = ?, end_age = ?, mental_issue = ? WHERE professional_id = ?";
  const serviceQuery =
    "UPDATE mental_health_professionals SET service_fee = ? WHERE professional_id = ? ";
  db.query(serviceQuery, [service_fee, id], (error, result) => {
    if (error) {
      res.status(500).json({ message: "Unable to set the service_fee" });
    }
  });

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
router.post("/set-appointment", (req, res) => {
  const { patient_id, professional_id, scheduleDate, scheduleTime } = req.body;

  const professional_query =
    "SELECT firstname, lastname FROM mental_health_professionals WHERE professional_id = ?";

  db.query(professional_query, [professional_id], (error, result) => {
    if (error) {
      console.error("Error retrieving professional details");
      return res
        .status(500)
        .json({ message: "Error retrieving professional details" });
    }

    const professional_name =
      result.length > 0
        ? `${result[0].firstname} ${result[0].lastname}`
        : "Your Professional";

    const insert_query =
      "INSERT INTO schedule (patient_id, professional_id, schedule_date, schedule_time, status) VALUES (?, ?, ?, ?, ?)";
    db.query(
      insert_query,
      [patient_id, professional_id, scheduleDate, scheduleTime, "Pending"],
      (error, insertResult) => {
        if (error) {
          console.error("Error inserting schedule");
          return res
            .status(500)
            .json({ message: "Error inserting into the schedule" });
        }

        if (insertResult.affectedRows > 0) {
          const notificationMessage = `Dr. ${professional_name} has accepted your request. The scheduled time is ${scheduleTime} on ${scheduleDate}.`;
          notification("Appointment Notice", patient_id, notificationMessage);

          return res
            .status(200)
            .json({ message: "Appointment set successfully" });
        } else {
          return res.status(500).json({ message: "Failed to set appointment" });
        }
      }
    );
  });
});

router.get("/get-appointments-active-professional/:id", (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT * FROM schedule WHERE professional_id = ? AND status = ? ORDER BY schedule_date ASC";

  db.query(query, [id, "Active"], (error, results) => {
    if (error)
      return res.status(400).json({ message: "Error getting the schedule" });
    if (results.length === 0)
      return res
        .status(404)
        .json({ message: "No schedule found for this patient" });

    const patientId = [...new Set(results.map((item) => item.patient_id))];
    const patientQuery = `SELECT patient_id, firstname, lastname FROM patient WHERE patient_id IN (?)`;

    db.query(patientQuery, [patientId], (error, patients) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Error getting professional names" });

      const patientMap = {};
      patients.forEach((patient) => {
        patientMap[
          patient.patient_id
        ] = `${patient.firstname} ${patient.lastname}`;
      });

      const scheduleData = results.map((schedule) => ({
        schedule_id: schedule.schedule_id,
        patient_id: schedule.patient_id,
        professional_id: schedule.professional_id,
        schedule_date: schedule.schedule_date,
        schedule_time: schedule.schedule_time,
        status: schedule.status,
        patient_name: patientMap[schedule.patient_id] || "Unknown",
      }));
      console.log(scheduleData);
      res.status(200).json({ data: scheduleData });
    });
  });
});

//get-appointments-history-professional

router.get("/get-appointments-history-professional/:id", (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT * FROM schedule WHERE professional_id = ? AND status = ? ORDER BY schedule_date ASC";

  db.query(query, [id, "Complete"], (error, results) => {
    if (error)
      return res.status(400).json({ message: "Error getting the schedule" });
    if (results.length === 0)
      return res
        .status(404)
        .json({ message: "No schedule found for this patient" });

    const patientId = [...new Set(results.map((item) => item.patient_id))];
    const patientQuery = `SELECT patient_id, firstname, lastname FROM patient WHERE patient_id IN (?)`;

    db.query(patientQuery, [patientId], (error, patients) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Error getting professional names" });

      const patientMap = {};
      patients.forEach((patient) => {
        patientMap[
          patient.patient_id
        ] = `${patient.firstname} ${patient.lastname}`;
      });

      const scheduleData = results.map((schedule) => ({
        schedule_id: schedule.schedule_id,
        patient_id: schedule.patient_id,
        professional_id: schedule.professional_id,
        schedule_date: schedule.schedule_date,
        schedule_time: schedule.schedule_time,
        status: schedule.status,
        patient_name: patientMap[schedule.patient_id] || "Unknown",
      }));
      console.log(scheduleData);
      res.status(200).json({ data: scheduleData });
    });
  });
});

//set-rating-professionals

router.post("/set-rating-professionals/:id", (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;
  const newRating = parseInt(rating);
  const currentDate = new Date();

  const query =
    "INSERT INTO experience_professional (professional_id, rating,date) VALUES (?,?,?)";

  db.query(query, [id, newRating, currentDate], (error, result) => {
    if (error) {
      res.status(400).json({ message: "Error inserting the rating " });
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Successfully submitted rating" });
    }
  });
});

router.get("/get-appointments-professional/:id", (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT * FROM schedule WHERE professional_id = ? ORDER BY schedule_date ASC";

  db.query(query, [id], (error, results) => {
    if (error)
      return res.status(400).json({ message: "Error getting the schedule" });
    if (results.length === 0)
      return res
        .status(404)
        .json({ message: "No schedule found for this patient" });

    const patientId = [...new Set(results.map((item) => item.patient_id))];
    const patientQuery = `SELECT patient_id, firstname, lastname FROM patient WHERE patient_id IN (?)`;

    db.query(patientQuery, [patientId], (error, patients) => {
      if (error)
        return res.status(500).json({ message: "Error getting patient name" });

      const patientMap = {};
      patients.forEach((pat) => {
        patientMap[pat.patient_id] = `${pat.firstname} ${pat.lastname}`;
      });

      const scheduleData = results.map((schedule) => ({
        schedule_id: schedule.schedule_id,
        patient_id: schedule.patient_id,
        professional_id: schedule.professional_id,
        schedule_date: schedule.schedule_date,
        schedule_time: schedule.schedule_time,
        status: schedule.status,
        patient_name: patientMap[schedule.patient_id] || "Unknown",
      }));
      console.log(scheduleData);
      res.status(200).json({ data: scheduleData });
    });
  });
});

router.put("/change-schedule-professional", (req, res) => {
  const { schedule_id, scheduleDate, scheduleTime } = req.body;

  const query =
    "UPDATE schedule SET schedule_date = ? , schedule_time = ? , status = ? WHERE schedule_id = ? ";
  db.query(
    query,
    [scheduleDate, scheduleTime, "Pending", schedule_id],
    (error, result) => {
      if (error) {
        console.error(error);
      }
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Change Schedule Successful" });
      }
    }
  );
});

router.put("/decline-schedule-professional/:id", (req, res) => {
  const { id } = req.params;

  const query = "UPDATE schedule SET status = ? WHERE schedule_id = ?";

  db.query(query, ["Pending", id], (error, result) => {
    if (error) {
      console.error(error);
    }
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Decline schedule successfully" });
    }
  });
});

router.post("/start-session", (req, res) => {
  const { schedule_id, patient_id, professional_id } = req.body;
  const currentDate = new Date();
  const query =
    "INSERT INTO session (schedule_id, patient_id, professional_id, session_start , status) VALUES (?,?,?,?,?)";

  db.query(
    query,
    [schedule_id, patient_id, professional_id, currentDate, "Active"],
    (error, result) => {
      if (error) {
        console.error(error);
      }
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Session started" });
      }
    }
  );
});

router.put("/end-session/:id", (req, res) => {
  const { id } = req.params;
  const currentDate = new Date();
  const query =
    "UPDATE session SET session_end = ? , status = ? WHERE schedule_id = ?  ";
  const scheduleQuery = "UPDATE schedule SET status = ? WHERE schedule_id = ?";

  db.query(query, [currentDate, "Completed", id], (error, result) => {
    if (error) {
      console.error(error);
    }
    db.query(scheduleQuery, ["Complete", id], (error, results) => {
      if (error) {
        console.error(error);
      }
      if (result.affectedRows > 0 && results.affectedRows > 0) {
        res.status(200).json({ message: "Session Ended" });
      }
    });
  });
});

router.get("/get-session/:id", (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM session WHERE schedule_id = ? AND status = ? ";
  db.query(query, [id, "Active"], (error, result) => {
    if (error) {
      console.error(error);
    }
    console.log(result);
    if (result.length > 0) {
      return res.status(200).json({ success: true, data: result });
    } else {
      return res.status(404).json({ success: false });
    }
  });
});

router.get("/get-session-report", (req, res) => {
  const query = `
    SELECT session.session_id, session.session_start, session.session_end,
           patient.firstname AS patient_firstname , patient.lastname AS patient_lastname, 
           mental_health_professionals.firstname AS professional_firstname,
                mental_health_professionals.lastname AS professional_lastname, 
           mental_health_professionals.type,
           session.status
    FROM session
    INNER JOIN patient ON patient.patient_id = session.patient_id
    INNER JOIN mental_health_professionals ON mental_health_professionals.professional_id = session.professional_id;
  `;

  db.query(query, (error, result) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
    console.log(result);
    if (result.length > 0) {
      return res.status(200).json({ data: result });
    } else {
      return res.status(200).json({ success: false, message: "No data found" });
    }
  });
});

router.get("/get-professional-history/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const query =
    "SELECT patient.firstname, patient.lastname, patient.age, patient.gender, patient_details.mental_issues, schedule.schedule_date FROM patient INNER JOIN patient_details ON patient_details.patient_id = patient.patient_id INNER JOIN schedule ON schedule.patient_id = patient.patient_id INNER JOIN matching on matching.professional_id = schedule.professional_id  WHERE schedule.professional_id = ? AND schedule.status = ? AND matching.match_status = ?";

  db.query(query, [id, "Complete", "Accept"], (error, result) => {
    if (error) {
      console.error(error);
    }
    console.log(result);
    if (result.length > 0) {
      res.status(200).json({ data: result });
    }
  });
});
const prescriptionDir = path.join(__dirname, "prescription");
if (!fs.existsSync(prescriptionDir)) {
  fs.mkdirSync(prescriptionDir, { recursive: true });
}

const storagePrescription = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, prescriptionDir); // Use the absolute path to save files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`); // Save with a unique filename
  },
});

const uploadPrescription = multer({ storage: storagePrescription });

router.post(
  "/upload-prescription",
  uploadPrescription.single("file"),
  (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
      }

      // Access the file
      const filePath = req.file.path; // Full path of the uploaded file
      console.log("Uploaded file path:", filePath);

      // Send a success response
      res.status(200).json({
        message: "File uploaded successfully.",
        filePath, // Optional: Send the file path in the response
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ message: "File upload failed." });
    }
  }
);

router.post("/save-diagnosis", (req, res) => {
  const { patient_id, professional_id, schedule_id, description } = req.body;
  const currentDate = new Date();
  const query =
    "INSERT INTO diagnosis (patient_id, professional_id, schedule_id, description, date) VALUES (?,?,?,?,?)";

  db.query(
    query,
    [patient_id, professional_id, schedule_id, description, currentDate],
    (error, result) => {
      if (error) {
        console.error(error);
      }
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Diagnosis Saved!" });
      }
    }
  );
});
router.get("/get-diagnosis/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM diagnosis WHERE schedule_id = ? ";
  db.query(query, [id], (error, result) => {
    if (error) {
      console.error(error);
    }
    if (result.length > 0) {
      res.status(200).json({ data: result });
    }
  });
});

module.exports = router;
