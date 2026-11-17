import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideBackdrop from '../SlideBackdrop';

export default function SlideCover({ slide, hidePanels }) {
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
            className="glass-bottom-panel absolute bottom-0 inset-x-0 max-h-[45vh] z-10 px-6 sm:px-12 lg:px-16 py-4 sm:py-6 overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto flex flex-col justify-center gap-2.5 sm:gap-3">
              <div className="inline-flex items-center self-start gap-2.5 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 text-sm sm:text-base font-semibold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                {slide.tag}
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight text-white leading-tight">
                <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">
                  {slide.title}
                </span>
              </h1>

              <p className="text-xl sm:text-3xl lg:text-4xl text-slate-300 font-light italic">
                {slide.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 border-t border-white/10">
                {slide.keywords.map((kw, idx) => (
                  <React.Fragment key={kw}>
                    <span className="text-lg sm:text-2xl font-medium tracking-wide text-amber-200/90">
                      {kw}
                    </span>
                    {idx < slide.keywords.length - 1 && (
                      <span className="text-slate-600 text-lg">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
