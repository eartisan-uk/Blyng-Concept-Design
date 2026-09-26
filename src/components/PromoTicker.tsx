import { motion } from 'motion/react';

export default function PromoTicker() {
  const items = [
    'FREE SHIPPING OVER £150',
    'HANDCRAFTED IN LONDON',
    '30-DAY FREE RETURNS',
    'SECURE WORLDWIDE DELIVERY',
  ];

  return (
    <div className="bg-black text-white py-3 border-y border-neutral-800 overflow-hidden relative" id="promo-ticker">
      {/* For desktop, we can display them in a balanced flex layout, for mobile we can have a smooth scroll */}
      <div className="hidden md:flex justify-around items-center max-w-7xl mx-auto px-4 text-xs font-sans tracking-[0.2em] font-light">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span className="w-1 h-1 rounded-full bg-gold-400"></span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className="md:hidden flex overflow-hidden">
        <motion.div
          animate={{ x: [0, -1035] }}
          transition={{
            ease: 'linear',
            duration: 18,
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap gap-12 text-[10px] font-sans tracking-[0.2em] font-light px-4"
        >
          {[...items, ...items, ...items].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 shrink-0">
              <span className="w-1 h-1 rounded-full bg-gold-400"></span>
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
