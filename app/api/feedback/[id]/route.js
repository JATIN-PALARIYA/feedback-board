import { NextResponse } from 'next/server';
import { connectDB } from "@/app/lib/mongodb";
import Feedback from "@/app/models/Feedback";
import Reply from "@/app/models/Reply";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id: feedbackId } = await params; 

    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) {
      return NextResponse.json({ success: false, error: "Feedback not found" }, { status: 404 });
    }

    const replies = await Reply.find({ feedbackId }).sort({ createdAt: 1 });

    return NextResponse.json({
      success: true,
      data: { feedback, replies }
    }, { status: 200 });
  } catch (error) {
    console.error("Get Feedback by ID error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
