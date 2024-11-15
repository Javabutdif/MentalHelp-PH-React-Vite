const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const db = require("../connection/db");
require("dotenv").config();
const { sendMail, sendDeletedMail } = require("../mail/mailContents");
const multer = require("multer");
const path = require("path");
const {
  notification,
  notification_professional,
} = require("../middleware/notification");

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "profile/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadProfile = multer({ storage: profileStorage });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "messages/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

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
    "SELECT patient.patient_id, patient.firstname, patient.lastname, patient.email, patient.addresses, patient.gender, patient.bio, patient.age, patient.patient_status, patient.contact_number , patient.photo FROM patient WHERE patient_id = ?";
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

  try {
    const getPatient = "SELECT * FROM patient WHERE patient_id = ?";
    db.query(getPatient, [id], async (error, result) => {
      if (error) {
        return res.status(500).json({ message: "Database error", error });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Patient not found" });
      }

      const { email, firstname, lastname } = result[0];

      const updateQuery =
        "UPDATE patient SET account_status = ? WHERE patient_id = ?";
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
            return res.status(404).json({ message: "Patient not found" });
          } else {
            try {
              let emailInfo = await sendDeletedMail(email, firstname, lastname);
              return res
                .status(200)
                .json({ message: "Patient deleted successfully" });
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

      let query =
        "SELECT * FROM mental_health_professional_preference WHERE professional_id IN (?)";

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
  const { id, issues, age, professional_id, description } = req.body;

  const getMatchingDataQuery =
    "SELECT match_id FROM matching WHERE professional_id = ? AND patient_id = ?";
  const insertPatientDetailsQuery =
    "INSERT INTO patient_details (patient_id, mental_issues, age , description) VALUES (?, ?, ?, ?)";
  const insertMatchingQuery =
    "INSERT INTO matching (patient_details_id, patient_id, professional_id, match_date, match_status) VALUES (?, ?, ?, ?, ?)";

  db.query(getMatchingDataQuery, [professional_id, id], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Cannot retrieve the data from the matching table",
      });
    }

    if (result.length > 0) {
      return res.status(400).json({
        message:
          "You've already reached out to this professional; please wait for their response.",
      });
    }

    let issuesString = Object.keys(issues)
      .filter((key) => issues[key])
      .join(", ");

    db.query(
      insertPatientDetailsQuery,
      [id, issuesString, age, description],
      (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            message: "Cannot add the patient's details into the database",
          });
        }

        if (result.affectedRows > 0) {
          const patientDetailsId = result.insertId; // Get the newly inserted patient_details_id
          const date = new Date();

          // Insert matching request
          db.query(
            insertMatchingQuery,
            [patientDetailsId, id, professional_id, date, "Pending"],
            (error, results) => {
              if (error) {
                // Add in the notification
                notification(
                  "Match Notice",
                  id,
                  "Cannot add the match details into the database"
                );
                return res.status(500).json({
                  message: "Cannot add the match details into the database",
                });
              }

              if (results.affectedRows > 0) {
                notification_professional(
                  "Matching Alert",
                  professional_id,
                  "A patient has submitted a request"
                );

                notification("Match Notice", id, "Request match successful");
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
        } else {
          return res.status(500).json({
            message: "Failed to add the patient's details",
          });
        }
      }
    );
  });
});

