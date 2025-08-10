import Feedback from '@/app/models/Feedback';

export async function createFeedback(body) {
    try {
        const { title, description, author, tags, status } = body;

        if (!title || !description) {
            return { success: false, error: "Title and description are required" };
        }

        const newFeedback = await Feedback.create({
            title,
            description,
            author: author || "Anonymous",
            tags: Array.isArray(tags) ? tags : [],
            status: status || "Planned",
            date: new Date(),
            upvotes: 0,
            comments: 0,
        });

        return { success: true, data: newFeedback };
    } catch (error) {
        console.error("Create Feedback error:", error);
        return { success: false, error: "Internal Server Error" };
    }
}
