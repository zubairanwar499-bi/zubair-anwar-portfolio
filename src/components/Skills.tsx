import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { 
  BarChart3, 
  Database, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Skills: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const iconMap: Record<string, React.ElementType> = {
    BarChart3,
    Database,
    Layers,
    Cpu,
    ShieldCheck,
  };

  const categories = ['All', ...portfolioData.skillsCategories.map((c) => c.title)];

  const filteredCategories = portfolioData.skillsCategories
    .map((cat) => {
      const filteredSkills = cat.skills.filter((s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.context.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return { ...cat, skills: filteredSkills };
    })
    .filter((cat) => {
      if (selectedCategory !== 'All' && cat.title !== selectedCategory) return false;
      return cat.skills.length > 0;
    });

  return (
    <section id="skills" className="py-24 bg-white dark:bg-navy-950 relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold tracking-wide uppercase mb-3">
              Technical Stack & Competencies
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Evidence-Based Technical Skills
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-base max-w-2xl">
              Grounded in enterprise production implementations rather than abstract percentages. Every capability is tied to real data modeling and BI outcomes.
            </p>
          </div>

          {/* Quick Search with Focus Glow */}
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill (e.g. DAX, RLS, Fabric)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-slate-200 placeholder-slate-400 transition-all shadow-xs"
            />
          </div>
        </motion.div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((c) => {
            const isSelected = selectedCategory === c;
            return (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors duration-200 cursor-pointer ${
                  isSelected
                    ? 'text-white font-bold'
                    : 'bg-slate-100 dark:bg-navy-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-navy-800 border border-slate-200 dark:border-navy-800'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeSkillCategoryPill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 shadow-md shadow-cyan-500/25 -z-10"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                <span>{c}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid with Staggered Entrance */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredCategories.map((cat, idx) => {
              const Icon = iconMap[cat.iconName] || BarChart3;

              return (
                <motion.div
                  key={cat.title}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="p-6 rounded-3xl bg-slate-50 dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-md hover:shadow-2xl hover:border-cyan-500/50 flex flex-col justify-between space-y-6 transition-all duration-300 group cursor-default"
                >
                  <div className="space-y-4">
                    
                    {/* Category Header */}
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ rotate: 15, scale: 1.15 }}
                        className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 shadow-sm transition-colors"
                      >
                        <Icon className="w-5 h-5" />
                      </motion.div>
                      <div>
                        <h3 className="font-bold text-base text-slate-900 dark:text-white">
                          {cat.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                          {cat.description}
                        </p>
                      </div>
                    </div>

                    {/* Skills List with Context Badges */}
                    <div className="space-y-2.5 pt-2">
                      {cat.skills.map((skill, sIdx) => (
                        <motion.div
                          key={sIdx}
                          whileHover={{ scale: 1.02, x: 2 }}
                          className={`p-3 rounded-2xl border transition-all ${
                            skill.highlight
                              ? 'bg-white dark:bg-navy-850 border-cyan-500/40 shadow-xs'
                              : 'bg-white/80 dark:bg-navy-850/60 border-slate-200/70 dark:border-navy-800/80'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                              {skill.name}
                              {skill.highlight && (
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff]"></span>
                              )}
                            </span>
                            <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-semibold bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-navy-750">
                              {skill.level}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                            {skill.context}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                  </div>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-navy-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    <span>Production Ready</span>
                    <span className="text-cyan-500 font-semibold">{cat.skills.length} core proficiencies</span>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
