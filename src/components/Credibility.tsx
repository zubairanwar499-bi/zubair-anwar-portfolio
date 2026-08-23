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
import { motion } from 'framer-motion';

export const Credibility: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    Target,
    Code2,
    TrendingUp,
    CheckCircle2,
    Lock,
    MessageSquare,
  };

  return (
    <section id="credibility" className="py-24 bg-slate-50/70 dark:bg-navy-950/70 relative overflow-hidden">
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
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Value & Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Why Work With Me?
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300 text-base">
            What differentiates a real reporting system from a superficial dashboard.
          </p>
        </motion.div>

        {/* Credibility Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {portfolioData.credibilityPoints.map((point, idx) => {
            const Icon = iconMap[point.icon] || Target;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-md hover:shadow-2xl hover:border-cyan-500/60 transition-all duration-300 space-y-4 group cursor-default"
              >
                <div className="flex items-center justify-between">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.15 }}
                    className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 shadow-sm transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold mt-0.5">
                    {point.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
