import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideBackdrop from '../SlideBackdrop';

export default function SlideFormula({ slide, hidePanels }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <SlideBackdrop
        image={slide.backgroundImage}
        imageFit={slide.imageFit}
        hidePanels={hidePanels}
        alt={slide.title}
      />

      {/* Bottom Horizontal Glassmorphism Panel (max 45% height) */}
      <AnimatePresence>
        {!hidePanels && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass-bottom-panel absolute bottom-0 inset-x-0 max-h-[45vh] z-10 px-6 sm:px-12 lg:px-16 py-5 sm:py-7 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto flex flex-col justify-between gap-4">
              <div className="inline-flex items-center self-start gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-400/30 text-orange-300 text-[11px] font-semibold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                {slide.tag}
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {slide.title}
              </h2>

              {/* Equation + Metrics Horizontal Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                {/* Highlighted Chemical Equation */}
                <div className="lg:col-span-6 flex items-center justify-center sm:justify-start gap-3 sm:gap-4 px-5 py-3.5 rounded-2xl bg-slate-950/75 border border-orange-500/30 shadow-lg">
                  <span className="font-mono text-lg sm:text-2xl lg:text-3xl font-bold text-amber-200 tracking-wide">
                    {slide.equation.reactants}
                  </span>
                  <span className="text-orange-400 text-xl sm:text-2xl font-bold">→</span>
                  <span className="font-mono text-lg sm:text-2xl lg:text-3xl font-bold text-cyan-200 tracking-wide">
                    {slide.equation.products}
                  </span>
                </div>

                {/* Key Metrics */}
                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {slide.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col justify-center px-4 py-3 rounded-2xl bg-slate-900/60 border border-white/10"
                    >
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                        {m.label}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-white mt-0.5">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
