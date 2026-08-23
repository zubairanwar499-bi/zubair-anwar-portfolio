import React from 'react';
import { 
  BarChart3, 
  Layers, 
  Database, 
  FileSpreadsheet, 
  Code2, 
  Workflow, 
  Terminal, 
  Cloud 
} from 'lucide-react';
import { motion } from 'framer-motion';

export const TrustBar: React.FC = () => {
  const tools = [
    { name: 'Power BI', role: 'BI & Semantic Models', icon: BarChart3, color: 'text-amber-500', glow: 'shadow-amber-500/20' },
    { name: 'Microsoft Fabric', role: 'Lakehouse & Direct Lake', icon: Layers, color: 'text-blue-500', glow: 'shadow-blue-500/20' },
    { name: 'SQL & Data Marts', role: 'Complex Queries & Views', icon: Database, color: 'text-cyan-500', glow: 'shadow-cyan-500/20' },
    { name: 'DAX Modeling', role: 'Time Intelligence & KPIs', icon: Code2, color: 'text-indigo-500', glow: 'shadow-indigo-500/20' },
    { name: 'Power Query & M', role: 'Automated Data Prep', icon: Workflow, color: 'text-emerald-500', glow: 'shadow-emerald-500/20' },
    { name: 'Advanced Excel', role: 'Power Pivot & Modeling', icon: FileSpreadsheet, color: 'text-green-600', glow: 'shadow-green-500/20' },
    { name: 'Python (Pandas)', role: 'EDA & Data Wrangling', icon: Terminal, color: 'text-yellow-500', glow: 'shadow-yellow-500/20' },
    { name: 'Azure Data Stack', role: 'SQL DB & Cloud Storage', icon: Cloud, color: 'text-sky-500', glow: 'shadow-sky-500/20' },
  ];

  return (
    <section className="py-12 bg-white/60 dark:bg-navy-900/60 border-y border-slate-200/80 dark:border-navy-800/80 backdrop-blur-md relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 dark:text-cyan-400">
            Enterprise Analytics Stack
          </p>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-1">
            Tools & Technologies Powering Scalable Solutions
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {tools.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              whileHover={{ scale: 1.08, y: -4 }}
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200/70 dark:border-navy-800 hover:border-cyan-500/60 dark:hover:border-cyan-500/60 hover:shadow-xl transition-all duration-300 group text-center cursor-default"
            >
              <motion.div
                whileHover={{ rotate: 12, scale: 1.15 }}
                className={`p-2.5 rounded-xl bg-white dark:bg-navy-900 shadow-md mb-2.5 ${t.color} ${t.glow}`}
              >
                <t.icon className="w-5 h-5" />
              </motion.div>
              <span className="font-bold text-xs text-slate-800 dark:text-slate-200 tracking-tight">
                {t.name}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                {t.role}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