router.get("/retrieve-match-status/:id", (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
      matching.match_id,
	  matching.patient_details_id, 
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

//Cancel Request

router.delete("/cancel-match-status/:id", (req, res) => {
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

//upload-picture-patient/

router.post(
  "/upload-picture-patient/:id",
  uploadProfile.single("profileImage"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const profileImage = req.file;

      if (!profileImage) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const filePath = `http://localhost:3000/profile/${profileImage.filename}`;

      const query = "UPDATE patient SET photo = ? WHERE patient_id = ?";

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

router.get("/get-notification-patient/:id", (req, res) => {
  const { id } = req.params;

  const query =
    "SELECT * FROM notification WHERE patient_id = ? ORDER BY notification_id desc ";

  db.query(query, [id], async (error, result) => {
    if (error) {
      res.status(500).json({ message: "Error retrieving notification" });
    }
    res.status(200).json({ data: result });
  });
});
router.get("/get-appointments/:id", (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT * FROM schedule WHERE patient_id = ? ORDER BY schedule_date ASC";

  db.query(query, [id], (error, results) => {
    if (error)
      return res.status(400).json({ message: "Error getting the schedule" });
    if (results.length === 0)
      return res
        .status(404)
        .json({ message: "No schedule found for this patient" });

    const professionalIds = [
      ...new Set(results.map((item) => item.professional_id)),
    ];
    const professionalQuery = `SELECT professional_id, firstname, lastname FROM mental_health_professionals WHERE professional_id IN (?)`;

    db.query(professionalQuery, [professionalIds], (error, professionals) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Error getting professional names" });

      const professionalMap = {};
      professionals.forEach((prof) => {
        professionalMap[
          prof.professional_id
        ] = `${prof.firstname} ${prof.lastname}`;
      });

      const scheduleData = results.map((schedule) => ({
        schedule_id: schedule.schedule_id,
        patient_id: schedule.patient_id,
        professional_id: schedule.professional_id,
        schedule_date: schedule.schedule_date,
        schedule_time: schedule.schedule_time,
        status: schedule.status,
        professional_name:
          professionalMap[schedule.professional_id] || "Unknown",
      }));

      res.status(200).json({ data: scheduleData });
    });
  });
});

router.get("/get-appointments-active/:id", (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT * FROM schedule WHERE patient_id = ? AND status = ? ORDER BY schedule_date ASC";

  db.query(query, [id, "Active"], (error, results) => {
    if (error)
      return res.status(400).json({ message: "Error getting the schedule" });
    if (results.length === 0)
      return res
        .status(404)
        .json({ message: "No schedule found for this patient" });

    const professionalIds = [
      ...new Set(results.map((item) => item.professional_id)),
    ];
    const professionalQuery = `SELECT professional_id, firstname, lastname FROM mental_health_professionals WHERE professional_id IN (?)`;

    db.query(professionalQuery, [professionalIds], (error, professionals) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Error getting professional names" });

      const professionalMap = {};
      professionals.forEach((prof) => {
        professionalMap[
          prof.professional_id
        ] = `${prof.firstname} ${prof.lastname}`;
      });

      const scheduleData = results.map((schedule) => ({
        schedule_id: schedule.schedule_id,
        patient_id: schedule.patient_id,
        professional_id: schedule.professional_id,
        schedule_date: schedule.schedule_date,
        schedule_time: schedule.schedule_time,
        status: schedule.status,
        professional_name:
          professionalMap[schedule.professional_id] || "Unknown",
      }));

      res.status(200).json({ data: scheduleData });
    });
  });
});

//set-appointments-status
router.put("/set-appointments-status/:id", (req, res) => {
  const { id } = req.params;
  const query = "UPDATE schedule SET status = ? WHERE schedule_id = ?";

  db.query(query, ["Active", id], (error, result) => {
    if (error) {
      return res.status(400).json({ message: "Cannot set the status" });
    }

    if (result.affectedRows > 0) {
      console.log("Update" + result);
      return res.status(200).json({ message: "Status updated successfully" });
    } else {
      return res.status(404).json({ message: "Schedule not found" });
    }
  });
});
router.post("/send-message-patient/:id", upload.single("file"), (req, res) => {
  const { id: schedule_id } = req.params;
  const { patient_id, professional_id, message, sender } = req.body;
  const currentDate = new Date();

  // Determine if the sender is the patient or the professional
  const isPatientSender = sender === patient_id;

  // Fetch the patient's name for the notification message
  const patientQuery =
    "SELECT firstname, lastname FROM patient WHERE patient_id = ?";
  db.query(patientQuery, [patient_id], (error, result) => {
    if (error || result.length === 0) {
      console.error("No patient found!");
      return res.status(404).json({ message: "Patient not found" });
    }

    const patientName = `${result[0].firstname} ${result[0].lastname}`;

    // Fetch the professional's name for the notification message
    const professionalQuery =
      "SELECT firstname, lastname FROM mental_health_professionals WHERE professional_id = ?";
    db.query(professionalQuery, [professional_id], (error, results) => {
      if (error || results.length === 0) {
        console.error("No professional found!");
        return res.status(404).json({ message: "Professional not found" });
      }

      const professionalName = `${results[0].firstname} ${results[0].lastname}`;

      // Prepare SQL query and values based on whether a file is included
      let query, values;
      if (req.file) {
        const filePath = req.file.path;
        query = `
          INSERT INTO messaging (patient_id, professional_id, message_content, schedule_id, message_date, sender) 
          VALUES (?, ?, ?, ?, ?, ?)
        `;
        values = [
          patient_id,
          professional_id,
          filePath,
          schedule_id,
          currentDate,
          sender,
        ];
      } else {
        query = `
          INSERT INTO messaging (patient_id, professional_id, message_content, schedule_id, message_date, sender) 
          VALUES (?, ?, ?, ?, ?, ?)
        `;
        values = [
          patient_id,
          professional_id,
          message,
          schedule_id,
          currentDate,
          sender,
        ];
      }

      // Execute the query to store the message
      db.query(query, values, (error, result) => {
        if (error) {
          console.error("Error storing the message:", error);
          return res.status(500).json({ message: "Cannot store the message" });
        }

        // Send notification based on the sender
        if (isPatientSender && result.affectedRows > 0) {
          notification_professional(
            "Message Notification",
            professional_id,
            `${patientName} has messaged you`
          );
        } else if (!isPatientSender && result.affectedRows > 0) {
          notification(
            "Message Notification",
            patient_id,
            `${professionalName} has messaged you`
          );
        }

        return res.status(200).json({ message: "Message Sent" });
      });
    });
  });
});

router.get("/get-message/:id", (req, res) => {
  const { id } = req.params;

  const query =
    "SELECT * FROM messaging WHERE schedule_id = ? ORDER BY message_date ASC";
  db.query(query, [id], (error, result) => {
    if (error) {
      console.error("Error fetching messages:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while fetching messages." });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "No messages found for the provided schedule ID." });
    }
    console.log(result);
    res.status(200).json({ data: result });
  });
});

router.post("/set-rating-patients/:id", (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;
  const newRating = parseInt(rating);
  const currentDate = new Date();

  const query =
    "INSERT INTO experience_patient (patient_id, rating,date) VALUES (?,?,?)";

  db.query(query, [id, newRating, currentDate], (error, result) => {
    if (error) {
      res.status(400).json({ message: "Error inserting the rating " });
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Successfully submitted rating" });
    }
  });
});

module.exports = router;
