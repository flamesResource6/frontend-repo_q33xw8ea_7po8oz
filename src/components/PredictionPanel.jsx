import React, { useMemo, useState } from 'react';
import { Gauge, BarChart3, Wand2, Loader2 } from 'lucide-react';

// Mock AI analysis to keep the first iteration self-contained.
// In later iterations we can connect to backend endpoints and external APIs.
const mockAnalyze = async ({ type, textLength = 0, size = 0 }) => {
  await new Promise((r) => setTimeout(r, 800));
  const base = Math.min(100, Math.max(10, Math.round(60 + (Math.random() - 0.5) * 30)));
  const sentiment = Math.min(100, Math.max(0, Math.round(50 + (Math.random() - 0.5) * 40)));
  const clarity = Math.min(100, Math.max(0, Math.round(55 + (Math.random() - 0.5) * 35)));
  const trend = Math.min(100, Math.max(0, Math.round(45 + (Math.random() - 0.5) * 50)));
  const engagement = Math.round((base * 0.5 + sentiment * 0.2 + clarity * 0.15 + trend * 0.15));
  return { virality: base, sentiment, clarity, trend, engagement };
};

const Meter = ({ label, value, gradient = 'from-fuchsia-500 to-sky-500' }) => (
  <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
    <div className="mb-2 flex items-center justify-between">
      <span className="text-sm text-slate-300">{label}</span>
      <span className="text-sm font-semibold text-white">{value}%</span>
    </div>
    <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const Suggestions = ({ insights }) => {
  const tags = useMemo(() => {
    const pool = ['#AI', '#Viral', '#Content', '#Trends', '#Creator', '#Tech', '#Design', '#Inspiration'];
    return Array.from({ length: 6 }, () => pool[Math.floor(Math.random() * pool.length)]);
  }, [insights]);

  const title = useMemo(() => {
    const lead = ['Unlock', 'Behind', 'The Secret to', 'How to', 'Why', 'Top 5'];
    const topic = ['Viral Content', 'AI Creativity', 'Trend Forecasts', 'Perfect Thumbnails', 'Storytelling'];
    return `${lead[Math.floor(Math.random() * lead.length)]} ${topic[Math.floor(Math.random() * topic.length)]}`;
  }, [insights]);

  const caption = 'Level up your post with crisp hooks, bold contrasts, and human moments. Keep it under 140 chars and front-load value.';

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900/60 to-slate-900/30 p-4 ring-1 ring-white/10">
      <div className="mb-3 flex items-center gap-2 text-white">
        <Wand2 className="h-4 w-4" />
        <h4 className="text-sm font-semibold">AI Content Enhancer</h4>
      </div>
      <div className="space-y-3 text-sm text-slate-300">
        <div>
          <div className="text-white/80">Suggested Title</div>
          <div className="font-medium text-white">{title}</div>
        </div>
        <div>
          <div className="text-white/80">Caption</div>
          <div className="text-slate-200">{caption}</div>
        </div>
        <div>
          <div className="text-white/80">Hashtags</div>
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((t, i) => (
              <span key={i} className="rounded-md bg-white/10 px-2 py-1 text-xs text-white ring-1 ring-white/15">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PredictionPanel = ({ selectedFile, fileType }) => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState(null);

  const analyze = async () => {
    if (!selectedFile) return;
    setLoading(true);
    const textLength = fileType === 'text' ? 1000 : 0; // placeholder length
    const res = await mockAnalyze({ type: fileType, textLength, size: selectedFile.size });
    setInsights(res);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Gauge className="h-4 w-4" />
            <h3 className="text-sm font-semibold">AI Prediction Engine</h3>
          </div>
          <button
            onClick={analyze}
            disabled={!selectedFile || loading}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-lg disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <BarChart3 className="h-4 w-4" />}
            {loading ? 'Analyzing...' : 'Analyze Content'}
          </button>
        </div>
        <p className="text-sm text-slate-300">
          For media we estimate virality from emotion, tone, and objects. For docs we assess sentiment, readability, and engagement.
        </p>
      </div>

      {insights && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Meter label="Virality" value={insights.virality} />
          <Meter label="Sentiment" value={insights.sentiment} gradient="from-emerald-500 to-lime-400" />
          <Meter label="Clarity" value={insights.clarity} gradient="from-sky-500 to-cyan-400" />
          <Meter label="Trend Match" value={insights.trend} gradient="from-amber-500 to-orange-400" />
        </div>
      )}

      {insights && <Suggestions insights={insights} />}
    </div>
  );
};

export default PredictionPanel;
