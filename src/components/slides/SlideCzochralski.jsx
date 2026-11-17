import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideBackdrop from '../SlideBackdrop';

export default function SlideCzochralski({ slide, hidePanels }) {
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
            className="glass-bottom-panel absolute bottom-0 inset-x-0 max-h-[45vh] z-10 px-6 sm:px-12 lg:px-16 py-4 sm:py-5 overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
              {/* Left: Title + 4 Brief Points */}
              <div className="flex-1 flex flex-col gap-2.5 sm:gap-3">
                <div className="inline-flex items-center self-start gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-sm sm:text-base font-semibold tracking-widest uppercase">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  {slide.tag}
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-[3rem] font-extrabold text-white tracking-tight leading-tight">
                  {slide.title}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {slide.points.map((pt, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900/55 border border-white/10"
                    >
                      <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
                      <span className="text-base sm:text-xl lg:text-[1.35rem] text-slate-100 font-light">
                        {pt.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Complementary Inset Photo of Monocrystal */}
              <div className="hidden md:flex flex-col items-center shrink-0 w-44 lg:w-52 rounded-2xl bg-slate-950/80 border border-white/15 p-2.5 shadow-xl">
                <div className="w-full h-28 lg:h-32 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
                  <img
                    src={slide.insetImage}
                    alt={slide.insetCaption}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
                <span className="text-sm sm:text-base text-slate-200 font-medium mt-2 text-center leading-tight">
                  {slide.insetCaption}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
