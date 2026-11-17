import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideBackdrop from '../SlideBackdrop';

export default function SlideReferences({ slide, hidePanels }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <SlideBackdrop
        image={slide.backgroundImage}
        imageFit="cover"
        hidePanels={hidePanels}
        alt={slide.title}
      />

      {/* Extra dim layer so references are effortless to read */}
      <div
        className={`absolute inset-0 bg-[#070a12]/45 pointer-events-none transition-opacity duration-300 ${
          hidePanels ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Bottom Horizontal Glassmorphism Panel (max 45% height) */}
      <AnimatePresence>
        {!hidePanels && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass-bottom-panel absolute bottom-0 inset-x-0 max-h-[45vh] z-10 px-6 sm:px-12 lg:px-16 py-5 sm:py-6 overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto flex flex-col gap-3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-[11px] font-semibold tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    {slide.tag}
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                    {slide.title}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {slide.sources.map((src, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-slate-900/65 border border-white/10 hover:border-teal-400/40 transition-colors"
                  >
                    <span className="w-5 h-5 rounded-md bg-teal-500/15 border border-teal-400/30 flex items-center justify-center shrink-0 font-mono text-[10px] font-bold text-teal-300 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-slate-100 leading-snug line-clamp-2">
                        {src.title}
                      </p>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                        className="interactive-control text-[10px] text-teal-300/90 hover:text-teal-200 underline underline-offset-2 truncate block mt-1"
                        title={src.url}
                      >
                        {src.url}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
