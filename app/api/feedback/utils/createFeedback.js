import Feedback from "@/app/models/Feedback";

export async function createFeedback(body) {
    try {
        const { title, description, author, tags, status } = body;

        // Validation
        if (!title || !description) {
            return Response.json(
                { success: false, error: "Title and description are required" },
                { status: 400 }
            );
        }

        // Create new feedback
        const newFeedback = await Feedback.create({
            title,
            description,
            author: author || "Anonymous", // fallback if no author passed
            tags: Array.isArray(tags) ? tags : [],
            status: status || "Planned",    // default status
            date: new Date(),
            upvotes: 0,
            comments: 0
        });

        return Response.json(
            { success: true, data: newFeedback },
            { status: 201 }
        );

    } catch (error) {
        console.error("Create Feedback error:", error);
        return Response.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
