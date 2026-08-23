import React, { useState } from 'react';
import { useTheme, MOODS, type Mood } from '../context/ThemeContext';
import { Palette, Sparkles, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MoodSwitcher: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { mood, setMood, currentMood } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
          compact
            ? 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 shadow-xs'
            : 'bg-white/90 dark:bg-navy-900/90 hover:bg-slate-100 dark:hover:bg-navy-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-navy-750 shadow-md backdrop-blur-md'
        }`}
        aria-label="Change Atmosphere Mood"
        title="Change Atmosphere & Color Palette (5 Moods)"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: 'var(--accent-primary)' }}></span>
          <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: 'var(--accent-primary)', boxShadow: '0 0 10px var(--accent-primary)' }}></span>
        </span>
        
        <Palette className="w-3.5 h-3.5 opacity-80" />
        
        <span className="text-xs font-mono font-bold tracking-tight hidden sm:inline-block">
          {currentMood.name}
        </span>

        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop click dismiss */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="absolute right-0 mt-2 w-64 rounded-2xl bg-white/95 dark:bg-navy-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-navy-750 shadow-2xl p-2 z-50 overflow-hidden"
            >
              <div className="px-3 py-2 border-b border-slate-100 dark:border-navy-800/80 mb-1 flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Select Theme Mood
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-400">
                  5 Palettes
                </span>
              </div>

              <div className="space-y-1">
                {MOODS.map((m) => {
                  const isSelected = mood === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        setMood(m.id as Mood);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left ${
                        isSelected
                          ? 'bg-slate-100 dark:bg-navy-800 border border-slate-300/80 dark:border-cyan-500/40 shadow-sm'
                          : 'hover:bg-slate-50 dark:hover:bg-navy-850/70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Swatch circle with gradient */}
                        <div
                          className={`w-6 h-6 rounded-full bg-gradient-to-tr ${m.gradient} shadow-md flex items-center justify-center`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>

                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <span>{m.name}</span>
                            {isSelected && (
                              <Sparkles className="w-3 h-3 text-cyan-400" />
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                            {m.subtitle}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
