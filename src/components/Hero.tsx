import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, Pause, Play, Sparkles } from 'lucide-react';
import { HERO_SLIDES } from '../data';

interface HeroProps {
  onShopClick: (category?: string) => void;
}

const AUTO_PLAY_INTERVAL = 6500; // 6.5s per slide

export default function Hero({ onShopClick }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const timerRef = useRef<number | null>(null);

  const currentSlide = HERO_SLIDES[currentIndex];

  const goToSlide = useCallback((newIndex: number, newDirection?: 'next' | 'prev') => {
    setDirection(newDirection || (newIndex > currentIndex ? 'next' : 'prev'));
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  const nextSlide = useCallback(() => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Autoplay management
  useEffect(() => {
    if (!isPlaying) return;

    timerRef.current = window.setInterval(() => {
      nextSlide();
    }, AUTO_PLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <section
      className="relative w-full overflow-hidden bg-neutral-950 text-white"
      id="hero-section"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      aria-label="High Jewelry Hero Slider"
    >
      {/* Background Subtle Gradient Sheen */}
      <div className="absolute inset-0 bg-radial-at-t from-neutral-900 via-neutral-950 to-black opacity-80 pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 md:pt-10 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[580px] lg:min-h-[640px]">
          
          {/* Left Column: Editorial Statement (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 md:space-y-8 z-10 text-left order-2 lg:order-1 pt-2 lg:pt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id + '-text'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* Badges / Collection Identifier */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-[0.25em] font-sans font-medium uppercase bg-white/10 text-gold-300 border border-gold-400/20 backdrop-blur-sm">
                    <Sparkles className="w-3 h-3 text-gold-400" />
                    {currentSlide.seasonBadge}
                  </span>
                  <span className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase font-sans">
                    {currentSlide.tag}
                  </span>
                </div>

                {/* Primary Editorial Headline */}
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.06] tracking-tight">
                  {currentSlide.titleLine1} <br />
                  <span className="italic font-normal font-serif text-gold-200">
                    {currentSlide.titleHighlight}
                  </span>
                  {currentSlide.titleLine2 && (
                    <>
                      <br />
                      <span className="text-neutral-100 font-serif font-light text-3xl sm:text-4xl lg:text-5xl">
                        {currentSlide.titleLine2}
                      </span>
                    </>
                  )}
                  <span className="text-gold-400 font-serif">.</span>
                </h1>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-md leading-relaxed">
                  {currentSlide.description}
                </p>

                {/* Featured Material Note */}
                <div className="pt-1 border-t border-neutral-800/80 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                  <span className="text-[11px] tracking-wider text-neutral-400 font-sans uppercase">
                    {currentSlide.featuredMaterial}
                  </span>
                </div>

                {/* Call to Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onShopClick(currentSlide.category)}
                    className="px-8 py-3.5 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-500 text-neutral-950 hover:brightness-110 active:scale-[0.98] transition-all text-xs tracking-[0.25em] font-medium uppercase shadow-lg shadow-gold-900/20 flex items-center gap-2.5 group"
                  >
                    <span>{currentSlide.ctaText}</span>
                    <ArrowRight className="w-4 h-4 text-neutral-950 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    onClick={() => onShopClick('all')}
                    className="px-6 py-3.5 bg-white/5 hover:bg-white/10 active:scale-[0.98] text-white border border-neutral-700/60 hover:border-neutral-500 transition-all text-xs tracking-[0.25em] font-light uppercase"
                  >
                    VIEW ALL
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Expansive Fashion Photography Showcase (7 cols on lg) */}
          <div className="lg:col-span-7 order-1 lg:order-2 w-full relative">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/10] overflow-hidden rounded-sm shadow-2xl border border-neutral-800/60 group bg-neutral-900">
              
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentSlide.id + '-image'}
                  custom={direction}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={currentSlide.image}
                    alt={`${currentSlide.tag} - BLYNG Luxury Jewelry`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.02]"
                  />
                  {/* Subtle dark vignette overlay for luxury depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Slide Counter Badge */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 px-3.5 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[11px] font-mono tracking-widest text-neutral-200">
                <span className="text-gold-300 font-semibold">0{currentIndex + 1}</span>
                <span className="text-neutral-500 mx-1.5">/</span>
                <span className="text-neutral-400">0{HERO_SLIDES.length}</span>
              </div>

              {/* Atelier Hallmark Watermark */}
              <div className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 z-20 pointer-events-none">
                <div className="px-3 py-1.5 bg-black/50 backdrop-blur-md border border-white/10 text-[10px] tracking-[0.25em] text-neutral-300 uppercase font-sans">
                  BLYNG FINE ATELIER
                </div>
              </div>

              {/* Previous & Next Floating Chevron Controls */}
              <button
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/85 backdrop-blur-md text-white border border-white/15 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 text-neutral-200 hover:text-white" />
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next Slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/85 backdrop-blur-md text-white border border-white/15 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-5 h-5 text-neutral-200 hover:text-white" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Navigation & Slide Indicator Bar */}
        <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Direct Slide Tab Switchers */}
          <div className="w-full md:w-auto grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 flex-grow max-w-4xl">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={`text-left p-2.5 sm:p-3 rounded border transition-all relative overflow-hidden group ${
                    isActive
                      ? 'bg-neutral-900 border-gold-400/40 text-white shadow-sm'
                      : 'bg-neutral-950/60 hover:bg-neutral-900/60 border-neutral-800/70 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {/* Active Slide Timer Progress Bar */}
                  {isActive && isPlaying && (
                    <motion.div
                      key={`progress-${currentIndex}`}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: AUTO_PLAY_INTERVAL / 1000, ease: 'linear' }}
                      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-gold-400 to-amber-500"
                    />
                  )}
                  {isActive && !isPlaying && (
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gold-400" />
                  )}

                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 group-hover:text-neutral-400 mb-1">
                    <span>0{idx + 1}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
                    )}
                  </div>
                  <div className="text-[11px] sm:text-xs font-serif font-normal truncate">
                    {slide.tag}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Autoplay & Slider State Controls */}
          <div className="flex items-center gap-4 text-xs font-sans text-neutral-400">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 transition-colors text-[11px] uppercase tracking-wider"
              title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-gold-400" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-gold-400" />
                  <span>Autoplay</span>
                </>
              )}
            </button>

            <span className="text-[11px] tracking-widest text-neutral-500 uppercase hidden sm:inline">
              AUTOPLAY ACTIVE
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
