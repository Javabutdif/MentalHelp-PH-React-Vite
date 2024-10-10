const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const db = require("../connection/db");
const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (email, firstName, lastName) => {
	const otp = Math.floor(100000 + Math.random() * 900000);

	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "mentalhelpph75@gmail.com",
			pass: process.env.MAILER_KEY,
		},
	});
	console.log(email);
	const imageUrl = process.env.IMAGE_URL;

	const htmlContent = `
        <div style="text-align: center; padding: 20px;">
            <img src="${imageUrl}" alt="MentalHelp PH Logo" style="width: 150px; margin-bottom: 20px;" />
            <h2>Hello ${firstName} ${lastName}!</h2>
            <p>This is from MentalHelp PH. Your One-Time Pin (OTP) is <strong>${otp}</strong>.</p>
            <p>Please use this pin to proceed with your verification.</p>
            <p>If you did not request this OTP, please ignore this email.</p>
        </div>
    `;

	let mailOptions = {
		from: "mentalhelpph75@gmail.com",
		to: email,
		subject: "Your MentalHelp PH OTP",
		html: htmlContent,
	};

	// Return both the mail info and the otp
	const emailInfo = await transporter.sendMail(mailOptions);
	return { emailInfo, otp };
};

module.exports = sendMail;
