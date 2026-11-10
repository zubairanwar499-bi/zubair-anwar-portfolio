import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Database,
  Code2,
  BarChart3,
  Cpu,
  CheckCircle2,
  ExternalLink,
  BellRing,
  Sparkles,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface RoadmapModule {
  phase: string;
  id: string;
  videoTitle: string;
  topicTitle: string;
  duration: string;
  summary: string;
  skills: string[];
  playlistUrl: string;
  icon: React.ComponentType<{ className?: string }>;
  accentClass: string;
}

const ROADMAP_MODULES: RoadmapModule[] = [
  {
    phase: 'Phase 01',
    id: 'mfdMa8aP-vg',
    topicTitle: 'SQL & Relational Data Architecture',
    videoTitle: 'SQL Full Course for Beginners: Learn Database & Queries Step-by-Step | The Data Layer',
    duration: 'Full Crash Course',
    summary:
      'Master relational database design, SELECT/WHERE filtering, GROUP BY aggregations, HAVING clauses, JOIN strategies, and interview-ready analytical queries.',
    skills: ['SQL Queries', 'JOINs & Subqueries', 'GROUP BY & HAVING', 'Aggregate Functions'],
    playlistUrl: 'https://www.youtube.com/watch?v=mfdMa8aP-vg',
    icon: Database,
    accentClass: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10',
  },
  {
    phase: 'Phase 02',
    id: '_NLGBrwtXIY',
    topicTitle: 'Excel & Python (Pandas / NumPy)',
    videoTitle: 'Excel for Data Analysts: Essential Skills, Formulas & Roadmap | The Data Layer',
    duration: 'Core Roadmap',
    summary:
      'Build spreadsheet fluency with XLOOKUP, Pivot Tables, and data cleaning, then scale into Python, Pandas DataFrames, and NumPy vectorized analytics.',
    skills: ['Python (Pandas & NumPy)', 'XLOOKUP & Pivot Tables', 'Data Cleaning', 'EDA Workflows'],
    playlistUrl: 'https://www.youtube.com/watch?v=_NLGBrwtXIY',
    icon: Code2,
    accentClass: 'text-lime-400 border-lime-400/40 bg-lime-400/10',
  },
  {
    phase: 'Phase 03',
    id: 'Yp8pkyLYyew',
    topicTitle: 'Power BI (DAX & Row-Level Security)',
    videoTitle: 'Power BI Row Level Security (RLS) Tutorial: Static & Dynamic | The Data Layer',
    duration: 'Enterprise BI',
    summary:
      'Architect production-ready Star Schema models, optimize DAX time-intelligence measures, and enforce Static & Dynamic Row-Level Security (RLS) via UserPrincipalName.',
    skills: ['Power BI Desktop', 'DAX Measures', 'Dynamic RLS', 'Star Schema Modeling'],
    playlistUrl: 'https://www.youtube.com/playlist?list=PLmAHvUCl6PGasv0iZUUBGm89TkK-7OYQo',
    icon: BarChart3,
    accentClass: 'text-blue-400 border-blue-500/40 bg-blue-500/10',
  },
  {
    phase: 'Phase 04',
    id: 'nzu25aXKs7E',
    topicTitle: 'Microsoft Fabric & AI Copilot',
    videoTitle: 'AI Speaks, Microsoft Fabric Translates! Power BI Copilot | The Data Layer',
    duration: 'Modern Lakehouse',
    summary:
      'Unify Lakehouse data engineering in Microsoft Fabric, OneLake Delta tables, automated pipelines, and AI Copilot natural-language BI reporting.',
    skills: ['Microsoft Fabric', 'OneLake Lakehouse', 'AI Copilot', 'DP-600 & PL-300 Prep'],
    playlistUrl: 'https://www.youtube.com/playlist?list=PLmAHvUCl6PGaG1BzGHKCq1zgE6dxSFJwp',
    icon: Cpu,
    accentClass: 'text-violet-400 border-violet-500/40 bg-violet-500/10',
  },
];

