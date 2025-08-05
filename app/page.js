import { connectDB } from "@/app/lib/mongodb";
import Feedback from "@/app/models/Feedback";
import Link from "next/link";
import FeedbackForm from "./components/FeedbackForm";

export default async function Home() {
  await connectDB();
  const feedbackList = await Feedback.find().sort({ createdAt: -1 });
  return (
    <main className="bg-gray-500">
      <h1>All feedbacks</h1>
      <div>
        <FeedbackForm />
      </div>
      <div>
        {feedbackList.map((feedback) => (
          <div key={feedback._id}>
            <Link href={`/feedback/${feedback._id}`}>
              <h3>{feedback.title}</h3>
              <p>{feedback.description?.slice(0, 100)}...</p>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
