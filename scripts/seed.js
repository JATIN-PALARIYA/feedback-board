// scripts/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Feedback from "../app/models/Feedback.js";
import Reply from "../app/models/Reply.js";

// Load env variables
dotenv.config({ path: ".env.local" });

async function seedData() {
  try {
    // Connect to DB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected for seeding");

    // Clear old data
    console.log("Clearing old data...");
    await Feedback.deleteMany({});
    await Reply.deleteMany({});
    console.log("🗑️ Old data cleared");

    // Sample tags & statuses
    const tags = [
      "Bug", "Feature Request", "Improvement", "UI", "UX", "Performance", "Accessibility",
      "Dark Mode", "Notifications", "Dashboard", "Comments", "Search",
      "Authentication", "Onboarding", "Settings", "Navigation", "Forms", "API"
    ];
    const statuses = ["Planned", "In Progress", "Under Review", "Completed", "Critical"];

    const feedbackDocs = [];

    for (let i = 1; i <= 20; i++) {
      // Random tags for feedback
      const randomTags = [...tags].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);

      // Create feedback
      const feedback = await Feedback.create({
        title: `Sample Feedback ${i}`,
        description: `This is a detailed description for feedback item number ${i}.`,
        author: `User${i}`,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000),
        tags: randomTags,
        upvotes: Math.floor(Math.random() * 100),
        comments: 0, // will update after replies
        status: statuses[Math.floor(Math.random() * statuses.length)]
      });

      // Random 2–5 replies
      const replyCount = Math.floor(Math.random() * 8);
      let repliesCreated = 0;

      for (let j = 0; j < replyCount; j++) {
        await Reply.create({
          feedbackId: feedback._id, // linking reply to feedback
          author: `ReplyUser${j + 1}`,
          message: `This is reply ${j + 1} for feedback ${i}.`,
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000),
          parentReplyId: null
        });
        repliesCreated++;
      }

      // Update feedback comments count
      feedback.comments = repliesCreated;
      await feedback.save();

      feedbackDocs.push(feedback);
    }

    console.log(`✅ Seed complete: ${feedbackDocs.length} feedbacks added`);
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Seed error:", err);
    mongoose.connection.close();
  }
}

seedData();
