import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Award, Clock, Database, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const Stats: React.FC = () => {
  const icons = [Clock, Award, Database, Zap];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {portfolioData.stats.map((item, idx) => {
        const Icon = icons[idx] || Award;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-md hover:border-cyan-500/60 hover:shadow-2xl transition-all duration-300 group cursor-default"
          >
            <div className="flex items-center justify-between mb-3">
              <motion.span
                whileHover={{ rotate: 15, scale: 1.2 }}
                className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors shadow-xs"
              >
                <Icon className="w-5 h-5" />
              </motion.span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mood-gradient-text">
                {item.value}
              </span>
            </div>
            <div className="font-bold text-sm text-slate-800 dark:text-slate-200">
              {item.label}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {item.subtitle}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
