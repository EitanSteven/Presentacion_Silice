import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideBackdrop from '../SlideBackdrop';

const ACCENT_MAP = {
  cyan: {
    dot: 'bg-cyan-400',
    badge: 'bg-cyan-500/10 border-cyan-400/30 text-cyan-300',
    highlight: 'bg-cyan-950/70 border-cyan-500/40 text-cyan-200'
  },
  amber: {
    dot: 'bg-amber-400',
    badge: 'bg-amber-500/10 border-amber-400/30 text-amber-300',
    highlight: 'bg-amber-950/70 border-amber-500/40 text-amber-200'
  },
  emerald: {
    dot: 'bg-emerald-400',
    badge: 'bg-emerald-500/10 border-emerald-400/30 text-emerald-300',
    highlight: 'bg-emerald-950/70 border-emerald-500/40 text-emerald-200'
  },
  indigo: {
    dot: 'bg-indigo-400',
    badge: 'bg-indigo-500/10 border-indigo-400/30 text-indigo-300',
    highlight: 'bg-indigo-950/70 border-indigo-500/40 text-indigo-200'
  }
};

export default function SlideBottomPanel({ slide, isCarouselPaused, hidePanels }) {
  const [imageIdx, setImageIdx] = useState(0);
  const hasCarousel = Array.isArray(slide.images) && slide.images.length > 0;
  const totalImages = slide.images?.length || 0;

  useEffect(() => {
    if (!hasCarousel || isCarouselPaused || totalImages <= 1) return;
    const timer = setInterval(() => {
      setImageIdx((prev) => (prev + 1) % totalImages);
    }, slide.intervalMs || 2600);

    return () => clearInterval(timer);
  }, [hasCarousel, isCarouselPaused, totalImages, slide.intervalMs]);

  const theme = ACCENT_MAP[slide.accent] || ACCENT_MAP.cyan;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <SlideBackdrop
        image={slide.backgroundImage}
        images={slide.images}
        activeIndex={imageIdx}
        imageFit={slide.imageFit || 'cover'}
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
            className="glass-bottom-panel absolute bottom-0 inset-x-0 max-h-[45vh] z-10 px-6 sm:px-12 lg:px-16 py-5 sm:py-7 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto flex flex-col justify-between gap-3 sm:gap-4">
              {/* Top row: Tag + Optional Highlight Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-semibold tracking-widest uppercase ${theme.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
                    {slide.tag}
                  </div>
                  {slide.subtitle && (
                    <span className="text-xs sm:text-sm font-medium text-slate-300">
                      {slide.subtitle}
                    </span>
                  )}
                </div>

                {slide.highlightValue && (
                  <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-xl border text-xs sm:text-sm font-mono font-semibold ${theme.highlight}`}>
                    <span className="text-slate-400 font-sans font-normal">{slide.highlightLabel}:</span>
                    <span>{slide.highlightValue}</span>
                  </div>
                )}
              </div>

              {/* Slide Title */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {slide.title}
              </h2>

              {/* 3-4 Brief Ideas Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                {slide.points.map((pt, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.06, duration: 0.35 }}
                    className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-900/55 border border-white/10"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${theme.dot}`} />
                    <div className="text-xs sm:text-sm text-slate-200 leading-snug">
                      {pt.label && (
                        <span className="font-semibold text-white">{pt.label}: </span>
                      )}
                      <span className="font-light">{pt.text}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Optional Footnote / Clarification */}
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
