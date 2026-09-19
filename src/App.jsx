import React, { useState } from 'react';
import { analyzeResume } from './gemini';

export default function App() {
  const [apiKey, setApiKey] = useState('');
  const [resume, setResume] = useState('');
  const [jd, setJd] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!apiKey) return alert('Please enter your Gemini API Key!');
    if (!resume || !jd) return alert('Both Resume & Job Description fields are required!');
    
    setLoading(true);
    try {
      const data = await analyzeResume(resume, jd, apiKey);
      setResult(data);
    } catch (err) {
      console.error(err);
      alert(err.message || 'Analysis failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-10 font-sans">
      <header className="max-w-5xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-blue-400">AI Resume & ATS Optimizer</h1>
        <p className="text-slate-400 mt-2">Hack Devengers 2.0 | Instant Match Score & ATS Recommendations</p>
      </header>

      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-4 bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-300">Gemini API Key</label>
            <input
              type="password"
              className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-sm text-slate-100"
              placeholder="Enter Gemini API Key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-300">Resume Content</label>
            <textarea
              className="w-full h-36 p-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-sm text-slate-100"
              placeholder="Paste raw resume text here..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-300">Job Description (JD)</label>
            <textarea
              className="w-full h-36 p-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-sm text-slate-100"
              placeholder="Paste job description here..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Analyzing with AI...' : 'Analyze Resume'}
          </button>
        </div>

        {/* Results Panel */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          {!result ? (
            <div className="h-full min-h-[300px] flex items-center justify-center text-slate-500 text-center">
              Fill details & click "Analyze Resume" to view ATS report.
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                <div>
                  <h2 className="text-lg font-bold">Match Score</h2>
                  <p className="text-xs text-slate-400 mt-1">{result.summary}</p>
                </div>
                <div className="text-3xl font-extrabold text-emerald-400 bg-slate-900 px-4 py-2 rounded-lg border border-emerald-500/30">
                  {result.matchScore}%
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-rose-400 mb-2">Missing Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {result.missingKeywords.map((kw, idx) => (
                    <span key={idx} className="bg-rose-950/60 text-rose-300 border border-rose-800/50 text-xs px-2.5 py-1 rounded-full">
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-blue-400 mb-2">Optimized Bullet Points</h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {result.optimizedBullets.map((bullet, idx) => (
                    <li key={idx} className="bg-slate-900/60 p-2.5 rounded border border-slate-700">
                      • {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}