import { connectDB } from "@/app/lib/mongodb";
import { getAllFeedback } from "./utils/getAllFeedback";
import { createFeedback } from "./utils/createFeedback";

export async function GET() {
    await connectDB();

    const result = await getAllFeedback();

    if (result.success) {
        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } else {
        return new Response(JSON.stringify(result), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
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
