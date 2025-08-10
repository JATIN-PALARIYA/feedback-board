import { connectDB } from "@/app/lib/mongodb";
import Reply from "@/app/models/Reply";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request, { params }) {
    try {
        await connectDB();

        const { id: feedbackId } = await params; 
        const { message, parentReplyId } = await request.json();

        if (!message) {
            return NextResponse.json(
                { success: false, error: "Message is required" },
                { status: 400 }
            );
        }

        const reply = await Reply.create({
            feedbackId,
            message,
            parentReplyId: parentReplyId || null
        });

        // Get updated replies count
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
