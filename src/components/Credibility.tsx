import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { 
  Target, 
  Code2, 
  TrendingUp, 
  CheckCircle2, 
  Lock, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';

export const Credibility: React.FC = () => {
  const iconMap: Record<string, any> = {
    Target,
    Code2,
    TrendingUp,
    CheckCircle2,
    Lock,
    MessageSquare,
  };

  return (
    <section id="credibility" className="py-24 bg-slate-50/70 dark:bg-navy-950/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold tracking-wide uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Value & Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Why Work With Me?
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300 text-base">
            What differentiates a real reporting system from a superficial dashboard.
          </p>
        </div>

        {/* Credibility Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {portfolioData.credibilityPoints.map((point, idx) => {
            const Icon = iconMap[point.icon] || Target;

            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-sm space-y-4 hover:border-cyan-500/40 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {point.title}
                  </h3>
                  <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold mt-0.5">
                    {point.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
