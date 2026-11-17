import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideBackdrop from '../SlideBackdrop';

export default function SlideTable({ slide, hidePanels }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <SlideBackdrop
        image={slide.backgroundImage}
        imageFit={slide.imageFit}
        lightBacking={slide.lightBacking}
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
            className="glass-bottom-panel absolute bottom-0 inset-x-0 max-h-[45vh] z-10 px-6 sm:px-12 lg:px-16 py-5 sm:py-6 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto flex flex-col justify-between gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-[11px] font-semibold tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {slide.tag}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-emerald-200">
                    {slide.subtitle}
                  </span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {slide.title}
              </h2>

              {/* Compact 4-column production breakdown */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
                {slide.rows.map((row, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-center px-4 py-2.5 rounded-xl bg-slate-900/65 border border-white/10"
                  >
                    <span className="text-xs sm:text-sm font-bold text-white">
                      {row.province}
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-emerald-300 mt-0.5">
                      {row.share}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footnote */}
              {slide.footnote && (
                <p className="text-[11px] sm:text-xs text-slate-400 italic border-t border-white/10 pt-2">
                  {slide.footnote}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
