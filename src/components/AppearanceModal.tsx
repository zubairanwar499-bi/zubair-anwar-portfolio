import React from 'react';
import { useTheme, MOODS, PAGE_EFFECTS, type Mood, type PageEffect } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Sun, 
  Moon, 
  Sparkles, 
  Layers, 
  Check, 
  SlidersHorizontal
} from 'lucide-react';

interface AppearanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppearanceModal: React.FC<AppearanceModalProps> = ({ isOpen, onClose }) => {
  const { mood, setMood, theme, toggleTheme, pageEffect, setPageEffect } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="relative w-full max-w-md bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-750 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-6"
          >
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-navy-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    Appearance & 3D Motion
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Customize theme styling & 3D transitions
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Dark / White Toggle */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Base Theme (Dark / White)
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    if (theme !== 'dark') toggleTheme();
                  }}
                  className={`flex items-center justify-center gap-2.5 p-3 rounded-2xl border font-bold text-xs transition-all cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-slate-900 text-white border-cyan-500 shadow-md ring-2 ring-cyan-500/30'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Moon className="w-4 h-4 text-cyan-400" />
                  <span>Dark Mode</span>
                </button>

                <button
                  onClick={() => {
                    if (theme !== 'light') setMood('light');
                  }}
                  className={`flex items-center justify-center gap-2.5 p-3 rounded-2xl border font-bold text-xs transition-all cursor-pointer ${
                    theme === 'light'
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md ring-2 ring-blue-500/30'
                      : 'bg-slate-50 dark:bg-navy-850 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-navy-750 hover:bg-slate-100'
                  }`}
                >
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>White (Light) Mode</span>
                </button>
              </div>
            </div>

            {/* Atmospheric Mood Palette */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Color Atmosphere Palettes</span>
                <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              </label>
              <div className="grid grid-cols-1 gap-1.5 max-h-40 overflow-y-auto pr-1">
                {MOODS.map((m) => {
                  const isActive = mood === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setMood(m.id as Mood)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        isActive
                          ? 'bg-cyan-500/15 border-cyan-500 text-slate-900 dark:text-white font-bold shadow-xs'
                          : 'bg-slate-50/70 dark:bg-navy-850/60 border-slate-200/70 dark:border-navy-800 text-slate-600 dark:text-slate-300 hover:border-cyan-500/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-3.5 h-3.5 rounded-full bg-gradient-to-tr ${m.gradient} shadow-xs`}></span>
                        <div>
                          <div className="font-semibold">{m.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{m.subtitle}</div>
                        </div>
                      </div>
                      {isActive && <Check className="w-4 h-4 text-cyan-500" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3D Page Turn Effect Selector */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-navy-800">
              <label className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Page Turn Effect (Tabs & Views)</span>
                <Layers className="w-3.5 h-3.5 text-purple-400" />
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PAGE_EFFECTS.map((eff) => {
                  const isSelected = pageEffect === eff.id;
                  return (
                    <button
                      key={eff.id}
                      onClick={() => setPageEffect(eff.id as PageEffect)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-bold border-transparent shadow-md shadow-cyan-500/20 scale-105'
                          : 'bg-slate-50 dark:bg-navy-850 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-navy-800 hover:border-cyan-500/40'
                      }`}
                    >
                      <div className="text-xs font-bold">{eff.label}</div>
                      <div className={`text-[9px] truncate ${isSelected ? 'text-cyan-100' : 'text-slate-400'}`}>
                        {eff.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Done Button */}
            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all cursor-pointer"
            >
              Apply Settings
            </button>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
};
