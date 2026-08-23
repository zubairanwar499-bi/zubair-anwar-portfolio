import React, { useState } from 'react';
import { useTheme, MOODS, type Mood } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Palette, ChevronUp } from 'lucide-react';

export const MoodDock: React.FC = () => {
  const { mood, setMood, currentMood } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Expanded Palette Dock */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="mb-3 p-2 rounded-2xl bg-white/95 dark:bg-navy-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-navy-750 shadow-2xl space-y-1.5 min-w-[210px]"
          >
            <div className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Atmosphere Moods</span>
              <span className="text-[9px] px-1 rounded bg-cyan-500/20 text-cyan-400">5 Themes</span>
            </div>

            {MOODS.map((m) => {
              const isSelected = mood === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setMood(m.id as Mood);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-slate-100 dark:bg-navy-800 text-slate-900 dark:text-white border border-slate-300 dark:border-cyan-500/50 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-navy-850 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full bg-gradient-to-tr ${m.gradient} shrink-0 shadow-xs ${
                      isSelected ? 'ring-2 ring-cyan-400 ring-offset-1 ring-offset-slate-900' : ''
                    }`}
                  />
                  <div className="flex-1 text-left">
                    <div className="leading-tight font-bold">{m.name}</div>
                  </div>
                  {isSelected && <Sparkles className="w-3 h-3 text-cyan-400" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Pill Trigger */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-950/90 dark:bg-navy-900/90 text-white border border-cyan-500/40 shadow-xl shadow-cyan-500/20 backdrop-blur-xl group cursor-pointer hover:border-cyan-400 transition-colors"
        title="Switch Mood / Color Atmosphere"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: 'var(--accent-primary)' }}></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: 'var(--accent-primary)' }}></span>
        </span>

        <Palette className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform duration-300" />
        
        <span className="text-xs font-mono font-bold tracking-tight">
          {currentMood.name}
        </span>

        <ChevronUp className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
      </motion.button>

    </div>
  );
};
