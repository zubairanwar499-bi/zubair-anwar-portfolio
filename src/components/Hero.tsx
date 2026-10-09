import React from 'react';
import { ArrowRight, MessageSquare, Sparkles, TrendingUp } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Building3DModel } from './Building3DModel';
import { ParticleBackdrop } from './ParticleBackdrop';
import { OmniOrb } from './OmniOrb';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const { personalInfo } = portfolioData;

  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden data-grid-pattern min-h-[90vh] flex items-center">
      
      {/* Omni AI Cinematic Fluid Orb Atmosphere */}
      <OmniOrb />

      {/* Animated Connected Particle Backdrop */}
      <ParticleBackdrop />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headline (40% Reduced Size) & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-5"
          >
            
            {/* Status Pill Badge */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 dark:bg-navy-900/90 backdrop-blur-xl border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-md shadow-cyan-500/10 cursor-default"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: 'var(--accent-primary)' }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: 'var(--accent-primary)', boxShadow: '0 0 8px var(--accent-primary)' }}></span>
              </span>
              <span className="font-mono text-[11px] sm:text-xs truncate">{personalInfo.availability}</span>
              <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
            </motion.div>

            {/* Main Headline (40% proportional reduction as requested) */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.2]"
            >
              Turning <span className="mood-gradient-text">Data</span> Into Decisions That Drive Business.
            </motion.h1>

            {/* Supporting Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
            >
              {personalInfo.subtitle}
            </motion.p>

            {/* Primary & Secondary Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              
              {/* Primary Glowing Button */}
              <motion.a
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                href="#projects"
                className="dynamic-mood-glow inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:from-blue-500 hover:via-cyan-400 hover:to-teal-300 shadow-lg shadow-cyan-500/25 transition-all duration-200 cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.a>

              {/* Secondary Glass Button */}
              <motion.a
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 bg-white/80 dark:bg-navy-900/80 backdrop-blur-xl hover:bg-slate-100 dark:hover:bg-navy-800 border border-slate-200 dark:border-navy-700 shadow-sm transition-all duration-200 hover:border-cyan-500/60 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-cyan-500" />
                <span>Let's Work Together</span>
              </motion.a>

            </motion.div>

            {/* Core Competencies Tech Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="pt-4 border-t border-slate-200/80 dark:border-navy-800/80"
            >
              <div className="text-[11px] uppercase tracking-widest font-mono font-bold text-slate-500 dark:text-cyan-400 mb-2.5 flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3 text-cyan-400" />
                <span>Core Competencies:</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono font-medium">
                {personalInfo.coreTools.map((tool, idx) => (
                  <motion.span
                    key={tool}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.04 }}
                    whileHover={{ scale: 1.06, y: -1 }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-navy-900/90 backdrop-blur-md text-slate-800 dark:text-slate-200 border border-slate-200/90 dark:border-navy-750 hover:border-cyan-500/60 transition-all duration-150 cursor-default text-[11px]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff]"></span>
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Interactive 3D Cutaway Data Analyst Building Model */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex justify-center w-full"
          >
            <Building3DModel />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
