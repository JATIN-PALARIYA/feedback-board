import Feedback from "@/models/Feedback";
import Reply from "@/models/Reply";

export async function deleteFeedback(id) {
    try {
        const deletedFeedback = await Feedback.findByIdAndDelete(id).lean();

        if (!deletedFeedback) {
            return Response.json(
                { success: false, error: "Feedback not found" },
                { status: 404 }
            );
        }

        // Optionally delete replies linked to this feedback
        await Reply.deleteMany({ feedbackId: id });

        return Response.json(
            { success: true, message: "Feedback deleted successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Delete Feedback error:", error);
        return Response.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
