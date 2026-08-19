import React, { useEffect, useState } from 'react';

export const CursorGlow: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let rafId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, input, textarea, select, [role="button"], .tilt-card, .glow-card')
        );
        setIsPointer(isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const updateLoop = () => {
      // Smooth lerp physics
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      setPosition({ x: currentX, y: currentY });

      // Trail calculation
      setTrail((prev) => [
        { x: currentX, y: currentY },
        ...prev.slice(0, 5),
      ]);

      rafId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-300">
      
      {/* Large Ambient Rainbow Halo */}
      <div
        className="absolute rounded-full blur-3xl opacity-35 dark:opacity-45 mix-blend-screen transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${position.x - 200}px, ${position.y - 200}px) scale(${isPointer ? 1.4 : 1})`,
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(0,240,255,0.4) 0%, rgba(139,92,246,0.35) 40%, rgba(244,63,94,0.25) 70%, transparent 85%)',
        }}
      />

      {/* Intense Inner High-Glow Core */}
      <div
        className="absolute rounded-full blur-md opacity-80 mix-blend-screen transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${position.x - 30}px, ${position.y - 30}px) scale(${isPointer ? 1.8 : 1})`,
          width: '60px',
          height: '60px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(0,240,255,0.8) 35%, rgba(168,85,247,0.6) 70%, transparent 90%)',
        }}
      />

      {/* Tiny Laser Follower Dot */}
      <div
        className="absolute w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_12px_#00f0ff] transition-transform duration-75"
        style={{
          transform: `translate(${position.x - 6}px, ${position.y - 6}px) scale(${isPointer ? 0.6 : 1})`,
        }}
      />

      {/* Sparkle trails */}
      {trail.map((point, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 blur-[1px]"
          style={{
            transform: `translate(${point.x - 2}px, ${point.y - 2}px)`,
            width: `${Math.max(1, 4 - index)}px`,
            height: `${Math.max(1, 4 - index)}px`,
            opacity: 0.7 - index * 0.12,
          }}
        />
      ))}
    </div>
  );
};
