import connectDB from "@/app/lib/mongodb";
import Feedback from "@/app/models/Feedback";
import { NextResponse } from "next/server";

export async function PATCH(req, context) {
    try {
        await connectDB();

        const { id: feedbackId } = await context.params;

        // Parse JSON body safely
        const body = await req.json().catch(() => null);
        const userId = body?.userId;
        const isGuest = body?.isGuest;

        if (!userId || isGuest) {
            return NextResponse.json(
                { success: false, error: "Guests cannot upvote" },
                { status: 403 }
            );
        }

        const feedback = await Feedback.findById(feedbackId);
        if (!feedback) {
            return NextResponse.json(
                { success: false, error: "Feedback not found" },
                { status: 404 }
            );
        }

        const alreadyUpvoted = feedback.upvotedBy.includes(userId);

        if (alreadyUpvoted) {
            // toggle off
            feedback.upvotes = Math.max(0, feedback.upvotes - 1);
            feedback.upvotedBy = feedback.upvotedBy.filter((id) => id !== userId);
        } else {
            // toggle on
            feedback.upvotes += 1;
            feedback.upvotedBy.push(userId);
        }

        await feedback.save();

        return NextResponse.json(
            {
                success: true,
                data: {
                    _id: feedback._id.toString(),
                    upvotes: feedback.upvotes,
                    upvotedBy: feedback.upvotedBy, 
                },
                hasUpvoted: !alreadyUpvoted, 
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Upvote PATCH error:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
