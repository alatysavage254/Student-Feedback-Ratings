import { useState } from "react";
 import FeedbackForm from "@/components/FeedbackForm";
import FeedbackList from "@/components/FeedbackList"; 
import { Toaster } from "@/components/ui/sonner";


export default function App() {

  const [feedback, setFeedback] = useState([]);

  const addFeedback = (feedback) => {
    setFeedback(prev => [feedback, ...prev]);
  };

  const deleteFeedback = (index) =>  {
    setFeedback(prev => prev.filter(( _ , i) => i !== index));
};

return (
  <div className="max-w-2xl mx-auto p-6 space-y-6">

    <h1 className="text-3xl font-bold">Student  Feedback Tracker</h1>
    <FeedbackForm onAdd={addFeedback}></FeedbackForm>
    <FeedbackList feedbacks={feedback} onDelete={deleteFeedback} /> 
    <Toaster />
  </div>
)
};



