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

export const TrustBar: React.FC = () => {
  const tools = [
    { name: 'Power BI', role: 'BI & Semantic Models', icon: BarChart3, color: 'text-amber-500' },
    { name: 'Microsoft Fabric', role: 'Lakehouse & Direct Lake', icon: Layers, color: 'text-blue-500' },
    { name: 'SQL & Data Marts', role: 'Complex Queries & Views', icon: Database, color: 'text-cyan-500' },
    { name: 'DAX Modeling', role: 'Time Intelligence & KPIs', icon: Code2, color: 'text-indigo-500' },
    { name: 'Power Query & M', role: 'Automated Data Prep', icon: Workflow, color: 'text-emerald-500' },
    { name: 'Advanced Excel', role: 'Power Pivot & Modeling', icon: FileSpreadsheet, color: 'text-green-600' },
    { name: 'Python (Pandas)', role: 'EDA & Data Wrangling', icon: Terminal, color: 'text-yellow-500' },
    { name: 'Azure Data Stack', role: 'SQL DB & Cloud Storage', icon: Cloud, color: 'text-sky-500' },
  ];

  return (
    <section className="py-12 bg-white/60 dark:bg-navy-900/60 border-y border-slate-200/80 dark:border-navy-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 dark:text-cyan-400">
            Enterprise Analytics Stack
          </p>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-1">
            Tools & Technologies Powering Scalable Solutions
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {tools.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-200/70 dark:border-navy-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-200 group text-center"
            >
              <div className={`p-2.5 rounded-lg bg-white dark:bg-navy-900 shadow-sm mb-2.5 ${t.color} group-hover:scale-110 transition-transform duration-200`}>
                <t.icon className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-slate-800 dark:text-slate-200 tracking-tight">
                {t.name}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                {t.role}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
