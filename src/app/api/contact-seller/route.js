import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import cron from "node-cron";

let emailTasks = []; // Store scheduled tasks (optional)

export async function POST(request) {
  const { userEmail } = await request.json();

  // Set up the email transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use environment variables for sensitive data
    },
  });

  // Schedule the email to be sent after 2 minutes
  const scheduledTime = new Date(Date.now() +  30 * 1000); // 2 minutes from now
  const task = cron.schedule(
    `${scheduledTime.getSeconds()} ${scheduledTime.getMinutes()} ${scheduledTime.getHours()} ${scheduledTime.getDate()} ${
      scheduledTime.getMonth() + 1
    } *`,
    async () => {
      // Email content
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: "Follow-up on Your Contact Request",
        text: `Hi, this is a follow-up on your contact request.`,
      };

      // Send the email
      try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${userEmail}`);
      } catch (error) {
        console.error("Error sending email:", error);
      }
    },
    { scheduled: true }
  );

  // Store the scheduled task (optional)
  emailTasks.push(task);

  return NextResponse.json({ message: "Email scheduled for 2 minutes later." });
}
