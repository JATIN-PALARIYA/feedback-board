import Feedback from '@/models/Feedback';

export async function createFeedback(body) {
    try {
        const { title, description, author, tags, status } = body;

        if (!title || !description) {
            return { success: false, error: "Title and description are required" };
        }

        // Author must be a MongoDB ObjectId (from User collection)
        if (!author) {
            return { success: false, error: "Author (userId) is required" };
        }

        const newFeedback = await Feedback.create({
            title,
            description,
            author,
            tags: Array.isArray(tags) ? tags : [],
            status: status || "Planned",
            date: new Date(),
            upvotes: 0,
            comments: 0,
        });

        // Populate author.username before returning
        const populatedFeedback = await newFeedback.populate("author", "username");

        return { success: true, data: populatedFeedback };
    } catch (error) {
        console.error("Create Feedback error:", error);
        return { success: false, error: "Internal Server Error" };
    }
}
