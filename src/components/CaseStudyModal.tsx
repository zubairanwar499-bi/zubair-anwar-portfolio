import React, { useState, useEffect } from 'react';
import type { Project } from '../data/portfolioData';
import { portfolioData } from '../data/portfolioData';
import { DashboardMock } from './DashboardMock';
import { motion } from 'framer-motion';
import { 
  X, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Database, 
  Layers, 
  Workflow, 
  ShieldCheck, 
  TrendingUp, 
  Copy, 
  Check, 
  Code2, 
  Lightbulb, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onSelectProject,
}) => {
  const [copiedMeasure, setCopiedMeasure] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleCopyDAX = (code: string, name: string) => {
    navigator.clipboard.writeText(code);
    setCopiedMeasure(name);
    setTimeout(() => setCopiedMeasure(null), 2500);
  };

  // Find previous and next project
  const currentIndex = portfolioData.projects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? portfolioData.projects[currentIndex - 1] : portfolioData.projects[portfolioData.projects.length - 1];
  const nextProject = currentIndex < portfolioData.projects.length - 1 ? portfolioData.projects[currentIndex + 1] : portfolioData.projects[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex justify-center p-2 sm:p-4 lg:p-6"
    >
      
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 25 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className="relative w-full max-w-5xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
      >
        
        {/* Modal Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-navy-900/95 backdrop-blur-md border-b border-slate-200 dark:border-navy-800">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-navy-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Projects</span>
            </button>
            <span className="hidden sm:inline-block text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold bg-cyan-50 dark:bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-200 dark:border-cyan-800">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-12 divide-y divide-slate-100 dark:divide-navy-800/80">
          
          {/* 1. PROJECT HEADER */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold">
                Case Study
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 dark:text-slate-400">Enterprise Solution</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {project.title}
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {project.tagline}
            </p>

            {/* Quick Metrics Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200/80 dark:border-navy-800"
                >
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {m.value}
                  </div>
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {m.label}
                  </div>
                  {m.detail && (
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {m.detail}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-navy-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-navy-750"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* 2. BUSINESS PROBLEM & LIMITATIONS */}
          <div className="pt-8 space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-500 uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" />
              <span>01. The Business Problem</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              What Problem Existed & Why It Mattered
            </h2>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.problem.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-200/70 dark:border-navy-800 space-y-1">
                <span className="text-xs font-bold font-mono text-slate-500 dark:text-slate-400 uppercase">
                  Stakeholders Impacted
                </span>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {project.problem.affectedAudience}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-200/70 dark:border-navy-800 space-y-1">
                <span className="text-xs font-bold font-mono text-slate-500 dark:text-slate-400 uppercase">
                  Business Risk
                </span>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {project.problem.importance}
                </p>
              </div>
            </div>

            {/* Limitations list */}
            <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/40 space-y-3">
              <span className="text-xs font-bold font-mono text-rose-700 dark:text-rose-400 uppercase tracking-wide">
                Key Limitations in Prior Workflow:
              </span>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {project.problem.previousLimitations.map((lim, lIdx) => (
                  <li key={lIdx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-2"></span>
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. OBJECTIVE */}
          <div className="pt-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>02. Project Objective</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              The Mission & Deliverables
            </h2>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-navy-850 dark:to-navy-800 border border-blue-200/60 dark:border-cyan-800/60 text-slate-800 dark:text-slate-100 text-base leading-relaxed">
              {project.objective}
            </div>
          </div>

          {/* 4. DATA & ARCHITECTURE (VISUAL DIAGRAM) */}
          <div className="pt-8 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-500 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>03. Data & Architecture Flow</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              End-to-End Technical Pipeline
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-sm">
              {project.architecture.summary}
            </p>

            {/* Visual Flow Diagram */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative">
                
                {/* Step 1: Sources */}
                <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 text-xs font-bold font-mono">
                    <Database className="w-4 h-4" />
                    <span>1. Sources</span>
                  </div>
                  <div className="text-xs text-slate-300 space-y-1">
                    {project.architecture.sources.map((s, idx) => (
                      <div key={idx} className="text-[11px] leading-tight">• {s}</div>
                    ))}
                  </div>
                </div>

                {/* Step 2: Ingestion */}
                <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold font-mono">
                    <Workflow className="w-4 h-4" />
                    <span>2. Ingestion</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    {project.architecture.ingestion}
                  </p>
                </div>

                {/* Step 3: Storage */}
                <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-purple-400 text-xs font-bold font-mono">
                    <Layers className="w-4 h-4" />
                    <span>3. Lakehouse / DB</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    {project.architecture.storageLayer}
                  </p>
                </div>

                {/* Step 4: Semantic Model */}
                <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono">
                    <Code2 className="w-4 h-4" />
                    <span>4. Star Schema</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    {project.architecture.semanticModel}
                  </p>
                </div>

                {/* Step 5: Power BI */}
                <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono">
                    <TrendingUp className="w-4 h-4" />
                    <span>5. Consumption</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    {project.architecture.consumption}
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* 5. DATA PREPARATION & QUALITY CHECKS */}
          <div className="pt-8 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              <Workflow className="w-4 h-4" />
              <span>04. Data Preparation & Quality Assurance</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Data Cleansing, Transformation & Validation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200/80 dark:border-navy-800 space-y-2">
                <span className="text-xs font-bold font-mono text-cyan-600 dark:text-cyan-400 uppercase">
                  Transformation & Power Query / SQL
                </span>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {project.dataPreparation.cleaning}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200/80 dark:border-navy-800 space-y-2">
                <span className="text-xs font-bold font-mono text-purple-600 dark:text-purple-400 uppercase">
                  Dimensional Modeling Strategy
                </span>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {project.dataPreparation.modeling}
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/40 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-emerald-800 dark:text-emerald-300 uppercase">
                <CheckCircle2 className="w-4 h-4" />
                <span>Automated Data Quality & Reconciliation Assertions:</span>
              </div>
              <div className="space-y-2">
                {project.dataPreparation.qualityChecks.map((check, cIdx) => (
                  <div key={cIdx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{check}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 6. ANALYTICS & DAX MEASURES */}
          <div className="pt-8 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">
              <Code2 className="w-4 h-4" />
              <span>05. Analytics, DAX Measures & Security</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              DAX Formulas & Core Analytics Features
            </h2>

            {/* DAX Measures Code Viewer */}
            <div className="space-y-4">
              {project.analyticsDevelopment.daxMeasures.map((dax, dIdx) => (
                <div
                  key={dIdx}
                  className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-md"
                >
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 text-xs">
                    <div className="flex items-center gap-2 text-slate-200 font-bold font-mono">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      <span>{dax.name}</span>
                    </div>

                    <button
                      onClick={() => handleCopyDAX(dax.code, dax.name)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-mono transition-colors"
                    >
                      {copiedMeasure === dax.name ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy DAX</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 text-xs font-mono leading-relaxed overflow-x-auto text-slate-200 bg-slate-900/90 whitespace-pre">
                    {dax.code}
                  </div>

                  <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800 text-[11px] text-slate-400">
                    {dax.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Key Features & Security */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-200/80 dark:border-navy-800 space-y-2">
                <span className="text-xs font-bold font-mono text-slate-500 dark:text-slate-400 uppercase">
                  Interactive Features
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {project.analyticsDevelopment.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-200/80 dark:border-navy-800 space-y-2">
                <span className="text-xs font-bold font-mono text-slate-500 dark:text-slate-400 uppercase">
                  Security & Access Governance
                </span>
                <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{project.analyticsDevelopment.security}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 7. DASHBOARD PREVIEW */}
          <div className="pt-8 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-500 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>06. Dashboard Visualizer</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Interactive Dashboard Preview
            </h2>

            <DashboardMock project={project} compact={false} />
          </div>

          {/* 8. KEY BUSINESS INSIGHTS */}
          <div className="pt-8 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>07. Discovered Business Insights</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Actionable Findings Discovered Through Analysis
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.keyInsights.map((insight, iIdx) => (
                <div
                  key={iIdx}
                  className="p-5 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-amber-950 dark:text-amber-200">
                      {insight.title}
                    </h3>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {insight.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-amber-200/40 dark:border-amber-900/40 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
                    Impact: {insight.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 9. MEASURABLE BUSINESS IMPACT */}
          <div className="pt-8 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>08. Measurable Business Impact</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Tangible Organizational Results Delivered
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.businessImpactDetails.map((imp, mIdx) => (
                <div
                  key={mIdx}
                  className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200/80 dark:border-emerald-800/80 space-y-2"
                >
                  <div className="text-3xl font-extrabold text-emerald-800 dark:text-emerald-300 tracking-tight">
                    {imp.metric}
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {imp.label}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">
                    {imp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 10. LESSONS LEARNED & TECHNICAL TRADEOFFS */}
          <div className="pt-8 space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>09. Lessons Learned & Technical Decisions</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Engineering Reflections
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-800 space-y-1.5">
                <span className="font-bold font-mono text-slate-500 dark:text-slate-400 uppercase">
                  Technical Challenge
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {project.lessonsLearned.challenge}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-800 space-y-1.5">
                <span className="font-bold font-mono text-slate-500 dark:text-slate-400 uppercase">
                  Architecture Decision
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {project.lessonsLearned.technicalDecision}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-800 space-y-1.5">
                <span className="font-bold font-mono text-slate-500 dark:text-slate-400 uppercase">
                  Future Optimization
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {project.lessonsLearned.futureImprovements}
                </p>
              </div>
            </div>
          </div>

          {/* 11. PROJECT NAVIGATION FOOTER */}
          <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <button
              onClick={() => onSelectProject(prevProject)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-850 hover:bg-slate-100 dark:hover:bg-navy-800 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-500" />
              <span>← Previous: {prevProject.category}</span>
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-navy-800 hover:bg-cyan-600 dark:hover:bg-cyan-500 text-white text-xs font-bold transition-colors"
            >
              Back to All Projects
            </button>

            <button
              onClick={() => onSelectProject(nextProject)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-850 hover:bg-slate-100 dark:hover:bg-navy-800 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
            >
              <span>Next: {nextProject.category} →</span>
              <ArrowRight className="w-4 h-4 text-cyan-500" />
            </button>

          </div>

        </div>
      </motion.div>
    </motion.div>
  );
};
