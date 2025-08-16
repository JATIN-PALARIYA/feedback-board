import connectDB from "@/lib/mongodb";
import Reply from "@/models/Reply";
import User from "@/models/User";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request, { params }) {
    try {
        await connectDB();

        const { id: feedbackId } = await params;
        const { message, parentReplyId, authorId } = await request.json();

        if (!message) {
            return NextResponse.json(
                { success: false, error: "Message is required" },
                { status: 400 }
            );
        }

        if (!authorId) {
            return NextResponse.json(
                { success: false, error: "authorId is required" },
                { status: 400 }
            );
        }

        // Ensure authorId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(authorId)) {
            return NextResponse.json(
                { success: false, error: "Invalid authorId" },
                { status: 400 }
            );
        }

        const reply = await Reply.create({
            feedbackId: new mongoose.Types.ObjectId(feedbackId),
            message,
            parentReplyId: parentReplyId ? new mongoose.Types.ObjectId(parentReplyId) : null,
            authorId: new mongoose.Types.ObjectId(authorId),
        });

        const repliesCount = await Reply.countDocuments({
            feedbackId: new mongoose.Types.ObjectId(feedbackId)
        });

        return NextResponse.json(
            {
                success: true,
                data: {
                    reply,
                    repliesCount
                }
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Reply POST error:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
