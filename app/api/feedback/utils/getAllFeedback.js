// utils/getAllFeedback.js
import Feedback from "@/app/models/Feedback";
import Reply from "@/app/models/Reply";

export async function getAllFeedback() {
    try {
        const feedbacks = await Feedback.find({}).lean();

        if (!feedbacks.length) {
            return { success: true, data: [] };
        }

        const feedbackWithCounts = await Promise.all(
            feedbacks.map(async (fb) => {
                let repliesCount = 0;
                try {
                    repliesCount = await Reply.countDocuments({ feedbackId: fb._id });
                }
                catch (err) {
                    console.warn(`Could not count replies for feedback ${fb._id}:`, err);
                }
                return {
                    ...fb,
                    _id: fb._id.toString(),
                    repliesCount,
                };
            })
        );

        return { success: true, data: feedbackWithCounts };
    } catch (error) {
        console.error("Error in getAllFeedback:", error);
        return { success: false, error: "Internal Server Error" };
    }
}
