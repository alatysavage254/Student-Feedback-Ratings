import FeedbackItem from "@/components/FeedbackItem";

export default function FeedbackList({ feedbacks, onDelete, onUpdate }) {
    if (!feedbacks || feedbacks.length === 0) {
        return (
            <div className="p-6 border rounded text-center">
                <p className="text-gray-600">No feedback submitted yet.</p>
                <p className="text-sm text-gray-400 mt-2">Be the first to add feedback.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {feedbacks.map((f, i) => (
                <FeedbackItem key={i} index={i} feedback={f} onDelete={onDelete} onUpdate={onUpdate} />
            ))}
        </div>
    );
}