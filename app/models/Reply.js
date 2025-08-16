import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema({
  feedbackId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Feedback",
    required: true,
  },
  parentReplyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reply",
    default: null, // null if it's a top-level reply
  },
  message: {
    type: String,
    required: true,
  },
  authorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  upvotedBy: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Reply = mongoose.models.Reply || mongoose.model("Reply", ReplySchema);
export default Reply;
