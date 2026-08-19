import React from 'react';
import { portfolioData } from '../data/portfolioData';

interface ProjectFilterProps {
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
  projectCounts: Record<string, number>;
}

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  activeCategory,
  onSelectCategory,
  projectCounts,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 overflow-x-auto scrollbar-none">
      {portfolioData.categories.map((cat) => {
        const isActive = activeCategory === cat.slug;
        const count = projectCounts[cat.slug] || (cat.slug === 'all' ? portfolioData.projects.length : 0);

        return (
          <button
            key={cat.slug}
            onClick={() => onSelectCategory(cat.slug)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20 scale-[1.02]'
                : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-navy-800 hover:border-slate-300 dark:hover:border-navy-700'
            }`}
          >
            <span>{cat.name}</span>
            <span
              className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                isActive
                  ? 'bg-white/20 text-white font-bold'
                  : 'bg-slate-100 dark:bg-navy-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
