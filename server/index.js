const express = require("express");
const mysql = require("mysql");
const app = express();
const port = process.env.db_port || 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const login = require("./routes/login");
const patient = require("./routes/patient");
const admin = require("./routes/admin");
const professional = require("./routes/professional");
const community = require("./routes/community");
const path = require("path");

app.use("/profile", express.static(path.join(__dirname, "profile")));
app.use(
  "/prescription",
  express.static(path.join(__dirname, "routes", "prescription"))
);
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api", login);
app.use("/api", patient);
app.use("/api", admin);
app.use("/api", professional);
app.use("/api", community);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
