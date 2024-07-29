import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  user: { type: String, required: true },
  product: { type: mongoose.Schema.Types.Mixed, required: true }, // Adjust as needed
});

export default mongoose.models.Wishlist ||
  mongoose.model("Wishlist", wishlistSchema);
