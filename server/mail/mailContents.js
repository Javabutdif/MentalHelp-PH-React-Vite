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

  const emailInfo = await transporter.sendMail(mailOptions);
  return { emailInfo, otp };
};

const sendDeclineMail = async (email, firstName, lastName) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mentalhelpph75@gmail.com",
      pass: process.env.MAILER_KEY,
    },
  });

  const imageUrl = process.env.IMAGE_URL;

  const htmlContent = `
        <div style="text-align: center; padding: 20px;">
            <img src="${imageUrl}" alt="MentalHelp PH Logo" style="width: 150px; margin-bottom: 20px;" />
            <h2>Hello ${firstName} ${lastName},</h2>
            <p>Thank you for taking the time to apply to MentalHelp PH. Unfortunately, after careful consideration, we regret to inform you that we will not be moving forward with your application at this time.</p>
            <p>We appreciate your interest and encourage you to apply for future opportunities.</p>
            <p>Best regards,<br/>The MentalHelp PH Team</p>
        </div>
    `;

  let mailOptions = {
    from: "mentalhelpph75@gmail.com",
    to: email,
    subject: "MentalHelp PH Application Decision",
    html: htmlContent,
  };

  const emailInfo = await transporter.sendMail(mailOptions);
  return { emailInfo };
};

const sendDeletedMail = async (email, firstName, lastName) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mentalhelpph75@gmail.com",
      pass: process.env.MAILER_KEY,
    },
  });

  const imageUrl = process.env.IMAGE_URL;

  const htmlContent = `
        <div style="text-align: center; padding: 20px;">
            <img src="${imageUrl}" alt="MentalHelp PH Logo" style="width: 150px; margin-bottom: 20px;" />
            <h2>Hello ${firstName} ${lastName},</h2>
          <p>Your account has been successfully deleted from MentalHelp PH. We appreciate your interest in being part of our community and encourage you to reconnect with us in the future if the need arises.</p> <p>Thank you, and we wish you all the best moving forward.</p>
            <p>Best regards,<br/>The MentalHelp PH Team</p>
        </div>
    `;

  let mailOptions = {
    from: "mentalhelpph75@gmail.com",
    to: email,
    subject: "MentalHelp PH Account Deletion",
    html: htmlContent,
  };

  const emailInfo = await transporter.sendMail(mailOptions);
  return { emailInfo };
};

module.exports = { sendMail, sendDeclineMail, sendDeletedMail };
