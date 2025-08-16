import Feedback from "@/models/Feedback";

export async function updateFeedback(id, updateData) {
    try {
        const updatedFeedback = await Feedback.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).lean();

        if (!updatedFeedback) {
            return Response.json(
                { success: false, error: "Feedback not found" },
                { status: 404 }
            );
        }

        return Response.json(
            { success: true, data: updatedFeedback },
            { status: 200 }
        );

    } catch (error) {
        console.error("Update Feedback error:", error);
        return Response.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
