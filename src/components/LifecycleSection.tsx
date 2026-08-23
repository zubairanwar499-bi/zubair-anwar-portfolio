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
import { motion, AnimatePresence } from 'framer-motion';

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
                className={`relative flex flex-col items-center p-3.5 rounded-2xl border text-center transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-navy-850 border-cyan-500 shadow-xl shadow-cyan-500/20 scale-105 ring-2 ring-cyan-500/30'
                    : 'bg-white/80 dark:bg-navy-900/80 border-slate-200 dark:border-navy-800 hover:border-slate-300 dark:hover:border-navy-700'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 font-mono text-xs font-bold transition-transform ${
                  isSelected 
                    ? 'bg-gradient-to-tr from-blue-600 via-cyan-500 to-teal-400 text-white shadow-md' 
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

        {/* Detail Callout Card for Selected Stage with Framer Motion AnimatePresence */}
        <AnimatePresence mode="wait">
          {portfolioData.lifecycleSteps
            .filter((s) => s.step === selectedStep)
            .map((step) => {
              const StepIcon = icons[step.step - 1] || Database;

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/90 dark:border-navy-750 shadow-xl dynamic-mood-glow"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-teal-400 text-white shadow-lg shadow-cyan-500/25 shrink-0">
                        <StepIcon className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 font-mono text-xs text-cyan-600 dark:text-cyan-400 font-bold">
                          <span>Stage 0{step.step} of 08</span>
                          <span>•</span>
                          <span>{step.shortDesc}</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                          {step.title}
                        </h3>
                        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed pt-1">
                          {step.detail}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex md:flex-col items-center gap-2">
                      <button
                        onClick={() => setSelectedStep((prev) => (prev % 8) + 1)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-900 text-white dark:bg-navy-800 hover:bg-cyan-500 dark:hover:bg-cyan-500 hover:text-slate-950 transition-colors shadow-sm cursor-pointer"
                      >
                        <span>Next Phase</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </AnimatePresence>

      </div>
    </section>
  );
};
