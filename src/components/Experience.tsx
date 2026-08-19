import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2, TrendingUp } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-slate-50/70 dark:bg-navy-950/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold tracking-wide uppercase mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Work Experience & Proven Outcomes
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300 text-base">
            Focusing on measurable business impact, data pipeline reliability, and executive reporting systems.
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-8 max-w-4xl">
          {portfolioData.experience.map((exp, idx) => (
            <div
              key={idx}
              className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 dark:border-navy-800 space-y-6 group"
            >
              {/* Timeline Pin */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-navy-950 border-2 border-cyan-500 group-hover:scale-125 transition-transform"></div>

              {/* Experience Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-md space-y-6">
                
                {/* Header Information */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-navy-800">
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                      {exp.company}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                      {exp.role}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Role Description */}
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {exp.description}
                </p>

                {/* Key Responsibilities */}
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                    Core Technical Deliverables:
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2"></span>
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Major Quantifiable Achievements */}
                <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-emerald-800 dark:text-emerald-300 uppercase">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>Verified Outcomes & Major Achievements:</span>
                  </div>
                  <div className="space-y-1.5">
                    {exp.achievements.map((ach, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2 text-xs sm:text-sm text-emerald-950 dark:text-emerald-200/90 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies Used Strip */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-navy-750"
                    >
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
