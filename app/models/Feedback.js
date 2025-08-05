import mongoose from "mongoose";

const Feedback = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: { type: Date, "default": Date.now },
    votes: {
        up: { type: Number, "default": 0 },
        down: { type: Number, "default": 0 }
    }
});

export default mongoose.models.Feedback || mongoose.model("Feedback", Feedback);