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
import { motion } from 'framer-motion';

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
    <section id="about" className="py-24 bg-white dark:bg-navy-950 relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold tracking-wide uppercase mb-3">
            About Me
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Bridging the Gap Between Complex Data and Executive Decisions
          </h2>
        </motion.div>

        {/* Top Grid: Profile & Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left: Avatar Card & Identity */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4"
          >
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-xl space-y-6 dynamic-mood-glow">
              
              {/* Profile Avatar / Photo with Spring Scale */}
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative mx-auto w-44 h-44 rounded-3xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-emerald-400 p-1 shadow-2xl shadow-cyan-500/25"
              >
                <div className="w-full h-full rounded-[22px] overflow-hidden bg-slate-900">
                  <img
                    src={personalInfo.avatarUrl || '/assets/profile.png'}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-2xl ring-4 ring-white dark:ring-navy-900 shadow-lg flex items-center justify-center"
                >
                  <UserCheck className="w-4 h-4" />
                </motion.div>
              </motion.div>

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

              {/* Direct Link Chips with Framer Motion hover */}
              <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-navy-800 text-xs">
                <motion.a
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-navy-850 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-navy-750 shadow-xs"
                >
                  <span className="font-medium truncate">{personalInfo.email}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-navy-850 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-navy-750 shadow-xs"
                >
                  <span className="font-medium truncate">LinkedIn Profile</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                </motion.a>
              </div>

            </div>
          </motion.div>

          {/* Right: Narrative & Strategic Positioning */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-8 space-y-6"
          >
            
            {/* Core Highlight Positioning Callout */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-6 rounded-2xl bg-gradient-to-r from-blue-50/80 to-cyan-50/60 dark:from-navy-900 dark:to-navy-850 border border-blue-200/60 dark:border-cyan-900/60 shadow-sm"
            >
              <p className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100 leading-relaxed italic">
                "{personalInfo.positioningStatement}"
              </p>
            </motion.div>

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

            {/* Approach Pillars with Framer Motion hover springs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {pillars.map((p, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-900/80 border border-slate-200/70 dark:border-navy-800/80 space-y-1.5 hover:border-cyan-500/50 hover:shadow-lg transition-all duration-300 cursor-default"
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
                </motion.div>
              ))}
            </div>

          </motion.div>

        </div>

        {/* Stats Strip */}
        <Stats />

      </div>
    </section>
  );
};
