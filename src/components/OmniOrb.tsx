import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const OmniOrb: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { currentMood } = useTheme();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const dx = (e.clientX - centerX) / centerX;
      const dy = (e.clientY - centerY) / centerY;
      setMouseOffset({ x: dx * 30, y: dy * 30 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden select-none -z-10 ${className}`}>
      
      {/* Omni Core Fluid Morphing Sphere 1 */}
      <motion.div
        animate={{
          scale: [1, 1.25, 0.95, 1.18, 1],
          rotate: [0, 90, 180, 270, 360],
          x: mouseOffset.x * 1.5,
          y: mouseOffset.y * 1.5,
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] sm:w-[700px] sm:h-[700px] rounded-full bg-gradient-to-tr ${currentMood.gradient} opacity-25 dark:opacity-30 blur-[90px] mix-blend-screen will-change-transform`}
      />

      {/* Omni Secondary Counter-Rotating Wave Orb 2 */}
      <motion.div
        animate={{
          scale: [1.1, 0.9, 1.2, 1],
          rotate: [360, 240, 120, 0],
          x: -mouseOffset.x * 1.2,
          y: -mouseOffset.y * 1.2,
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-bl from-cyan-400 via-purple-600 to-pink-500 opacity-20 dark:opacity-25 blur-[100px] mix-blend-screen will-change-transform"
      />

      {/* Subtle Laser Ring Pulse (Omni AI Wave) */}
      <motion.div
        animate={{
          scale: [0.95, 1.05, 0.95],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[850px] sm:h-[850px] rounded-full border border-cyan-500/20 blur-[1px] pointer-events-none"
      />

      {/* Concentric Ambient Ripple */}
      <motion.div
        animate={{
          scale: [0.85, 1.15, 0.85],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] rounded-full border border-purple-500/20 blur-[2px] pointer-events-none"
      />

    </div>
  );
};
