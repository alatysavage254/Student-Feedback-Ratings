import FeedbackItem from "@/components/FeedbackItem";

export default function FeedbackList({ feedbacks, onDelete}) {
    if (feedbacks.length === 0) {
        return <p className="text-gray-500"> No Feedbacks Submitted Yet</p>
    }

    return(
        <div className="space-y">
            {feedbacks.map((f, i) => (
                <FeedbackItem
                key={i}
                index={i}
                feedback={f}
                onDelete={onDelete}
                />
            ))}
        </div>
    )
}