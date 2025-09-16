import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// simple localStorage helpers for feedback persistence
export const FEEDBACK_KEY = "student_feedback_v1";

export function loadFeedback() {
  try {
    const raw = localStorage.getItem(FEEDBACK_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to load feedback", e);
    return [];
  }
}

export function saveFeedback(list) {
  try {
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(list || []));
  } catch (e) {
    console.error("Failed to save feedback", e);
  }
}

// seed helper - small set of example feedbacks
export const SAMPLE_FEEDBACK = [
  { name: "Alice Johnson", comment: "Loved the course, very informative.", rating: 5, createdAt: Date.now(), avatar: null },
  { name: "Bob Smith", comment: "Could use more practical examples.", rating: 3, createdAt: Date.now(), avatar: null },
  { name: "Cara Lee", comment: "Instructor was clear and helpful.", rating: 4, createdAt: Date.now(), avatar: null },
];

export function exportFeedback(list) {
  const blob = new Blob([JSON.stringify(list || [], null, 2)], { type: 'application/json' });
  return URL.createObjectURL(blob);
}

export function parseImport(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        resolve(parsed);
      } catch (e) {
        reject(e);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}
