import React, { useState } from 'react';
import { Telescope, Sparkles, ImagePlus } from 'lucide-react';

const FutureForecast = () => {
  const [idea, setIdea] = useState('');
  const [output, setOutput] = useState(null);

  const handleForecast = async () => {
    if (!idea.trim()) return;
    // lightweight mock forecast
    const months = 3;
    const score = Math.min(100, Math.max(10, Math.round(65 + (Math.random() - 0.5) * 25)));
    const title = `The Rise of ${idea.split(' ').slice(0, 3).join(' ')} in ${months} Months`;
    const thumb = `https://source.unsplash.com/featured/800x450?${encodeURIComponent(idea)},futuristic`;
    setOutput({ months, score, title, thumb });
  };

  return (
    <section className="rounded-3xl bg-slate-900/60 p-6 ring-1 ring-white/10 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-2 text-white">
        <Telescope className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Future Forecast</h3>
      </div>
      <p className="mb-4 text-sm text-slate-300">
        Describe an idea (e.g., "a video about AI fashion robots"). We'll predict its 3-month trend potential and suggest a viral thumbnail + title.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Type your content idea..."
          className="flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/40"
        />
        <button
          onClick={handleForecast}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-lg"
        >
          <Sparkles className="h-4 w-4" />
          Predict
        </button>
      </div>

      {output && (
        <div className="mt-6 grid gap-4 sm:grid-cols-5">
          <div className="sm:col-span-2 overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/5">
            <img src={output.thumb} alt="mock thumbnail" className="h-full w-full object-cover" />
          </div>
          <div className="sm:col-span-3 space-y-3">
            <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="text-sm text-white/80">Predicted 3-mo Success</div>
              <div className="text-2xl font-extrabold text-white">{output.score}%</div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-pink-500" style={{ width: `${output.score}%` }} />
              </div>
            </div>
            <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="text-sm text-white/80">Title Suggestion</div>
              <div className="font-semibold text-white">{output.title}</div>
            </div>
          </div>
        </div>
      )}

      {!output && (
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
          <ImagePlus className="h-4 w-4" />
          <span>We'll generate a mock thumbnail preview when you predict.</span>
        </div>
      )}
    </section>
  );
};

export default FutureForecast;
