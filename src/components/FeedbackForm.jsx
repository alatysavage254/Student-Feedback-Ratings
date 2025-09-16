import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function FeedbackForm({ onAdd, editIndex = null, initial = null, onUpdate }) {
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("");

    useEffect(() => {
        if (initial) {
            setName(initial.name || "");
            setComment(initial.comment || "");
            setRating(initial.rating || "");
        }
    }, [initial]);

    const reset = () => {
        setName("");
        setComment("");
        setRating("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !comment.trim() || !rating.toString().trim()) {
            toast("Please complete all fields");
            return;
        }
        const r = Number(rating);
        if (Number.isNaN(r) || r < 1 || r > 5) {
            toast("Rating must be a number between 1 and 5");
            return;
        }

        const payload = { name: name.trim(), comment: comment.trim(), rating: r };

        if (typeof editIndex === "number" && onUpdate) {
            onUpdate(editIndex, payload);
            toast("Feedback updated");
        } else {
            onAdd(payload);
            toast("Feedback submitted successfully!");
        }

        reset();
    };

    return (
            <form className="space-y-4 p-4 rounded shadow-sm bg-[var(--card)] text-[var(--card-foreground)]" onSubmit={handleSubmit}>
            <Input placeholder="Student Name..." value={name} onChange={(e) => setName(e.target.value)} />
            <Textarea placeholder="Feedback" value={comment} onChange={(e) => setComment(e.target.value)} />
            <Input placeholder="Rating (1-5)" type="number" value={rating} onChange={(e) => setRating(e.target.value)} />

            <div className="flex gap-2">
                    <Button type="submit">{typeof editIndex === 'number' ? 'Update' : 'Submit Feedback'}</Button>
                    <Button type="button" variant="secondary" onClick={reset}>Clear</Button>
            </div>
        </form>
    );
}