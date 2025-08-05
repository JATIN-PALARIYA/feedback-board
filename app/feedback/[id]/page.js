import { connectDB } from "@/app/lib/mongodb";
import Feedback from "@/app/models/Feedback";
import Reply from "@/app/models/Reply";
import ReplyForm from "@/app/components/ReplyForm";

export default async function Page({ params }) {
    try {
        await connectDB();

        const feedback = await Feedback.findById(params.id);
        const replies = await Reply.find({ feedbackId: params.id }).sort({ createdAt: -1 });

        if (!feedback) {
            return (
                <div>
                    <h1>Feedback Not Found</h1>
                    <p>The feedback you're looking for doesn't exist.</p>
                </div>
            );
        }
        return (
            <div>
                <h1>{feedback.title}</h1>
                <p>{feedback.description}</p>
                <div>
                    {replies.map((reply) => (
                        <div key={reply._id}>
                            <p>{reply.message}</p>
                        </div>
                    ))}
                </div>
                <ReplyForm feedbackId={params.id} />
            </div>
        );
    }
    catch (error) {
        console.error("Error loading feedback:", error);
        return (
            <div>
                <h1>Server Error</h1>
                <p>Something went wrong. Please try again later.</p>
            </div>
        );
    }
}