import React from 'react';
import { ArrowRight, MessageSquare, Sparkles, TrendingUp } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { AnalyticsVisual } from './AnalyticsVisual';
import { ParticleBackdrop } from './ParticleBackdrop';
import { OmniOrb } from './OmniOrb';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const { personalInfo } = portfolioData;

  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden data-grid-pattern min-h-[90vh] flex items-center">
      
      {/* Omni AI Cinematic Fluid Orb Atmosphere */}
      <OmniOrb />

      {/* Animated Connected Particle Backdrop */}
      <ParticleBackdrop />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & CTAs with Framer Motion */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            
            {/* Status Pill Badge with Dynamic Mood Glow */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 dark:bg-navy-900/90 backdrop-blur-xl border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-lg shadow-cyan-500/15 cursor-default"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: 'var(--accent-primary)' }}></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: 'var(--accent-primary)', boxShadow: '0 0 8px var(--accent-primary)' }}></span>
              </span>
              <span className="font-mono">{personalInfo.availability}</span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            </motion.div>

            {/* Main Headline with Smooth Mood Gradients */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.1]"
            >
              Turning <span className="mood-gradient-text">Data</span> Into Decisions That Drive Business.
            </motion.h1>

            {/* Supporting Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal"
            >
              {personalInfo.subtitle}
            </motion.p>

            {/* Primary & Secondary CTAs with High-Glow & Framer Spring */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              
              {/* Primary Glowing Button */}
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                href="#projects"
                className="dynamic-mood-glow inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:from-blue-500 hover:via-cyan-400 hover:to-teal-300 shadow-xl shadow-cyan-500/30 transition-all duration-300 cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              {/* Secondary Glass Button */}
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                href="#contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-slate-800 dark:text-slate-100 bg-white/80 dark:bg-navy-900/80 backdrop-blur-xl hover:bg-slate-100 dark:hover:bg-navy-800 border border-slate-200 dark:border-navy-700 shadow-md transition-all duration-300 hover:border-cyan-500/60 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-cyan-500" />
                <span>Let's Work Together</span>
              </motion.a>

            </motion.div>

            {/* Credibility Tools Ribbon with High Glow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 border-t border-slate-200/80 dark:border-navy-800/80"
            >
              <div className="text-xs uppercase tracking-widest font-mono font-bold text-slate-500 dark:text-cyan-400 mb-3 flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                <span>Core Competencies:</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-medium">
                {personalInfo.coreTools.map((tool, idx) => (
                  <motion.span
                    key={tool}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                    whileHover={{ scale: 1.08, y: -1 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-navy-900/90 backdrop-blur-md text-slate-800 dark:text-slate-200 border border-slate-200/90 dark:border-navy-750 hover:border-cyan-500/60 hover:shadow-md hover:shadow-cyan-500/10 transition-all duration-200 cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff]"></span>
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Interactive 3D Analytics Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <AnalyticsVisual />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
