import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  tags: [{ type: String }],                // e.g., ["UI", "Bug"]
  status: { type: String, default: "Under Review" }, // e.g., Planned, Completed, In Progress
  upvotes: { type: Number, default: 0 },
  upvotedBy: [{ type: String }],           // Optional: to prevent multiple upvotes by same user
  comments: { type: Number, default: 0 },  // Optional: auto updated count
  author: { type: String, default: "Anonymous" },
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);
export default Feedback;
