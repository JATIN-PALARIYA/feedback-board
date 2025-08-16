import Feedback from "@/models/Feedback";
import Reply from "@/models/Reply";

export async function getFeedbackById(id) {
    try {
        const feedback = await Feedback.findById(id).lean();
        if (!feedback) {
            return Response.json(
                { success: false, error: "Feedback not found" },
                { status: 404 }
            );
        }

        // Get replies for this feedback
        const replies = await Reply.find({ feedbackId: new mongoose.Types.ObjectId(id) }).lean();

        return Response.json(
            { success: true, data: { ...feedback, reply: replies, comments: replies.length } },
            { status: 200 }
        );

    } catch (error) {
        console.error("Get Feedback by ID error:", error);
        return Response.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
