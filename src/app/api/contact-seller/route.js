import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
    return NextResponse.json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email." },
      { status: 500 }
    );
  }
}
