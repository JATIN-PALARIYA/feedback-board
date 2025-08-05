import { connectDB } from "@/app/lib/mongodb";
import Feedback from "@/app/models/Feedback"

export async function POST(request) {
  try {
    await connectDB();

    const { title, description } = await request.json();

    if (!title || !description) {
      return Response.json(
        { success: false, error: 'Title and description are required' },
        { status: 400 }
      );
    }

    const newFeedback = await Feedback.create({ title, description });

    return Response.json({ success: true, data: newFeedback }, { status: 201 });
  } catch (error) {
    console.error("Feedback POST error:", error);
    return Response.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
