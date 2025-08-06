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
  author: {
    type: String,
    default: "Anonymous",
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  upvotedBy: [
    {
      type: String, // store user ID or name if needed
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Reply = mongoose.models.Reply || mongoose.model("Reply", ReplySchema);
export default Reply;
