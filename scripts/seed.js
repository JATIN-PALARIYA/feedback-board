import mongoose from "mongoose";
import dotenv from "dotenv";
import Feedback from "../app/models/Feedback.js";
import Reply from "../app/models/Reply.js";

dotenv.config({ path: ".env.local" });

async function seedData() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ MongoDB connected for seeding");

        console.log("Clearing old data...");
        await Feedback.deleteMany({});
        await Reply.deleteMany({});
        console.log("🗑️ Old data cleared");

        const tags = [
            "Bug", "Feature Request", "Improvement", "UI", "UX", "Performance", "Accessibility",
            "Dark Mode", "Notifications", "Dashboard", "Comments", "Search",
            "Authentication", "Onboarding", "Settings", "Navigation", "Forms", "API"
        ];
        const statuses = ["Planned", "In Progress", "Under Review", "Completed", "Critical"];

        const feedbackDocs = [];
        for (let i = 1; i <= 20; i++) {
            const randomTags = [...tags].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);

            const feedback = await Feedback.create({
                title: `Sample Feedback ${i}`,
                description: `This is a detailed description for feedback item number ${i}.`,
                author: `User${i}`,
                createdAt: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000),
                tags: randomTags,
                upvotes: Math.floor(Math.random() * 100),
                comments: 0,
                status: statuses[Math.floor(Math.random() * statuses.length)]
            });

            const replyCount = Math.floor(Math.random() * 6);
            let repliesCreated = 0;

            for (let j = 0; j < replyCount; j++) {
                await Reply.create({
                    feedbackId: feedback._id,
                    message: `This is reply ${j + 1} for feedback ${i}.`,
                    parentReplyId: null
                });
                repliesCreated++;
            }

            feedback.comments = repliesCreated;
            await feedback.save();

            feedbackDocs.push(feedback);
        }

        console.log(`✅ Seed complete: ${feedbackDocs.length} feedbacks added`);
        await mongoose.connection.close();
        console.log("MongoDB connection closed");
    } catch (err) {
        console.error("❌ Seed error:", err);
        await mongoose.connection.close();
    }
}

seedData();
