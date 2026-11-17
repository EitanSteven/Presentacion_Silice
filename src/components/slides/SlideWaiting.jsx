import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideBackdrop from '../SlideBackdrop';

export default function SlideWaiting({ slide, isCarouselPaused, preloadState, hidePanels }) {
  const [imageIdx, setImageIdx] = useState(0);
  const totalImages = slide.images?.length || 0;

  useEffect(() => {
    if (isCarouselPaused || totalImages <= 1) return;
    const timer = setInterval(() => {
      setImageIdx((prev) => (prev + 1) % totalImages);
    }, slide.intervalMs || 2800);

    return () => clearInterval(timer);
  }, [isCarouselPaused, totalImages, slide.intervalMs]);

  const isPreloadDone = preloadState && preloadState.loaded >= preloadState.total && preloadState.total > 0;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <SlideBackdrop
        images={slide.images}
        activeIndex={imageIdx}
        imageFit="cover"
        iridescent={true}
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
            {/* Iridescent subtle border highlight along top of panel */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] wafer-iridescent-overlay opacity-90" />

            <div className="max-w-7xl mx-auto flex flex-col justify-center gap-2.5 sm:gap-3.5">
              <div className="flex items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 text-sm sm:text-base font-semibold tracking-widest uppercase">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isPreloadDone ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
                    }`}
                  />
                  {slide.tag}
                </div>

                {preloadState && preloadState.total > 0 && (
                  <span className="text-sm sm:text-base font-mono text-slate-300/90 tracking-wider">
                    {isPreloadDone
                      ? 'Recursos listos'
                      : `Precargando ${preloadState.loaded}/${preloadState.total}`}
                  </span>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight leading-tight wafer-iridescent-text">
                {slide.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2.5 border-t border-white/10 text-lg sm:text-2xl lg:text-[1.75rem] text-slate-200 font-light">
                <span className="font-medium text-white">{slide.student}</span>
                <span className="text-slate-500 hidden sm:inline">|</span>
                <span className="text-cyan-200/90">{slide.date}</span>
                <span className="text-slate-500 hidden sm:inline">|</span>
                <span className="text-slate-300">{slide.teacher}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
