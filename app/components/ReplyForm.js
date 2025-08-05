"use client"
import { useState } from "react";

export default function ReplyForm({ feedbackId }) {
    const [message, setMessage] = useState({ title: "", description: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/reply", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...message, feedbackId }),
            });

            if (res.ok) {
                setMessage({ title: "", description: "" }); // optional
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
                <input type="text" value={message.title} onChange={(e) => setMessage({ ...message, title: e.target.value })} required />

                <label>Description</label>
                <input type="text" value={message.description} onChange={(e) => setMessage({ ...message, description: e.target.value })} required />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
