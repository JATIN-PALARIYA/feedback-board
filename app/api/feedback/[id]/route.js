import { NextResponse } from 'next/server';
import connectDB from "@/lib/mongodb";
import Feedback from "@/models/Feedback";
import Reply from "@/models/Reply";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id: feedbackId } = params; // no await here

    // Get feedback with author info
    const feedback = await Feedback.findById(feedbackId)
      .populate({ path: "authorId", select: "username email" });

    if (!feedback) {
      return NextResponse.json(
        { success: false, error: "Feedback not found" },
        { status: 404 }
      );
    }

    // Get replies with author info
    const replies = await Reply.find({ feedbackId })
      .populate({ path: "authorId", select: "username email" })
      .sort({ createdAt: 1 });

    // Map feedback to include author object
    const mappedFeedback = {
      ...feedback.toObject(),
      _id: feedback._id.toString(),
      author: feedback.authorId
        ? {
          id: feedback.authorId._id.toString(),
          username: feedback.authorId.username,
          email: feedback.authorId.email,
        }
        : null,
    };

    // Map replies to include authorName
    const mappedReplies = replies.map((r) => ({
      ...r.toObject(),
      _id: r._id.toString(),
      authorName: r.authorId?.username || "Anonymous",
    }));

    return NextResponse.json(
      {
        success: true,
        data: {
          feedback: mappedFeedback,
          replies: mappedReplies,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get Feedback by ID error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
