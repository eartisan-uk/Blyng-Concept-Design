import { Instagram, Twitter, MessageSquare, ShieldCheck, HelpCircle } from 'lucide-react';

interface FooterProps {
  onCategoryClick: (category: string) => void;
  onStoryClick: () => void;
}

export default function Footer({ onCategoryClick, onStoryClick }: FooterProps) {
  const handleNavClick = (catVal: string) => {
    onCategoryClick(catVal);
    const gridEl = document.getElementById('products-section');
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-black text-white pt-20 pb-8 px-4 sm:px-6 lg:px-8 border-t border-neutral-900 text-left" id="main-footer">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-neutral-900">
        
        {/* Brand Column (2 cols width on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="font-serif text-2xl tracking-[0.2em] font-normal text-white">BLYNG</h2>
          <p className="text-xs text-neutral-400 font-light max-w-sm leading-relaxed">
            Statement pieces crafted for those who wear their dare. Elevating contemporary luxury with ethically sourced, brilliant-cut diamonds.
          </p>
          <div className="flex space-x-3 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-500 transition-all duration-300"
              aria-label="Instagram profile"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-500 transition-all duration-300"
              aria-label="Twitter profile"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-500 transition-all duration-300"
              aria-label="Pinterest profile"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 1: Company */}
        <div className="space-y-4">
          <h4 className="text-[10px] tracking-[0.2em] font-medium text-neutral-300 uppercase">
            COMPANY
          </h4>
          <ul className="space-y-2 text-xs font-light text-neutral-400">
            <li>
              <button onClick={onStoryClick} className="hover:text-white transition-colors cursor-pointer text-left">
                Our Story
              </button>
            </li>
            <li>
              <a href="#blog" className="hover:text-white transition-colors">
                Blog & Editorial
              </a>
            </li>
            <li>
              <a href="#careers" className="hover:text-white transition-colors">
                Careers
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact Studio
              </a>
            </li>
          </ul>
        </div>

        {/* Column 2: Shop */}
        <div className="space-y-4">
          <h4 className="text-[10px] tracking-[0.2em] font-medium text-neutral-300 uppercase">
            COLLECTIONS
          </h4>
          <ul className="space-y-2 text-xs font-light text-neutral-400">
            <li>
              <button onClick={() => handleNavClick('all')} className="hover:text-white transition-colors cursor-pointer text-left">
                New Arrivals
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('rings')} className="hover:text-white transition-colors cursor-pointer text-left">
                Fine Rings
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('necklaces')} className="hover:text-white transition-colors cursor-pointer text-left">
                Necklaces
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('earrings')} className="hover:text-white transition-colors cursor-pointer text-left">
                Earrings
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('bracelets')} className="hover:text-white transition-colors cursor-pointer text-left">
                Bracelets & Cuffs
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Policies */}
        <div className="space-y-4">
          <h4 className="text-[10px] tracking-[0.2em] font-medium text-neutral-300 uppercase">
            POLICIES
          </h4>
          <ul className="space-y-2 text-xs font-light text-neutral-400">
            <li>
              <a href="#shipping" className="hover:text-white transition-colors">
                Shipping Policy
              </a>
            </li>
            <li>
              <a href="#returns" className="hover:text-white transition-colors">
                Returns & Refunds
              </a>
            </li>
            <li>
              <a href="#privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#terms" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[10px] text-neutral-500 font-light font-sans">
          © 2026 BLYNG Jewelry Ltd. All rights reserved. London, United Kingdom.
        </p>
        
        {/* Country Selector / Trust indicators */}
        <div className="flex items-center space-x-6 text-[10px] text-neutral-500 font-sans tracking-wider">
          <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
            <ShieldCheck className="w-3.5 h-3.5" /> SECURE CHECKOUT
          </span>
          <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
            <HelpCircle className="w-3.5 h-3.5" /> HELP & FAQ
          </span>
          <div className="flex items-center gap-2 border border-neutral-800 px-3 py-1.5 rounded-sm hover:border-neutral-700 transition-colors">
            <span className="w-3 h-2 bg-gradient-to-r from-blue-700 via-white to-red-600 block shrink-0" />
            <span>GBP (£)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
