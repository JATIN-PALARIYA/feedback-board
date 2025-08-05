import { connectDB } from "@/app/lib/mongodb";
import Reply from "@/app/models/Reply";

export async function POST(request) {
    try {
        await connectDB();

        const { feedbackId, message, parentReplyId } = await request.json();

        if (!feedbackId || !message) {
            return Response.json(
                { success: false, error: 'feedbackId and message are required' },
                { status: 400 }
            );
        }
        const reply = await Reply.create({ feedbackId, message, parentReplyId })
        return Response.json({ success: true, data: reply }, { status: 201 });
    }
    catch (error) {
        console.error("Reply POST error:", error);
        return Response.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}