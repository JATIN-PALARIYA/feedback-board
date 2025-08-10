import { connectDB } from "@/app/lib/mongodb";
import { getAllFeedback } from "./utils/getAllFeedback";
import { createFeedback } from "./utils/createFeedback";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connectDB();

        // Parse URL and query params
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const tagsParam = searchParams.get('tags') || '';
        const view = searchParams.get('view') || 'inbox';

        // Convert tags string to array (if tags exist)
        const tags = tagsParam ? tagsParam.split(',').map(tag => tag.trim()).filter(Boolean) : [];

        // Call your utility with parsed params
        const result = await getAllFeedback(search, tags, view);

        if (!result.success) {
            return NextResponse.json({ success: false, error: result.error }, { status: 500 });
        }

        return NextResponse.json({ success: true, data: result.data }, { status: 200 });
    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request) {
    await connectDB();
    const body = await request.json();
    const result = await createFeedback(body);

    if (result.success) {
        return new Response(JSON.stringify(result), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } else {
        return new Response(JSON.stringify(result), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
