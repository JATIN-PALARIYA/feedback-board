import mongoose from "mongoose";

const Reply = new mongoose.Schema({
    feedbackId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback',
        required: true
    },
    parentReplyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply'
    },
    message: {
        type: String,
        required: true
    },
    createdAt: { type: Date, "default": Date.now }
})

export default mongoose.models.Reply || mongoose.model("Reply", Reply);