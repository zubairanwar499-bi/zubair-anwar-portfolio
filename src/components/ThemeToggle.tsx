import React, { useState } from 'react';
import { Sun, Moon, SlidersHorizontal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { AppearanceModal } from './AppearanceModal';
import { motion } from 'framer-motion';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <div className={`inline-flex items-center gap-1 bg-slate-100 dark:bg-navy-850 p-1 rounded-xl border border-slate-200 dark:border-navy-750 ${className}`}>
        
        {/* Direct 1-Click Dark/White Switcher */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'white light' : 'dark'} mode`}
          className="p-2 rounded-lg transition-colors text-slate-700 dark:text-slate-200 hover:text-cyan-500 dark:hover:text-cyan-400 cursor-pointer flex items-center gap-1.5"
          title={theme === 'dark' ? 'Switch to White (Light) Theme' : 'Switch to Dark Theme'}
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline text-xs font-mono font-bold">Dark</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline text-xs font-mono font-bold text-slate-800">Light</span>
            </>
          )}
        </motion.button>

        {/* 3D Appearance & Page Turn Settings Trigger */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setShowSettings(true)}
          aria-label="Appearance and 3D transition settings"
          className="p-2 rounded-lg text-slate-500 hover:text-cyan-500 dark:text-slate-400 dark:hover:text-cyan-400 hover:bg-white dark:hover:bg-navy-800 transition-colors cursor-pointer"
          title="Customize Themes & 3D Transitions (Cube, Slide, Cascade...)"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </motion.button>

      </div>

      <AppearanceModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
};
