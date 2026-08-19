import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Stats } from './Stats';
import { 
  Target, 
  ArrowRight, 
  Layers, 
  Code2, 
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const About: React.FC = () => {
  const { personalInfo } = portfolioData;

  const pillars = [
    {
      title: "Business Problem First",
      desc: "Every metric and visual starts with understanding what decisions leadership needs to make and what roadblocks exist.",
      icon: Target,
    },
    {
      title: "Clean Dimensional Modeling",
      desc: "Building robust Star Schema architectures in Power BI and Fabric Lakehouse for lightning-fast queries and single-source truth.",
      icon: Layers,
    },
    {
      title: "Calculations with Rigor",
      desc: "Optimizing DAX time intelligence and performant SQL queries with strict defensive logic to prevent inaccurate totals.",
      icon: Code2,
    },
    {
      title: "Actionable UX & Security",
      desc: "Constructing executive scorecards with role-based security (RLS) so stakeholders easily see what to act on next.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-navy-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold tracking-wide uppercase mb-3">
            About Me
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Bridging the Gap Between Complex Data and Executive Decisions
          </h2>
        </div>

        {/* Top Grid: Profile & Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left: Avatar Card & Identity */}
          <div className="lg:col-span-4">
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-md space-y-6">
              
              {/* Profile Avatar / Analytics Icon Badge */}
              <div className="relative mx-auto w-36 h-36 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-emerald-400 p-1 shadow-xl shadow-cyan-500/20">
                <div className="w-full h-full rounded-[14px] bg-slate-900 flex flex-col items-center justify-center text-white p-4 text-center">
                  <div className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                    ZA
                  </div>
                  <span className="text-[11px] font-mono text-cyan-300 font-medium mt-1">
                    {personalInfo.name}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono mt-0.5">
                    Data Analyst
                  </span>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full ring-4 ring-white dark:ring-navy-900 shadow">
                  <UserCheck className="w-4 h-4" />
                </div>
              </div>

              {/* Identity Snapshot */}
              <div className="text-center space-y-1">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  {personalInfo.name}
                </h3>
                <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                  Power BI • SQL • Microsoft Fabric • DAX
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                  {personalInfo.location}
                </p>
              </div>

              {/* Direct Link Chips */}
              <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-navy-800 text-xs">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-navy-850 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors text-slate-700 dark:text-slate-200"
                >
                  <span className="font-medium truncate">{personalInfo.email}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-navy-850 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors text-slate-700 dark:text-slate-200"
                >
                  <span className="font-medium truncate">LinkedIn Profile</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                </a>
              </div>

            </div>
          </div>

          {/* Right: Narrative & Strategic Positioning */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Core Highlight Positioning Callout */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50/80 to-cyan-50/60 dark:from-navy-900 dark:to-navy-850 border border-blue-200/60 dark:border-cyan-900/60 shadow-sm">
              <p className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100 leading-relaxed italic">
                "{personalInfo.positioningStatement}"
              </p>
            </div>

            {/* Structured Paragraphs */}
            <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              <p>
                I am a results-oriented <strong>Data Analyst</strong> specializing in building enterprise business intelligence architectures with <strong>Power BI</strong>, <strong>SQL</strong>, <strong>Microsoft Fabric</strong>, and <strong>DAX</strong>. I help organizations eliminate slow, error-prone manual spreadsheets and replace them with automated, trusted reporting systems.
              </p>
              <p>
                My background covers the complete data analytics lifecycle: ingesting data across ERPs, CRMs, and SQL databases, engineering clean <strong>Star Schema</strong> models, writing performant DAX time-intelligence formulas, and designing clean executive dashboards that surface root-cause drivers rather than superficial charts.
              </p>
              <p>
                Whether you need to monitor gross margins across sales channels, optimize workforce turnover, accelerate cash flow forecasting, or modernize into Microsoft Fabric Lakehouses, I build reliable analytics solutions designed to scale.
              </p>
            </div>

            {/* Approach Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {pillars.map((p, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-navy-900/60 border border-slate-200/70 dark:border-navy-800/80 space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <p.icon className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {p.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Stats Strip */}
        <Stats />

      </div>
    </section>
  );
};
