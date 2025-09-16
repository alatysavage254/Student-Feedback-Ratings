import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FeedbackForm from "@/components/FeedbackForm";

export default function FeedbackItem({ feedback, index, onDelete, onUpdate }) {
    const [editing, setEditing] = useState(false);

        if (editing) {
            return (
                <Card className="p-4 bg-[var(--card)] text-[var(--card-foreground)]">
                    <FeedbackForm
                        editIndex={index}
                        initial={feedback}
                        onUpdate={(i, updated) => {
                            onUpdate && onUpdate(i, updated);
                            setEditing(false);
                        }}
                    />
                </Card>
            );
        }

        return (
            <Card className="p-4 flex justify-between items-start bg-[var(--card)] text-[var(--card-foreground)]">
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="font-semibold">{feedback.name}</h2>
                        <span className="bg-[var(--secondary)] text-[var(--secondary-foreground)] px-2 py-0.5 rounded text-sm">{feedback.rating}★</span>
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)] mt-2">{feedback.comment}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <Button variant="ghost" onClick={() => setEditing(true)}>Edit</Button>
                    <Button variant="destructive" onClick={() => onDelete(index)}>Delete</Button>
                </div>
            </Card>
        );
}