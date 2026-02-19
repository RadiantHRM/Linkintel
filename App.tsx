
import React, { useState } from 'react';
import ProfileInput from './components/ProfileInput';
import AnalysisDashboard from './components/AnalysisDashboard';
import { analyzeLinkedInProfile } from './geminiService';
import { AppState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    loading: false,
    error: null,
    result: null,
  });

  const handleAnalyze = async (url: string) => {
    setState(prev => ({ ...prev, loading: true, error: null, result: null }));
    try {
      const result = await analyzeLinkedInProfile(url);
      setState({ loading: false, error: null, result });
    } catch (err: any) {
      setState({
        loading: false,
        error: err.message || 'An unexpected error occurred during analysis.',
        result: null
      });
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="pt-12 pb-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="7.5 4.21 12 6.81 16.5 4.21"/><polyline points="7.5 19.79 7.5 14.6 3 12"/><polyline points="21 12 16.5 14.6 16.5 19.79"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase heading-font">LinkIntel</h1>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 text-center max-w-2xl mb-6 heading-font">
            Professional Profile <span className="text-indigo-600">Intelligence.</span>
          </h2>
          <p className="text-slate-500 text-lg text-center max-w-xl">
            Extract executive-level insights, compensation tiers, and leadership scope from any LinkedIn profile URL.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6">
        <div className="max-w-7xl mx-auto">
          <ProfileInput onAnalyze={handleAnalyze} isLoading={state.loading} />

          {state.error && (
            <div className="max-w-2xl mx-auto mb-12 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 flex items-center gap-4">
              <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <p className="font-medium">{state.error}</p>
            </div>
          )}

          {state.loading && !state.result && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="h-48 bg-white rounded-3xl animate-pulse flex items-center justify-center p-8 border border-slate-100">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-4 border-indigo-600/20 border-t-indigo-600 animate-spin"></div>
                  <p className="text-slate-400 font-medium italic animate-pulse">Scanning professional networks and mapping career data...</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="h-64 bg-white/50 rounded-3xl animate-pulse border border-slate-100"></div>
                <div className="h-64 bg-white/50 rounded-3xl animate-pulse border border-slate-100"></div>
                <div className="h-64 bg-white/50 rounded-3xl animate-pulse border border-slate-100"></div>
              </div>
            </div>
          )}

          {state.result && (
            <div className="max-w-6xl mx-auto">
              <AnalysisDashboard data={state.result} />
            </div>
          )}
        </div>
      </main>

      {/* Footer Info */}
      {!state.result && !state.loading && (
        <section className="mt-20 px-6 py-20 bg-slate-900 text-white rounded-[4rem] mx-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 text-center md:text-left">
            <div>
              <div className="w-12 h-12 bg-indigo-500 rounded-2xl mb-6 flex items-center justify-center mx-auto md:mx-0 shadow-lg shadow-indigo-500/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 heading-font">Market Benchmark</h3>
              <p className="text-slate-400 leading-relaxed">Automatic compensation estimation based on localized market data, industry standards, and current seniority level.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-500 rounded-2xl mb-6 flex items-center justify-center mx-auto md:mx-0 shadow-lg shadow-purple-500/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 heading-font">Predictive Retention</h3>
              <p className="text-slate-400 leading-relaxed">Calculate transition likelihood using tenure history, career velocity, and typical role lifecycle in specific sectors.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl mb-6 flex items-center justify-center mx-auto md:mx-0 shadow-lg shadow-emerald-500/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04accuratem0 0L3 9m4 10.717L3.584 21a11.727 11.727 0 01-2.434-5.495m18.298 0l-1.01 2.503"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 heading-font">Strategic Scope</h3>
              <p className="text-slate-400 leading-relaxed">Evaluate high-impact achievements and leadership magnitude to determine true professional seniority beyond job titles.</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default App;
