import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Award, Clock, Database, Zap } from 'lucide-react';

export const Stats: React.FC = () => {
  const icons = [Clock, Award, Database, Zap];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {portfolioData.stats.map((item, idx) => {
        const Icon = icons[idx] || Award;
        return (
          <div
            key={idx}
            className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-sm hover:border-cyan-500/40 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <Icon className="w-5 h-5" />
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {item.value}
              </span>
            </div>
            <div className="font-bold text-sm text-slate-800 dark:text-slate-200">
              {item.label}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {item.subtitle}
            </div>
          </div>
        );
      })}
    </div>
  );
};
