import React from 'react';
import { motion } from 'framer-motion';
import { QuizTheme } from '../../hooks/useQuizGame';

interface AnimatedBackgroundProps {
  theme: QuizTheme | 'swot';
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ theme }) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base Gradient */}
      <div 
        className={`absolute inset-0 transition-colors duration-1000 ${
          theme === 'linear' 
            ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900' 
            : theme === 'circular'
            ? 'bg-gradient-to-br from-emerald-950 via-green-950 to-emerald-900'
            : 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950'
        }`}
      />

      {/* Decorative Elements for Linear (Blue) */}
      {theme === 'linear' && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`linear-${i}`}
              className="absolute bg-blue-500/10 rounded-full"
              style={{
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
                x: [0, 50, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
          <div className="absolute inset-0 bg-finance-pattern opacity-20" />
        </>
      )}

      {/* Decorative Elements for Circular (Green) */}
      {theme === 'circular' && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`circular-${i}`}
              className="absolute bg-emerald-500/10 rounded-full"
              style={{
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.2, 0.1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
          <div className="absolute inset-0 bg-eco-pattern opacity-20" />
        </>
      )}

      {/* Decorative Elements for SWOT */}
      {theme === 'swot' && (
        <>
          <motion.div
            className="absolute inset-0 bg-indigo-500/5"
            animate={{
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
        </>
      )}
    </div>
  );
};
