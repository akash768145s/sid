// src/models/Contact.js
import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    sellerName: String,
    productName: String,
    sellerEmail: String,
    buyerEmail: String, // This will store the email of the user who clicked "Yes"
  },
  { timestamps: true }
);

export default mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema);
