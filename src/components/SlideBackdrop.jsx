import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SlideBackdrop({
  image,
  images,
  activeIndex = 0,
  imageFit = 'cover',
  lightBacking = false,
  iridescent = false,
  hidePanels = false,
  alt = ''
}) {
  const currentSrc = Array.isArray(images) && images.length > 0 ? images[activeIndex % images.length] : image;

  if (imageFit === 'contain-full') {
    return (
      <div
        className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none flex items-center justify-center ${
          lightBacking ? 'bg-white' : 'bg-[#070a12]'
        }`}
      >
        <img
          src={currentSrc}
          alt={alt}
          className="w-full h-full object-contain"
          loading="eager"
        />
      </div>
    );
  }

  if (imageFit === 'contain-upper') {
    return (
      <div className="absolute inset-0 w-full h-full bg-[#070a12] overflow-hidden pointer-events-none">
        {/* Subtle ambient glow behind the framed upper stage */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_28%,rgba(56,189,248,0.10),transparent)]" />

        {/* Upper unobstructed showcase area (expands when panels are hidden) */}
        <div
          className={`absolute inset-x-0 top-0 flex items-center justify-center p-4 sm:p-8 lg:p-10 transition-all duration-300 ${
            hidePanels ? 'bottom-4 sm:bottom-8' : 'bottom-[36vh] sm:bottom-[38vh]'
          }`}
        >
          <div
            className={`relative w-full h-full max-w-6xl rounded-3xl overflow-hidden flex items-center justify-center shadow-2xl ${
              lightBacking
                ? 'bg-white/95 border border-white/20 p-3 sm:p-5'
                : 'bg-[#0b1120]/90 border border-slate-800/80 p-1 sm:p-2'
            }`}
          >
            <img
              src={currentSrc}
              alt={alt}
              className="max-w-full max-h-full w-auto h-auto object-contain"
              loading="eager"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full bg-[#070a12] overflow-hidden pointer-events-none">
      <AnimatePresence mode="sync">
        <motion.img
          key={currentSrc}
          src={currentSrc}
          alt={alt}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
      </AnimatePresence>

      {/* Subtle dark vignette for depth (reduced when panels are hidden) */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-[#070a12]/35 via-transparent to-[#070a12]/80 transition-opacity duration-300 ${
          hidePanels ? 'opacity-20' : 'opacity-100'
        }`}
      />

      {/* Optional iridescent silicon wafer shimmer */}
      {iridescent && (
        <div className="absolute inset-0 wafer-iridescent-overlay mix-blend-screen opacity-75" />
      )}
    </div>
  );
}
