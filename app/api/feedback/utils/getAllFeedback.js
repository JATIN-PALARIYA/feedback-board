// utils/getAllFeedback.js
import Feedback from "@/models/Feedback";
import Reply from "@/models/Reply";

export async function getAllFeedback(search, tags, view) {
    try {
        const query = {};

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { tags: { $elemMatch: { $regex: search, $options: 'i' } } }
            ];
        }

        if (tags && tags.length > 0) {
            query.tags = { $in: tags };
        }

        if (view === 'inbox') {
            query.archived = { $ne: true };
        } else if (view === 'archives') {
            query.archived = true;
        }

        // populate user info from authorId
        const feedbacks = await Feedback.find(query)
            .populate({ path: "authorId", select: "username email" })
            .sort({ createdAt: -1, _id: -1 })
            .lean();

        if (!feedbacks.length) {
            return { success: true, data: [] };
        }

        const feedbackWithCounts = await Promise.all(
            feedbacks.map(async (fb) => {
                let comments = 0;
                try {
                    comments = await Reply.countDocuments({ feedbackId: fb._id });
                } catch (err) {
                    console.warn(`Could not count replies for feedback ${fb._id}:`, err);
                }
                return {
                    ...fb,
                    _id: fb._id.toString(),
                    comments,
                    author: fb.authorId ? {
                        id: fb.authorId._id.toString(),
                        username: fb.authorId.username,
                        email: fb.authorId.email,
                    } : null,
                };
            })
        );

        return { success: true, data: feedbackWithCounts };
    } catch (error) {
        console.error("Error in getAllFeedback:", error);
        return { success: false, error: "Internal Server Error" };
    }
}
