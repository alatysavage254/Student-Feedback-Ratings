import { useEffect, useMemo, useState } from "react";
import FeedbackForm from "@/components/FeedbackForm";
import FeedbackList from "@/components/FeedbackList";
import { Toaster } from "@/components/ui/sonner";
import { loadFeedback, saveFeedback, SAMPLE_FEEDBACK, exportFeedback, parseImport } from "@/lib/utils";

export default function App() {
  const [feedback, setFeedback] = useState(() => loadFeedback() || []);
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    try {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.error('theme toggle failed', e);
    }
  }, [theme]);

  useEffect(() => {
    saveFeedback(feedback);
  }, [feedback]);

  const addFeedback = (item) => {
    const withMeta = { ...item, createdAt: Date.now(), avatar: null };
    setFeedback((prev) => [withMeta, ...prev]);
  };

  const deleteFeedback = (index) => {
    setFeedback((prev) => prev.filter((_, i) => i !== index));
  };

  const updateFeedback = (index, updated) => {
    setFeedback((prev) => prev.map((f, i) => (i === index ? { ...updated, createdAt: f.createdAt, avatar: f.avatar } : f)));
  };

  const [sort, setSort] = useState("newest");

  const sorted = useMemo(() => {
    const list = [...feedback];
    if (sort === "newest") return list.sort((a, b) => b.createdAt - a.createdAt);
    if (sort === "oldest") return list.sort((a, b) => a.createdAt - b.createdAt);
    if (sort === "highest") return list.sort((a, b) => b.rating - a.rating);
    if (sort === "lowest") return list.sort((a, b) => a.rating - b.rating);
    return list;
  }, [feedback, sort]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return feedback;
    return feedback.filter(
      (f) =>
        f.name.toLowerCase().includes(q) || f.comment.toLowerCase().includes(q) || String(f.rating).includes(q)
    );
  }, [feedback, query]);

  const averageRating = useMemo(() => {
    if (feedback.length === 0) return 0;
    const sum = feedback.reduce((s, f) => s + Number(f.rating || 0), 0);
    return (sum / feedback.length).toFixed(1);
  }, [feedback]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Student Feedback Tracker</h1>
          <div className="text-sm text-gray-600">Average rating: <strong className="ml-1">{averageRating}</strong></div>
        </div>
        <div className="flex items-center gap-3">
          <button
            aria-label="Toggle theme"
            className="px-3 py-2 rounded bg-[var(--popover)] text-[var(--popover-foreground)] border border-[var(--border)]"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>

      <FeedbackForm onAdd={addFeedback} />

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <input
          className="flex-1 border rounded px-3 py-2 bg-[var(--popover)] text-[var(--popover-foreground)] border-[var(--border)]"
          placeholder="Search by name, comment or rating..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="px-3 py-2 rounded bg-[var(--popover)] text-[var(--popover-foreground)] border border-[var(--border)]" onClick={() => setQuery("")}>Clear</button>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="border rounded px-2 py-2 bg-[var(--popover)] text-[var(--popover-foreground)] border-[var(--border)]">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="highest">Highest rating</option>
          <option value="lowest">Lowest rating</option>
        </select>
        <a
          className="px-3 py-2 rounded bg-[var(--popover)] text-[var(--popover-foreground)] border border-[var(--border)]"
          href={exportFeedback(feedback)}
          download="feedback-export.json"
        >Export</a>
        <label className="px-3 py-2 rounded bg-[var(--popover)] text-[var(--popover-foreground)] border border-[var(--border)] cursor-pointer">
          Import
          <input type="file" accept="application/json" className="hidden" onChange={async (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            try {
              const parsed = await parseImport(file);
              if (Array.isArray(parsed)) {
                setFeedback(parsed.map(p => ({ ...p, createdAt: p.createdAt || Date.now() })));
              }
            } catch (err) { console.error(err); }
          }} />
        </label>
        <button className="px-3 py-2 rounded bg-[var(--accent)] text-[var(--accent-foreground)]" onClick={() => setFeedback(SAMPLE_FEEDBACK)}>Load Sample</button>
        <button className="px-3 py-2 rounded bg-[var(--destructive)] text-white" onClick={() => { localStorage.removeItem('student_feedback_v1'); setFeedback([]); }}>Reset</button>
      </div>

      <FeedbackList feedbacks={filtered.length ? filtered : sorted} onDelete={deleteFeedback} onUpdate={updateFeedback} />
      <Toaster />
    </div>
  );
}



