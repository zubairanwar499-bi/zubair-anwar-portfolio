import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const OmniOrb: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { currentMood } = useTheme();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Only track mouse on desktop devices with fine pointer
    if (window.matchMedia('(pointer: fine)').matches) {
      const handleMouseMove = (e: MouseEvent) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const dx = (e.clientX - centerX) / centerX;
        const dy = (e.clientY - centerY) / centerY;
        setMouseOffset({ x: dx * 20, y: dy * 20 });
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden select-none -z-10 ${className}`}>
      
      {/* Primary Radial Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 180, 360],
          x: mouseOffset.x,
          y: mouseOffset.y,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] rounded-full bg-gradient-to-tr ${currentMood.gradient} opacity-20 dark:opacity-25 blur-[50px] will-change-transform`}
      />

      {/* Secondary Ambient Aura */}
      <motion.div
        animate={{
          scale: [1.1, 0.95, 1.1],
          x: -mouseOffset.x,
          y: -mouseOffset.y,
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/3 right-1/4 w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] rounded-full bg-cyan-500/20 dark:bg-cyan-500/25 blur-[60px] will-change-transform"
      />

    </div>
  );
};
