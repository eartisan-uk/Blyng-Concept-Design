import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { BLYNG_HERO_BANNER_URL } from '../data';

interface BrandBannerProps {
  onStoryClick: () => void;
}

export default function BrandBanner({ onStoryClick }: BrandBannerProps) {
  return (
    <section className="bg-black text-white py-28 px-6 md:px-12 relative overflow-hidden" id="brand-story-banner">
      {/* Background image overlay using the original brand banner */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img
          src={BLYNG_HERO_BANNER_URL}
          alt="BLYNG Brand Banner background"
          className="w-full h-full object-cover object-center opacity-30 grayscale brightness-50"
          referrerPolicy="no-referrer"
        />
        {/* Vignette and gradient overlays to guarantee copy readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(26,21,16,0.5)_0%,rgba(0,0,0,0.8)_80%)]" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Column: Massive Serif Stack */}
        <div className="space-y-4 text-left">
          <p className="text-[10px] md:text-xs font-sans tracking-[0.3em] text-neutral-400 uppercase font-light">
            ABOUT THE BRAND
          </p>
          
          <div className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-wide leading-none space-y-2">
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              BOLD<span className="text-gold-400">.</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              BRILLIANT<span className="text-gold-400">.</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="italic font-normal text-neutral-200"
            >
              BLYNG<span className="text-gold-400">.</span>
            </motion.p>
          </div>
        </div>

        {/* Right Column: Narrative & Button */}
        <div className="space-y-6 md:max-w-md ml-auto text-left">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-neutral-400 font-light text-sm md:text-base leading-relaxed"
          >
            Founded on the conviction that fine jewelry should be a direct extension of one's boldest self. We source conflict-free diamonds of exceptional fire and clarity, hand-crafting every piece in our London studio.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-neutral-500 font-light text-xs md:text-sm leading-relaxed"
          >
            We don't make accessories; we craft armor. Made to be worn daily, layered with audacity, and passed down as heirloom artifacts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-4"
          >
            <button
              onClick={onStoryClick}
              className="px-6 py-3 border border-neutral-700 hover:border-gold-300 hover:text-gold-300 transition-colors text-xs tracking-[0.25em] font-light uppercase flex items-center gap-3 bg-neutral-900/40 backdrop-blur-sm"
            >
              OUR STORY
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