export const DataLayerHub: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const activeModule = ROADMAP_MODULES[activeIndex];
  const subscribeUrl =
    portfolioData.personalInfo.youtubeSubscribe ||
    'https://www.youtube.com/@The-Data-Layer?sub_confirmation=1';
  const channelUrl =
    portfolioData.personalInfo.youtube || 'https://www.youtube.com/@The-Data-Layer';

  const handleSelectModule = (idx: number) => {
    setActiveIndex(idx);
    setIsVideoLoaded(false);
  };

  return (
    <section
      id="data-layer"
      aria-labelledby="data-layer-heading"
      className="py-24 relative overflow-hidden scroll-mt-20 bg-[#1b162d] text-slate-100 border-y border-indigo-500/20"
    >
      {/* Cosmic Glow Backdrop */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #a3e635 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Top Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0e0b1a] border border-lime-400/40 text-lime-300 text-xs font-mono font-bold tracking-wider uppercase shadow-md">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse shadow-[0_0_8px_#a3e635]" />
              <svg className="w-4 h-4 fill-current text-red-500" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>THE DATA LAYER • @The-Data-Layer</span>
            </div>

            <h2
              id="data-layer-heading"
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight"
            >
              DATA ANALYST ROADMAP 2026{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-lime-400 bg-clip-text text-transparent">
                — From Beginner to Professional
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Created and hosted by <strong className="text-white">Zubair Anwar</strong> on{' '}
              <strong className="text-lime-300">THE DATA LAYER</strong>, this flagship 2026 training
              curriculum bridges hands-on{' '}
              <strong className="text-cyan-300">SQL</strong>,{' '}
              <strong className="text-cyan-300">Python (Pandas &amp; NumPy)</strong>,{' '}
              <strong className="text-cyan-300">Power BI (DAX &amp; RLS)</strong>, and{' '}
              <strong className="text-cyan-300">Microsoft Fabric</strong> with production portfolio
              projects.
            </p>
          </div>

          {/* Direct Auto-Subscribe CTA */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              href={subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-lime-400 via-lime-300 to-cyan-300 hover:from-lime-300 hover:to-cyan-200 shadow-lg shadow-lime-400/25 transition-all cursor-pointer"
            >
              <BellRing className="w-4 h-4" />
              <span>Subscribe to @The-Data-Layer</span>
            </motion.a>

            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-[#0e0b1a]/90 hover:bg-[#141026] border border-indigo-400/30 hover:border-cyan-400/60 transition-colors"
            >
              <span>Channel Hub</span>
              <ExternalLink className="w-4 h-4 text-cyan-400" />
            </a>
          </div>
        </motion.div>

        {/* Main Interactive Player + Roadmap Curriculum Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Privacy-Enhanced Lazy YouTube Embed (LCP/CLS Safe) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-3xl overflow-hidden bg-[#0c0a16] border border-indigo-500/30 shadow-2xl shadow-blue-950/50">
              {/* Top Studio Chrome Bar */}
              <div className="px-5 py-3 bg-[#110d20] border-b border-indigo-500/20 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 truncate">
                  <Sparkles className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                  <span className="truncate">
                    {activeModule.phase}: {activeModule.topicTitle}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-md bg-lime-400/15 text-lime-300 border border-lime-400/30 text-[10px] font-mono uppercase shrink-0">
                  {activeModule.duration}
                </span>
              </div>

              {/* 16:9 Privacy-Enhanced Lazy Video Frame */}
              <div className="relative aspect-video w-full bg-[#08070f]">
                {isVideoLoaded ? (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${activeModule.id}?autoplay=1&rel=0`}
                    title={activeModule.videoTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsVideoLoaded(true)}
                    aria-label={`Play video: ${activeModule.videoTitle}`}
                    className="group relative w-full h-full flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <img
                      src={`https://i.ytimg.com/vi/${activeModule.id}/hqdefault.jpg`}
                      alt={`${activeModule.videoTitle} — THE DATA LAYER by Zubair Anwar`}
                      loading="lazy"
                      decoding="async"
                      width={480}
                      height={360}
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08070f] via-[#08070f]/30 to-transparent" />

                    {/* Center Neon Play Trigger */}
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-blue-600 via-cyan-400 to-lime-400 p-0.5 shadow-2xl shadow-cyan-500/40 group-hover:scale-110 transition-transform duration-300">
                        <div className="w-full h-full rounded-full bg-[#0e0b1a]/90 flex items-center justify-center">
                          <Play className="w-7 h-7 sm:w-8 sm:h-8 text-lime-300 fill-lime-300 ml-1" />
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#0e0b1a]/90 border border-cyan-400/40 text-xs font-mono text-cyan-200 backdrop-blur-md">
                        Click to Load Privacy-Safe Video (youtube-nocookie)
                      </span>
                    </div>
                  </button>
                )}
              </div>

              {/* Active Module Description */}
              <div className="p-6 space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {activeModule.videoTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeModule.summary}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-indigo-500/20">
                  <div className="flex flex-wrap gap-2">
                    {activeModule.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg bg-[#1b162d] border border-indigo-400/25 text-[11px] font-mono text-cyan-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <a
                    href={activeModule.playlistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-lime-300 hover:text-lime-200 transition-colors"
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Crawlable Semantic Curriculum & Episode Switcher */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-cyan-300">
                2026 Roadmap Curriculum Tracks
              </h3>
              <span className="text-xs font-mono text-slate-400">4 Core Pillars</span>
            </div>

            <ol className="space-y-3">
              {ROADMAP_MODULES.map((mod, idx) => {
                const Icon = mod.icon;
                const isSelected = idx === activeIndex;
                return (
                  <li key={mod.id}>
                    <button
                      type="button"
                      onClick={() => handleSelectModule(idx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#120e24] border-lime-400/70 shadow-lg shadow-lime-400/10'
                          : 'bg-[#0e0b1a]/80 border-indigo-500/20 hover:border-cyan-400/50 hover:bg-[#120e24]/80'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div className={`p-2.5 rounded-xl border shrink-0 ${mod.accentClass}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-mono font-bold uppercase text-lime-300">
                              {mod.phase}
                            </span>
                            {isSelected && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-300">
                                <CheckCircle2 className="w-3 h-3 text-lime-400" />
                                Active
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm sm:text-base font-bold text-white truncate">
                            {mod.topicTitle}
                          </h4>
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                            {mod.summary}
                          </p>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Crawlable Semantic Summary Card for Search & GEO Engines */}
            <article className="p-5 rounded-2xl bg-[#0e0b1a]/90 border border-indigo-500/25 space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-lime-300">
                Complete 2026 Data Analytics Stack Covered
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Whether preparing for Microsoft <strong>PL-300</strong> / <strong>DP-600</strong>{' '}
                certifications or architecting enterprise dashboards,{' '}
                <strong>Zubair Anwar</strong> breaks down end-to-end analytics on{' '}
                <strong>THE DATA LAYER</strong>: relational <strong>SQL</strong> querying,{' '}
                <strong>Python</strong> automation with <strong>Pandas &amp; NumPy</strong>,
                semantic modeling with <strong>Power BI DAX &amp; Row-Level Security (RLS)</strong>,
                and unified Lakehouse pipelines inside <strong>Microsoft Fabric</strong>.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};
