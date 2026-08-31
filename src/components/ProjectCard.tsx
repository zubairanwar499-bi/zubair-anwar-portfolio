import React from 'react';
import type { Project } from '../data/portfolioData';
import { DashboardMock } from './DashboardMock';
import { TiltCard } from './TiltCard';
import { ArrowRight, TrendingUp } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenCaseStudy,
}) => {
  return (
    <TiltCard
      maxTilt={7}
      scale={1.015}
      glowColor="rgba(0, 240, 255, 0.25)"
      className="h-full"
    >
      <div className="flex flex-col h-full rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-lg hover:shadow-2xl dark:shadow-navy-950/60 transition-all duration-300 overflow-hidden group hover:border-cyan-500/50">
        
        {/* Top Visual Mockup */}
        <div className="p-4 sm:p-5 bg-slate-100/80 dark:bg-navy-950/90 border-b border-slate-200/70 dark:border-navy-800">
          <DashboardMock
            project={project}
            compact={true}
            onExpand={() => onOpenCaseStudy(project)}
          />
        </div>

        {/* Card Content */}
        <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
          
          <div className="space-y-3">
            
            {/* Category & Tech Pills */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-xl text-xs font-bold font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                {project.category}
              </span>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]"></span>
                <span>Case Study</span>
              </div>
            </div>

            {/* Project Title */}
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-cyan-500 transition-colors">
              {project.title}
            </h3>

            {/* Business Problem & Summary */}
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
              {project.problem.description}
            </p>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-navy-750"
                >
                  {tech}
                </span>
              ))}
            </div>

          </div>

          {/* Business Impact Box & CTA */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-navy-800">
            
            {/* Business Impact Callout */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 font-mono">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                <span>Measurable Impact:</span>
              </div>
              <p className="text-xs text-emerald-950 dark:text-emerald-200/90 leading-snug font-medium">
                {project.businessImpactSummary}
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={() => onOpenCaseStudy(project)}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-white bg-slate-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 dark:bg-navy-800 dark:hover:from-blue-600 dark:hover:to-cyan-500 transition-all duration-300 shadow-md group-hover:shadow-cyan-500/20"
            >
              <span>View Deep Case Study</span>
              <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>

        </div>

      </div>
    </TiltCard>
  );
};
