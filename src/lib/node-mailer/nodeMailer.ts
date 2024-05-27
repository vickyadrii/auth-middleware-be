import { User } from "@/types/auth";
import nodemailer from "nodemailer";

const EMAIL = process.env.EMAIL;
const EMAIL_PASS = process.env.EMAIL_PASSWORD;
const SMPT_SERVICE = process.env.SMTP_SERVICE;
const SMPT_HOST = process.env.SMTP_HOST;
const SMPT_PORT = process.env.SMTP_PORT || "";

export const sendConfirmationEmail = async (user: User) => {
  const { name, email, email_token } = user;

  const transporter = nodemailer.createTransport({
    service: SMPT_SERVICE,
    host: SMPT_HOST,
    port: parseInt(SMPT_PORT),
    secure: true,
    auth: {
      user: EMAIL,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: {
      name: "vickyadri103@gmail.com",
      address: "vickyadri103@gmail.com",
    },
    to: email,
    subject: "Registration Confirmation",
    html:
      `
      <html>
      <head>
          <meta charset="UTF-8">
          <title>Registration Confirmation</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
              }
              .email {
                  width: 80%;
                  margin: 0 auto;
                  border: 1px solid #ccc;
                  padding: 20px;
              }
              .email-header {
                  background-color: #f0f0f0;
                  padding: 10px;
              }
              .email-header h2 {
                  margin: 0;
                  color: #333;
              }
              .email-details {
                  margin-top: 20px;
              }
              .email-details p {
                  margin: 0;
                  color: #333;
              }
              .email-total {
                  margin-top: 20px;
              }
              .email-total p {
                  margin: 0;
                  color: #333;
              }
              .email-thanks {
                  margin-top: 20px;
              }
              .email-thanks p {
                  margin: 0;
                  color: #333;
              }
              .email-footer {
                  margin-top: 20px;
                  text-align: center;
                  color: #777;
              }
              .email-footer p {
                  margin: 0;
              }
          </style>
      </head>
      <body>
          <div class="email">
              <div class="email-header">
                  <h2>Registration Confirmation</h2>
                  <h3>Thank you for registering with us! Your account has been successfully created.</h3>
              </div>
              <div class="email-details">
              <p>Detail data:</p>
                  <p>Name: ` +
      name +
      `</p>
                  <p>Email: ` +
      email +
      `</p>
              </div>
              <h3>Please verify your email</h3>
              <div class="email-total">
                  <p>Email Token : <b>${email_token}</b></p>
              </div>
              <div class="email-thanks">
                  <p>Regards,<br>
                  Vicky</p>
              </div>
              <div class="email-footer">
                  <p>All rights reserved &copy; 2024 Indive Technical Test - Vicky</p>
              </div>
          </div>
      </body>
      </html>`,
  };

  // Send Email
  await transporter
    .sendMail(mailOptions)
    // .then((res) => {
    //   console.log();
    // })
    // .catch((err) => {
    //   console.log({ err });
    // });
};
