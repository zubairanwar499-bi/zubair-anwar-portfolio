import React from 'react';
import { ArrowRight, MessageSquare, Sparkles, TrendingUp } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { AnalyticsVisual } from './AnalyticsVisual';
import { ParticleBackdrop } from './ParticleBackdrop';

export const Hero: React.FC = () => {
  const { personalInfo } = portfolioData;

  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden data-grid-pattern">
      
      {/* Animated Connected Particle Backdrop */}
      <ParticleBackdrop />

      {/* Radiant High-Glow Background Spotlights */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-subtle"></div>
      <div className="absolute top-40 right-10 w-[500px] h-[500px] bg-gradient-to-br from-pink-500/15 via-purple-600/15 to-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-subtle"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Pill Badge with Rainbow Glow */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 dark:bg-navy-900/90 backdrop-blur-xl border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-lg shadow-cyan-500/15">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
              </span>
              <span className="font-mono">{personalInfo.availability}</span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            </div>

            {/* Main Headline with Vibrant Rainbow Gradients */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.1]">
              Turning <span className="rainbow-text">Data</span> Into Decisions That Drive Business.
            </h1>

            {/* Supporting Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
              {personalInfo.subtitle}
            </p>

            {/* Primary & Secondary CTAs with High-Glow & 3D Hover */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              
              {/* Primary Glowing Button */}
              <a
                href="#projects"
                className="rainbow-glow inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:from-blue-500 hover:via-cyan-400 hover:to-teal-300 shadow-xl shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Secondary Glass Button */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-slate-800 dark:text-slate-100 bg-white/80 dark:bg-navy-900/80 backdrop-blur-xl hover:bg-slate-100 dark:hover:bg-navy-800 border border-slate-200 dark:border-navy-700 shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:border-cyan-500/60"
              >
                <MessageSquare className="w-4 h-4 text-cyan-500" />
                <span>Let's Work Together</span>
              </a>

            </div>

            {/* Credibility Tools Ribbon with High Glow */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-navy-800/80">
              <div className="text-xs uppercase tracking-widest font-mono font-bold text-slate-500 dark:text-cyan-400 mb-3 flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                <span>Core Competencies:</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-medium">
                {personalInfo.coreTools.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-navy-900/90 backdrop-blur-md text-slate-800 dark:text-slate-200 border border-slate-200/90 dark:border-navy-750 hover:border-cyan-500/60 hover:shadow-md hover:shadow-cyan-500/10 transition-all duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff]"></span>
                    {tool}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D Analytics Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <AnalyticsVisual />
          </div>

        </div>
      </div>
    </section>
  );
};
