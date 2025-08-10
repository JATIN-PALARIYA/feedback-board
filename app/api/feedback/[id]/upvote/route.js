import { connectDB } from "@/app/lib/mongodb";
import Feedback from "@/app/models/Feedback";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
    try {
        await connectDB();
        const { id: feedbackId } = await params;

        const upvote = await Feedback.findByIdAndUpdate(feedbackId,
            { $inc: { upvotes: 1 } },
            { new: true }
        )

        return NextResponse.json({ success: true, data: upvote }, { status: 201 });
    } catch (error) {
        console.error("Reply PATCH error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}