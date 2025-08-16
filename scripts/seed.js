import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../app/models/User.js";
import Feedback from "../app/models/Feedback.js";
import Reply from "../app/models/Reply.js";

dotenv.config({ path: ".env.local" });

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected for seeding");

    // Clear old data
    await User.deleteMany({});
    await Feedback.deleteMany({});
    await Reply.deleteMany({});
    console.log("🗑️ Old data cleared");

    const tags = ["Bug", "Feature Request", "Improvement", "UI", "UX", "Performance",
      "Accessibility", "Dark Mode", "Notifications", "Dashboard",
      "Comments", "Search", "Authentication", "Onboarding",
      "Settings", "Navigation", "Forms", "API"];
    const statuses = ["Planned", "In Progress", "Under Review", "Completed", "Critical"];

    const users = [];

    // Create 10 users
    for (let i = 1; i <= 10; i++) {
      const user = await User.create({
        email: `user${i}@mail.com`,
        passwordHash: "password123",
        username: `User${i}`,
        my: [],
        following: [],
      });
      users.push(user);
    }

    const allFeedbacks = [];

    // Feedbacks & replies
    for (const user of users) {
      const feedbackCount = Math.floor(Math.random() * 3) + 2; // 2–4 feedbacks
      for (let i = 0; i < feedbackCount; i++) {
        const randomTags = [...tags].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);

        const feedback = await Feedback.create({
          title: `Feedback from ${user.username} #${i + 1}`,
          description: `This is feedback ${i + 1} created by ${user.username}.`,
          authorId: user._id, // ObjectId
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000),
          tags: randomTags,
          upvotes: Math.floor(Math.random() * 50),
          comments: 0,
          status: statuses[Math.floor(Math.random() * statuses.length)]
        });

        user.my.push(feedback._id);
        allFeedbacks.push(feedback);

        // Replies
        const replyCount = Math.floor(Math.random() * 5) + 1; // 1–5 replies
        for (let j = 0; j < replyCount; j++) {
          const randomReplyUser = users[Math.floor(Math.random() * users.length)];
          await Reply.create({
            feedbackId: feedback._id,
            authorId: randomReplyUser._id, // ObjectId
            message: `Reply ${j + 1} by ${randomReplyUser.username} on ${feedback.title}`,
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000),
            parentReplyId: null
          });
        }

        feedback.comments = replyCount;
        await feedback.save();
      }
      await user.save();
    }

    // Following relationships
    for (const user of users) {
      const others = users.filter(u => u._id.toString() !== user._id.toString());
      const sample = others.sort(() => 0.5 - Math.random()).slice(0, 3);
      user.following = sample.map(u => u._id);
      await user.save();
    }

    console.log(`✅ Seed complete: ${users.length} users, ${allFeedbacks.length} feedbacks, and replies added`);
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Seed error:", err);
    mongoose.connection.close();
  }
}

seedData();
