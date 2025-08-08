import Feedback from "@/app/models/Feedback";
import Reply from "@/app/models/Reply";

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
        const replies = await Reply.find({ feedbackId: id }).lean();

        return Response.json(
            { success: true, data: { ...feedback, replies } },
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
