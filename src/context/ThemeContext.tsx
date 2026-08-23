import React, { createContext, useContext, useEffect, useState } from 'react';

export type Mood = 'cyber' | 'emerald' | 'aurora' | 'obsidian' | 'light';

export type PageEffect = 'cube' | 'slide' | 'overslide' | 'cascade' | 'rotate' | 'tumble';

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
    name: 'Cyber Dark',
    subtitle: 'Cyan • Laser Blue • Violet',
    gradient: 'from-cyan-400 via-blue-500 to-purple-600',
    glowColor: 'rgba(0, 240, 255, 0.4)',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    isDark: true,
  },
  {
    id: 'light',
    name: 'Pure White (Light)',
    subtitle: 'Porcelain White • Crisp Indigo',
    gradient: 'from-blue-600 via-indigo-600 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    isDark: false,
  },
  {
    id: 'obsidian',
    name: 'Cosmic Obsidian (Pitch Black)',
    subtitle: 'Pitch Black • Ultraviolet',
    gradient: 'from-purple-500 via-fuchsia-500 to-indigo-400',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
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
];

export const PAGE_EFFECTS: { id: PageEffect; label: string; desc: string }[] = [
  { id: 'cube', label: '3D Cube', desc: '3D 90° Cube Rotation' },
  { id: 'slide', label: 'Slide', desc: 'Smooth horizontal glide' },
  { id: 'overslide', label: 'Overslide', desc: 'Parallax depth slide' },
  { id: 'cascade', label: 'Cascade', desc: '3D cascading waterfall' },
  { id: 'rotate', label: 'Rotate', desc: '3D orbital spin' },
  { id: 'tumble', label: 'Tumble', desc: '3D vertical card flip' },
];

interface ThemeContextType {
  mood: Mood;
  currentMood: MoodMeta;
  setMood: (mood: Mood) => void;
  cycleMood: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  pageEffect: PageEffect;
  setPageEffect: (effect: PageEffect) => void;
  getTransitionVariants: () => any;
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

  const [pageEffect, setPageEffectState] = useState<PageEffect>(() => {
    const saved = localStorage.getItem('zubair-portfolio-page-effect') as PageEffect;
    if (saved && PAGE_EFFECTS.some((e) => e.id === saved)) {
      return saved;
    }
    return 'cube';
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

  useEffect(() => {
    localStorage.setItem('zubair-portfolio-page-effect', pageEffect);
  }, [pageEffect]);

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

  const setPageEffect = (effect: PageEffect) => {
    setPageEffectState(effect);
  };

  // Generate 3D Framer Motion transition variants according to user preference
  const getTransitionVariants = () => {
    switch (pageEffect) {
      case 'cube':
        return {
          initial: { opacity: 0, rotateY: 55, scale: 0.9, transformOrigin: 'left center' },
          animate: { opacity: 1, rotateY: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
          exit: { opacity: 0, rotateY: -55, scale: 0.9, transformOrigin: 'right center', transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
        };
      case 'slide':
        return {
          initial: { opacity: 0, x: 60 },
          animate: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
          exit: { opacity: 0, x: -60, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
        };
      case 'overslide':
        return {
          initial: { opacity: 0, x: 100, scale: 0.85 },
          animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } },
          exit: { opacity: 0, x: -100, scale: 0.85, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
        };
      case 'cascade':
        return {
          initial: { opacity: 0, y: -45, rotateX: 25 },
          animate: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
          exit: { opacity: 0, y: 45, rotateX: -25, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
        };
      case 'rotate':
        return {
          initial: { opacity: 0, rotate: -15, scale: 0.85 },
          animate: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
          exit: { opacity: 0, rotate: 15, scale: 0.85, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
        };
      case 'tumble':
        return {
          initial: { opacity: 0, rotateX: 70, y: 40 },
          animate: { opacity: 1, rotateX: 0, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
          exit: { opacity: 0, rotateX: -70, y: -40, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
        };
      default:
        return {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
          exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
        };
    }
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
        pageEffect,
        setPageEffect,
        getTransitionVariants,
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
