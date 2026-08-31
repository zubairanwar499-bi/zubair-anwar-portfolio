import React, { useState } from 'react';
import type { Project } from '../data/portfolioData';
import { 
  ArrowRight, 
  ExternalLink, 
  TrendingUp, 
  Database, 
  Sparkles, 
  Layers, 
  ChevronDown, 
  Maximize2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenCaseStudy,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  // Both desktop hover and mobile tap toggle expansion
  const isExpanded = isHovered || isMobileExpanded;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cyber-neon-card group h-full flex flex-col justify-between p-5 sm:p-6 bg-slate-900/90 dark:bg-navy-900/95 border border-slate-700/60 dark:border-navy-750/80 shadow-xl hover:shadow-2xl dark:shadow-cyan-950/20 backdrop-blur-xl transition-all duration-300 overflow-hidden select-none"
    >
      {/* Subtle Animated Cyber Corner Brackets */}
      <span className="cyber-corner-tl" />
      <span className="cyber-corner-tr" />
      <span className="cyber-corner-bl" />
      <span className="cyber-corner-br" />

      {/* Card Inner Content Container */}
      <div className="relative z-10 flex flex-col h-full space-y-4">
        
        {/* Top Header: Category & Featured Project Badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-mono font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Layers className="w-3 h-3 text-cyan-400" />
            <span>{project.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-[11px] font-mono font-semibold text-slate-400 group-hover:text-emerald-400 transition-colors">
              Featured Project
            </span>
          </div>
        </div>

        {/* Project Title */}
        <div>
          <h3 
            onClick={() => onOpenCaseStudy(project)}
            className="text-lg sm:text-xl font-extrabold text-slate-100 group-hover:text-cyan-400 transition-colors tracking-tight leading-snug cursor-pointer line-clamp-2"
          >
            {project.title}
          </h3>
          <p className="text-xs text-cyan-500/90 font-mono mt-0.5 truncate">
            {project.tagline}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-medium bg-slate-800/90 dark:bg-navy-800 text-slate-300 border border-slate-700/60 dark:border-navy-700 group-hover:border-cyan-500/30 transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono text-slate-400 bg-slate-800/50">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Center: High-Resolution Dashboard Preview with Cyber Frame */}
        <div 
          onClick={() => onOpenCaseStudy(project)}
          className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 border border-slate-700/80 dark:border-navy-750 shadow-inner group/img cursor-pointer my-1"
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-navy-950 p-4 text-center space-y-2">
              <Database className="w-8 h-8 text-cyan-400 animate-pulse" />
              <div className="text-xs font-mono font-bold text-slate-300">{project.title}</div>
              <div className="text-[10px] font-mono text-cyan-400">Power BI Dimensional Model</div>
            </div>
          )}

          {/* Cyber HUD Preview Overlay Ribbon */}
          <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
            <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold bg-slate-950/85 text-cyan-400 border border-cyan-500/40 backdrop-blur-md">
              BI Dashboard
            </span>
            <span className="px-2 py-0.5 rounded-md text-[9px] font-mono text-slate-300 bg-slate-950/85 border border-slate-700/80 backdrop-blur-md flex items-center gap-1">
              <span>Preview</span>
              <Maximize2 className="w-2.5 h-2.5 text-cyan-400" />
            </span>
          </div>

          {/* Interactive Hover Sheen on Image */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-60 group-hover/img:opacity-30 transition-opacity duration-300" />
          
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-[11px] font-mono font-bold text-cyan-300 bg-slate-900/90 px-2 py-1 rounded-lg border border-cyan-500/40 backdrop-blur-md flex items-center gap-1 shadow-lg">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Click to Open Full Architecture
            </span>
          </div>
        </div>

        {/* Short Project Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2">
          {project.problem.description}
        </p>

        {/* Expandable Additional Project Info (Revealed on Hover / Mobile Tap) */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden space-y-2.5 pt-2"
            >
              {/* Measurable Business Impact Highlight */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 text-xs">
                <div className="flex items-center gap-1.5 font-mono font-bold text-emerald-400 text-[11px] mb-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Business Impact Outcome:</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-200 leading-snug">
                  {project.businessImpactSummary}
                </p>
              </div>

              {/* Key Metrics Quick Ribbon */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-2 gap-2 pt-0.5">
                  {project.metrics.slice(0, 2).map((m, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-slate-800/70 border border-slate-700/50">
                      <div className="text-[10px] font-mono text-slate-400 truncate">{m.label}</div>
                      <div className="text-xs sm:text-sm font-extrabold text-cyan-400 font-mono">{m.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Actions: View Project & Live Demo / Details */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
          {/* Primary: View Deep Project Case Study */}
          <button
            type="button"
            onClick={() => onOpenCaseStudy(project)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 hover:from-cyan-300 hover:to-teal-200 shadow-md shadow-cyan-500/25 transition-all duration-200 active:scale-98 cursor-pointer"
          >
            <span>View Project</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Secondary: Live Demo / Architecture Expand */}
          <button
            type="button"
            onClick={() => onOpenCaseStudy(project)}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl font-semibold text-xs text-cyan-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 hover:border-cyan-500/50 transition-all duration-200 cursor-pointer shrink-0"
            title="Interactive Live Demo & Metrics"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Tap Toggle Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileExpanded(!isMobileExpanded);
            }}
            className="sm:hidden p-2 rounded-xl text-slate-400 hover:text-cyan-400 bg-slate-800/80 border border-slate-700/80 transition-colors"
            aria-label="Toggle details"
            title="Toggle details"
          >
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileExpanded ? 'rotate-180 text-cyan-400' : ''}`} />
          </button>
        </div>

      </div>
    </div>
  );
};
