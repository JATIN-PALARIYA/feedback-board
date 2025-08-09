import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    return;
  }

  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB || "feedbackApp",
    });

    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
