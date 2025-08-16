import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  tags: [{ type: String }],
  status: { type: String, default: "Under Review" },
  upvotes: { type: Number, default: 0 },
  upvotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  comments: { type: Number, default: 0 },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);
export default Feedback;
