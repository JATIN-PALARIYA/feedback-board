'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

const FeedbackForm = () => {
    const [form, setform] = useState({ title: "", description: "" })
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setform({ title: "", description: "" });
                router.refresh();
            } else {
                console.error("Failed to post reply");
            }
        } catch (error) {
            console.error("Error submitting reply:", error);
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" value={form.title} onChange={(e) => setform({ ...form, title: e.target.value })} required />

                <label>Description</label>
                <input type="text" value={form.description} onChange={(e) => setform({ ...form, description: e.target.value })} required />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default FeedbackForm
