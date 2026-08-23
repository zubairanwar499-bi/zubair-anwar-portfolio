import React, { createContext, useContext, useEffect, useState } from 'react';

export type Mood = 'cyber' | 'emerald' | 'aurora' | 'obsidian' | 'light';

export interface MoodMeta {
  id: Mood;
  name: string;
  subtitle: string;
  gradient: string;
  glowColor: string;
  badgeColor: string;
  isDark: boolean;
}

export const MOODS: MoodMeta[] = [
  {
    id: 'cyber',
    name: 'Cyber Omni',
    subtitle: 'Cyan • Laser Blue • Violet',
    gradient: 'from-cyan-400 via-blue-500 to-purple-600',
    glowColor: 'rgba(0, 240, 255, 0.4)',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    isDark: true,
  },
  {
    id: 'emerald',
    name: 'Emerald Matrix',
    subtitle: 'Mint • Forest • Gold',
    gradient: 'from-emerald-400 via-teal-500 to-amber-400',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    isDark: true,
  },
  {
    id: 'aurora',
    name: 'Sunset Aurora',
    subtitle: 'Coral • Rose • Golden Amber',
    gradient: 'from-rose-500 via-pink-500 to-amber-400',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
    isDark: true,
  },
  {
    id: 'obsidian',
    name: 'Cosmic OLED',
    subtitle: 'Pitch Black • Ultraviolet',
    gradient: 'from-purple-500 via-fuchsia-500 to-indigo-400',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
    isDark: true,
  },
  {
    id: 'light',
    name: 'Executive Studio',
    subtitle: 'Porcelain White • Crisp Indigo',
    gradient: 'from-blue-600 via-indigo-600 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    isDark: false,
  },
];

interface ThemeContextType {
  mood: Mood;
  currentMood: MoodMeta;
  setMood: (mood: Mood) => void;
  cycleMood: () => void;
  // Backward compatibility for existing theme toggles
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mood, setMoodState] = useState<Mood>(() => {
    const saved = localStorage.getItem('zubair-portfolio-mood') as Mood;
    if (saved && MOODS.some((m) => m.id === saved)) {
      return saved;
    }
    return 'cyber';
  });

  const currentMood = MOODS.find((m) => m.id === mood) || MOODS[0];

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all old mood classes
    MOODS.forEach((m) => root.classList.remove(`mood-${m.id}`));
    root.classList.add(`mood-${mood}`);

    if (currentMood.isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('zubair-portfolio-mood', mood);
  }, [mood, currentMood]);

  const setMood = (newMood: Mood) => {
    setMoodState(newMood);
  };

  const cycleMood = () => {
    const currentIndex = MOODS.findIndex((m) => m.id === mood);
    const nextIndex = (currentIndex + 1) % MOODS.length;
    setMoodState(MOODS[nextIndex].id);
  };

  const toggleTheme = () => {
    setMoodState((prev) => (prev === 'light' ? 'cyber' : 'light'));
  };

  return (
    <ThemeContext.Provider
      value={{
        mood,
        currentMood,
        setMood,
        cycleMood,
        theme: currentMood.isDark ? 'dark' : 'light',
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
