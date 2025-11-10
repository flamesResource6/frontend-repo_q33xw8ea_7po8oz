import React from 'react';
import Spline from '@splinetool/react-spline';
import { Sparkles, Rocket } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-[60vh] w-full overflow-hidden rounded-3xl bg-slate-900/60 ring-1 ring-white/10 backdrop-blur-xl shadow-2xl">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-950/80" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md ring-1 ring-white/20">
          <Sparkles className="h-4 w-4 text-fuchsia-300" />
          <span>AI-powered Predictive Content Studio</span>
        </div>
        <h1 className="text-balance bg-gradient-to-br from-fuchsia-300 via-sky-300 to-amber-200 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl">
          AI Content Oracle
        </h1>
        <p className="mt-4 max-w-2xl text-balance text-sm/6 text-slate-300 sm:text-base/7">
          Upload images, videos, text, PDFs, or audio — get instant predictions on virality, sentiment, and success insights. Enhance your content with AI-powered suggestions.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:scale-[1.02] focus:outline-none">
            <Rocket className="h-4 w-4" />
            Launch Your Prediction
          </button>
          <div className="rounded-xl bg-white/10 px-4 py-3 text-sm text-white/80 ring-1 ring-white/15">
            No setup needed — just drop your files
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
