import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { slidesData, ALL_PRESENTATION_IMAGES } from '../data/slides';
import SlideRenderer from './SlideRenderer';

export default function Presentation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showHelper, setShowHelper] = useState(false);
  const [indicatorVisible, setIndicatorVisible] = useState(false);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [hidePanels, setHidePanels] = useState(false);
  const [preloadState, setPreloadState] = useState({
    loaded: 0,
    total: ALL_PRESENTATION_IMAGES.length
  });

  const indicatorTimeoutRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const preloadedImagesRef = useRef([]);

  const totalSlides = slidesData.length;

  // Preload all presentation images starting on Slide 00
  useEffect(() => {
    let cancelled = false;
    let completed = 0;

    const markOneDone = () => {
      completed += 1;
      if (!cancelled) {
        setPreloadState({
          loaded: completed,
          total: ALL_PRESENTATION_IMAGES.length
        });
      }
    };

    const cached = ALL_PRESENTATION_IMAGES.map((src) => {
      const img = new Image();
      img.onload = () => {
        if (typeof img.decode === 'function') {
          img.decode().catch(() => {}).finally(markOneDone);
        } else {
          markOneDone();
        }
      };
      img.onerror = markOneDone;
      img.src = src;
      return img;
    });

    preloadedImagesRef.current = cached;

    return () => {
      cancelled = true;
    };
  }, []);

  const showTempIndicator = useCallback(() => {
    setIndicatorVisible(true);
    if (indicatorTimeoutRef.current) clearTimeout(indicatorTimeoutRef.current);
    indicatorTimeoutRef.current = setTimeout(() => {
      setIndicatorVisible(false);
    }, 1800);
  }, []);

  const goToNext = useCallback(() => {
    if (currentIndex < totalSlides - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
      showTempIndicator();
    }
  }, [currentIndex, totalSlides, showTempIndicator]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
      showTempIndicator();
    }
  }, [currentIndex, showTempIndicator]);

  const togglePanels = useCallback(() => {
    setHidePanels((prev) => !prev);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'Backspace') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        togglePanels();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        setIsCarouselPaused((prev) => !prev);
      } else if (e.key === 'h' || e.key === 'H' || e.key === '?') {
        e.preventDefault();
        setShowHelper((prev) => !prev);
      } else if (e.key === 'Escape' && showHelper) {
        e.preventDefault();
        setShowHelper(false);
      } else if (e.key === 'Home') {
        e.preventDefault();
        setDirection(-1);
        setCurrentIndex(0);
        showTempIndicator();
      } else if (e.key === 'End') {
        e.preventDefault();
        setDirection(1);
        setCurrentIndex(totalSlides - 1);
        showTempIndicator();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, togglePanels, toggleFullscreen, showHelper, totalSlides, showTempIndicator]);

  // Mouse Left Click (Next) & Right Click (Prev)
  const handleMouseDown = (e) => {
    if (e.target.closest('.interactive-control')) return;

    if (e.button === 0) {
      goToNext();
    } else if (e.button === 2) {
      e.preventDefault();
      goToPrev();
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 70 : -70,
      opacity: 0,
      scale: 0.985
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 30 },
        opacity: { duration: 0.32 },
        scale: { duration: 0.32 }
      }
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir > 0 ? -70 : 70,
      opacity: 0,
      scale: 0.985,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 30 },
        opacity: { duration: 0.22 },
        scale: { duration: 0.22 }
      }
    })
  };

  const activeSlide = slidesData[currentIndex];

  return (
    <MotionConfig reducedMotion="user">
      <div
        onMouseDown={handleMouseDown}
        onContextMenu={handleContextMenu}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-screen h-screen bg-[#070a12] text-slate-100 overflow-hidden cursor-default select-none"
      >
        {/* Slide Stage */}
        <div className="relative w-full h-full">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <SlideRenderer
                slide={activeSlide}
                isCarouselPaused={isCarouselPaused}
                preloadState={preloadState}
                hidePanels={hidePanels}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Special Discreet Toggle Button for ENTER (Hide / Show Info Panels) */}
        <button
          type="button"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            togglePanels();
          }}
          aria-pressed={hidePanels}
          aria-label={hidePanels ? 'Mostrar panel de información (Enter)' : 'Ocultar panel de información (Enter)'}
          title={hidePanels ? 'Mostrar información (Enter)' : 'Ver solo imagen de fondo (Enter)'}
          className={`interactive-control absolute top-4 right-5 z-40 inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-950/65 hover:bg-slate-900/90 border border-white/15 backdrop-blur-md text-sm sm:text-base font-medium text-slate-200 shadow-lg transition-opacity duration-200 cursor-pointer ${
            hidePanels ? 'opacity-70 hover:opacity-100 ring-1 ring-cyan-400/40' : 'opacity-35 hover:opacity-100'
          }`}
        >
          {hidePanels ? (
            <Eye className="w-4 h-4 text-cyan-300" />
          ) : (
            <EyeOff className="w-4 h-4 text-slate-300" />
          )}
          <span className="font-mono text-xs tracking-wider uppercase px-2 py-0.5 rounded bg-white/10 text-slate-200">
            Enter
          </span>
        </button>

        {/* Hairline Bottom Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-slate-800/40 pointer-events-none z-30">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]"
            initial={false}
            animate={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }}
            transition={{ ease: 'easeOut', duration: 0.4 }}
          />
        </div>

        {/* Transient Slide Counter (No persistent UI) */}
        <AnimatePresence>
          {indicatorVisible && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-4 left-5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md text-sm sm:text-base font-mono font-medium text-slate-300 pointer-events-none z-40 shadow-xl"
            >
              {String(activeSlide.id).padStart(2, '0')} / {String(totalSlides - 1).padStart(2, '0')}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Help Modal (Triggered by 'H' or '?') */}
        <AnimatePresence>
          {showHelper && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="interactive-control absolute inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md"
              onClick={(e) => {
                e.stopPropagation();
                setShowHelper(false);
              }}
            >
              <div
                className="max-w-md w-full rounded-3xl bg-slate-900 border border-slate-700/80 p-6 shadow-2xl text-left"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <h3 className="text-lg font-bold text-white">Controles de Presentación</h3>
                  <button
                    onClick={() => setShowHelper(false)}
                    className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-sm"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex items-center justify-between py-1 border-b border-slate-800/50">
                    <span className="text-slate-400">Avanzar Diapositiva:</span>
                    <span className="font-mono text-xs bg-slate-800 px-2 py-1 rounded text-amber-300">
                      Click Izq / → / Espacio
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-800/50">
                    <span className="text-slate-400">Retroceder Diapositiva:</span>
                    <span className="font-mono text-xs bg-slate-800 px-2 py-1 rounded text-amber-300">
                      Click Der / ← / Backspace
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-800/50">
                    <span className="text-slate-400">Ocultar / Mostrar Paneles:</span>
                    <span className="font-mono text-xs bg-slate-800 px-2 py-1 rounded text-cyan-300">
                      Tecla Enter
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-800/50">
                    <span className="text-slate-400">Pausar / Reanudar Carrusel:</span>
                    <span className="font-mono text-xs bg-slate-800 px-2 py-1 rounded text-emerald-300">
                      Tecla P {isCarouselPaused ? '(Pausado)' : ''}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-800/50">
                    <span className="text-slate-400">Pantalla Completa:</span>
                    <span className="font-mono text-xs bg-slate-800 px-2 py-1 rounded text-cyan-300">Tecla F</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-400">Cerrar Ayuda:</span>
                    <span className="font-mono text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">Tecla H / Esc</span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => setShowHelper(false)}
                    className="px-5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-semibold tracking-wide"
                  >
                    Entendido
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
