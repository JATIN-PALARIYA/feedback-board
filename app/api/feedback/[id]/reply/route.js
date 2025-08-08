import { connectDB } from "@/app/lib/mongodb";
import Reply from "@/app/models/Reply";

export async function POST(request, { params }) {
    try {
        await connectDB();
        const { id: feedbackId } = params;
        const { message, parentReplyId } = await request.json();

        if (!message) {
            return Response.json({ success: false, error: "Message is required" }, { status: 400 });
        }

        const reply = await Reply.create({
            feedbackId,
            message,
            parentReplyId: parentReplyId || null
        });

        return Response.json({ success: true, data: reply }, { status: 201 });
    } catch (error) {
        console.error("Reply POST error:", error);
        return Response.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
