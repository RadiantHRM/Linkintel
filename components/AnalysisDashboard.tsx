
import React from 'react';
import { ProfileAnalysis } from '../types';
import { ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar, Tooltip } from 'recharts';

interface AnalysisDashboardProps {
  data: ProfileAnalysis;
}

const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ data }) => {
  const transitionData = [
    { name: 'Likelihood', value: data.transitionLikelihood, fill: data.transitionLikelihood > 70 ? '#ef4444' : data.transitionLikelihood > 40 ? '#f59e0b' : '#10b981' }
  ];

  const getLikelihoodLabel = (score: number) => {
    if (score > 75) return 'High Alert';
    if (score > 40) return 'Moderate';
    return 'Stable';
  };

  const getLikelihoodColor = (score: number) => {
    if (score > 75) return 'text-red-600 bg-red-50';
    if (score > 40) return 'text-amber-600 bg-amber-50';
    return 'text-emerald-600 bg-emerald-50';
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Profile Section */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
          {data.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold text-slate-800 heading-font">{data.name}</h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100">
              {data.seniorityLevel}
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium border border-slate-200">
              {data.industry}
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium border border-slate-200">
              {data.yearsExperience} Years Exp.
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 border border-slate-100 min-w-[200px]">
          <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Transition Score</span>
          <div className="relative w-24 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={10} data={transitionData} startAngle={90} endAngle={90 + (360 * data.transitionLikelihood / 100)}>
                <RadialBar background dataKey="value" cornerRadius={5} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-bold text-slate-800">{data.transitionLikelihood}%</span>
            </div>
          </div>
          <span className={`mt-2 px-3 py-0.5 rounded-full text-xs font-bold ${getLikelihoodColor(data.transitionLikelihood)}`}>
            {getLikelihoodLabel(data.transitionLikelihood)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Role & Trajectory */}
        <div className="lg:col-span-2 space-y-8">
          {/* Summary */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              Recent Role Summary
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              {data.recentRoleSummary}
            </p>
          </section>

          {/* Career Trajectory */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              Career Trajectory
            </h3>
            <p className="text-slate-600 leading-relaxed italic">
              "{data.careerTrajectory}"
            </p>
          </section>

          {/* Leadership Scope */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              Leadership & Scope
            </h3>
            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
              <p className="text-indigo-900 font-medium">
                {data.leadershipScope}
              </p>
            </div>
          </section>
        </div>

        {/* Right Column: Financials & Skills */}
        <div className="space-y-8">
          {/* Compensation */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 relative z-10">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16V15m0 1v-8m0 0H12m0 0h1.5M12 16h1.5"></path></svg>
              Est. Compensation
            </h3>
            <div className="relative z-10">
              <span className="text-3xl font-bold text-slate-900">{data.likelyCompensationTier}</span>
              <p className="text-xs text-slate-400 mt-2 font-medium uppercase tracking-widest">Calculated for {data.country}</p>
            </div>
          </section>

          {/* Key Strengths */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Expertise Focus</h3>
            <div className="flex flex-wrap gap-2">
              {data.keyStrengths.map((skill, i) => (
                <span key={i} className="px-3 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-indigo-50 hover:border-indigo-200 transition-colors duration-200">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Sources */}
          {data.sources.length > 0 && (
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Verification Sources</h3>
              <div className="space-y-3">
                {data.sources.slice(0, 3).map((source, i) => (
                  <a 
                    key={i} 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.823a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.103-1.103"></path></svg>
                    <span className="truncate">{source.title}</span>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisDashboard;
