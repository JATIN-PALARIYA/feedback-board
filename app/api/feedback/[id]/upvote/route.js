import connectDB from "@/lib/mongodb";
import Feedback from "@/models/Feedback";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PATCH(req, context) {
    try {
        await connectDB();

        const { id: feedbackId } = await context.params;
        const body = await req.json().catch(() => null);
        const userId = body?.authorId;
        const isGuest = body?.isGuest;

        if (!userId || isGuest) {
            return NextResponse.json(
                { success: false, error: "Guests cannot upvote" },
                { status: 403 }
            );
        }

        if (!mongoose.Types.ObjectId.isValid(feedbackId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return NextResponse.json(
                { success: false, error: "Invalid feedbackId or userId" },
                { status: 400 }
            );
        }

        const feedback = await Feedback.findById(feedbackId);
        if (!feedback) {
            return NextResponse.json(
                { success: false, error: "Feedback not found" },
                { status: 404 }
            );
        }

        // Check if user has already upvoted
        const alreadyUpvoted = feedback.upvotedBy.some(
            (id) => id.toString() === userId
        );

        if (alreadyUpvoted) {
            feedback.upvotes = Math.max(0, feedback.upvotes - 1);
            feedback.upvotedBy = feedback.upvotedBy.filter(
                (id) => id.toString() !== userId
            );
        } else {
            feedback.upvotes += 1;
            feedback.upvotedBy.push(new mongoose.Types.ObjectId(userId));
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
                alreadyUpvoted: alreadyUpvoted,
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
