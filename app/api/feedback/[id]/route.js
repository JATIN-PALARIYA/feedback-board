import { connectDB } from "@/app/lib/mongodb";
import Feedback from "@/app/models/Feedback";
import Reply from "@/app/models/Reply";

export async function GET(_, { params }) {
    try {
        await connectDB();
        const { id } = params;

        const feedback = await Feedback.findById(id);
        if (!feedback) {
            return Response.json({ success: false, error: "Feedback not found" }, { status: 404 });
        }

        const replies = await Reply.find({ feedbackId: id }).sort({ createdAt: 1 });

        return Response.json({
            success: true,
            data: {
                feedback,
                replies
            }
        }, { status: 200 });
    } catch (error) {
        console.error("Get Feedback by ID error:", error);
        return Response.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    try {
        await connectDB();
        const { id } = params;
        const body = await request.json();

        const updatedFeedback = await Feedback.findByIdAndUpdate(id, body, { new: true });
        if (!updatedFeedback) {
            return Response.json({ success: false, error: "Feedback not found" }, { status: 404 });
        }

        return Response.json({ success: true, data: updatedFeedback }, { status: 200 });
    } catch (error) {
        console.error("Update Feedback error:", error);
        return Response.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(_, { params }) {
    try {
        await connectDB();
        const { id } = params;

        const deletedFeedback = await Feedback.findByIdAndDelete(id);
        if (!deletedFeedback) {
            return Response.json({ success: false, error: "Feedback not found" }, { status: 404 });
        }

        return Response.json({ success: true, message: "Feedback deleted" }, { status: 200 });
    } catch (error) {
        console.error("Delete Feedback error:", error);
        return Response.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
