import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import UploadZone from './components/UploadZone';
import PredictionPanel from './components/PredictionPanel';
import FutureForecast from './components/FutureForecast';
import { Rocket, History } from 'lucide-react';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [history, setHistory] = useState([]);

  const onFileChange = (file, type) => {
    setSelectedFile(file);
    setFileType(type);
  };

  const saveToHistory = (entry) => {
    setHistory((prev) => [entry, ...prev].slice(0, 8));
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <HeroSection />

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-3xl bg-slate-900/60 p-6 ring-1 ring-white/10 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Smart Upload Zone</h3>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 ring-1 ring-white/15">
                  <Rocket className="h-3 w-3" />
                  <span>Drop files or browse</span>
                </div>
              </div>
              <UploadZone onChange={onFileChange} />
            </div>

            <PredictionPanel selectedFile={selectedFile} fileType={fileType} />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <FutureForecast />

            <section className="rounded-3xl bg-slate-900/60 p-6 ring-1 ring-white/10 backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-2">
                <History className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Recent Uploads</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {history.length === 0 && (
                  <div className="col-span-2 text-sm text-slate-400">Your analyzed items will appear here.</div>
                )}
                {history.map((h, i) => (
                  <div key={i} className="overflow-hidden rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                    <div className="text-xs text-white/70">{h.type.toUpperCase()}</div>
                    <div className="truncate text-sm text-white">{h.name}</div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-sky-500" style={{ width: `${h.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <footer className="mt-12 rounded-3xl bg-white/5 p-6 text-center text-xs text-white/60 ring-1 ring-white/10">
          Built with love for creators. Future integrations: OpenAI, Stability, HuggingFace, and live trend APIs.
        </footer>
      </div>
    </div>
  );
};

export default App;
