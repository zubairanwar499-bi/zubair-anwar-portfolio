import React, { useState } from 'react';
import { 
  Database, 
  Cpu, 
  Workflow, 
  Network, 
  Code2, 
  BarChart3, 
  Lightbulb, 
  TrendingUp, 
  ArrowRight
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const LifecycleSection: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState(4); // Default to Data Modeling / Analysis

  const icons = [
    Database, 
    Cpu, 
    Workflow, 
    Network, 
    Code2, 
    BarChart3, 
    Lightbulb, 
    TrendingUp
  ];

  return (
    <section className="py-20 bg-slate-50/50 dark:bg-navy-950/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold tracking-wide uppercase mb-3">
            End-to-End Analytics Lifecycle
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How Raw Data Becomes High-Impact Business Decisions
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-base">
            Analytics is not just creating charts—it is an unbroken engineering chain from source ingestion down to bottom-line execution.
          </p>
        </div>

        {/* Interactive 8-Stage Pipeline Carousel / Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mb-8">
          {portfolioData.lifecycleSteps.map((step) => {
            const isSelected = selectedStep === step.step;

            return (
              <button
                key={step.step}
                onClick={() => setSelectedStep(step.step)}
                className={`flex flex-col items-center p-3.5 rounded-xl border text-center transition-all duration-200 ${
                  isSelected
                    ? 'bg-white dark:bg-navy-850 border-cyan-500 shadow-lg shadow-cyan-500/15 scale-105 ring-2 ring-cyan-500/20'
                    : 'bg-white/80 dark:bg-navy-900/80 border-slate-200 dark:border-navy-800 hover:border-slate-300 dark:hover:border-navy-700'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 font-mono text-xs font-bold ${
                  isSelected 
                    ? 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white' 
                    : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-400'
                }`}>
                  0{step.step}
                </div>

                <div className="font-bold text-xs text-slate-900 dark:text-white mb-0.5">
                  {step.title}
                </div>
                
                <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                  {step.shortDesc}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Card */}
        {(() => {
          const current = portfolioData.lifecycleSteps.find(s => s.step === selectedStep) || portfolioData.lifecycleSteps[0];
          const CurrentIcon = icons[current.step - 1];

          return (
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 shrink-0">
                <CurrentIcon className="w-8 h-8" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                    Stage 0{current.step} of 08
                  </span>
                  <span className="text-slate-300 dark:text-navy-700">•</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {current.shortDesc}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {current.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {current.detail}
                </p>
              </div>

              <div className="w-full md:w-auto flex md:flex-col justify-between gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 dark:border-navy-800 md:pl-6">
                <button
                  onClick={() => setSelectedStep((prev) => (prev > 1 ? prev - 1 : 8))}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors"
                >
                  ← Prev Stage
                </button>
                <button
                  onClick={() => setSelectedStep((prev) => (prev < 8 ? prev + 1 : 1))}
                  className="px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold hover:bg-cyan-500/20 transition-colors flex items-center gap-1"
                >
                  <span>Next Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })()}

      </div>
    </section>
  );
};
