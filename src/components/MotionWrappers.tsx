import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

// Smooth cubic-bezier transition curves like Apple / OpenAI Omni
export const transitionSpring = {
  type: 'spring',
  stiffness: 260,
  damping: 24,
};

export const transitionSmooth = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1],
};

// Fade In Up on Scroll
export const MotionFadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}> = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const getOffset = () => {
    switch (direction) {
      case 'up':
        return { y: 32, x: 0 };
      case 'down':
        return { y: -32, x: 0 };
      case 'left':
        return { x: 32, y: 0 };
      case 'right':
        return { x: -32, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Staggered Container for Grid Children
export const MotionStagger: React.FC<{
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}> = ({ children, staggerDelay = 0.1, className = '' }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const MotionStaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28, scale: 0.96 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Magnetic Interactive Button Wrapper
export const MotionMagnetic: React.FC<
  HTMLMotionProps<'div'> & { children: React.ReactNode; className?: string }
> = ({ children, className = '', ...props }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
