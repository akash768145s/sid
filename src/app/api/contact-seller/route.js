import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import cron from "node-cron";

let emailTasks = [];

export async function POST(request) {
  const { sellerEmail, sellerName, productName } = await request.json();

  // Set up the email transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Schedule the email to be sent after 48 hours
  const scheduledTime = new Date(Date.now() + 6 * 1000); // 48 hours from now
  const task = cron.schedule(
    `${scheduledTime.getSeconds()} ${scheduledTime.getMinutes()} ${scheduledTime.getHours()} ${scheduledTime.getDate()} ${
      scheduledTime.getMonth() + 1
    } *`,
    async () => {
      // Email content
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: sellerEmail,
        subject: "Confirm the Status of Your Listing",
        text: `Hi ${
          sellerName || "Seller"
        },\n\nIt has been 48 hours since a buyer contacted you about ${
          productName || "your product"
        }.\n\nIf the deal is closed, please click the link below to remove your listing:\nhttps://sid-ssn.vercel.app/Profile\n\nIf it is not closed, feel free to ignore this email.\n\nThanks for using SiD!\n\nBest Regards,\nTeam SiD!`,
      };

      // Send the email
      try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${sellerEmail}`);
      } catch (error) {
        console.error("Error sending email:", error);
      }
    },
    { scheduled: true }
  );

  // Store the scheduled task (optional)
  emailTasks.push(task);

  return NextResponse.json({ message: "Email scheduled for 48 hours later." });
}
